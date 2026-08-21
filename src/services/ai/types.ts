import type { TripPlan } from "@/types/trip";

export type AiProvider = "openai" | "claude" | "gemini" | "deepseek" | "openrouter";

export type TripPlanningInput = {
  prompt: string;
  userId?: string;
  origin?: string;
  startDate?: string;
  budget?: number;
  travelers?: number;
  mood?: "relax" | "adventure" | "romantic" | "family" | "backpacking" | "luxury";
  travelStyles?: string[];
};

export type TripRefiningInput = {
  /** The original trip that should be refined */
  currentTrip: TripPlan;
  /** The follow-up instruction from the user, e.g. "make it cheaper" */
  instruction: string;
  userId?: string;
};

export type AiTripPlanner = {
  provider: AiProvider;
  planTrip(input: TripPlanningInput): Promise<TripPlan>;
  refineTrip?(input: TripRefiningInput): Promise<TripPlan>;
};
