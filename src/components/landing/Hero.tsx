"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_PROMPTS = [
  { text: "Goa for 2 days under ₹20K", val: "Plan a 2-day Goa trip under ₹20,000 with beaches and nightlife" },
  { text: "Paris honeymoon", val: "Plan a romantic Paris honeymoon itinerary for 6 days with luxury stays" },
  { text: "Dubai with family", val: "Plan a 5-day Dubai trip with family, budget-friendly and kid-friendly attractions" },
  { text: "Solo trip to Bali", val: "Plan a solo adventure in Bali for 7 days focusing on nature and temples" },
  { text: "Weekend trip from Mumbai", val: "Plan a quick 2-day weekend getaway from Mumbai to Lonavala" },
];

export function Hero() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [input, setInput] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      // Unauthenticated User: Capture and preserve input temporarily
      localStorage.setItem("pending_trip_prompt", promptText);
      // Redirect to login, which redirect back to dashboard
      router.push(`/sign-in?redirect_url=/dashboard`);
    } else {
      // Authenticated User: Navigate to dashboard and planning trigger
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
    <section id="hero-chat" className="relative min-h-[75vh] w-full flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Visual Background image with stable direct id */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful tropical beach destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center flex flex-col items-center mt-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm mb-4 max-w-3xl">
          Where to today?
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-slate-200/90 max-w-2xl mb-12 leading-relaxed">
          Tell Travora where you want to go, what you love, and what you want to spend.
        </p>

        {/* AI Travel Planner input box */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl group relative mb-8">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 pl-6 transition-all duration-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/20 focus-within:border-blue-600 flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isNavigating}
              placeholder="e.g. '5 days in Goa under ₹20K with beaches and nightlife'..."
              className="flex-1 max-h-[150px] min-h-[48px] py-3 resize-none bg-transparent outline-none text-slate-900 text-base md:text-lg font-medium placeholder:text-slate-400 placeholder:font-normal disabled:opacity-50"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isNavigating}
              className="mb-1 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 w-[140px]"
            >
              {isNavigating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2 hidden sm:block" />
                  Plan Trip
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="w-full max-w-3xl">
          <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-4">
            Try asking for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(undefined, prompt.val)}
                disabled={isNavigating}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2 disabled:opacity-50 disabled:hover:-translate-y-0"
              >
                {isNavigating && input === prompt.val ? (
                   <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                   <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                )}
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
