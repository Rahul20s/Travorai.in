"use client";

import type { TripPlan } from "@/types/trip";
import type { TabType } from "./TripWorkspace";
import { Sparkles, CloudSun, Map as MapIcon, ArrowRight, CircleDollarSign } from "lucide-react";

export function TripOverview({ trip, setActiveTab }: { trip: TripPlan, setActiveTab: (t: TabType) => void }) {
  return (
    <div className="space-y-8">
      {/* Summary Box */}
      {trip.summary && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">Trip Summary</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {trip.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[11px] mb-2">
              <CloudSun className="w-4 h-4 text-sky-500" />
              Weather Expectation
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              {trip.weather || "Pleasant & sunny"}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition group" onClick={() => setActiveTab("Itinerary")}>
          <div>
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[11px] mb-2">
              <MapIcon className="w-4 h-4 text-emerald-500" />
              Itinerary
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              {trip.days.length} Days Planned
            </h3>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
            View full itinerary <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition group" onClick={() => setActiveTab("Expenses")}>
          <div>
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[11px] mb-2">
              <CircleDollarSign className="w-4 h-4 text-purple-500" />
              Budget
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              ₹{(trip.budget || 0).toLocaleString("en-IN")} Total
            </h3>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
            Track expenses <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Suggested Actions or Deals can go here */}
    </div>
  );
}
