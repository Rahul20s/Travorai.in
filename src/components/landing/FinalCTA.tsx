"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="bg-slate-950 py-24 text-center relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Ready to plan your next trip?
        </h2>
        <p className="text-lg text-slate-350 text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Create complete, budget-optimized itineraries with interactive stay comparisons in just one chat.
        </p>
        <Link href="#hero-chat">
          <Button className="bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-full px-8 h-14 text-base shadow-xl gap-2 transition-all">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Start planning with Travora
          </Button>
        </Link>
      </div>
    </section>
  );
}
export default FinalCTA;
