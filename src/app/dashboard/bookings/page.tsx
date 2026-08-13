import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, CheckCircle2, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default async function BookingsPage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  // Fetch actual bookings (empty for now until TBO integration, but ready)
  const actualBookings = await prisma.booking.findMany({
    where: { trip: { ownerId: user.id } },
    include: { trip: true }
  });

  // Fetch planned selections
  const plannedSelections = await prisma.tripSelection.findMany({
    where: { userId: user.id },
    include: { trip: true },
    orderBy: { createdAt: "desc" }
  });

  const upcomingBookings = actualBookings.filter(b => b.status === "CONFIRMED" || b.status === "PENDING");
  const pastBookings = actualBookings.filter(b => b.trip.status === "COMPLETED");
  const cancelledBookings = actualBookings.filter(b => b.status === "CANCELLED");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bookings</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto w-full px-8 pt-8 space-y-12">
          
          {/* UPCOMING ACTUAL BOOKINGS */}
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Upcoming Bookings</h2>
            {upcomingBookings.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-500 font-medium">No upcoming confirmed bookings.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Structure ready for actual bookings */}
              </div>
            )}
          </section>

          {/* PLANNED TRAVEL SELECTIONS */}
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Planned Travel</h2>
            {plannedSelections.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">Your selected travel options will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plannedSelections.map(selection => {
                  const data = selection.parsedData as any;
                  return (
                    <div key={selection.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        {selection.type === "FLIGHT" ? "✈️" : selection.type === "HOTEL" ? "🏨" : selection.type === "ACTIVITY" ? "🎟️" : "🚕"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                            {selection.type}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Selected
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base truncate mb-1">
                          {selection.type === "FLIGHT" ? `${data.flightSegments?.[0]?.airlineName || "Flight"}` : data.name || "Activity"}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <Link href={`/dashboard/trips/${selection.tripId}`} className="hover:text-blue-600 hover:underline">
                            {selection.trip.name}
                          </Link>
                        </div>
                        <div className="text-sm font-bold text-slate-700 flex items-center gap-1.5 pt-2 border-t border-slate-100">
                          <CircleDollarSign className="w-4 h-4 text-slate-400" />
                          {formatCurrency(selection.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* PAST BOOKINGS */}
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Past Bookings</h2>
            {pastBookings.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-500 font-medium">No past bookings.</p>
              </div>
            ) : (
              <div className="space-y-4"></div>
            )}
          </section>

          {/* CANCELLED BOOKINGS */}
          {cancelledBookings.length > 0 && (
            <section>
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">Cancelled</h2>
              <div className="space-y-4"></div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
