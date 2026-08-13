"use client";

import { useState, useEffect } from "react";
import { Plane, TrainFront, Check, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { travelSearchService } from "@/lib/travel/search-service";
import type { FlightOption, TrainOption, BaseTravelOption } from "@/lib/travel/types";
import { formatCurrency } from "@/lib/utils";

export function TravelOptions({ 
  destination,
  selectedFlight,
  onSelectFlight
}: { 
  destination?: string;
  selectedFlight?: FlightOption | null;
  onSelectFlight?: (flight: FlightOption | null) => void;
}) {
  const [selectedToCompare, setSelectedToCompare] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"Flights" | "Trains">("Flights");
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [trains, setTrains] = useState<TrainOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (activeTab === "Flights" && flights.length === 0) {
          const res = await travelSearchService.searchFlights({
            origin: "Mumbai", // Hardcoded origin for phase 3 demo
            destination: destination || "Goa",
            departureDate: "2024-12-01",
            travellers: 2
          });
          setFlights(res);
        } else if (activeTab === "Trains" && trains.length === 0) {
          const res = await travelSearchService.searchTrains({
            origin: "Mumbai",
            destination: destination || "Goa",
            date: "2024-12-01",
            travellers: 2
          });
          setTrains(res);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeTab, destination, flights.length, trains.length]);

  const options = activeTab === "Flights" ? flights : trains;

  const toggleCompare = (id: string) => {
    setSelectedToCompare(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(-3)
    );
  };

  const selectedOptions = options.filter(o => selectedToCompare.includes(o.id));

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Travel to {destination || "Destination"}</h2>
          <p className="text-slate-500 font-medium mt-1">Select flights or trains for your journey.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button 
            onClick={() => {setActiveTab("Flights"); setSelectedToCompare([]);}}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "Flights" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Plane className="w-4 h-4" /> Flights
          </button>
          <button 
            onClick={() => {setActiveTab("Trains"); setSelectedToCompare([]);}}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "Trains" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <TrainFront className="w-4 h-4" /> Trains
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-slate-500 font-medium animate-pulse">
          Searching {activeTab.toLowerCase()}...
        </div>
      )}

      {!loading && options.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-medium">
          No {activeTab.toLowerCase()} found for these dates. Try another airport or date.
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
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Time</th>
                <th className="py-3 px-4 font-bold text-slate-500 text-sm">Duration</th>
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
                  <td className="py-4 px-4 font-medium text-slate-600">
                    {(opt as FlightOption).departureTime || (opt as TrainOption).departureTime} &rarr; {(opt as FlightOption).arrivalTime || (opt as TrainOption).arrivalTime}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">{(opt as FlightOption).duration || (opt as TrainOption).duration}</td>
                  <td className="py-4 px-4 font-extrabold text-blue-600">{formatCurrency(opt.price)}</td>
                  <td className="py-4 px-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full" onClick={() => onSelectFlight?.(opt as FlightOption)}>Select</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Options List */}
      {!loading && options.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((opt) => {
            const isSelected = selectedFlight?.id === opt.id;
            
            return (
              <div key={opt.id} className={`bg-white rounded-2xl border ${isSelected ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : 'border-slate-200'} overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col`}>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className="bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {opt.provider}
                      </span>
                      {opt.comparisonLabels && opt.comparisonLabels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opt.comparisonLabels.map(label => (
                            <span key={label} className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                              label === 'BEST PRICE' ? 'bg-green-100 text-green-700' : 
                              label === 'FASTEST' ? 'bg-purple-100 text-purple-700' :
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
                      {opt.isMock && <span className="text-[10px] text-amber-500 font-bold">DEMO DATA</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="text-center">
                      <p className="font-extrabold text-2xl text-slate-900">{(opt as FlightOption).departureTime || (opt as TrainOption).departureTime}</p>
                      <p className="text-xs font-bold text-slate-400">{(opt as FlightOption).origin || (opt as TrainOption).origin}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4 relative">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{(opt as FlightOption).duration || (opt as TrainOption).duration}</span>
                      <div className="w-full border-t-2 border-dashed border-slate-200 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-slate-300">
                          {activeTab === "Flights" ? <Plane className="w-4 h-4" /> : <TrainFront className="w-4 h-4" />}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">
                        {activeTab === "Flights" ? ((opt as FlightOption).stops === 0 ? "Non-stop" : `${(opt as FlightOption).stops} Stop`) : "Direct"}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-extrabold text-2xl text-slate-900">{(opt as FlightOption).arrivalTime || (opt as TrainOption).arrivalTime}</p>
                      <p className="text-xs font-bold text-slate-400">{(opt as FlightOption).destination || (opt as TrainOption).destination}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeTab === "Flights" && <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded">{(opt as FlightOption).baggage}</span>}
                    <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {activeTab === "Flights" ? ((opt as FlightOption).refundable ? "Refundable" : "Non-refundable") : "Refundable"}
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
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
                      onClick={() => onSelectFlight?.(opt as FlightOption)}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </Button>
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
