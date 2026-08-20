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
import { trackAffiliateClick } from "@/lib/analytics/events";
import { getAffiliateProvider } from "@/lib/monetization/affiliates";

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
  train: { bg: "bg-blue-50", border: "border-blue-100", icon: "🚆", label: "Train" },
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
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-10 relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
                  AI Planner · {trip.bestMonth}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  {trip.destination} Itinerary
                </h2>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving || saved}
                className={`rounded-xl px-6 h-12 text-base font-bold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  saved
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                    : "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                {saving ? (
                  <Loader2 className="size-5 animate-spin mr-2" />
                ) : saved ? (
                  <BookmarkCheck className="size-5 mr-2" />
                ) : (
                  <Save className="size-5 mr-2" />
                )}
                {saved ? "Saved to Profile" : "Save trip"}
              </Button>
            </div>

            {/* Summary */}
            {trip.summary && (
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mb-4 font-medium">
                {trip.summary}
              </p>
            )}

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              AI-generated estimate — please confirm details before booking.
            </div>

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
                  className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700"
                >
                  <badge.icon className="size-4 text-slate-400" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Budget Breakdown ── */}
      {variant === "full" && trip.budgetBreakdown && trip.budgetBreakdown.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CircleDollarSign className="size-5 text-blue-600" />
            <h3 className="text-lg font-extrabold text-slate-900">Budget breakdown</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trip.budgetBreakdown.map((item) => (
              <div key={item.category} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-700">{item.category}</span>
                  <strong className="text-sm font-extrabold text-slate-900">
                    {formatCurrency(item.amount)}
                  </strong>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-400 mt-2">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Day Selector Tabs ── */}
      {trip.days.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {trip.days.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`shrink-0 rounded-xl px-6 h-11 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex items-center justify-center ${
                activeDay === day.day
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
      )}

      {/* ── Active Day Content ── */}
      {activeDayData && (
        <div className="space-y-5">
          {/* Day header */}
          <div className="flex items-center gap-4 mb-3">
            <div className="grid size-14 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-white shadow-sm">
              {activeDayData.day}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Day {activeDayData.day}
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
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

              const affiliate = getAffiliateProvider(type, trip.destination, item.title, trip.origin, (trip as any).startDate, trip.durationDays);

              return (
                <div
                  key={idx}
                  className={
                    variant === "full"
                      ? `flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-2xl border ${config.border} bg-white p-4 sm:p-5 transition-shadow hover:shadow-md`
                      : `flex flex-row items-start gap-3 rounded-xl border ${config.border} bg-white p-3 transition-shadow hover:shadow-md`
                  }
                >
                  {/* Always render SafeImage, it will auto-resolve Unsplash based on context */}
                  <div 
                    className={
                      variant === "full" 
                        ? "relative h-40 sm:h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-xl"
                        : "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"
                    }
                  >
                    <SafeImage
                      alt={item.title}
                      src={item.image}
                      fill
                      className="object-cover"
                      context={`${item.location || ""} ${item.type || ""} ${item.description || ""} ${trip.destination}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider ${
                            config.bg
                          } px-2 py-0.5 rounded text-slate-700 mb-1.5`}
                        >
                          {config.label}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      {price && (
                        <div className="flex flex-col items-end gap-1">
                          <span className="shrink-0 text-xs sm:text-sm font-extrabold text-slate-900 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                            {price}
                          </span>
                          {price !== "Free" && (
                            <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                              </span>
                              AI Estimate
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className={`text-slate-600 leading-relaxed mb-3 ${variant === "full" ? "text-xs sm:text-sm" : "text-xs line-clamp-2"}`}>
                        {item.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.time && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                          <Clock className="size-3.5 text-slate-400" /> {item.time}
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                          <MapPin className="size-3.5 text-slate-400" /> {item.location}
                        </span>
                      )}
                    </div>
                    {/* Affiliate Booking Button */}
                    {affiliate && (
                      <div className={`mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center ${variant === "full" ? "justify-end gap-3" : "justify-start"}`}>
                        <Button
                          size="sm"
                          onClick={() => {
                            trackAffiliateClick({
                              provider: affiliate.providerName,
                              category: type,
                              destination: trip.destination,
                              itemTitle: item.title,
                              linkType: affiliate.linkType
                            });
                            window.open(affiliate.url, "_blank", "noopener,noreferrer");
                          }}
                          className={`${variant === "full" ? "w-full sm:w-auto h-10 sm:h-9" : "w-full h-8 text-xs"} bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all`}
                        >
                          {affiliate.icon} {affiliate.ctaText}
                          <ExternalLink className="size-3.5 ml-0.5" />
                        </Button>
                      </div>
                    )}
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
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xl">⭐</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ── Deals / Best Options — Horizontal scroll ── */}
      {variant === "full" && trip.deals && trip.deals.length > 0 && (
        <div className="space-y-5 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Book instantly
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Top Provider Deals
              </h2>
            </div>
            <ChevronRight className="size-6 text-slate-300" />
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {trip.deals.map((deal) => {
              const Icon = dealIcons[deal.type];
              const affiliate = getAffiliateProvider(deal.type, deal.location || trip.destination, deal.title, trip.origin, (trip as any).startDate, trip.durationDays);


              return (
                <div
                  key={deal.title}
                  className="snap-start flex-none w-[300px] md:w-[340px] flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage
                      alt={deal.title}
                      src={deal.image}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      context={`${deal.location || ""} ${deal.type || ""} ${deal.description || ""} ${trip.destination}`}
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-bold uppercase text-white flex items-center gap-1.5 shadow-sm">
                      <Icon className="size-3.5" />
                      {deal.type}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {deal.description}
                    </p>
                    <div className="flex items-center justify-between mb-5 mt-auto">
                      <div className="flex flex-col gap-1">
                        {deal.rating !== undefined && (
                          <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
                            <Star className="size-4 fill-amber-400 text-amber-400" />
                            {deal.rating} / 5
                          </span>
                        )}
                        {deal.location && (
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                            <MapPin className="size-3" /> {deal.location}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Est. Total</span>
                        <strong className="text-xl font-black text-blue-600">
                          {formatCurrency(deal.price)}
                        </strong>
                        <span className="text-[10px] text-amber-600 font-semibold flex items-center justify-end gap-1 mt-0.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                          </span>
                          AI Estimate
                        </span>
                      </div>
                    </div>
                    {affiliate && (
                      <Button
                        onClick={() => {
                          trackAffiliateClick({
                            provider: affiliate.providerName,
                            category: deal.type,
                            destination: deal.location || trip.destination,
                            itemTitle: deal.title,
                            linkType: affiliate.linkType
                          });
                          window.open(affiliate.url, "_blank", "noopener,noreferrer");
                        }}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition-all"
                      >
                        {affiliate.ctaText}
                      </Button>
                    )}
                  </div>
                </div>

              );
            })}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              Travora may earn a commission when you book through these links, at no extra cost to you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
