import { streamText, tool } from "ai";
import { getModel } from "@/services/ai/orchestrator";
import { z } from "zod";

export const maxDuration = 60; // Allow enough time for streaming

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = getModel();

  if (!model) {
    return new Response("AI Provider not configured. Please add OPENAI_API_KEY or AZURE_OPENAI_API_KEY to your environment.", { status: 500 });
  }

  const systemPrompt = `You are Travora, an expert, friendly AI travel agent.
The user wants to plan a trip.
Your goal is to collect the following 6 pieces of information from the user:
1. Destination (Where do they want to go?)
2. Origin (Where are they traveling from? e.g., Delhi, Mumbai, New York)
3. Travel Dates (When are they going? Specific dates or a general month)
4. Duration (How many days?)
5. Budget (e.g., budget, medium, luxury, or a specific INR amount)
6. Travel Companions/Style (e.g., solo, couple, family, friends)

RULES:
- Be conversational, enthusiastic, and brief.
- DO NOT ask all questions at once. Ask one or two questions at a time.
- If the user provides a very detailed initial prompt, do NOT ask them questions they already answered.
- Once you have confidently collected ALL 6 pieces of information, YOU MUST call the 'generate_trip' tool to construct the final itinerary.
- Do not output markdown itineraries yourself. Your ONLY job is to gather the requirements and trigger the tool.`;

  const result = await streamText({
    model,
    messages,
    system: systemPrompt,
    tools: {
      generate_trip: tool({
        description: "Call this tool ONLY when you have gathered the Destination, Origin, Dates, Duration, Budget, and Companions/Style from the user. This will finalize the chat and build the itinerary.",
        parameters: z.object({
          destination: z.string().describe("The final destination (e.g. 'Goa', 'Paris')"),
          origin: z.string().describe("The city they are traveling from (e.g. 'Delhi', 'Mumbai')"),
          startDate: z.string().optional().describe("The starting date of travel in YYYY-MM-DD format if known"),
          durationDays: z.number().describe("The number of days for the trip"),
          budget: z.number().optional().describe("An estimated numerical budget in INR. If they said 'luxury', estimate a high amount. If they said 'budget', estimate a low amount."),
          travelers: z.number().optional().describe("Estimated number of travelers"),
          mood: z.enum(["relax", "adventure", "romantic", "family", "backpacking", "luxury"]).optional().describe("The general mood or style of the trip based on their companions"),
          travelStyles: z.array(z.string()).optional().describe("Specific themes they asked for (e.g., 'beaches', 'mountains', 'food')")
        }),
        execute: async () => {
          // We don't actually execute server-side logic here.
          // The client will intercept this tool call and forward the payload to /api/trips.
          // We just return a success message so the stream gracefully ends.
          return { success: true, message: "Building itinerary now..." };
        }
      })
    }
  });

  return result.toDataStreamResponse();
}
