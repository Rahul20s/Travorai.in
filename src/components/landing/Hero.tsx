"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Sparkles, Loader2, Search, Map, Calendar, Check, Globe } from "lucide-react";

const PLACEHOLDERS = [
  "Plan a 5-day trip to Bali...",
  "A romantic weekend in Goa...",
  "Solo backpacking in Thailand...",
  "Family holiday in Dubai for 4 days...",
  "Budget trip to Rishikesh under ₹15K..."
];

const QUICK_PILLS = [
  { text: "Beach Vibe", icon: "🏖️", val: "Plan a relaxing beach vacation with water sports" },
  { text: "Mountains", icon: "🏔️", val: "Plan a mountain trek and nature getaway" },
  { text: "Luxury", icon: "👑", val: "Plan a luxury 5-star trip with premium experiences" },
  { text: "Culture", icon: "🕌", val: "Plan a cultural and historical sightseeing trip" },
  { text: "Foodie", icon: "🍝", val: "Plan a food-focused trip to taste local delicacies" },
];

export function Hero() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [input, setInput] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter effect state
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < PLACEHOLDERS[placeholderIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(PLACEHOLDERS[placeholderIndex].slice(0, displayText.length + 1));
        }, 40); // Typing speed
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500); // Wait before deleting
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20); // Deleting speed
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, placeholderIndex]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    if (isNavigating) return;
    
    const promptText = customPrompt || input;
    if (!promptText.trim()) return;

    setIsNavigating(true);

    if (!isSignedIn) {
      localStorage.setItem("pending_trip_prompt", promptText);
      router.push(`/sign-in?redirect_url=/dashboard`);
    } else {
      router.push(`/dashboard?prompt=${encodeURIComponent(promptText)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="hero-chat" className="relative min-h-[80vh] w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Visual Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful tropical beach destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md mb-6 max-w-4xl">
          Where to?
        </h1>
        
        {/* The Premium Search Widget (TripAdvisor Style) */}
        <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl p-3 md:p-4 mb-8 mt-2 transition-transform duration-300 hover:scale-[1.01]">
          
          {/* Segmented Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3 px-2 overflow-x-auto scrollbar-hide">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shrink-0 transition-transform active:scale-95">
              <Sparkles className="w-4 h-4" /> AI Planner
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-full text-sm font-medium transition-colors shrink-0">
              <Map className="w-4 h-4" /> Destinations
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-full text-sm font-medium transition-colors shrink-0">
              <Calendar className="w-4 h-4" /> Weekend Trips
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-full text-sm font-medium transition-colors shrink-0">
              <Globe className="w-4 h-4" /> International
            </button>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-end sm:items-center gap-3 px-2 pb-1">
            <div className="absolute left-6 top-5 text-slate-400 hidden sm:block">
              <Search className="w-6 h-6" />
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isNavigating}
              placeholder={displayText}
              className="flex-1 w-full max-h-[150px] min-h-[60px] py-4 sm:pl-14 pr-4 resize-none bg-transparent outline-none text-slate-900 text-lg md:text-xl font-medium placeholder:text-slate-400 disabled:opacity-50"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isNavigating}
              className="w-full sm:w-auto rounded-full h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              {isNavigating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Building...
                </>
              ) : (
                "Plan Trip"
              )}
            </button>
          </form>
        </div>

        {/* Quick Start Pills */}
        <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-3 mb-10">
          {QUICK_PILLS.map((pill, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(undefined, pill.val)}
              disabled={isNavigating}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium text-white transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:hover:-translate-y-0"
            >
              <span>{pill.icon}</span>
              {pill.text}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/90 font-medium text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
              <Check className="w-3.5 h-3.5 text-blue-300" />
            </span>
            10,000+ Trips Planned
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center backdrop-blur-sm border border-green-400/30">
              <Check className="w-3.5 h-3.5 text-green-300" />
            </span>
            Free Direct Bookings
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-purple-400/30">
              <Check className="w-3.5 h-3.5 text-purple-300" />
            </span>
            Powered by GPT-4 AI
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
