import { createAzure } from "@ai-sdk/azure";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { starterTrip } from "@/features/trips/planner/mock-trip";
import { tripPlanSchema, tripRefinementSchema } from "@/services/ai/schemas";
import type { TripPlanningInput, TripRefiningInput } from "@/services/ai/types";
import type { TripPlan } from "@/types/trip";
import { geocodeLocation } from "@/lib/travel/providers/nominatim";

export function getModel() {
  // Prefer Azure OpenAI when configured (used by Travora)
  if (
    process.env.AZURE_OPENAI_API_KEY &&
    process.env.AZURE_OPENAI_ENDPOINT &&
    process.env.AZURE_OPENAI_DEPLOYMENT_ID
  ) {
    const endpointUrl = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/+$/, "");
    const urlMatch = endpointUrl.match(/https?:\/\/([^.]+)\.openai\.azure\.com/);
    const resourceName = urlMatch ? urlMatch[1] : undefined;

    const azure = createAzure({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      resourceName,
      baseURL: resourceName ? undefined : endpointUrl + "/openai/deployments",
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21"
    });
    return azure.chat(process.env.AZURE_OPENAI_DEPLOYMENT_ID);
  }

  // Fall back to standard OpenAI
  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }

  return null;
}

export function getProviderLabel() {
  const azureConfigured = Boolean(
    process.env.AZURE_OPENAI_API_KEY &&
      process.env.AZURE_OPENAI_ENDPOINT &&
      process.env.AZURE_OPENAI_DEPLOYMENT_ID
  );
  const openAiConfigured = Boolean(process.env.OPENAI_API_KEY);

  if (azureConfigured) {
    return { label: "azure-openai", warning: "" };
  }

  if (openAiConfigured) {
    return { label: "openai-gpt-4o-mini", warning: "" };
  }

  return {
    label: "mock-provider",
    warning:
      "No AI provider key set - using mock trip data. Add AZURE_OPENAI_API_KEY or OPENAI_API_KEY to .env.local."
  };
}

function buildSystemPrompt(input: TripPlanningInput) {
  const styles = input.travelStyles?.length ? input.travelStyles.join(", ") : "budget";
  const mood = input.mood ?? "relax";
  const budget = input.budget ? `Rs. ${input.budget.toLocaleString("en-IN")}` : "flexible";
  const travelers = input.travelers ?? 1;
  const originContext = input.origin ? `User Origin: ${input.origin}` : "User Origin: Unknown (Assume a major city like Delhi or Mumbai if needed for flights/trains).";

  return `You are Travora, an AI travel planner built for Indian travellers with international coverage.

Rules:
- Default currency is INR (Indian Rupees). Show realistic India prices for domestic trips.
- For international trips, estimate total trip cost in INR including flights.
- Prioritize budget-friendly options unless luxury is requested.
- Include Indian travel context: trains (IRCTC-style), local food, seasonal tips.
- Return practical day-by-day plans with 3-5 activities per day.
- For each day provide a rich "structuredItems" array with title, description, type (flight/stay/activity/restaurant/transport/note), time, location and optional image (Unsplash URL).
- Provide a concise one-sentence "summary" of the trip.
- Provide a "budgetBreakdown" array (category, amount in INR, percentage) summing to ~100%.
- TRANSIT OPTIONS: In the 'deals' array, you MUST generate exactly 1 Flight option and 1 Train option from the User's Origin to the Destination. Provide a realistic estimated price in INR. Set the deal title to something like "Flight from Origin to Destination".
- Use Unsplash image URLs for images.

User context:
- ${originContext}
- Travel styles: ${styles}
- Mood: ${mood}
- Budget: ${budget}
- Travelers: ${travelers}
- Home context: India-first.`;
}

export async function planTrip(input: TripPlanningInput): Promise<TripPlan> {
  const model = getModel();
  if (!model) {
    return mockPlanTrip(input);
  }

  try {
    const { object } = await generateObject({
      model,
      schema: tripPlanSchema,
      system: buildSystemPrompt(input),
      prompt: input.prompt
    });

    // Hydrate coordinates for items using Nominatim
    // We only process up to 5 items to avoid making the user wait too long (Nominatim is 1 req/sec)
    let geocodedCount = 0;
    for (const day of object.days) {
      if (day.structuredItems) {
        for (const item of day.structuredItems) {
          if (geocodedCount >= 5) break;
          // Use location if available, otherwise title + destination
          const query = item.location ? `${item.location}, ${object.destination}` : `${item.title}, ${object.destination}`;
          const coords = await geocodeLocation(query);
          if (coords) {
            item.latitude = coords.lat;
            item.longitude = coords.lon;
            geocodedCount++;
          }
        }
      }
    }

    return object;
  } catch (error) {
    console.error("[ai-orchestrator] AI provider call failed, falling back to mock:", error);
    return mockPlanTrip(input);
  }
}

