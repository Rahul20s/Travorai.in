import type { TripPlan } from "@/types/trip";

export type TripEngineInput = {
  prompt: string;
  userId?: string;
  budget?: number;
  travelers?: number;
  origin?: string;
  startDate?: string;
  mood?: "relax" | "adventure" | "romantic" | "family" | "backpacking" | "luxury";
  travelStyles?: string[];
  dates?: {
    start?: string;
    end?: string;
  };
};

export type TripRefineInput = {
  instruction: string;
  currentTrip: TripPlan;
  userId?: string;
};

export type TripEngineResult = {
  trip: TripPlan;
  providerTrace: string[];
  warnings: string[];
};

export async function buildTrip(input: TripEngineInput): Promise<TripEngineResult> {
  const { planTrip, getProviderLabel } = await import("@/services/ai/orchestrator");
  const trip = await planTrip({
    prompt: input.prompt,
    userId: input.userId,
    budget: input.budget,
    travelers: input.travelers,
    origin: input.origin,
    startDate: input.startDate,
    mood: input.mood,
    travelStyles: input.travelStyles
  });

  const provider = getProviderLabel();

  return {
    trip,
    providerTrace: ["trip-service", "ai-orchestrator", provider.label],
    warnings: provider.warning ? [provider.warning] : []
  };
}

export async function refineTrip(input: TripRefineInput): Promise<TripEngineResult> {
  const { refineTrip: refine, getProviderLabel } = await import("@/services/ai/orchestrator");
  const trip = await refine({
    currentTrip: input.currentTrip,
    instruction: input.instruction,
    userId: input.userId
  });

  const provider = getProviderLabel();

  return {
    trip,
    providerTrace: ["trip-service", "ai-orchestrator", provider.label],
    warnings: provider.warning ? [provider.warning] : []
  };
}

