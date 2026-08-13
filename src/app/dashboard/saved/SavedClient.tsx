"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/SafeImage";

type SavedItemData = {
  id: string;
  title: string | null;
  type: string | null;
  location: string | null;
  description: string | null;
  savedAt: Date;
};

export function SavedClient({ initialItems }: { initialItems: SavedItemData[] }) {
  const [items, setItems] = useState<SavedItemData[]>(initialItems);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "DESTINATION" | "HOTEL" | "ACTIVITY">("ALL");

  const filteredItems = items.filter(item => {
    if (activeFilter === "ALL") return true;
    return item.type === activeFilter;
  });

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch(`/api/saved/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Places</h1>
      </header>

      <div className="px-8 py-6 flex overflow-x-auto scrollbar-none gap-2">
        {["ALL", "DESTINATION", "HOTEL", "ACTIVITY"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? "bg-slate-900 text-white shadow-sm" 
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter === "ALL" ? "All Items" : filter.charAt(0) + filter.slice(1).toLowerCase() + "s"}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto w-full px-8 pt-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">No saved places yet</h2>
              <p className="text-slate-500 font-medium mb-8 max-w-sm">
                Save destinations and places you want to explore.
              </p>
              <Link href="/dashboard/explore">
                <Button className="rounded-full px-8 h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  Explore destinations
                </Button>
              </Link>
            </div>
          ) : filteredItems.length === 0 ? (
             <div className="py-20 text-center">
              <p className="text-slate-500 font-medium">No saved items match your filter.</p>
             </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col relative"
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <SafeImage
                      src=""
                      context={`${item.title} ${item.location || ""}`}
                      alt={item.title || "Saved Place"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                    
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-rose-500 backdrop-blur-md rounded-full text-white transition-colors z-20"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      )}
                      <h3 className="text-white font-extrabold text-xl leading-tight line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm font-semibold text-slate-500 mb-4 line-clamp-2">
                      {item.description || "No description provided."}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Saved {new Date(item.savedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
