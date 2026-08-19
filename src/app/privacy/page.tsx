import React from "react";
import { siteConfig } from "@/config/site";
import { Navigation } from "@/components/landing/Navigation";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-32 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
          <p className="lead text-lg text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect trip preferences, chat inputs, contact and account information (via Clerk authentication), and booking preferences to generate personalized itineraries.</p>

          <h2>2. How We Use Your Data</h2>
          <p>We use your data to generate travel itineraries, compare prices, and improve our recommendations. <strong>We do not sell your personal data.</strong></p>

          <h2>3. Third-Party Services & AI Processing</h2>
          <p>We utilize third-party flight and hotel providers (such as Kiwi.com) to search for deals. Additionally, we use AI processing providers (currently <strong>{siteConfig.aiProviderName}</strong>) to understand your requests and generate itineraries. Your chat inputs are sent to these providers securely for processing.</p>

          <h2>4. Data Retention</h2>
          <p>We retain your personal data only as long as necessary to provide our services and comply with legal obligations:</p>
          <ul>
            <li><strong>Account information:</strong> retained for the lifetime of your account, and for 30 days after deletion to allow for account recovery.</li>
            <li><strong>Trip and chat history:</strong> retained for the lifetime of your account, or until you delete a specific trip.</li>
            <li><strong>Usage/analytics logs:</strong> retained for up to 90 days.</li>
            <li><strong>Payment-related data (if applicable):</strong> retained as required under RBI guidelines and applicable law.</li>
          </ul>

          <h2>5. Your Right to Deletion</h2>
          <p>You may request deletion of your account and associated personal data at any time by contacting us at <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. We will process deletion requests within 30 days, except where we are required to retain certain data for legal, tax, or regulatory purposes.</p>

          <h2>6. Grievance Officer</h2>
          <p>In accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023, the contact details of the Grievance Officer are provided below:</p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 my-6">
            <p className="m-0"><strong>Name:</strong> {siteConfig.founderName}</p>
            <p className="m-0"><strong>Designation:</strong> Grievance Officer, {siteConfig.name}</p>
            <p className="m-0"><strong>Email:</strong> <a href={`mailto:${siteConfig.grievanceEmail}`}>{siteConfig.grievanceEmail}</a></p>
            <p className="m-0"><strong>Address:</strong> {siteConfig.companyAddress}</p>
          </div>
          <p>Any user with a grievance regarding the processing of their personal data, or any complaint relating to this Privacy Policy, may write to the Grievance Officer at the above email address. We will acknowledge your complaint within 24 hours and endeavor to resolve it within 30 days of receipt.</p>
        </div>
      </div>
      <LandingFooter />
    </main>
  );
}
