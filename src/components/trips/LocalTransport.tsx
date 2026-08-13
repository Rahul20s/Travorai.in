"use client";

import { useState, useEffect } from "react";
import { Car, Check, Scale, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { travelSearchService } from "@/lib/travel/search-service";
import type { TransportOption } from "@/lib/travel/types";
import { formatCurrency } from "@/lib/utils";

export function LocalTransport({ 
  destination,
  selectedTransport,
  onSelectTransport
}: { 
  destination?: string;
  selectedTransport?: TransportOption | null;
  onSelectTransport?: (transport: TransportOption | null) => void;
}) {
  const [selectedToCompare, setSelectedToCompare] = useState<string[]>([]);
  const [transports, setTransports] = useState<TransportOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await travelSearchService.searchTransport({
          pickup: "Airport",
          drop: destination || "Goa",
          date: "2024-12-01",
          travellers: 2
        });
        setTransports(res);
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

  const selectedOptions = transports.filter(o => selectedToCompare.includes(o.id));

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Getting around in {destination || "Destination"}</h2>
          <p className="text-slate-500 font-medium mt-1">Cabs, rentals, and local transit.</p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-slate-500 font-medium animate-pulse">
          Finding local transport...
        </div>
      )}

      {!loading && transports.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-medium">
          No transport found for these dates.
        </div>
      )}

      {/* Comparison View */}
      {!loading && selectedOptions.length > 1 && (
        <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 relative overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Comparing {selectedOptions.length} Options</h3>
          </div>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Provider</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Vehicle</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Details</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Price</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedOptions.map(opt => (
                <tr key={opt.id} className="border-b border-blue-50 hover:bg-white transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">
                    {opt.provider}
                    {opt.isMock && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">DEMO</span>}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">{opt.vehicleType}</td>
                  <td className="py-4 px-4 font-medium text-slate-600">{opt.pickup} &rarr; {opt.drop}</td>
                  <td className="py-4 px-4 font-extrabold text-blue-600">{formatCurrency(opt.price)}</td>
                  <td className="py-4 px-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full" onClick={() => onSelectTransport?.(opt)}>Select</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Options List */}
      {!loading && transports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transports.map((opt) => {
            const isSelected = selectedTransport?.id === opt.id;
            
            return (
              <div key={opt.id} className={`bg-white rounded-2xl border ${isSelected ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : 'border-slate-200'} overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col p-6`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 w-max">
                      <Car className="w-3.5 h-3.5" /> {opt.vehicleType}
                    </span>
                    {opt.comparisonLabels && opt.comparisonLabels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
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
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-lg text-slate-900">{formatCurrency(opt.price)}</span>
                    {opt.isMock && <span className="text-[10px] text-amber-500 font-bold mt-1">DEMO</span>}
                  </div>
                </div>
                
                <h3 className="font-extrabold text-xl text-slate-900 mb-1">{opt.provider}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-6">Capacity: {opt.capacity}</p>

                <div className="flex flex-col gap-2 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Pickup: {opt.pickup}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Drop: {opt.drop}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
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
                    onClick={() => onSelectTransport?.(opt)}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
