"use client";

import React from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";

export function InternationalDestinations() {
  const internationalDestinations = destinations.filter(d => d.country !== "India");

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.03]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
            Global Adventures
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            International Wonders
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Explore the most sought-after global destinations, curated perfectly for you.
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px]">
          {internationalDestinations.slice(0, 5).map((dest, i) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.quickInfo.bestTime.split(' ')[0]} // e.g. "November"
              imageContext={dest.heroImageContext}
              duration={dest.quickInfo.idealDuration.split(' ')[0] + " Days"}
              budget={dest.quickInfo.approxBudget.split(' ')[0]} // e.g. "₹40,000"
              featured={i === 0} // Make the first one large
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default InternationalDestinations;
