"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, CircleDollarSign, Plus, Search, MoreVertical, Edit2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/lib/utils";

type TripData = {
  id: string;
  name: string;
  destination: string;
  status: string;
  budget: number | null;
  startDate: Date | null;
  createdAt: Date;
  plan: any;
};

export function TripsClient({ initialTrips }: { initialTrips: TripData[] }) {
  const router = useRouter();
  const [trips, setTrips] = useState<TripData[]>(initialTrips);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PLANNING" | "UPCOMING" | "COMPLETED">("ALL");

  const [renamingTripId, setRenamingTripId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = 
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "PLANNING" && trip.status === "PLANNING") return true;
    if (activeFilter === "COMPLETED" && trip.status === "COMPLETED") return true;
    if (activeFilter === "UPCOMING" && (trip.status === "BOOKED" || trip.status === "ACTIVE")) return true;

    return false;
  });

  const handleRename = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/trips/${id}/rename`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const { trip } = await res.json();
        setTrips(trips.map(t => t.id === id ? { ...t, name: trip.name } : t));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRenamingTripId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/trips/${id}/duplicate`, { method: "POST" });
      if (res.ok) {
        const { trip } = await res.json();
        setTrips([{ ...trip, startDate: trip.startDate ? new Date(trip.startDate) : null, createdAt: new Date(trip.createdAt) }, ...trips]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Trips</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your trips..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <Link href="/dashboard#plan-trip" className="w-full sm:w-auto">
            <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-md shadow-blue-500/20">
              <Plus className="w-4 h-4 mr-2" />
              Plan new trip
            </Button>
          </Link>
        </div>
      </header>

      <div className="px-8 py-6 flex overflow-x-auto scrollbar-none gap-2">
        {["ALL", "UPCOMING", "PLANNING", "COMPLETED"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? "bg-slate-900 text-white shadow-sm" 
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter === "ALL" ? "All Trips" : filter.charAt(0) + filter.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto w-full px-8 pt-2">
          {trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">No trips yet</h2>
              <p className="text-slate-500 font-medium mb-8 max-w-sm">
                Tell Travora where you want to go.
              </p>
              <Link href="/dashboard#plan-trip">
                <Button className="rounded-full px-8 h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white">
                  Plan your first trip
                </Button>
              </Link>
            </div>
          ) : filteredTrips.length === 0 ? (
             <div className="py-20 text-center">
              <p className="text-slate-500 font-medium">No trips match your filters.</p>
             </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTrips.map((trip) => {
                const planData = trip.plan as Record<string, unknown> | null;
                const durationDays = planData?.plan
                  ? ((planData.plan as Record<string, unknown>)?.durationDays as number)
                  : null;

                const isRenaming = renamingTripId === trip.id;

                return (
                  <div
                    key={trip.id}
                    className="group bg-white rounded-[24px] overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col relative"
                  >
                    <Link href={`/dashboard/trips/${trip.id}`} className="absolute inset-0 z-0" />
                    
                    <div className="relative h-48 overflow-hidden shrink-0 z-0">
                      <SafeImage
                        src=""
                        context={`${trip.destination} beautiful landmark`}
                        alt={trip.destination}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                      
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm ${
                            trip.status === "PLANNING"
                              ? "bg-white text-slate-900"
                              : trip.status === "BOOKED" || trip.status === "ACTIVE"
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-800 text-white"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                          <MapPin className="w-3 h-3" />
                          {trip.destination}
                        </div>
                        {isRenaming ? (
                          <div className="relative z-20">
                            <input 
                              type="text" 
                              value={newName} 
                              onChange={e => setNewName(e.target.value)} 
                              onBlur={() => handleRename(trip.id, newName)}
                              onKeyDown={e => e.key === "Enter" && handleRename(trip.id, newName)}
                              autoFocus
                              className="w-full bg-white/20 backdrop-blur-md text-white font-extrabold text-xl px-2 py-1 rounded outline-none border border-white/30"
                            />
                          </div>
                        ) : (
                          <h3 className="text-white font-extrabold text-xl leading-tight line-clamp-1 pr-8">
                            {trip.name}
                          </h3>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Menu overlay - must be above Link */}
                    <div className="absolute top-[165px] right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-1 flex gap-1">
                        <button 
                          onClick={(e) => { e.preventDefault(); setRenamingTripId(trip.id); setNewName(trip.name); }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Rename"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); handleDuplicate(trip.id); }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col pointer-events-none z-10">
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                        {durationDays && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                            {durationDays} days
                          </div>
                        )}
                        {trip.budget && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <CircleDollarSign className="w-3.5 h-3.5 text-slate-400" />
                            {formatCurrency(trip.budget)}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          Created {new Date(trip.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </p>
                        <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                          View Trip &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
