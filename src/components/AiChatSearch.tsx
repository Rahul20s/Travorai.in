"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MapPin, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripPlanView } from "@/components/trips/trip-plan-view";
import { TripPlan } from "@/types/trip";
import { trackSearchEvent, trackTripCreation } from "@/lib/analytics/events";

interface AiChatSearchProps {
  variant?: "hero" | "full";
}

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

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
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Load url search params or cached pending prompts on mount
  useEffect(() => {
    if (variant === "full" && typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlPrompt = searchParams.get("prompt");
      const pendingPrompt = localStorage.getItem("pending_trip_prompt");

      if (urlPrompt) {
        // Clear url params without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        handleSubmit(undefined, decodeURIComponent(urlPrompt));
      } else if (pendingPrompt) {
        localStorage.removeItem("pending_trip_prompt");
        handleSubmit(undefined, pendingPrompt);
      }
    }
  }, [variant]);

  const handleSubmit = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptText = customPrompt || input;
    if (!promptText.trim()) return;

    setInput("");
    
    // In full variant, add user message
    if (variant === "full") {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: promptText },
      ]);
      // Clear previous plan while generating new one (only for new trips, not refinements)
      const isRefine = REFINE_SUGGESTIONS.includes(promptText);
      if (!isRefine) {
        setTripPlan(null);
      }
    }

    setIsLoading(true);
    trackSearchEvent(promptText);

    try {
      // If we have an existing trip and this is a refine request, send as refinement
      const isRefine = tripPlan && REFINE_SUGGESTIONS.includes(promptText);
      const body = isRefine
        ? { instruction: promptText, currentTrip: tripPlan }
        : { prompt: promptText };

      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to generate trip");

      const data = await res.json();
      
      if (variant === "hero") {
        // Just redirect
        window.location.href = "/dashboard";
      } else {
        // Full variant logic
        setTripPlan(data.trip as TripPlan);
        trackTripCreation(
          data.trip.destination,
          data.trip.durationDays,
          data.trip.budget,
          false // We could check auth state if we had it here
        );
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Here's your personalized travel plan! Let me know if you want to adjust anything.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      if (variant === "full") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Sorry, I encountered an error while planning your trip. Please try again.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`w-full ${variant === "full" ? "flex flex-col h-full" : "max-w-4xl mx-auto"}`}>
      
      {/* Chat Messages Area - Only in Full Variant */}
      {variant === "full" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Where do you want to go?</h3>
                <p className="max-w-md mx-auto">
                  Tell me your destination, budget, travel dates, and what kind of experience you're looking for.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 text-primary font-medium">
                        <Sparkles className="w-4 h-4" />
                        Travora AI
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-gray-500 font-medium">Crafting your perfect trip...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trip Plan View - Rendered below chat if exists */}
          {tripPlan && !isLoading && (
            <div className="mt-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TripPlanView trip={tripPlan} />
              
              <div className="mt-8 border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Refine This Plan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {REFINE_SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(undefined, suggestion)}
                      className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-primary hover:bg-primary/5 text-sm font-medium transition-colors"
                      disabled={isLoading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className={`${variant === "full" ? "p-4 border-t bg-white" : ""}`}>
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-2 pl-4 transition-all focus-within:shadow-2xl focus-within:shadow-indigo-200/50 focus-within:border-indigo-200 flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 5 days in Paris for a honeymoon, medium budget..."
              className="flex-1 max-h-[200px] min-h-[44px] py-3 resize-none bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="mb-1 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex-shrink-0"
            >
              {isLoading && variant === "hero" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {/* Quick Prompts - Only show if empty chat in full variant or hero variant */}
        {(variant === "hero" || (variant === "full" && messages.length === 0)) && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(undefined, prompt)}
                disabled={isLoading}
                className="snap-start flex-shrink-0 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-white/20 shadow-sm text-sm font-medium text-gray-700 hover:bg-white hover:-translate-y-0.5 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AiChatSearch;
