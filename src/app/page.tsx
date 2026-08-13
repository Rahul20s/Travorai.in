import React from "react";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { CategorySelector } from "@/components/landing/CategorySelector";
import { TrendingDestinations } from "@/components/landing/TrendingDestinations";
import { VibeExplorer } from "@/components/landing/VibeExplorer";
import { IndiaDestinations } from "@/components/landing/IndiaDestinations";
import { InternationalDestinations } from "@/components/landing/InternationalDestinations";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { EditorialInspiration } from "@/components/landing/EditorialInspiration";
import { AIDifferentiator } from "@/components/landing/AIDifferentiator";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Premium Sticky Navigation */}
      <Navigation />

      {/* Hero Section & conversational input */}
      <Hero />

      {/* Categories Selector */}
      <CategorySelector />

      {/* Trending Destinations */}
      <TrendingDestinations />

      {/* Popular India Discovery */}
      <IndiaDestinations />

      {/* International Escapes */}
      <InternationalDestinations />

      {/* Filter by Vibe */}
      <VibeExplorer />

      {/* AI Differentiator Section */}
      <AIDifferentiator />

      {/* How it Works Journey */}
      <HowItWorks />

      {/* Editorial Guides & Inspiration */}
      <EditorialInspiration />

      {/* Final Call to Action */}
      <FinalCTA />

      {/* Premium Multi-Column Footer */}
      <LandingFooter />
    </main>
  );
}
