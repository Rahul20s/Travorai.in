"use client";

import type { TripPlan } from "@/types/trip";
import { TripPlanView } from "./trip-plan-view";

export function TripItinerary({ trip }: { trip: TripPlan }) {
  return (
    <div className="w-full">

      
      {/* Reusing the existing working itinerary component but hiding its hero/budget/deals */}
      <TripPlanView trip={trip} variant="itinerary-only" />
    </div>
  );
}
