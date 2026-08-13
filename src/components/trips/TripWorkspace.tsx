"use client";

import { useState, useEffect } from "react";
import type { TripPlan } from "@/types/trip";
import { TripHeader } from "./TripHeader";
import { TripNavigation } from "./TripNavigation";
import { TripOverview } from "./TripOverview";
import { TripItinerary } from "./TripItinerary";
import { TripBudget } from "./TripBudget";
import { TravelOptions } from "./TravelOptions";
import { StayOptions } from "./StayOptions";
import { ActivityOptions } from "./ActivityOptions";
import { FoodOptions } from "./FoodOptions";
import { LocalTransport } from "./LocalTransport";
import { BookingCenter } from "./BookingCenter";
import { ExpenseTracker } from "./ExpenseTracker";
import { TripAssistant } from "./TripAssistant";
import { TripMap } from "./TripMap";
import { Map, LayoutDashboard } from "lucide-react";
import type { FlightOption, HotelOption, ActivityOption, TransportOption } from "@/lib/travel/types";
import { BudgetEngine } from "@/lib/travel/budget-engine";

export type TabType = 
  | "Overview"
  | "Itinerary"
  | "Travel"
  | "Stay"
  | "Activities"
  | "Food"
  | "Local Transport"
  | "Budget"
  | "Bookings"
  | "Expenses";

