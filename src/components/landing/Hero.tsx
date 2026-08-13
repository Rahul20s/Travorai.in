"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Send, Sparkles } from "lucide-react";
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
    const promptText = customPrompt || input;
    if (!promptText.trim()) return;

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
        <form onSubmit={handleSubmit} className="w-full max-w-2xl group relative mb-6">
          <div className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl p-2.5 pl-5 transition-all duration-300 focus-within:border-blue-300 flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Try: '5 days in Goa under ₹20K with beaches and nightlife'..."
              className="flex-1 max-h-[150px] min-h-[44px] py-3.5 resize-none bg-transparent outline-none text-slate-800 text-sm md:text-base placeholder:text-slate-400"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="mb-1 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="w-full max-w-2xl">
          <p className="text-xs font-bold text-slate-350 text-slate-350 text-slate-300/80 uppercase tracking-wider mb-3">
            Popular searches
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(undefined, prompt.val)}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
              >
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
