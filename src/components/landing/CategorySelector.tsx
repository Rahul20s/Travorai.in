"use client";

import React from "react";
import Link from "next/link";
import { Plane, Hotel, Train, Compass, Car, Bike, Utensils, Sparkles } from "lucide-react";

const categories = [
  { label: "Flights", icon: Plane, href: "/flights", badge: null, comingSoon: false },
  { label: "Hotels & Stays", icon: Hotel, href: "/stays", badge: null, comingSoon: false },
  { label: "Trains", icon: Train, href: "/dashboard", badge: null, comingSoon: false },
  { label: "Activities", icon: Compass, href: "/dashboard", badge: null, comingSoon: false },
  { label: "Restaurants", icon: Utensils, href: "/dashboard", badge: null, comingSoon: false },
  { label: "Experiences", icon: Sparkles, href: "/dashboard", badge: "Popular", comingSoon: false },
];

export function CategorySelector() {
  return (
    <section className="py-10 bg-slate-50/50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex overflow-x-auto pb-4 scrollbar-none gap-5 md:grid md:grid-cols-4 lg:grid-cols-8 md:pb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return cat.comingSoon ? (
              <div
                key={cat.label}
                className="group flex-none flex flex-col items-center justify-center bg-white border border-slate-100 rounded-[20px] p-6 w-[140px] md:w-auto text-center opacity-60 cursor-not-allowed relative"
              >
                {cat.badge && (
                  <span className="absolute -top-2.5 px-2.5 py-1 text-[10px] font-bold text-slate-500 bg-slate-200 rounded-full shadow-sm">
                    {cat.badge}
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[13px] font-bold text-slate-400">
                  {cat.label}
                </span>
              </div>
            ) : (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex-none flex flex-col items-center justify-center bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md rounded-[20px] p-6 w-[140px] md:w-auto text-center transition-all duration-300 relative"
              >
                {cat.badge && (
                  <span className="absolute -top-2.5 px-2.5 py-1 text-[10px] font-bold text-white bg-amber-500 rounded-full animate-pulse shadow-sm shadow-amber-500/30">
                    {cat.badge}
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-4 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default CategorySelector;
