import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap"
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://travorai.in"),
  title: {
    default: "Travora | AI Travel Planner for India & Beyond",
    template: "%s | Travora",
  },
  description: "Plan budget-friendly and luxury trips instantly with AI. Built for Indian travellers, designed for the world.",
  openGraph: {
    title: "Travora | AI Travel Planner for India & Beyond",
    description: "Plan budget-friendly and luxury trips instantly with AI.",
    url: "https://travorai.in",
    siteName: "Travora",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travora | AI Travel Planner",
    description: "Plan budget-friendly and luxury trips instantly with AI.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html className={`${inter.variable} ${jakarta.variable}`} lang="en">
        <body className="font-sans antialiased">
          {children}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
