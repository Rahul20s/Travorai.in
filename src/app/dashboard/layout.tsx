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
  MessageSquare
} from "lucide-react";
import { Metadata } from "next";

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
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 pb-2">
          <Link className="flex items-center gap-2" href="/">
            <div className="relative size-7 overflow-hidden rounded-md shadow-sm">
              <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">Travora</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-none">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <Home className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">Home</span>
          </Link>

          <Link href="/dashboard/trips" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <Map className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">My Trips</span>
          </Link>

          <Link href="/dashboard/explore" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <Compass className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">Explore</span>
          </Link>

          <Link href="/dashboard/saved" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <Heart className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">Saved</span>
          </Link>

          <div className="my-4 border-t border-slate-100 mx-3"></div>

          <Link href="/dashboard/bookings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <Briefcase className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">Bookings</span>
          </Link>

          <Link href="/dashboard/expenses" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold transition group">
            <CreditCard className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm">Expenses</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="space-y-1 mb-4">
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm font-medium transition text-sm">
              <Settings className="size-4" />
              Settings
            </Link>
            <Link href="/dashboard/support" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm font-medium transition text-sm">
              <HelpCircle className="size-4" />
              Support
            </Link>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
              <span>Profile</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
