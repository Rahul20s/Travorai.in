"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 lg:grid-cols-5 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link className="flex items-center gap-2.5" href="/">
              <div className="relative size-9 overflow-hidden rounded-xl shadow-sm">
                <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">Travora</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Your AI-powered travel assistant. Discover locations, build custom budgets, and compare hotel deals in a single workflow.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <p className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">Explore</p>
            <ul className="space-y-3">
              {[
                { label: "AI Planner", href: "/dashboard" },
                { label: "Flights", href: "/flights" },
                { label: "Hotels & Stays", href: "/stays" },
                { label: "Inspirations", href: "/inspiration" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-950 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Company Column */}
          <div>
            <p className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">Company</p>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/" },
                { label: "Contact", href: "/" },
                { label: "Help Guide", href: "/" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-950 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations Column */}
          <div>
            <p className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">Top Destinations</p>
            <ul className="space-y-3">
              {[
                { label: "Bali Guide", href: "/destinations/bali" },
                { label: "Dubai Guide", href: "/destinations/dubai" },
                { label: "Goa Guide", href: "/destinations/goa" },
                { label: "View All Destinations", href: "/destinations" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-950 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <p className="font-bold text-slate-900 mb-4 text-sm tracking-wider uppercase">Legal</p>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Cookie Settings", href: "/" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-950 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copy / Social Row */}
        <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Travora. All rights reserved. Built for Indian & international travellers.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-slate-900 transition-colors font-semibold"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-slate-900 transition-colors font-semibold"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default LandingFooter;
