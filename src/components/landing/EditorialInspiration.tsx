"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

const articles = [
  {
    tag: "Weekend Getaways",
    title: "Best weekend trips from Mumbai",
    desc: "From the hills of Lonavala to the beaches of Alibaug, check out the perfect 48-hour escape guides.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6858f?w=800&auto=format&fit=crop&q=60", // Reliable Mumbai/Lonavala style image
    href: "/inspiration",
  },
  {
    tag: "Budget Guides",
    title: "Best destinations under ₹20,000",
    desc: "Travel doesn't have to break the bank. Explore cheap but breathtaking Indian tourist favorites.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60", // Reliable Goa style image
    href: "/inspiration",
  },
  {
    tag: "Honeymoon Specials",
    title: "Best honeymoon destinations",
    desc: "Discover romantic destinations offering privacy, gorgeous sunrises, and couples' spa treatments.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60", // Reliable beach/honeymoon style image
    href: "/inspiration",
  },
];

export function EditorialInspiration() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Curated Content
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Travel Inspiration
            </h2>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((art, idx) => (
            <Link
              key={idx}
              href={art.href}
              className="group bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl rounded-3xl overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden shrink-0">
                <SafeImage
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  wrapperClassName="absolute inset-0 w-full h-full"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  {art.tag}
                </span>
                
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                  {art.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {art.desc}
                </p>
                
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export default EditorialInspiration;