export async function refineTrip(input: TripRefiningInput): Promise<TripPlan> {
  const model = getModel();
  if (!model) {
    return mockRefineTrip(input);
  }

  const { currentTrip, instruction } = input;

  const refineSystem = `You are Travora, an AI travel planner. You have an existing trip plan and the user wants to adjust it.

Current trip:
Destination: ${currentTrip.destination}
Duration: ${currentTrip.durationDays} days
Budget: Rs. ${currentTrip.budget.toLocaleString("en-IN")}
Days: ${JSON.stringify(currentTrip.days)}
Deals: ${JSON.stringify(currentTrip.deals)}

The user's instruction is: "${instruction}"

IMPORTANT DELTA UPDATE RULES:
1. ONLY return the top-level fields that need to change to satisfy the user's instruction.
2. If a field does NOT need to change, OMIT it completely from your JSON response.
3. If you are updating the 'deals' array, provide the ENTIRE updated 'deals' array.
4. If you are updating the 'days' array, provide the ENTIRE updated 'days' array.
5. NEVER return abbreviated or hallucinated data for fields that aren't related to the user's request. Just omit them.`;

  try {
    const { object } = await generateObject({
      model,
      schema: tripRefinementSchema,
      system: refineSystem,
      prompt: instruction
    });

    return {
      ...currentTrip,
      ...object
    } as TripPlan;
  } catch (error) {
    console.error("[ai-orchestrator] refine failed, returning current trip:", error);
    return currentTrip;
  }
}

function mockPlanTrip(input: TripPlanningInput): TripPlan {
  const destination = inferDestination(input.prompt);
  const origin = input.origin || "Delhi";
  
  return {
    ...starterTrip,
    budget: input.budget ?? starterTrip.budget,
    destination,
    durationDays: inferDuration(input.prompt) ?? starterTrip.durationDays,
    summary: starterTrip.summary ?? `${destination} getaway: a well-rounded trip mixing culture, food and relaxation.`,
    budgetBreakdown: starterTrip.budgetBreakdown ?? [
      { category: "Flights", amount: 5000, percentage: 26 },
      { category: "Accommodation", amount: 7200, percentage: 37 },
      { category: "Food", amount: 3400, percentage: 17 },
      { category: "Activities", amount: 2400, percentage: 12 },
      { category: "Transport & Local", amount: 1100, percentage: 6 },
      { category: "Misc", amount: 400, percentage: 2 }
    ]
  };
}

function mockRefineTrip(input: TripRefiningInput): TripPlan {
  const { currentTrip, instruction } = input;
  const lowered = instruction.toLowerCase();

  // Simple mock refinement: adjust budget based on intent and add a summary.
  let budget = currentTrip.budget;
  if (lowered.includes("cheaper") || lowered.includes("budget") || lowered.includes("less")) {
    budget = Math.round(budget * 0.75);
  } else if (lowered.includes("luxury") || lowered.includes("premium") || lowered.includes("more")) {
    budget = Math.round(budget * 1.3);
  }

  return {
    ...currentTrip,
    budget,
    summary: `Updated ${currentTrip.destination} trip: "${instruction}" — rebalanced to fit a Rs. ${budget.toLocaleString("en-IN")} budget.`
  };
}

function inferDestination(prompt: string) {
  const normalized = prompt.toLowerCase();

  const places = [
    "goa", "manali", "kashmir", "jaipur", "kerala", "rishikesh", "ladakh",
    "bali", "dubai", "paris", "tokyo", "bangkok", "singapore", "japan"
  ];

  for (const place of places) {
    if (normalized.includes(place)) {
      return place.charAt(0).toUpperCase() + place.slice(1);
    }
  }

  return "Custom trip";
}

function inferDuration(prompt: string) {
  const match = prompt.match(/(\d+)\s*-?\s*day/i);
  return match ? Number(match[1]) : undefined;
}

