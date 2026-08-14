"use client";

import React from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { ArrowRight } from "lucide-react";

export function IndiaDestinations() {
  const indiaDestinations = destinations.filter(d => d.country === "India");

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Domestic Escapes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular India Destinations
            </h2>
          </div>
        </div>

        {/* Responsive Balanced Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indiaDestinations.slice(0, 3).map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.quickInfo.bestTime.split(' ')[0]} // Extracts first word, e.g. "November"
              imageContext={dest.heroImageContext}
              duration={dest.quickInfo.idealDuration.split(' ')[0] + " Days"}
              budget={dest.quickInfo.approxBudget.split(' ')[0]} // e.g. "₹15,000"
              featured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default IndiaDestinations;
