"use client";

import React, { useState } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { Trees, Music, UtensilsCrossed, MountainSnow, Landmark } from "lucide-react";

const VIBES = [
  { id: "nature", label: "Nature & Beaches", icon: Trees },
  { id: "nightlife", label: "Nightlife", icon: Music },
  { id: "culture", label: "Culture & History", icon: Landmark },
  { id: "mountains", label: "Mountains", icon: MountainSnow },
];

export function VibeExplorer() {
  const [activeVibeId, setActiveVibeId] = useState(VIBES[0].id);

  // Simple static mapping for the new SEO destination layer
  const vibeMap: Record<string, string[]> = {
    nature: ["Goa", "Bali", "Maldives", "Kerala"],
    nightlife: ["Goa", "Dubai", "Singapore"],
    culture: ["Paris", "Bali", "Singapore"],
    mountains: ["Manali", "Kashmir", "Switzerland"],
  };

  const activeNames = vibeMap[activeVibeId] || [];
  const filtered = destinations.filter(d => activeNames.includes(d.name)).slice(0, 4);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore by Vibe
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Not sure where to go? Choose your mood and let us inspire you.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {VIBES.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setActiveVibeId(vibe.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeVibeId === vibe.id
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <vibe.icon className="w-4 h-4" />
                {vibe.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.quickInfo.bestTime.split(' ')[0]}
              imageContext={dest.heroImageContext}
              duration={dest.quickInfo.idealDuration.split(' ')[0] + " Days"}
              budget={dest.quickInfo.approxBudget.split(' ')[0]}
              featured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default VibeExplorer;
