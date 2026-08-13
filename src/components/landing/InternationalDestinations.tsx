"use client";

import React from "react";
import { internationalDestinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { ArrowRight } from "lucide-react";

export function InternationalDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Global Journeys
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              International Escapes
            </h2>
          </div>
        </div>

        {/* Responsive Balanced Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internationalDestinations.slice(0, 3).map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              meta={dest.meta}
              image={dest.image}
              duration={dest.bestMonths[0] + " recommended"}
              budget={dest.budgetHint.split(" for ")[0]}
              featured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default InternationalDestinations;
