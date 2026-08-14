"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  Map,
  Compass,
  Heart,
  Settings,
  CreditCard,
  Briefcase,
  HelpCircle,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex shrink-0 border-r border-slate-200 bg-white flex-col h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      <div className={`p-6 pb-2 flex items-center ${isCollapsed ? "justify-center px-0" : "justify-between"}`}>
        <Link className={`flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`} href="/">
          <div className="relative size-7 overflow-hidden rounded-md shadow-sm shrink-0">
            <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
          </div>
          {!isCollapsed && (
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 transition-opacity duration-300 whitespace-nowrap">
              Travora
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center mt-2 mb-4">
          <button 
            onClick={() => setIsCollapsed(false)}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        </div>
      )}

      <nav className={`flex-1 overflow-y-auto py-4 space-y-1.5 scrollbar-none ${isCollapsed ? "px-2" : "px-4"}`}>
        <Link href="/dashboard" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "Home" : ""}>
          <Home className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Home</span>}
        </Link>

        <Link href="/dashboard/trips" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "My Trips" : ""}>
          <Map className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">My Trips</span>}
        </Link>

        <Link href="/dashboard/explore" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "Explore" : ""}>
          <Compass className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Explore</span>}
        </Link>

        <Link href="/dashboard/saved" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "Saved" : ""}>
          <Heart className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Saved</span>}
        </Link>

        <div className={`my-4 border-t border-slate-100 ${isCollapsed ? "mx-1" : "mx-3"}`}></div>

        <Link href="/dashboard/bookings" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "Bookings" : ""}>
          <Briefcase className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Bookings</span>}
        </Link>

        <Link href="/dashboard/expenses" className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group ${isCollapsed ? "justify-center px-0" : "px-3"}`} title={isCollapsed ? "Expenses" : ""}>
          <CreditCard className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Expenses</span>}
        </Link>
      </nav>

      <div className={`p-4 border-t border-slate-100 bg-slate-50/50 ${isCollapsed ? "flex flex-col items-center px-2" : ""}`}>
        <div className={`space-y-1 mb-4 ${isCollapsed ? "flex flex-col items-center w-full" : ""}`}>
          <Link href="/dashboard/settings" className={`flex items-center gap-3 py-2 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm font-medium transition text-sm ${isCollapsed ? "justify-center w-full px-0" : "px-3"}`} title={isCollapsed ? "Settings" : ""}>
            <Settings className="size-4 shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
          <Link href="/dashboard/support" className={`flex items-center gap-3 py-2 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm font-medium transition text-sm ${isCollapsed ? "justify-center w-full px-0" : "px-3"}`} title={isCollapsed ? "Support" : ""}>
            <HelpCircle className="size-4 shrink-0" />
            {!isCollapsed && <span>Support</span>}
          </Link>
        </div>
        
        <div className={`flex items-center bg-white border border-slate-200 rounded-xl shadow-sm ${isCollapsed ? "justify-center p-2" : "justify-between px-3 py-2"}`}>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            {!isCollapsed && <span>Profile</span>}
          </div>
        </div>
      </div>
    </aside>
  );
}
