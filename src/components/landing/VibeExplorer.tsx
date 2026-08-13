"use client";

import React, { useState } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { ArrowRight } from "lucide-react";

const vibes = [
  { id: "beach", label: "🏖️ Beach Escapes", tag: "relax" },
  { id: "romantic", label: "💖 Romantic Trips", tag: "couple" },
  { id: "family", label: "👨‍👩‍👧‍👦 Family Fun", tag: "family" },
  { id: "solo", label: "🎒 Solo Travel", tag: "solo" },
  { id: "adventure", label: "🧗 Adventure Quest", tag: "adventure" },
  { id: "luxury", label: "👑 Luxury Hideaways", tag: "luxury" },
  { id: "budget", label: "💰 Budget Getaways", tag: "budget" },
];

export function VibeExplorer() {
  const [activeVibe, setActiveVibe] = useState(vibes[0]);

  // Filter destinations by tag
  const filtered = destinations
    .filter((d) => d.tags.includes(activeVibe.tag))
    .slice(0, 4);

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Tailored Discovery
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Find your kind of trip
            </h2>
          </div>
        </div>

        {/* Vibe Selection Tabs */}
        <div className="flex overflow-x-auto pb-4 scrollbar-none gap-2 mb-10">
          {vibes.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVibe(v)}
              className={`shrink-0 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeVibe.id === v.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Filtered Destination Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dest, i) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.meta}
              image={dest.image}
              duration={dest.bestMonths[0] + " recommended"}
              budget={dest.budgetHint.split(" for ")[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default VibeExplorer;
