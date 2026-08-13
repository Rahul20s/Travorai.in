"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled
        ? "bg-white/95 backdrop-blur-md border-slate-100 shadow-sm py-3"
        : "bg-white/80 backdrop-blur-sm border-transparent py-4"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link className="flex items-center gap-2.5" href="/">
          <div className="relative size-9 overflow-hidden rounded-xl shadow-sm">
            <Image src="/logo.jpg" alt="Travora Logo" fill className="object-cover" />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
            Travora
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Get inspired", href: "/inspiration" },
            { label: "Flights", href: "/flights" },
            { label: "Stays", href: "/stays" },
          ].map((link) => (
            <Link
              key={link.label}
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth CTAs */}
        <div className="hidden items-center gap-4 md:flex">
          <SignedOut>
            <Button asChild variant="ghost" className="text-slate-700 hover:bg-slate-50 text-sm font-bold h-10 px-5 rounded-full">
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-10 text-sm font-bold shadow-sm">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild variant="ghost" className="text-slate-700 hover:bg-slate-50 h-10 px-5 rounded-full text-sm font-bold">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 space-y-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {[
              { label: "Get inspired", href: "/inspiration" },
              { label: "Flights", href: "/flights" },
              { label: "Stays", href: "/stays" },
            ].map((link) => (
              <Link
                key={link.label}
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-slate-900"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <SignedOut>
              <Button asChild variant="outline" className="w-full rounded-full font-bold">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>Log in</Link>
              </Button>
              <Button asChild className="w-full bg-slate-900 text-white rounded-full font-bold">
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>Get started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild variant="outline" className="w-full rounded-full font-bold mb-2">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
              </Button>
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-semibold text-slate-600">Traveler Profile</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navigation;
