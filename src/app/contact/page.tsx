import React from "react";
import { siteConfig } from "@/config/site";
import { Navigation } from "@/components/landing/Navigation";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation />
      <div className="max-w-3xl mx-auto px-6 py-32 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 mb-8">
          Have a question about your travel plans or need help with our AI? We're here to help.
        </p>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <p className="font-bold text-slate-900 text-xl mb-2">Email Support</p>
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 hover:text-blue-700 text-lg">
            {siteConfig.supportEmail}
          </a>
        </div>
      </div>
      <LandingFooter />
    </main>
  );
}
