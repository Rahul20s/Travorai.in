"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  BookmarkCheck,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock,
  ExternalLink,
  Hotel,
  Loader2,
  Map,
  MapPin,
  Plane,
  Save,
  Sparkles,
  Star,
  TrainFront,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { TripPlan, TripDayItem } from "@/types/trip";

function getTravelpayoutsUrl(type: "hotel" | "flight" | "train", destination: string) {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "561821";
  const dest = encodeURIComponent(destination || "India");

  if (type === "hotel") {
    return `https://hotellook.tp.st/search?destination=${dest}&marker=${marker}`;
  }
  return `https://aviasales.tp.st/search?destination=${dest}&marker=${marker}`;
}


const dealIcons = {
  hotel: Hotel,
  flight: Plane,
  train: TrainFront,
};

const itemTypeConfig: Record<
  NonNullable<TripDayItem["type"]>,
  { bg: string; border: string; icon: string; label: string }
> = {
  flight: { bg: "bg-sky-50", border: "border-sky-100", icon: "✈️", label: "Flight" },
  stay: { bg: "bg-violet-50", border: "border-violet-100", icon: "🏨", label: "Stay" },
  activity: { bg: "bg-emerald-50", border: "border-emerald-100", icon: "⭐", label: "Activity" },
  restaurant: { bg: "bg-orange-50", border: "border-orange-100", icon: "🍽️", label: "Food" },
  transport: { bg: "bg-cyan-50", border: "border-cyan-100", icon: "🚌", label: "Transport" },
  note: { bg: "bg-gray-50", border: "border-gray-200", icon: "📌", label: "Note" },
};

export function TripPlanView({
  trip,
  onSave,
  variant = "full",
}: {
  trip: TripPlan;
  onSave?: (trip: TripPlan) => Promise<boolean>;
  variant?: "full" | "itinerary-only";
}) {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState(trip.days[0]?.day ?? 1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeDayData =
    trip.days.find((day) => day.day === activeDay) ?? trip.days[0];

  async function handleSave() {
    if (saving || saved) return;
    setSaving(true);
    try {
      if (onSave) {
        const ok = await onSave(trip);
        if (ok) setSaved(true);
      } else {
        const res = await fetch("/api/trips/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination: trip.destination,
            durationDays: trip.durationDays,
            budget: trip.budget,
            summary: trip.summary,
            weather: trip.weather,
            bestMonth: trip.bestMonth,
            plan: trip,
          }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaved(true);
        router.refresh();
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* ── Hero Header ── */}
      {variant === "full" && (
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-10 text-white relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">
                  AI Planner · {trip.bestMonth}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {trip.destination} Itinerary
                </h2>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving || saved}
                className={`rounded-full px-6 h-12 text-base font-bold shadow-lg transition ${
                  saved
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-white text-indigo-600 hover:bg-gray-100"
                }`}
              >
                {saving ? (
                  <Loader2 className="size-5 animate-spin mr-2" />
                ) : saved ? (
                  <BookmarkCheck className="size-5 mr-2" />
                ) : (
                  <Save className="size-5 mr-2" />
                )}
                {saved ? "Saved!" : "Save trip"}
              </Button>
            </div>

            {/* Summary */}
            {trip.summary && (
              <p className="text-white/85 text-base leading-relaxed max-w-3xl mb-8">
                {trip.summary}
              </p>
            )}

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Map, label: trip.destination },
                { icon: CircleDollarSign, label: formatCurrency(trip.budget) },
                { icon: CalendarDays, label: `${trip.durationDays} days` },
                { icon: Sparkles, label: trip.weather },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <badge.icon className="size-4" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Budget Breakdown ── */}
      {variant === "full" && trip.budgetBreakdown && trip.budgetBreakdown.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <CircleDollarSign className="size-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900">Budget breakdown</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trip.budgetBreakdown.map((item) => (
              <div key={item.category} className="p-4 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.category}</span>
                  <strong className="text-sm font-bold text-gray-900">
                    {formatCurrency(item.amount)}
                  </strong>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Day Selector Tabs ── */}
      {trip.days.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {trip.days.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`shrink-0 rounded-full px-6 py-3 text-sm font-bold transition-all ${
                activeDay === day.day
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
      )}

      {/* ── Active Day Content ── */}
      {activeDayData && (
        <div className="space-y-4">
          {/* Day header */}
          <div className="flex items-center gap-4 mb-2">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-lg font-black text-white shadow-md">
              {activeDayData.day}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Day {activeDayData.day}
              </p>
              <h3 className="text-xl font-extrabold text-gray-900">
                {activeDayData.title}
              </h3>
            </div>
          </div>

          {/* Activity cards */}
          <div className="space-y-4">
            {(activeDayData.structuredItems ?? []).map((item, idx) => {
              const type = item.type ?? "activity";
              const config = itemTypeConfig[type] ?? itemTypeConfig.activity;
              const price =
                item.price === undefined
                  ? null
                  : item.price === 0
                  ? "Free"
                  : formatCurrency(item.price);

              return (
                <div
                  key={idx}
                  className={`flex gap-5 rounded-2xl border ${config.border} bg-white p-5 transition-shadow hover:shadow-md`}
                >
                  {/* Large image / icon area */}
                  {item.image ? (
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                      <SafeImage
                        alt={item.title}
                        src={item.image}
                        fill
                        className="object-cover"
                        context={`${item.location || ""} ${item.type || ""} ${item.description || ""} ${trip.destination}`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`grid size-24 shrink-0 place-items-center rounded-xl ${config.bg}`}
                    >
                      <span className="text-4xl">{config.icon}</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span
                          className={`inline-block text-xs font-bold uppercase tracking-wider ${
                            config.bg
                          } px-2.5 py-1 rounded-full mb-2`}
                        >
                          {config.label}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                      {price && (
                        <span className="shrink-0 text-base font-extrabold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-full">
                          {price}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {item.time && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Clock className="size-3.5" /> {item.time}
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <MapPin className="size-3.5" /> {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Fallback to plain text items */}
            {(!activeDayData.structuredItems ||
              activeDayData.structuredItems.length === 0) &&
              (activeDayData.items ?? []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md transition"
                >
                  <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-emerald-50">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <span className="text-base font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ── Deals / Best Options — Horizontal scroll ── */}
      {variant === "full" && trip.deals && trip.deals.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                Compare
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                Best options
              </h2>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {trip.deals.map((deal) => {
              const Icon = dealIcons[deal.type];
              return (
                <div
                  key={deal.title}
                  className="flex-none w-[320px] rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-44">
                    <SafeImage
                      alt={deal.title}
                      src={deal.image}
                      fill
                      className="object-cover"
                      context={`${deal.location || ""} ${deal.type || ""} ${deal.description || ""} ${trip.destination}`}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold uppercase flex items-center gap-1">
                      <Icon className="size-3.5" />
                      {deal.type}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                      {deal.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {deal.rating !== undefined && (
                          <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                            <Star className="size-4 fill-amber-400 text-amber-400" />
                            {deal.rating}
                          </span>
                        )}
                        {deal.location && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="size-3" /> {deal.location}
                          </span>
                        )}
                      </div>
                      <strong className="text-lg font-extrabold text-gray-900">
                        {formatCurrency(deal.price)}
                      </strong>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <a
                          href={getTravelpayoutsUrl(deal.type, deal.location || trip.destination)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book with Provider <ExternalLink className="size-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
