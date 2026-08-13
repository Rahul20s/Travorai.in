import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inspirations = [
  {
    title: "Paris: A Locals Guide",
    subtitle: "Explore the city beyond the Eiffel Tower",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    author: "Sophie M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    duration: "5 days",
    tags: ["Culture", "Romance"],
  },
  {
    title: "4-Days of Authenticity and Culture in Rome",
    subtitle: "Walk the cobblestones of the Eternal City",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
    author: "Marco B.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    duration: "4 days",
    tags: ["History", "Food"],
  },
  {
    title: "Foodie's Delight: San Francisco Neighborhoods",
    subtitle: "Taste your way through 5 iconic neighborhoods",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
    author: "Aria K.",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop",
    duration: "3 days",
    tags: ["Food", "Urban"],
  },
  {
    title: "A Harbourside Adventure Down Under",
    subtitle: "Sydney's best beaches, bays and bars",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop",
    author: "Jake W.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    duration: "6 days",
    tags: ["Beach", "Adventure"],
  },
  {
    title: "Bali's Hidden Temples & Terraces",
    subtitle: "Beyond Ubud — rice terraces and sacred temples",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    author: "Priya S.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop",
    duration: "7 days",
    tags: ["Culture", "Nature"],
  },
  {
    title: "Tokyo in Cherry Blossom Season",
    subtitle: "The best parks, cafes, and neighborhoods to visit in spring",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
    author: "Yuki T.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop",
    duration: "8 days",
    tags: ["Culture", "Food", "Solo"],
  },
  {
    title: "Goa: Beyond the Beach Parties",
    subtitle: "Heritage, spice farms, and local cuisine",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    author: "Rahul D.",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
    duration: "5 days",
    tags: ["Beach", "Food", "Budget"],
  },
  {
    title: "Ladakh: The Land of High Passes",
    subtitle: "Monasteries, mountain roads, and starry nights",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    author: "Ananya R.",
    avatar: "https://images.unsplash.com/photo-1587473260584-136574528ed5?q=80&w=100&auto=format&fit=crop",
    duration: "7 days",
    tags: ["Adventure", "Mountains"],
  },
];

export default function InspirationPage() {
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
            <Link className="text-sm font-semibold text-indigo-600 underline underline-offset-4" href="/inspiration">Get inspired</Link>
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition" href="/flights">Flights</Link>
            <Link className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition" href="/stays">Stays</Link>
          </nav>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full px-5 h-9 text-sm font-bold">
            <Link href="/dashboard">Start planning</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-20 text-center border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-5xl md:text-[64px] font-extrabold text-gray-900 tracking-tight mb-6">Get inspired.</h1>
          <p className="text-xl text-gray-600 font-medium mb-10">Explore popular destinations and start planning your Travora trip.</p>

          {/* Filter tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {["All", "Beaches", "Mountains", "Cities", "Culture", "Food", "Adventure", "Romance", "Budget", "Luxury"].map((tag, idx) => (
              <button key={tag} className={`rounded-full px-5 py-2 text-sm font-bold transition ${idx === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration grid */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {inspirations.map((card, i) => (
            <Link href="/dashboard" className="group block" key={i}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-sm group-hover:shadow-xl transition-shadow duration-500 mb-4">
                <Image alt={card.title} className="object-cover transition-transform duration-700 group-hover:scale-105" fill src={card.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {/* Avatar */}
                <div className="absolute top-4 left-4 size-9 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <Image src={card.avatar} alt={card.author} fill className="object-cover" />
                </div>
                {/* Duration badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-2.5 py-1.5 rounded-full text-gray-900">
                  {card.duration}
                </div>
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {card.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wide text-white/70 bg-white/10 backdrop-blur px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{card.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-snug group-hover:text-gray-700 transition">{card.subtitle}</p>
              <p className="text-xs font-bold text-gray-400 mt-1">by {card.author}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">Ready to plan your trip?</h2>
          <p className="text-white/70 text-lg mb-8">Let our AI build you a personalized itinerary in seconds.</p>
          <Button asChild className="bg-white text-black hover:bg-gray-100 rounded-full px-10 h-13 text-base font-extrabold shadow-xl h-12">
            <Link href="/dashboard">Start planning for free</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
