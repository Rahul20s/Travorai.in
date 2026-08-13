"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { UtensilsCrossed, Check, Scale, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_FOOD, type MockFoodOption } from "@/data/mockOptions";

export function FoodOptions({ destination }: { destination?: string }) {
  const [selectedToCompare, setSelectedToCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setSelectedToCompare(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(-3)
    );
  };

  const selectedOptions = MOCK_FOOD.filter(o => selectedToCompare.includes(o.id));

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dining in {destination || "Destination"}</h2>
          <p className="text-slate-500 font-medium mt-1">Local favorites and highly rated restaurants.</p>
        </div>
      </div>

      {/* Comparison View */}
      {selectedOptions.length > 1 && (
        <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 relative overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Comparing {selectedOptions.length} Places</h3>
          </div>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Restaurant</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Cuisine</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Rating</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Est. Price</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedOptions.map(opt => (
                <tr key={opt.id} className="border-b border-blue-50 hover:bg-white transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">{opt.name}</td>
                  <td className="py-4 px-4 font-medium text-slate-600">{opt.cuisine}</td>
                  <td className="py-4 px-4 font-medium text-slate-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {opt.rating}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-slate-600">{opt.priceEstimate}</td>
                  <td className="py-4 px-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full">Save</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Options List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_FOOD.map((opt) => (
          <div key={opt.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col">
            <div className="relative h-48 w-full overflow-hidden shrink-0">
              <SafeImage src={opt.image} alt={opt.name} fill className="object-cover transition-transform duration-700 hover:scale-105" context={`${opt.name} ${opt.type} ${destination}`} />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1 shadow-sm">
                <UtensilsCrossed className="w-3 h-3" /> {opt.type}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {opt.rating}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-extrabold text-lg text-slate-900 leading-tight">{opt.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 mb-4 bg-blue-50 px-2 py-1 rounded w-max">
                {opt.cuisine}
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Must Try</p>
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {opt.mustTry}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-end justify-between mb-4">
                  <div className="text-slate-500 text-xs font-medium">Estimate</div>
                  <div className="font-bold text-lg text-slate-900">{opt.priceEstimate}</div>
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
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
