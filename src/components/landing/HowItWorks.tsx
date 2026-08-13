"use client";

import React from "react";
import { MessageSquare, Settings, Sparkles, Compass, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Tell Travora what you want",
    desc: "Describe your destination, travel duration, budget, and styles in plain English.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    step: "02",
    icon: Settings,
    title: "Travora parses details",
    desc: "Our AI understands destination, travelers, dates, exact budget limits, and vibes.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Instant beautiful itinerary",
    desc: "Receive a tailored, day-by-day structured itinerary detailing top events and dining.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    step: "04",
    icon: Compass,
    title: "Compare flights & stays",
    desc: "Evaluate best hotels and transport side-by-side to secure optimal starting prices.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Manage bookings & expenses",
    desc: "Preserve all tickets, receipts, and track trip expenditures together in one view.",
    color: "bg-amber-50 text-amber-600",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-3">
            Product Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Travora Works
          </h2>
          <p className="text-lg text-slate-500">
            From initial brainstorm to boarding pass — your entire vacation plan, organized and actionable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md rounded-3xl p-6 relative transition-all duration-300 flex flex-col"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-slate-100 select-none">
                  {s.step}
                </span>
                
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                  {s.title}
                </h3>
                
                <p className="text-xs leading-relaxed text-slate-500 flex-1">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
