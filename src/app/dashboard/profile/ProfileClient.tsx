"use client";

import { useState } from "react";
import { User, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProfileData = {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  travelProfile: {
    homeCity: string | null;
    defaultCurrency: string;
    travelStyles: string[];
    foodPreferences: string[];
    companions: string[];
  } | null;
};

export function ProfileClient({ initialData }: { initialData: ProfileData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [homeCity, setHomeCity] = useState(initialData.travelProfile?.homeCity || "");
  const [defaultCurrency, setDefaultCurrency] = useState(initialData.travelProfile?.defaultCurrency || "INR");
  
  const [travelStyles, setTravelStyles] = useState<string[]>(initialData.travelProfile?.travelStyles || []);
  const [foodPreferences, setFoodPreferences] = useState<string[]>(initialData.travelProfile?.foodPreferences || []);

  const availableStyles = ["Adventure", "Relaxation", "Culture", "Nightlife", "Nature", "Luxury", "Budget"];
  const availableFood = ["Vegetarian", "Vegan", "Halal", "Seafood", "Street Food", "Fine Dining", "No Restrictions"];

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeCity,
          defaultCurrency,
          travelStyles,
          foodPreferences,
          companions: initialData.travelProfile?.companions || []
        })
      });
      // Handle success toast here in real app
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Profile</h1>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-md"
        >
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save Changes"}
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto w-full px-8 pt-8 space-y-8">
          
          {/* Identity Section */}
          <section className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 relative rounded-full overflow-hidden bg-slate-100 shrink-0 border-4 border-white shadow-md">
              {initialData.avatarUrl ? (
                <Image src={initialData.avatarUrl} alt={initialData.name || "User"} fill className="object-cover" />
              ) : (
                <User className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900 mb-1">{initialData.name || "Traveller"}</h2>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /> {initialData.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> 
                  <input 
                    type="text" 
                    value={homeCity} 
                    onChange={e => setHomeCity(e.target.value)} 
                    placeholder="Set Home City"
                    className="bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 outline-none w-32"
                  />
                </div>
              </div>
            </div>
            <div className="shrink-0 text-center md:text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Currency</p>
              <select 
                value={defaultCurrency} 
                onChange={e => setDefaultCurrency(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </section>

          {/* Travel Preferences */}
          <section className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">Travel Style</h3>
            <div className="flex flex-wrap gap-3">
              {availableStyles.map(style => {
                const isSelected = travelStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleArrayItem(setTravelStyles, style)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                      isSelected 
                        ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Food Preferences */}
          <section className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">Food & Dining</h3>
            <div className="flex flex-wrap gap-3">
              {availableFood.map(food => {
                const isSelected = foodPreferences.includes(food);
                return (
                  <button
                    key={food}
                    onClick={() => toggleArrayItem(setFoodPreferences, food)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                      isSelected 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {food}
                  </button>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
