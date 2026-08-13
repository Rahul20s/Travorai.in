"use client";

import React from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { ArrowRight } from "lucide-react";

export function TrendingDestinations() {
  // Let's pick 4 popular ones for the trending section
  const trending = destinations.filter(d => 
    ["Goa", "Paris", "Tokyo", "Bali"].includes(d.name)
  );

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Hot Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trending destinations
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Places travellers are planning right now.
            </p>
          </div>
        </div>

        {/* Visual Hierarchy: One featured, others regular */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((dest, i) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.meta}
              image={dest.image}
              duration={dest.bestMonths[0] + " recommended"}
              budget={dest.budgetHint.split(" for ")[0]}
              featured={i === 0} // Set the first one as featured
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default TrendingDestinations;
