import { ensureUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell, Shield, User, Lock, Mail, ChevronRight, ToggleRight, ToggleLeft } from "lucide-react";

export default async function SettingsPage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-3xl mx-auto w-full px-8 pt-8 space-y-8">
          
          {/* Account */}
          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Account
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left">
                <div>
                  <div className="font-bold text-slate-900">Personal Information</div>
                  <div className="text-sm font-medium text-slate-500">Update your name and avatar</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left">
                <div>
                  <div className="font-bold text-slate-900">Email Addresses</div>
                  <div className="text-sm font-medium text-slate-500">Manage connected emails</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left">
                <div>
                  <div className="font-bold text-slate-900">Password & Security</div>
                  <div className="text-sm font-medium text-slate-500">Update password and 2FA</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" /> Notifications <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2 bg-slate-100 px-2 py-1 rounded">(Coming Soon)</span>
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100 opacity-60">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-bold text-slate-900">Trip Updates (Email)</div>
                  <div className="text-sm font-medium text-slate-500">Get emails about itinerary changes</div>
                </div>
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Alerts</div>
                  <div className="text-sm font-medium text-slate-500">Live booking status and flight delays</div>
                </div>
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" /> Privacy
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-bold text-slate-900">Public Trips</div>
                  <div className="text-sm font-medium text-slate-500">Allow others to view your itineraries</div>
                </div>
                <ToggleRight className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
