"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { budgetPresets, travelStyles, type TravelStyleId } from "@/data/travel-styles";

type OnboardingFormProps = {
  initialStyles?: TravelStyleId[];
  initialBudget?: number;
  initialHomeCity?: string;
  isEdit?: boolean;
};

export function OnboardingForm({
  initialStyles = ["budget"],
  initialBudget = 25000,
  initialHomeCity = "",
  isEdit = false
}: OnboardingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedStyles, setSelectedStyles] = useState<TravelStyleId[]>(initialStyles);
  const [budget, setBudget] = useState(initialBudget);
  const [homeCity, setHomeCity] = useState(initialHomeCity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleStyle(id: TravelStyleId) {
    setSelectedStyles((current) =>
      current.includes(id) ? current.filter((style) => style !== id) : [...current, id]
    );
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelStyles: selectedStyles,
          defaultBudget: budget,
          homeCity: homeCity || undefined
        })
      });

      if (!response.ok) {
        throw new Error("Could not save your preferences.");
      }

      router.push("/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid w-[min(720px,calc(100%-32px))] gap-8 py-12">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#6366f1]">Step {step} of 3</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight">
          {isEdit ? "Update your travel profile" : "Tell Travora how you travel"}
        </h1>
        <p className="mt-3 text-[#6b7280]">
          We&apos;ll personalize every itinerary — budget-first, but flexible for everyone.
        </p>
      </div>

      {step === 1 && (
        <section className="grid gap-4">
          <h2 className="font-display text-xl font-extrabold">Who are you travelling as?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {travelStyles.map((style) => {
              const active = selectedStyles.includes(style.id);
              return (
                <button
                  className={`card grid gap-2 p-4 text-left transition ${active ? "border-[#6366f1] ring-2 ring-[#6366f1]/20" : ""}`}
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  type="button"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-[#f3f4f6] text-sm font-black text-[#0f172a]">
                    {style.emoji}
                  </span>
                  <strong>{style.label}</strong>
                  <span className="text-sm leading-6 text-[#6b7280]">{style.description}</span>
                </button>
              );
            })}
          </div>
          <Button className="mt-2" disabled={selectedStyles.length === 0} onClick={() => setStep(2)} type="button">
            Continue
          </Button>
        </section>
      )}

      {step === 2 && (
        <section className="grid gap-4">
          <h2 className="font-display text-xl font-extrabold">What&apos;s your typical trip budget?</h2>
          <p className="text-sm text-[#6b7280]">Travora is budget-first — you can always change this per trip.</p>
          <input
            className="w-full accent-[#6366f1]"
            max={500000}
            min={5000}
            onChange={(event) => setBudget(Number(event.target.value))}
            step={1000}
            type="range"
            value={budget}
          />
          <strong className="font-display text-2xl font-extrabold">Rs. {budget.toLocaleString("en-IN")}</strong>
          <div className="flex flex-wrap gap-2">
            {budgetPresets.map((preset) => (
              <button
                className="pill pill-interactive px-3 py-2 text-sm font-bold"
                key={preset.label}
                onClick={() => setBudget(preset.max)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setStep(1)} type="button" variant="ghost">
              Back
            </Button>
            <Button onClick={() => setStep(3)} type="button">
              Continue
            </Button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="grid gap-4">
          <h2 className="font-display text-xl font-extrabold">Where do you usually start from?</h2>
          <input
            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
            onChange={(event) => setHomeCity(event.target.value)}
            placeholder="e.g. Mumbai, Delhi, Bangalore"
            value={homeCity}
          />
          <p className="text-sm text-[#6b7280]">Optional — helps Travora suggest trains, flights and realistic costs.</p>
          {error && <p className="text-sm font-bold text-[#ef4444]">{error}</p>}
          <div className="flex gap-3">
            <Button onClick={() => setStep(2)} type="button" variant="ghost">
              Back
            </Button>
            <Button disabled={loading} onClick={handleSubmit} type="button">
              {loading ? "Saving..." : "Start planning"}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
