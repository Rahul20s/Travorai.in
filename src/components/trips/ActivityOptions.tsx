"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Activity, Check, Scale, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { travelSearchService } from "@/lib/travel/search-service";
import type { ActivityOption } from "@/lib/travel/types";
import { formatCurrency } from "@/lib/utils";

export function ActivityOptions({ 
  destination,
  selectedActivities,
  onToggleActivity
}: { 
  destination?: string;
  selectedActivities?: ActivityOption[];
  onToggleActivity?: (activity: ActivityOption) => void;
}) {
  const [selectedToCompare, setSelectedToCompare] = useState<string[]>([]);
  const [activities, setActivities] = useState<ActivityOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await travelSearchService.searchActivities({
          destination: destination || "Goa",
          date: "2024-12-02",
          travellers: 2
        });
        setActivities(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [destination]);

  const toggleCompare = (id: string) => {
    setSelectedToCompare(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(-3)
    );
  };

  const selectedOptions = activities.filter(o => selectedToCompare.includes(o.id));

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Things to do in {destination || "Destination"}</h2>
          <p className="text-slate-500 font-medium mt-1">Discover and compare the best experiences.</p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-slate-500 font-medium animate-pulse">
          Finding activities...
        </div>
      )}

      {!loading && activities.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-medium">
          No activities found for these dates. Try another location.
        </div>
      )}

      {/* Comparison View */}
      {!loading && selectedOptions.length > 1 && (
        <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 relative overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Comparing {selectedOptions.length} Activities</h3>
          </div>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Activity</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Duration</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Rating</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Price</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedOptions.map(opt => (
                <tr key={opt.id} className="border-b border-blue-50 hover:bg-white transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">
                    {opt.name}
                    {opt.isMock && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">DEMO</span>}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">{opt.duration}</td>
                  <td className="py-4 px-4 font-medium text-slate-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {opt.rating}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-blue-600">{formatCurrency(opt.price)}</td>
                  <td className="py-4 px-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full" onClick={() => onToggleActivity?.(opt)}>
                      {selectedActivities?.find(a => a.id === opt.id) ? "Remove" : "Add"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Options List */}
      {!loading && activities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((opt) => {
            const isSelected = !!selectedActivities?.find(a => a.id === opt.id);
            
            return (
              <div key={opt.id} className={`bg-white rounded-2xl border ${isSelected ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : 'border-slate-200'} overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col`}>
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <SafeImage src={opt.image || ""} alt={opt.name} fill className="object-cover transition-transform duration-700 hover:scale-105" context={`${opt.name} ${opt.category} ${destination}`} />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1 shadow-sm">
                    <Activity className="w-3 h-3" /> {opt.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {opt.rating}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-tight">{opt.name}</h3>
                    {opt.isMock && <span className="text-[10px] text-amber-500 font-bold whitespace-nowrap ml-2 mt-1">DEMO</span>}
                  </div>

                  {opt.comparisonLabels && opt.comparisonLabels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {opt.comparisonLabels.map(label => (
                        <span key={label} className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          label === 'BEST PRICE' ? 'bg-green-100 text-green-700' : 
                          label === 'BEST VALUE' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    {opt.duration}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {opt.description && opt.description.split(", ").slice(0,3).map(inc => (
                      <span key={inc} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded uppercase tracking-wide">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div className="text-slate-500 text-xs font-medium">Per person</div>
                      <div className="font-extrabold text-2xl text-slate-900">{formatCurrency(opt.price)}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        className={`flex-1 font-bold rounded-xl transition-colors ${selectedToCompare.includes(opt.id) ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600"}`}
                        onClick={() => toggleCompare(opt.id)}
                      >
                        {selectedToCompare.includes(opt.id) ? (
                          <><Check className="w-4 h-4 mr-2" /> Added</>
                        ) : "Compare"}
                      </Button>
                      <Button 
                        className={`flex-1 font-bold rounded-xl ${isSelected ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                        onClick={() => onToggleActivity?.(opt)}
                      >
                        {isSelected ? "Added" : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
