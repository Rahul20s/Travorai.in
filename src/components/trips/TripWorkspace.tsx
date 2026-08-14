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

  const [showMobileMap, setShowMobileMap] = useState(false);

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
      <div className="flex flex-col min-h-screen bg-slate-50 w-full pb-24 relative">
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
    <div className="flex flex-col min-h-screen bg-slate-50 w-full relative pb-10">
      <TripHeader trip={trip} rawTrip={rawTrip} />
      
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 md:px-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex-1 overflow-x-auto scrollbar-hide py-1">
            {viewMode === "dashboard" ? (
              <TripNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
              <div className="flex items-center h-[52px] text-sm font-bold text-slate-800 uppercase tracking-wide">
                AI Planner Workspace
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 py-2 pl-3 md:pl-4 shrink-0 border-l border-slate-200 ml-2 md:ml-4">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`p-2.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-600 ${viewMode === "dashboard" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <LayoutDashboard className="w-4 h-4 md:w-4 md:h-4" /> <span className="hidden md:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setViewMode("planner")}
              className={`p-2.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-600 ${viewMode === "planner" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Map className="w-4 h-4 md:w-4 md:h-4" /> <span className="hidden md:inline">AI Planner</span>
            </button>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 font-medium text-sm animate-in slide-in-from-bottom-4">
          {errorMsg}
        </div>
      )}

      {viewMode === "dashboard" ? (
        <>
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
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
        <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row relative">
          
          {/* Mobile Map Toggle Button (Sticky under header) */}
          <div className="md:hidden sticky top-[69px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 p-3 flex justify-center shadow-sm">
            <button 
              onClick={() => setShowMobileMap(!showMobileMap)}
              className="w-full max-w-xs h-11 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            >
              <Map className="w-4 h-4" />
              {showMobileMap ? "View Itinerary & Chat" : "View Map"}
            </button>
          </div>

          {/* Column 1: AI Assistant */}
          <div className={`w-full md:w-[320px] lg:w-[380px] shrink-0 border-r border-slate-200 bg-white relative ${showMobileMap ? 'hidden md:block' : 'block'}`}>
            <div className="md:sticky md:top-[69px] md:h-[calc(100vh-69px)] flex flex-col bg-white">
              <TripAssistant trip={trip} viewMode={viewMode} />
            </div>
          </div>
          
          {/* Column 2: Itinerary Manager */}
          <div className={`w-full flex-1 p-4 md:p-6 lg:p-8 min-w-0 bg-slate-50 ${showMobileMap ? 'hidden md:block' : 'block'}`}>
            <div className="mb-6 flex items-center justify-between">
               <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Itinerary</h2>
            </div>
            <TripItinerary trip={trip} />
          </div>
          
          {/* Column 3: Interactive Map */}
          <div className={`w-full md:w-[350px] lg:w-[450px] shrink-0 border-l border-slate-200 bg-slate-100 ${showMobileMap ? 'block min-h-[60vh]' : 'hidden md:block'}`}>
            <div className="md:sticky md:top-[69px] md:h-[calc(100vh-69px)] w-full h-full min-h-[500px]">
              <TripMap trip={trip} />
            </div>
          </div>

        </main>
      )}
    </div>
  );
}
