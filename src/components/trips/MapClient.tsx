"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Compass } from "lucide-react";
import type { TripPlan } from "@/types/trip";

// Fix for default marker icons in Leaflet with Webpack/Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A component to automatically re-center the map when markers change
function MapRecenter({ markers }: { markers: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.latitude, m.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
}

export default function MapClient({ trip }: { trip: TripPlan }) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const markers = trip.days.flatMap((day) =>
    (day.structuredItems || []).filter(
      (item) => item.latitude !== undefined && item.longitude !== undefined
    )
  );

  const center: [number, number] = markers.length > 0 
    ? [markers[0].latitude!, markers[0].longitude!] 
    : [28.6139, 77.2090]; // Default to Delhi

  if (markers.length === 0) {
    return (
      <div className="w-full h-full bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative flex flex-col items-center justify-center p-8 text-center shadow-inner">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10">
          <Compass className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2 relative z-10">Map Ready</h3>
        <p className="text-sm font-medium text-slate-500 max-w-sm mb-6 relative z-10">
          No locations found in this itinerary yet. As you add places, they will automatically appear here on the map.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm z-0">
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((item, idx) => (
          <Marker
            key={`${item.title}-${idx}`}
            position={[item.latitude!, item.longitude!]}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedItem(item),
            }}
          >
            <Popup className="rounded-2xl">
              <div className="p-1">
                <h4 className="font-bold text-slate-900 text-sm m-0 leading-tight mb-1">{item.title}</h4>
                {item.time && <p className="text-xs text-slate-500 m-0">{item.time}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapRecenter markers={markers} />
      </MapContainer>

      {/* Floating Controls Overlay */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
         <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-100 flex items-center gap-2 text-sm font-bold text-slate-700 pointer-events-none">
           <Compass className="w-4 h-4 text-blue-600" /> Map Explorer
         </div>
      </div>
    </div>
  );
}
