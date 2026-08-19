import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiChatSearch } from "@/components/AiChatSearch";
import { PageHeader } from "@/components/ui/PageHeader";

const popularRoutes = [
  { from: "Delhi", to: "Goa", price: "₹3,200", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop" },
  { from: "Mumbai", to: "Dubai", price: "₹12,500", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&auto=format&fit=crop" },
  { from: "Bangalore", to: "Singapore", price: "₹8,900", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=400&auto=format&fit=crop" },
  { from: "Delhi", to: "Tokyo", price: "₹32,000", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop" },
  { from: "Mumbai", to: "Paris", price: "₹48,000", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop" },
  { from: "Hyderabad", to: "Bangkok", price: "₹6,200", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=400&auto=format&fit=crop" },
];

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
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
            <Link className="text-sm font-semibold text-indigo-600 underline underline-offset-4" href="/flights">Flights</Link>
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition" href="/stays">Stays</Link>
          </nav>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full px-5 h-9 text-sm font-bold">
            <Link href="/dashboard">Start planning</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <PageHeader 
        title="Flights" 
        subtitle="Get real-time airfares for anywhere, powered by AI."
        imageContext="Airplane flying above clouds"
      />

      <section className="bg-slate-50 pt-10 pb-6">
        <div className="mx-auto max-w-3xl px-5">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <AiChatSearch />
            </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Popular routes</h2>
        <p className="text-gray-500 mb-10 text-base">Trending flights from major Indian cities</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route, i) => (
            <Link href="/dashboard" key={i} className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500 block">
              <div className="relative h-52">
                <Image alt={route.to} src={route.img} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-semibold mb-1">{route.from} → {route.to}</p>
                    <h3 className="text-white font-extrabold text-xl">{route.to}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs font-semibold mb-0.5">from</p>
                    <p className="text-white font-extrabold text-lg">{route.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why book flights with Travora */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why search flights with Travora?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "🤖", title: "AI-powered search", desc: "Our AI finds the best routes and prices based on your full trip context — not just one flight." },
              { icon: "💰", title: "Best price guarantee", desc: "We compare prices across hundreds of airlines to ensure you're getting the best deal." },
              { icon: "📅", title: "Flexible dates", desc: "Discover cheaper flights by exploring dates around your preferred travel window." },
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">Ready to fly?</h2>
          <p className="text-white/70 text-lg mb-8">Tell our AI your destination and we'll handle the rest.</p>
          <Button asChild className="bg-white text-black hover:bg-gray-100 rounded-full px-10 h-12 text-base font-extrabold shadow-xl">
            <Link href="/dashboard">Search flights with AI</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
