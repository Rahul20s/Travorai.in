"use client";

import dynamic from "next/dynamic";
import { Compass } from "lucide-react";
import type { TripPlan } from "@/types/trip";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative flex flex-col items-center justify-center p-8 text-center shadow-inner">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10 animate-pulse">
        <Compass className="w-10 h-10 text-blue-300" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2 relative z-10">Loading Map...</h3>
    </div>
  ),
});

interface TripMapProps {
  trip: TripPlan;
}

export function TripMap({ trip }: TripMapProps) {
  return (
    <div className="w-full h-full">
      <MapClient trip={trip} />
    </div>
  );
}

