"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, X, Send, ChevronUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TripPlan } from "@/types/trip";

export function TripAssistant({ trip, viewMode = "dashboard" }: { trip: TripPlan, viewMode?: "dashboard" | "planner" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: "user" | "assistant", text: string}[]>([
    { role: "assistant", text: `Hi! I'm your Travora Assistant. I helped plan your trip to ${trip.destination}. How can I modify this itinerary for you?` }
  ]);
  const [input, setInput] = useState("");
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    
    // Simulate AI response for Phase 2 prototype
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "I understand you want to modify the trip. In this demo phase, live itinerary mutations are disabled to protect your saved plan. This capability will be enabled in Phase 3!" 
      }]);
      setShowDemoNotice(true);
    }, 1000);
  };

  const quickPrompts = [
    "Make this trip cheaper",
    "Add more nightlife",
    "Find a better hotel",
    "Switch Day 1 and Day 2"
  ];

  const isPlanner = viewMode === "planner";

  if (!isOpen && !isPlanner) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white shadow-2xl flex items-center justify-center p-0 transition-transform hover:scale-105"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={
      isPlanner 
        ? "w-full h-full bg-white flex flex-col" 
        : "fixed bottom-6 right-6 z-50 w-full max-w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[80vh]"
    }>
      {/* Header */}
      <div className={`${isPlanner ? "bg-white border-b border-slate-100" : "bg-slate-900"} p-4 flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className={`font-bold text-sm ${isPlanner ? "text-slate-900" : "text-white"}`}>Trip Assistant</h3>
            <p className={`text-[10px] font-medium tracking-wide uppercase ${isPlanner ? "text-slate-500" : "text-slate-400"}`}>AI Powered</p>
          </div>
        </div>
        {!isPlanner && (
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
        {showDemoNotice && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3 text-xs mb-4 shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-amber-800 font-medium">Contextual itinerary modifications will be connected to the live API in Phase 6.</span>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
              msg.role === "user" 
                ? "bg-blue-600 text-white font-medium rounded-tr-sm shadow-sm" 
                : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto hide-scrollbar shrink-0">
        <div className="flex gap-2 min-w-max pb-1">
          {quickPrompts.map(prompt => (
            <button 
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-700 text-xs font-bold rounded-full transition-colors whitespace-nowrap shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI to update trip..."
            className="flex-1 bg-transparent text-sm outline-none text-slate-700 font-medium placeholder:font-normal"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="text-blue-600 disabled:text-slate-300 transition-colors hover:scale-110"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
