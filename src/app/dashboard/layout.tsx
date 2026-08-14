import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  Map,
  Compass,
  Heart,
  Home,
} from "lucide-react";
import { Metadata } from "next";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard | Travora",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-30">
        <Link className="flex items-center gap-2" href="/">
          <div className="relative size-7 overflow-hidden rounded-md shadow-sm">
            <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">Travora</span>
        </Link>
        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
      </header>

      {/* Desktop Sidebar (Collapsible) */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto pb-[70px] lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[70px] bg-white border-t border-slate-200 z-50 flex items-center justify-around px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-blue-600 focus:text-blue-600 transition-colors">
          <Home className="size-6" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/dashboard/trips" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-blue-600 focus:text-blue-600 transition-colors">
          <Map className="size-6" />
          <span className="text-[10px] font-bold">Trips</span>
        </Link>
        <Link href="/dashboard/explore" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-blue-600 focus:text-blue-600 transition-colors">
          <Compass className="size-6" />
          <span className="text-[10px] font-bold">Explore</span>
        </Link>
        <Link href="/dashboard/saved" className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-blue-600 focus:text-blue-600 transition-colors">
          <Heart className="size-6" />
          <span className="text-[10px] font-bold">Saved</span>
        </Link>
      </div>
    </div>
  );
}