export function TripWorkspace({ trip, rawTrip }: { trip: TripPlan, rawTrip: any }) {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [viewMode, setViewMode] = useState<"dashboard" | "planner">("planner");
  const [isLoadingSelections, setIsLoadingSelections] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Selection State
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelOption | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<ActivityOption[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);

  useEffect(() => {
    async function loadSelections() {
      try {
        const res = await fetch(`/api/trips/${rawTrip.id}/selections`);
        if (res.ok) {
          const data = await res.json();
          if (data.selections) {
            setSelectedFlight(data.selections.flight || null);
            setSelectedHotel(data.selections.hotel || null);
            setSelectedActivities(data.selections.activities || []);
            setSelectedTransport(data.selections.transport || null);
          }
        }
      } catch (err) {
        console.error("Failed to load selections", err);
      } finally {
        setIsLoadingSelections(false);
      }
    }
    loadSelections();
  }, [rawTrip.id]);

  const saveSelection = async (type: string, option: any | null, isDelete = false) => {
    if (isDelete) {
      const url = type === "activity" 
        ? `/api/trips/${rawTrip.id}/selections/${type}?providerOptionId=${option.id}`
        : `/api/trips/${rawTrip.id}/selections/${type}`;
      
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      return;
    }

    const payload = {
      provider: option.provider || "MockProvider", 
      providerOptionId: option.id,
      price: option.price,
      currency: option.currency || "INR",
      parsedData: option
    };

    const res = await fetch(`/api/trips/${rawTrip.id}/selections/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const handleSelectFlight = async (flight: FlightOption | null) => {
    const prev = selectedFlight;
    setSelectedFlight(flight);
    setErrorMsg("");
    try {
      if (flight) {
        await saveSelection("flight", flight);
      } else if (prev) {
        await saveSelection("flight", prev, true);
      }
    } catch (err) {
      setSelectedFlight(prev);
      setErrorMsg("Couldn't save your selection. Please try again.");
    }
  };

  const handleSelectHotel = async (hotel: HotelOption | null) => {
    const prev = selectedHotel;
    setSelectedHotel(hotel);
    setErrorMsg("");
    try {
      if (hotel) {
        await saveSelection("hotel", hotel);
      } else if (prev) {
        await saveSelection("hotel", prev, true);
      }
    } catch (err) {
      setSelectedHotel(prev);
      setErrorMsg("Couldn't save your selection. Please try again.");
    }
  };

  const handleToggleActivity = async (activity: ActivityOption) => {
    const isSelected = selectedActivities.find(a => a.id === activity.id);
    const prev = [...selectedActivities];
    
    if (isSelected) {
      setSelectedActivities(prev.filter(a => a.id !== activity.id));
    } else {
      setSelectedActivities([...prev, activity]);
    }
    
    setErrorMsg("");
    try {
      if (isSelected) {
        await saveSelection("activity", activity, true);
      } else {
        await saveSelection("activity", activity);
      }
    } catch (err) {
      setSelectedActivities(prev);
      setErrorMsg("Couldn't save your selection. Please try again.");
    }
  };

  const handleSelectTransport = async (transport: TransportOption | null) => {
    const prev = selectedTransport;
    setSelectedTransport(transport);
    setErrorMsg("");
    try {
      if (transport) {
        await saveSelection("transport", transport);
      } else if (prev) {
        await saveSelection("transport", prev, true);
      }
    } catch (err) {
      setSelectedTransport(prev);
      setErrorMsg("Couldn't save your selection. Please try again.");
    }
  };

  const budgetState = BudgetEngine.calculate(trip.budget || 0, {
    transportPrice: selectedFlight?.price,
    accommodationPrice: selectedHotel?.price,
    activitiesPrice: selectedActivities.reduce((sum, a) => sum + (a.price || 0), 0),
    localTransportPrice: selectedTransport?.price,
  });

  if (isLoadingSelections) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full pb-24 relative">
        <TripHeader trip={trip} rawTrip={rawTrip} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-slate-400 font-semibold flex items-center gap-2">
             Loading trip selections...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${viewMode === "dashboard" ? "min-h-screen pb-24" : "h-screen overflow-hidden"} bg-[#F8FAFC] w-full relative`}>
      <TripHeader trip={trip} rawTrip={rawTrip} />
      
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 overflow-x-auto hide-scrollbar">
            {viewMode === "dashboard" ? (
              <TripNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
              <div className="flex items-center h-[52px] text-sm font-bold text-slate-800">
                AI Planner Workspace
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 py-2 pl-4 shrink-0 border-l border-slate-200 ml-4">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`p-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors ${viewMode === "dashboard" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <LayoutDashboard className="w-4 h-4" /> <span className="hidden md:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setViewMode("planner")}
              className={`p-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors ${viewMode === "planner" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Map className="w-4 h-4" /> <span className="hidden md:inline">AI Planner</span>
            </button>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 font-medium text-sm">
          {errorMsg}
        </div>
      )}

      {viewMode === "dashboard" ? (
        <>
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
            {activeTab === "Overview" && <TripOverview trip={trip} setActiveTab={setActiveTab} />}
            {activeTab === "Itinerary" && <TripItinerary trip={trip} />}
            {activeTab === "Budget" && <TripBudget trip={trip} budgetState={budgetState} />}
            {activeTab === "Travel" && <TravelOptions destination={trip.destination} selectedFlight={selectedFlight} onSelectFlight={handleSelectFlight} />}
            {activeTab === "Stay" && <StayOptions destination={trip.destination} budget={trip.budget} selectedHotel={selectedHotel} onSelectHotel={handleSelectHotel} />}
            {activeTab === "Activities" && <ActivityOptions destination={trip.destination} selectedActivities={selectedActivities} onToggleActivity={handleToggleActivity} />}
            {activeTab === "Food" && <FoodOptions destination={trip.destination} />}
            {activeTab === "Local Transport" && <LocalTransport destination={trip.destination} selectedTransport={selectedTransport} onSelectTransport={handleSelectTransport} />}
            {activeTab === "Bookings" && <BookingCenter selectedFlight={selectedFlight} selectedHotel={selectedHotel} selectedActivities={selectedActivities} selectedTransport={selectedTransport} />}
            {activeTab === "Expenses" && <ExpenseTracker budget={trip.budget || 0} selectedFlight={selectedFlight} selectedHotel={selectedHotel} selectedActivities={selectedActivities} selectedTransport={selectedTransport} />}
          </main>
          <TripAssistant trip={trip} viewMode={viewMode} />
        </>
      ) : (
        <main className="flex-1 w-full h-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
          {/* Column 1: AI Assistant (30%) */}
          <div className="w-full md:w-[30%] lg:w-[350px] shrink-0 border-r border-slate-200 bg-white flex flex-col z-20">
            <TripAssistant trip={trip} viewMode={viewMode} />
          </div>
          
          {/* Column 2: Itinerary Manager (35%) */}
          <div className="w-full md:w-[35%] flex-1 border-r border-slate-200 bg-[#F8FAFC] overflow-y-auto p-4 custom-scrollbar">
            <div className="mb-4 flex items-center justify-between sticky top-0 z-10 bg-[#F8FAFC]/90 backdrop-blur pb-2">
               <h2 className="text-lg font-extrabold text-slate-900">Itinerary Manager</h2>
            </div>
            <TripItinerary trip={trip} />
          </div>
          
          {/* Column 3: Interactive Map (35%) */}
          <div className="w-full md:w-[35%] flex-1 p-4 bg-slate-50">
            <TripMap trip={trip} />
          </div>
        </main>
      )}
    </div>
  );
}
