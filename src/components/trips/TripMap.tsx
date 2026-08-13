"use client";

import { useState } from "react";
// @ts-ignore
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Map as MapIcon, Compass } from "lucide-react";
import type { TripPlan } from "@/types/trip";

interface TripMapProps {
  trip: TripPlan;
}

export function TripMap({ trip }: TripMapProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // Extract all items with coordinates
  const markers = trip.days.flatMap((day) => 
    (day.structuredItems || []).filter((item) => item.latitude !== undefined && item.longitude !== undefined)
  );

  // If no token is provided, render a premium placeholder
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative flex flex-col items-center justify-center p-8 text-center shadow-inner">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 to-transparent"></div>
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10">
          <MapIcon className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2 relative z-10">Interactive Map Offline</h3>
        <p className="text-sm font-medium text-slate-500 max-w-sm mb-6 relative z-10">
          To enable live 3D mapping and geographical context, please add a Mapbox token to your environment variables.
        </p>
        <div className="bg-white px-4 py-3 rounded-xl border border-dashed border-slate-300 text-xs font-mono text-slate-600 shadow-sm relative z-10 text-left">
          NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
        </div>
      </div>
    );
  }

  // Calculate center of map (fallback to 0,0 if no markers)
  const initialLongitude = markers.length > 0 ? markers[0].longitude! : 0;
  const initialLatitude = markers.length > 0 ? markers[0].latitude! : 0;

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm">
      {/* Mapbox Render */}
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: 12
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        {markers.map((item, idx: number) => (
          <Marker 
            key={item.title || idx} 
            longitude={item.longitude!} 
            latitude={item.latitude!} 
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              setSelectedItem(item);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform border-2 border-white">
              <MapPin className="w-4 h-4" />
            </div>
          </Marker>
        ))}

        {selectedItem && (
          <Popup
            longitude={selectedItem.longitude!}
            latitude={selectedItem.latitude!}
            anchor="top"
            onClose={() => setSelectedItem(null)}
            closeOnClick={false}
            className="rounded-2xl"
          >
            <div className="p-1">
              <h4 className="font-bold text-slate-900">{selectedItem.title}</h4>
              <p className="text-xs text-slate-500">{selectedItem.time}</p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
         <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-100 flex items-center gap-2 text-sm font-bold text-slate-700">
           <Compass className="w-4 h-4 text-blue-600" /> Map Explorer
         </div>
      </div>
    </div>
  );
}
