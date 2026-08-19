import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, MapPin, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiChatSearch } from "@/components/AiChatSearch";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await ensureUser();
  if (!user) {
    redirect("/sign-in");
  }

  const trips = await prisma.trip.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      selections: true,
    }
  });

  const planningTrip = trips.find(t => t.status === "PLANNING");
  const upcomingTrip = trips.find(t => t.status === "BOOKED" || t.status === "ACTIVE");
  const recentTrips = trips.filter(t => t.id !== planningTrip?.id && t.id !== upcomingTrip?.id).slice(0, 3);

  let hasFlight = false;
  let hasHotel = false;
  let hasActivities = false;
  let hasTransport = false;
  let numActivities = 0;

  if (planningTrip) {
    hasFlight = planningTrip.selections.some(s => s.type === "FLIGHT");
    hasHotel = planningTrip.selections.some(s => s.type === "HOTEL");
    hasTransport = planningTrip.selections.some(s => s.type === "TRANSPORT");
    const activities = planningTrip.selections.filter(s => s.type === "ACTIVITY");
    hasActivities = activities.length > 0;
    numActivities = activities.length;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC]">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 gap-4">
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight shrink-0">Home</h1>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="#plan-trip">
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 lg:px-6 shadow-md shadow-blue-500/20 text-sm h-9 lg:h-10">
              <Plus className="w-4 h-4 lg:mr-2" />
              <span className="hidden sm:inline">Create a trip</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 pt-8 space-y-12">
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Good morning, {user.name || "Traveller"}</h2>
            <p className="text-slate-500 text-base lg:text-lg font-medium">Where are you going next?</p>
          </div>

          <section id="plan-trip" className="scroll-mt-24">
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative">
              <AiChatSearch variant="full" />
            </div>
          </section>

          {/* UPCOMING TRIP */}
          {upcomingTrip && (
            <section>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Upcoming Trip</h3>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto relative">
                  <SafeImage 
                    src=""
                    context={`${upcomingTrip.destination} landmark`} 
                    alt={upcomingTrip.destination}
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg mb-4 w-fit">
                    UPCOMING
                  </div>
                  <h4 className="text-3xl font-extrabold text-slate-900 mb-2">{upcomingTrip.name}</h4>
                  <div className="text-slate-500 font-medium space-y-1 mb-8">
                    {upcomingTrip.startDate && upcomingTrip.endDate && (
                      <p>{new Date(upcomingTrip.startDate).toLocaleDateString()} – {new Date(upcomingTrip.endDate).toLocaleDateString()}</p>
                    )}
                    <p>{upcomingTrip.budget ? `${formatCurrency(upcomingTrip.budget)} planned` : "No budget set"}</p>
                  </div>
                  <Link href={`/dashboard/trips/${upcomingTrip.id}`}>
                    <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 shadow-sm">
                      View Trip <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* CONTINUE PLANNING */}
          {planningTrip && (
            <section>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Continue Planning</h3>
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full">
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">Continue planning your {planningTrip.destination} trip</h4>
                  <p className="text-slate-500 font-medium mb-6">You've made some selections. Let's finish the rest of the plan.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {hasFlight ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      {hasFlight ? "Flight selected" : "Flight not selected"}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {hasHotel ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      {hasHotel ? "Hotel selected" : "Hotel not selected"}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {hasActivities ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      {hasActivities ? `${numActivities} activities selected` : "Activities not selected"}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {hasTransport ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      {hasTransport ? "Transport selected" : "Transport not selected"}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <Link href={`/dashboard/trips/${planningTrip.id}`}>
                    <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                      Continue Trip
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* RECENT TRIPS */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">Recent Trips</h3>
              <Link href="/dashboard/trips">
                <Button variant="ghost" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                  View all
                </Button>
              </Link>
            </div>
            
            {recentTrips.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No recent trips yet. Start planning above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentTrips.map((trip) => (
                  <Link 
                    key={trip.id} 
                    href={`/dashboard/trips/${trip.id}`}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                      <SafeImage
                        src=""
                        context={`${trip.destination} beautiful landmark`}
                        alt={trip.destination}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-slate-900 bg-white/90 backdrop-blur-md rounded-lg shadow-sm uppercase tracking-wider">
                        {trip.status}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {trip.destination}
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-1 line-clamp-1">{trip.name}</h4>
                      <p className="text-sm font-medium text-slate-500">
                        {trip.budget ? formatCurrency(trip.budget) : "Planning phase"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* EXPLORE DESTINATIONS (SEO Internal Linking) */}
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Explore Destinations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { slug: "goa", title: "Goa", context: "Goa India beach sunset", tags: "Beaches & Nightlife" },
                { slug: "dubai", title: "Dubai", context: "Dubai Burj Khalifa skyline", tags: "Luxury & Shopping" },
                { slug: "bali", title: "Bali", context: "Bali Indonesia rice terraces temple", tags: "Tropical Paradise" },
                { slug: "kashmir", title: "Kashmir", context: "Kashmir Dal Lake shikara", tags: "Mountains & Lakes" },
                { slug: "paris", title: "Paris", context: "Paris France Eiffel Tower", tags: "Culture & Romance" },
                { slug: "switzerland", title: "Switzerland", context: "Switzerland Alps train", tags: "Alpine Beauty" }
              ].map((item, i) => (
                <Link key={i} href={`/destinations/${item.slug}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <SafeImage
                      src=""
                      context={item.context}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)" }} />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-md mb-2 shadow-sm">
                        {item.tags}
                      </span>
                      <h4 className="text-white font-extrabold text-xl leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
               <Link href="/destinations/goa">
                 <Button variant="outline" className="rounded-full font-bold">
                   View all 10 destinations
                 </Button>
               </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
