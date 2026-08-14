"use client";

import React from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { Sparkles } from "lucide-react";

export function TrendingDestinations() {
  // Let's just pick 4 top destinations for the trending section
  const trending = destinations.slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Trending Now
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Where to next?
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Discover the world's most incredible destinations. Let our AI craft your perfect itinerary in seconds.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((dest) => (
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
export default TrendingDestinations;
