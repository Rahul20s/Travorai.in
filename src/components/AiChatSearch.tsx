"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MapPin, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useChat } from "ai/react";
import { TripPlanView } from "@/components/trips/trip-plan-view";
import { TripPlan } from "@/types/trip";
import { trackSearchEvent, trackTripCreation } from "@/lib/analytics/events";

interface AiChatSearchProps {
  variant?: "hero" | "full";
}

const QUICK_PROMPTS = [
  "Goa for 5 days under ₹20k",
  "Paris honeymoon",
  "Tokyo solo adventure",
  "Dubai with family",
  "Kashmir in December",
  "Bali beach retreat",
];

const REFINE_SUGGESTIONS = [
  "Make it cheaper",
  "Add more adventure",
  "Make it luxury",
  "Good for families",
  "More local food",
];

export function AiChatSearch({ variant = "hero" }: AiChatSearchProps) {
  const [heroInput, setHeroInput] = useState("");
  const [isBuildingTrip, setIsBuildingTrip] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // useChat for the conversational flow
  const { messages, input, handleInputChange, handleSubmit: handleChatSubmit, isLoading: isChatLoading, setMessages, append } = useChat({
    api: "/api/chat",
  });

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input, heroInput]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isBuildingTrip, isChatLoading]);

  // Load url search params on mount
  useEffect(() => {
    if (variant === "full" && typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlPrompt = searchParams.get("prompt");
      const pendingPrompt = localStorage.getItem("pending_trip_prompt");

      if (urlPrompt) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        append({ role: "user", content: decodeURIComponent(urlPrompt) });
      } else if (pendingPrompt) {
        localStorage.removeItem("pending_trip_prompt");
        append({ role: "user", content: pendingPrompt });
      }
    }
  }, [variant, append]);

  // Watch for the 'generate_trip' tool call in the chat stream
  useEffect(() => {
    if (variant === "full") {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.toolInvocations) {
        // Wait for the tool call to be complete (state === 'call')
        const toolCall = lastMessage.toolInvocations.find(
          (t) => t.toolName === "generate_trip" && t.state === "call"
        );
        
        // We ensure we only build once for a specific tool call ID to prevent double-fetching
        if (toolCall && !isBuildingTrip && !tripPlan) {
          handleBuildTrip(toolCall.args);
        }
      }
    }
  }, [messages, variant, isBuildingTrip, tripPlan]);

  const handleBuildTrip = async (args: any) => {
    setIsBuildingTrip(true);
    try {
      // The backend /api/trips strictly requires a 'prompt' field.
      // Synthesize a rich prompt from the gathered tool arguments.
      const syntheticPrompt = `Plan a ${args.durationDays}-day trip to ${args.destination}${args.budget ? ` with a budget of ${args.budget} INR` : ''}${args.travelers ? ` for ${args.travelers} travelers` : ''}${args.mood ? ` focusing on a ${args.mood} experience` : ''}.`;

      const payload = {
        ...args,
        prompt: syntheticPrompt
      };

      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate trip");
      const data = await res.json();
      
      setTripPlan(data.trip as TripPlan);
      trackTripCreation(
        data.trip.destination,
        data.trip.durationDays,
        data.trip.budget,
        false
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "Sorry, I encountered an error while building your final itinerary." }
      ]);
    } finally {
      setIsBuildingTrip(false);
    }
  };

  const handleRefineTrip = async (instruction: string) => {
    if (!tripPlan) return;
    setIsBuildingTrip(true);
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: instruction }]);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction, currentTrip: tripPlan }),
      });
      if (!res.ok) throw new Error("Failed to refine trip");
      const data = await res.json();
      setTripPlan(data.trip as TripPlan);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "Sorry, I failed to refine the trip. Please try again." }
      ]);
    } finally {
      setIsBuildingTrip(false);
    }
  };

  const handleHeroSubmit = (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptText = customPrompt || heroInput;
    if (!promptText.trim()) return;
    trackSearchEvent(promptText);
    localStorage.setItem("pending_trip_prompt", promptText);
    window.location.href = "/dashboard";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (variant === "hero") {
        handleHeroSubmit();
      } else {
        if (!input.trim()) return;
        // If we already have a trip, treat new input as a refinement!
        if (tripPlan) {
          handleRefineTrip(input);
          handleInputChange({ target: { value: '' } } as any);
        } else {
          handleChatSubmit(e as any);
        }
      }
    }
  };

  const isWorking = isChatLoading || isBuildingTrip;
  const currentInput = variant === "hero" ? heroInput : input;
  const onInputChange = variant === "hero" ? (e: any) => setHeroInput(e.target.value) : handleInputChange;

  // Render logic for different states
  if (variant === "hero") {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleHeroSubmit} className="relative group w-full">
          <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-2 pl-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-600 flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={currentInput}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 5 days in Paris for a honeymoon, medium budget..."
              className="flex-1 max-h-[200px] min-h-[44px] py-3 resize-none bg-transparent outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              rows={1}
              disabled={isWorking}
            />
            <button
              type="submit"
              disabled={!currentInput.trim() || isWorking}
              className="mb-1 h-12 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-sm"
            >
              {isWorking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x max-w-4xl mx-auto w-full">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleHeroSubmit(undefined, prompt)}
              disabled={isWorking}
              className="snap-start flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // FULL VARIANT - DASHBOARD MODE
  return (
    <div className="w-full flex flex-col transition-all duration-500 ease-in-out h-auto">
      {/* Top Panel: Chat Interface */}
      <div 
        className={`flex flex-col bg-white transition-all duration-500 ease-in-out shrink-0 w-full ${
          tripPlan 
            ? "h-[50vh] border-b border-slate-200" 
            : "h-auto"
        }`}
      >
        <div ref={chatScrollRef} className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-6 ${!tripPlan && messages.length > 0 ? "max-h-[60vh]" : ""}`}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 text-slate-500 py-6 md:py-8">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">Where to?</h3>
                <p className="text-sm md:text-base text-slate-500 font-medium">
                  Tell me your destination, travel dates, who you're traveling with, and any budget preferences. I'll build a perfect itinerary.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              if (msg.toolInvocations && msg.toolInvocations.length > 0) return null;
              if (!msg.content) return null;

              const isAssistant = msg.role === "assistant";
              // Extract text inside brackets [Like This]
              const optionsMatch = isAssistant ? Array.from(msg.content.matchAll(/\[(.*?)\]/g)) : [];
              const options = optionsMatch.map(m => m[1]);
              // Remove brackets from main text
              const displayContent = isAssistant ? msg.content.replace(/\[.*?\]/g, "").trim() : msg.content;

              return (
                <div key={msg.id} className={`flex flex-col ${!isAssistant ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                      !isAssistant
                        ? "bg-slate-900 text-white font-medium rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                    }`}
                  >
                    {isAssistant && (
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Travora AI
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none text-current whitespace-pre-wrap font-medium">
                      {displayContent}
                    </div>
                  </div>
                  
                  {/* Quick Replies below the bubble */}
                  {options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-2">
                      {options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => append({ role: "user", content: opt })}
                          disabled={isWorking}
                          className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
          
          {isBuildingTrip && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Travora AI
                </div>
                <div className="mt-2 p-4 bg-blue-50 rounded-xl flex items-center gap-4 text-blue-700 font-medium animate-pulse border border-blue-100">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Designing your itinerary...
                </div>
              </div>
            </div>
          )}

          {isChatLoading && messages[messages.length - 1]?.role === "user" && !isBuildingTrip && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Travora AI
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-medium h-6">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-100 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.05)]">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (tripPlan && input.trim()) {
                handleRefineTrip(input);
                handleInputChange({ target: { value: '' } } as any);
              } else {
                handleChatSubmit(e);
              }
            }} 
            className="relative"
          >
            <textarea
              ref={textareaRef}
              value={currentInput}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              placeholder={tripPlan ? "Ask to tweak the plan..." : "Tell me where to go..."}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none overflow-hidden min-h-[56px] max-h-[200px]"
              rows={1}
              disabled={isWorking}
            />
            <div className="absolute right-2 top-2">
              <button
                type="submit"
                disabled={!currentInput.trim() || isWorking}
                className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-all flex items-center justify-center shrink-0 shadow-sm"
              >
                {isWorking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {/* Quick Prompts (only when empty) */}
          {messages.length === 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: prompt })}
                  disabled={isWorking}
                  className="snap-start flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel: The Itinerary Artifact */}
      {tripPlan && !isBuildingTrip && (
        <div className="w-full bg-[#F8FAFC] p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 rounded-b-3xl">
          <div className="max-w-4xl mx-auto w-full">
            <TripPlanView trip={tripPlan} />
            
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Refine This Plan
              </h4>
              <div className="flex flex-wrap gap-2">
                {REFINE_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleRefineTrip(suggestion)}
                    className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-blue-600 hover:text-blue-600 text-sm font-medium transition-all shadow-sm"
                    disabled={isWorking}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiChatSearch;
