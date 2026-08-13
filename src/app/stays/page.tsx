import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiChatSearch } from "@/components/AiChatSearch";

const featuredHotels = [
  { name: "Taj Mahal Palace", city: "Mumbai", rating: "9.2", category: "Luxury · Heritage", price: "₹28,000/night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" },
  { name: "Rambagh Palace", city: "Jaipur", rating: "9.5", category: "Heritage · Royal", price: "₹35,000/night", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop" },
  { name: "Overwater Villa, Bali", city: "Bali", rating: "9.7", category: "Luxury · Private Pool", price: "₹42,000/night", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop" },
  { name: "Burj Al Arab", city: "Dubai", rating: "9.8", category: "Iconic · Luxury", price: "₹1,20,000/night", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
  { name: "Le Meurice", city: "Paris", rating: "9.4", category: "Palace · City Center", price: "₹55,000/night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" },
  { name: "Park Hyatt Tokyo", city: "Tokyo", rating: "9.3", category: "Modern · Skyline", price: "₹38,000/night", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop" },
];

export default function StaysPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link className="flex items-center gap-2.5" href="/">
            <div className="relative size-9 overflow-hidden rounded-xl shadow-sm">
              <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Travora</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition" href="/inspiration">Get inspired</Link>
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition" href="/flights">Flights</Link>
            <Link className="text-sm font-semibold text-indigo-600 underline underline-offset-4" href="/stays">Stays</Link>
          </nav>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full px-5 h-9 text-sm font-bold">
            <Link href="/dashboard">Start planning</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury hotel pool"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 w-full">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">🏨 Curated by AI</p>
            <h1 className="text-5xl md:text-[64px] font-extrabold text-white tracking-tight leading-tight mb-6">
              Stay at the best hotels in the world.
            </h1>
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
              Our AI recommends hotels that match your budget, travel style, and itinerary — perfectly integrated into your trip plan.
            </p>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
              <AiChatSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["All", "Luxury", "Budget", "Boutique", "Heritage", "Beach Resorts", "City Hotels", "Villas"].map((cat, idx) => (
            <button key={cat} className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition ${idx === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Featured stays</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel, i) => (
            <Link href="/dashboard" key={i} className="group block rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
              <div className="relative h-56 overflow-hidden">
                <Image alt={hotel.name} src={hotel.img} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-extrabold px-2.5 py-1.5 rounded-full flex items-center gap-1 text-yellow-600">
                  ⭐ {hotel.rating}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-indigo-600 transition">{hotel.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-1">📍 {hotel.city}</p>
                <p className="text-xs text-gray-400 mb-3">{hotel.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-gray-900">{hotel.price}</span>
                  <Button size="sm" className="rounded-full bg-black text-white hover:bg-gray-800 text-xs px-4 h-8">Book now</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why book with Travora */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why book stays with Travora?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "🤖", title: "AI-matched to your trip", desc: "We don't just show hotels — we recommend properties that fit into your exact itinerary." },
              { icon: "💵", title: "Best prices, no markups", desc: "We surface the best publicly available rates from top booking platforms." },
              { icon: "⭐", title: "Curated quality", desc: "Every listed property is reviewed and rated so you never end up disappointed." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-8 hover:shadow-md transition border border-gray-100">
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">Find the perfect stay.</h2>
          <p className="text-white/70 text-lg mb-8">Let our AI recommend hotels that fit your budget and travel style.</p>
          <Button asChild className="bg-white text-black hover:bg-gray-100 rounded-full px-10 h-12 text-base font-extrabold shadow-xl">
            <Link href="/dashboard">Find hotels with AI</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
