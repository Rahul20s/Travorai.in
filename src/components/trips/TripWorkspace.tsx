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
  | "Map"
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
            <TripNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 font-medium text-sm animate-in slide-in-from-bottom-4">
          {errorMsg}
        </div>
      )}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {activeTab === "Overview" && <TripOverview trip={trip} setActiveTab={setActiveTab} />}
        {activeTab === "Itinerary" && <TripItinerary trip={trip} />}
        {activeTab === "Map" && (
          <div className="w-full h-[70vh] min-h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
            <TripMap trip={trip} />
          </div>
        )}
        {activeTab === "Budget" && <TripBudget trip={trip} budgetState={budgetState} />}
        {activeTab === "Travel" && <TravelOptions destination={trip.destination} selectedFlight={selectedFlight} onSelectFlight={handleSelectFlight} />}
        {activeTab === "Stay" && <StayOptions destination={trip.destination} budget={trip.budget} selectedHotel={selectedHotel} onSelectHotel={handleSelectHotel} />}
        {activeTab === "Activities" && <ActivityOptions destination={trip.destination} selectedActivities={selectedActivities} onToggleActivity={handleToggleActivity} />}
        {activeTab === "Food" && <FoodOptions destination={trip.destination} />}
        {activeTab === "Local Transport" && <LocalTransport destination={trip.destination} selectedTransport={selectedTransport} onSelectTransport={handleSelectTransport} />}
        {activeTab === "Bookings" && <BookingCenter selectedFlight={selectedFlight} selectedHotel={selectedHotel} selectedActivities={selectedActivities} selectedTransport={selectedTransport} />}
        {activeTab === "Expenses" && <ExpenseTracker budget={trip.budget || 0} selectedFlight={selectedFlight} selectedHotel={selectedHotel} selectedActivities={selectedActivities} selectedTransport={selectedTransport} />}
      </main>
      <TripAssistant trip={trip} viewMode="dashboard" />
    </div>
  );
}
