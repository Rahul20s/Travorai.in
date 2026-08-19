"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar, CircleDollarSign } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

interface DestinationCardProps {
  name: string;
  country: string;
  meta: string;
  imageContext: string;
  duration?: string;
  budget?: string;
  featured?: boolean;
}

export function DestinationCard({
  name,
  country,
  meta,
  imageContext,
  duration,
  budget,
  featured = false,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${name.toLowerCase()}`}
      className={`group relative block overflow-hidden rounded-3xl bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-500 ${
        featured ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/5]"
      }`}
    >
      {/* Background Image */}
      <SafeImage
        src=""
        context={imageContext}
        alt={`${name}, ${country}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        wrapperClassName="absolute inset-0 w-full h-full"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-all duration-300 group-hover:from-slate-950/95" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
        <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {country}
        </div>

        <h3 className={`font-display font-extrabold leading-tight tracking-tight mb-2 ${
          featured ? "text-3xl md:text-4xl" : "text-2xl"
        }`}>
          {name}
        </h3>

        <p className="text-sm font-medium text-slate-200/90 leading-relaxed mb-4 line-clamp-2">
          {meta}
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 text-[11px] font-bold tracking-wide text-white">
          <span className="flex items-center gap-1.5 bg-blue-600/80 backdrop-blur-md rounded-lg px-3 py-1.5 border border-blue-500/50 text-white">
            Sample Plan
          </span>
          {duration && (
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              {duration}
            </span>
          )}
          {budget && (
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5">
              <CircleDollarSign className="w-3.5 h-3.5 text-slate-300" />
              From {budget}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
export default DestinationCard;
