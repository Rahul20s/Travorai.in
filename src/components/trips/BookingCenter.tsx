"use client";

import { Receipt, AlertTriangle, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlightOption, HotelOption, ActivityOption, TransportOption } from "@/lib/travel/types";
import { formatCurrency } from "@/lib/utils";

export function BookingCenter({
  selectedFlight,
  selectedHotel,
  selectedActivities,
  selectedTransport
}: {
  selectedFlight?: FlightOption | null;
  selectedHotel?: HotelOption | null;
  selectedActivities?: ActivityOption[];
  selectedTransport?: TransportOption | null;
}) {
  const hasSelections = selectedFlight || selectedHotel || (selectedActivities && selectedActivities.length > 0) || selectedTransport;

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Booking Center</h2>
          <p className="text-slate-500 font-medium mt-1">Manage all your travel reservations in one place.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-900 text-sm">Provider Deep-Link Abstraction</h4>
          <p className="text-sm text-amber-700 mt-1">
            This is a UI prototype representing Travora's booking phase. Live supplier booking/deep-linking integration will occur here when API keys are attached.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Saved Options for Booking</h3>
        
        {!hasSelections && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 font-medium">
            No options selected yet. Go back and select your preferred travel, stay, and activities.
          </div>
        )}

        {/* Flight Card */}
        {selectedFlight && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    {selectedFlight.isMock ? "Demo Option" : "Live Quote"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Flight</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">{selectedFlight.provider} · {selectedFlight.origin} &rarr; {selectedFlight.destination}</h4>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Departing at {selectedFlight.departureTime} · {formatCurrency(selectedFlight.price)}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end w-full md:w-auto gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Ready for checkout
              </div>
              <Button asChild className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                <a href={selectedFlight.deepLink || "#"} target="_blank" rel="noreferrer">
                  Book with Provider <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Hotel Card */}
        {selectedHotel && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    {selectedHotel.isMock ? "Demo Option" : "Live Quote"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Stay</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">{selectedHotel.name}</h4>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedHotel.roomType} · {formatCurrency(selectedHotel.totalPrice)} total</p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end w-full md:w-auto gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                Price fetched recently
              </div>
              <Button asChild className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                <a href={selectedHotel.deepLink || "#"} target="_blank" rel="noreferrer">
                  Book with Provider <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Transport Card */}
        {selectedTransport && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    {selectedTransport.isMock ? "Demo Option" : "Live Quote"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Transport</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">{selectedTransport.provider} · {selectedTransport.vehicleType}</h4>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{formatCurrency(selectedTransport.price)}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end w-full md:w-auto gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                Price fetched recently
              </div>
              <Button asChild className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                <a href={selectedTransport.deepLink || "#"} target="_blank" rel="noreferrer">
                  Book with Provider <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Activity Cards */}
        {selectedActivities?.map((act) => (
          <div key={act.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    {act.isMock ? "Demo Option" : "Live Quote"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Activity</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">{act.name}</h4>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{formatCurrency(act.price)}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end w-full md:w-auto gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                Price fetched recently
              </div>
              <Button asChild className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm cursor-pointer">
                <a href={act.deepLink || "#"} target="_blank" rel="noreferrer">
                  Book with Provider <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
