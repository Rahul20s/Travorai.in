import type { TripPlanningInput } from "@/services/ai/types";

export type AiAgentName =
  | "planner"
  | "hotel"
  | "flight"
  | "budget"
  | "weather"
  | "packing"
  | "recommendation";

export type AiToolContext = {
  tripId?: string;
  userId?: string;
  locale: "en-IN";
  currency: "INR" | "USD" | "AED" | "JPY";
};

export type AiAgent<I = TripPlanningInput, O = unknown> = {
  name: AiAgentName;
  description: string;
  run(input: I, context: AiToolContext): Promise<O>;
};

export const agentRegistry: Record<AiAgentName, Pick<AiAgent, "name" | "description">> = {
  planner: {
    name: "planner",
    description: "Creates structured itinerary JSON from user intent, budget, dates and preferences."
  },
  hotel: {
    name: "hotel",
    description: "Finds stay areas, hotel constraints, amenities and affiliate-ready options."
  },
  flight: {
    name: "flight",
    description: "Compares flight routes, timing tradeoffs and provider search requirements."
  },
  budget: {
    name: "budget",
    description: "Optimizes total trip cost and suggests cheaper swaps."
  },
  weather: {
    name: "weather",
    description: "Adds seasonal fit, day-level weather advice and alert triggers."
  },
  packing: {
    name: "packing",
    description: "Generates checklist items based on destination, duration, weather and companions."
  },
  recommendation: {
    name: "recommendation",
    description: "Ranks activities, restaurants and saved places by travel profile."
  }
};
