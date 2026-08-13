"use client";

import { type TabType } from "./TripWorkspace";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Plane, 
  Hotel, 
  Activity, 
  UtensilsCrossed, 
  Car, 
  Wallet, 
  CreditCard,
  Receipt
} from "lucide-react";

export function TripNavigation({ 
  activeTab, 
  setActiveTab 
}: { 
  activeTab: TabType, 
  setActiveTab: (t: TabType) => void 
}) {
  const tabs: { id: TabType; icon: React.ReactNode }[] = [
    { id: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "Itinerary", icon: <MapIcon className="w-4 h-4" /> },
    { id: "Budget", icon: <Wallet className="w-4 h-4" /> },
    { id: "Travel", icon: <Plane className="w-4 h-4" /> },
    { id: "Stay", icon: <Hotel className="w-4 h-4" /> },
    { id: "Activities", icon: <Activity className="w-4 h-4" /> },
    { id: "Food", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: "Local Transport", icon: <Car className="w-4 h-4" /> },
    { id: "Bookings", icon: <Receipt className="w-4 h-4" /> },
    { id: "Expenses", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full overflow-x-auto border-b border-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-1 min-w-max pb-0 pt-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-xl transition-all border-b-2 ${
                isActive 
                  ? "text-blue-600 border-blue-600 bg-blue-50/50" 
                  : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
