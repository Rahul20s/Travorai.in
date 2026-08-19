import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { destinations } from "@/data/destinations";
import { SafeImage } from "@/components/ui/SafeImage";
import { MapPin, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/Navigation";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Travel Destinations & AI Guides | Travora",
  description: "Explore our collection of AI-generated travel guides, budget breakdowns, and itineraries for the world's most popular destinations.",
};

export default function DestinationsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-24 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Explore Destinations
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover the perfect destination for your next trip. View budget guides, top things to do, and use our AI to build a customized itinerary instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                  <SafeImage
                    src=""
                    context={dest.heroImageContext}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">{dest.name}</h2>
                      <div className="flex items-center gap-1 text-slate-200 text-sm mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{dest.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                    {dest.metaDescription}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between text-blue-600 font-bold text-sm">
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <LandingFooter />
    </main>
  );
}
