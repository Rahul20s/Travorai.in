"use client";

import React from "react";
import { MessageSquare, ArrowRight, CheckCircle, Sparkles, MapPin, Calendar, Users, DollarSign } from "lucide-react";

export function AIDifferentiator() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Text Info */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-3">
              One Conversation
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Your entire trip, planned in seconds.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              No more copying and pasting between twenty tabs. Tell Travora what you want to experience, what your budget limits are, and how you travel.
            </p>
            
            <div className="space-y-4">
              {[
                "Natural language trip refinement (e.g. 'make it cheaper')",
                "Direct price comparisons across providers",
                "Full-featured day-by-day itineraries with actual times",
                "Integrated expense logging and WhatsApp notifications",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Interactive Mock flow */}
          <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm">
            <div className="space-y-6">
              {/* User Bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white text-sm font-semibold shadow-md">
                  <p>"Plan a 2-day Goa trip for 2 people under ₹20,000 with beaches and nightlife from Mumbai."</p>
                </div>
              </div>

              {/* Processing connector */}
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <div className="h-px bg-slate-200 flex-1" />
                <Sparkles className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Intelligence Layer</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* Parsed Attributes */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase mb-3">Extracted Requirements</p>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Goa</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>2 days</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>2 travelers</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    <span>₹20k Budget</span>
                  </div>
                </div>
              </div>

              {/* Output preview */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white border border-slate-150 p-4 text-slate-700 text-sm shadow-sm">
                  <p className="font-bold text-slate-900 mb-1">Generated Output</p>
                  <p className="text-xs text-slate-500 mb-3">1 Hotel options found · 2 Trains compared · 4 Activities scheduled</p>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AIDifferentiator;
