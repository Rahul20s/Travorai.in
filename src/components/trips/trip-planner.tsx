"use client";

import { useRef, useState } from "react";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripPlanView } from "@/components/trips/trip-plan-view";
import type { TripPlan } from "@/types/trip";

type TripPlannerProps = {
  defaultPrompt?: string;
  defaultBudget?: number;
  travelStyles?: string[];
};

const suggestions = [
  "Goa under Rs. 20,000",
  "Kashmir honeymoon",
  "Rishikesh solo weekend",
  "Dubai family trip",
  "Paris couple trip"
];

const refineSuggestions = ["Make it cheaper", "Add more adventure", "More local food", "Luxury version"];

export function TripPlanner({ defaultPrompt, defaultBudget, travelStyles }: TripPlannerProps) {
  const [prompt, setPrompt] = useState(defaultPrompt ?? "I want a 5-day Goa trip under Rs. 20,000");
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TripPlan | null>(null);
  const resultRef = useRef<TripPlan | null>(null);

  async function handlePlan() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          budget: defaultBudget,
          travelStyles
        })
      });

      if (!response.ok) {
        throw new Error("Could not generate your trip plan.");
      }

      const data = await response.json();
      const plan = data.trip as TripPlan;
      resultRef.current = plan;
      setResult(plan);
    } catch (planError) {
      setError(planError instanceof Error ? planError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefine(instruction?: string) {
    const current = resultRef.current;
    if (!current || refining) return;

    const instructionText = (instruction ?? prompt).trim();
    if (!instructionText) return;

    setRefining(true);
    setError("");

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instruction: instructionText,
          currentTrip: current
        })
      });

      if (!response.ok) {
        throw new Error("Could not update your trip plan.");
      }

      const data = await response.json();
      const updated = data.trip as TripPlan;
      resultRef.current = updated;
      setResult(updated);
      setPrompt("");
    } catch (refineError) {
      setError(refineError instanceof Error ? refineError.message : "Something went wrong.");
    } finally {
      setRefining(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form
        className="glass-dark grid gap-4 rounded-2xl p-5 md:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (result) {
            void handleRefine();
          } else {
            void handlePlan();
          }
        }}
      >
        <label className="text-sm font-bold text-white/90" htmlFor="prompt">
          {result ? "Refine your trip — what should we change?" : "Where do you want to go?"}
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            className="min-h-[3.25rem] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-white shadow-inner outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/40 placeholder:text-white/40"
            id="prompt"
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={result ? "e.g. make it cheaper, add adventure…" : "e.g. 5-day Goa trip under Rs. 20,000"}
            value={prompt}
          />
          <Button
            className="min-h-[3.25rem] min-w-[9.5rem] rounded-xl bg-[#6366f1] shadow-lg shadow-indigo-500/30 hover:bg-[#4f46e5]"
            disabled={loading || refining}
            type="submit"
          >
            {loading || refining ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {result ? "Updating…" : "Planning…"}
              </>
            ) : result ? (
              <>
                <RefreshCw className="size-4" />
                Update plan
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Plan my trip
              </>
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(result ? refineSuggestions : suggestions).map((suggestion) => (
            <button
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/20"
              key={suggestion}
              onClick={() => {
                setPrompt(suggestion);
                if (result) void handleRefine(suggestion);
              }}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
        {error && (
          <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-[#fecaca]">{error}</p>
        )}
      </form>

      {result && <TripPlanView trip={result} />}
    </div>
  );
}
