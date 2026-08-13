"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { TripPlan } from "@/types/trip";
import { TripWorkspace } from "@/components/trips/TripWorkspace";
import { use } from "react";

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [rawTrip, setRawTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadTrip() {
      try {
        const id = resolvedParams.id;
        const res = await fetch(`/api/trips/list`);
        if (!res.ok) throw new Error("Failed to load trips");
        const data = await res.json();
        const found = data.trips?.find((t: { id: string }) => t.id === id);
        if (!found) throw new Error("Trip not found");

        setRawTrip(found);
        
        // The plan is stored as { summary, weather, bestMonth, plan: TripPlan }
        const planData = found.plan;
        if (planData?.plan) {
          setTrip(planData.plan as TripPlan);
        } else if (planData?.destination) {
          setTrip(planData as TripPlan);
        } else {
          throw new Error("No plan data found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load trip");
      } finally {
        setLoading(false);
      }
    }
    loadTrip();
  }, [resolvedParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] w-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !trip || !rawTrip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <p className="text-red-500 font-medium mb-4">{error || "Trip not found"}</p>
        <Link href="/dashboard/trips" className="text-blue-600 hover:underline font-bold">
          &larr; Back to trips
        </Link>
      </div>
    );
  }

  return <TripWorkspace trip={trip} rawTrip={rawTrip} />;
}
