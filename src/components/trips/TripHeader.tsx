"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, CalendarDays, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TripPlan } from "@/types/trip";
import { SafeImage } from "@/components/ui/SafeImage";

export function TripHeader({ trip, rawTrip }: { trip: TripPlan, rawTrip: any }) {
  return (
    <div className="relative w-full bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle background image on the right side */}
      <div className="absolute inset-y-0 right-0 w-1/3 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <SafeImage 
          src="" 
          alt={trip.destination} 
          context={trip.destination}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="relative z-10 px-6 py-6 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/trips" className="inline-flex">
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 -ml-3 mb-1 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to trips
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {rawTrip.name}
            </h1>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
              {rawTrip.status || "PLANNING"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {trip.destination}
            </div>
            {trip.durationDays && (
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                {trip.durationDays} Days
              </div>
            )}
            {trip.bestMonth && (
              <div className="flex items-center gap-1.5 text-slate-500">
                Best in {trip.bestMonth}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 items-center shrink-0">
          <Button variant="outline" size="sm" className="font-bold text-slate-600 border-slate-200 hover:bg-slate-50 rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="icon" className="text-slate-600 border-slate-200 hover:bg-slate-50 rounded-xl">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
