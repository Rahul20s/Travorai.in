"use client";

import React, { useRef } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

export function TrendingDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Grab top 8 destinations
  const trending = destinations.slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Trending Destinations
            </h2>
            <p className="text-base text-slate-500 font-medium">
              Most searched by Travora users this week.
            </p>
          </div>
          
          {/* TripAdvisor Style Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scroll('left')} 
              className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
               <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 md:-mx-8 md:px-8 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide Webkit Scrollbar via inline CSS injection just for this block */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />
          
          {trending.map((dest, index) => (
            <div key={dest.name} className="relative w-[280px] md:w-[320px] shrink-0 snap-start">
              
              {/* Fake TripAdvisor "Award" badge for top 3 */}
              {index < 3 && (
                <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-yellow-300">
                  <Award className="w-3.5 h-3.5" />
                  Top Pick 2026
                </div>
              )}
              
              <DestinationCard
                name={dest.name}
                country={dest.country}
                meta={dest.quickInfo.bestTime.split(' ')[0]}
                imageContext={dest.heroImageContext}
                duration={dest.quickInfo.idealDuration.split(' ')[0] + " Days"}
                budget={dest.quickInfo.approxBudget.split(' ')[0]}
                featured={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingDestinations;
