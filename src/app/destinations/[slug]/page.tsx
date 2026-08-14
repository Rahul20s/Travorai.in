import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard, Plane, MapPin, Bus, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  
  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
  };
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Create JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.name,
    "description": destination.metaDescription,
    "touristType": ["Leisure", "Adventure", "Family", "Couples"]
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        <SafeImage
          src=""
          context={destination.heroImageContext}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold tracking-wider uppercase border border-white/30">
            Destination Guide
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 max-w-2xl mx-auto">
            {destination.heroSubtitle}
          </p>
          <div className="pt-4">
            <Link href={`/dashboard?prompt=Plan a personalized trip to ${destination.name}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl shadow-blue-900/20">
                <Sparkles className="w-5 h-5 mr-2" />
                Plan My {destination.name} Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 -mt-12 relative z-20 space-y-16">
        
        {/* Quick Information */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
            Quick Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Best Time to Visit</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.bestTime}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Ideal Duration</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.idealDuration}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Approximate Budget</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.approxBudget}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">How to Reach</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.howToReach}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Visa / Entry Info</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.visaInfo}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Bus className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Local Transport</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{destination.quickInfo.localTransport}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to do */}
        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Top Things to Do in {destination.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.whatToDo.map((category, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Itineraries */}
        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Sample {destination.name} Itineraries</h2>
          <div className="space-y-4">
            {destination.sampleItineraries.map((itinerary, idx) => (
              <div key={idx} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg mb-2">
                    {itinerary.days} Days
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{itinerary.title}</h3>
                  <p className="text-slate-600 text-sm">{itinerary.description}</p>
                </div>
                <Link href={`/dashboard?prompt=Plan a ${itinerary.days} day ${itinerary.title.toLowerCase()} itinerary in ${destination.name}`} className="shrink-0">
                  <Button variant="outline" className="w-full md:w-auto rounded-xl group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200">
                    Customize this plan <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Guide */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white">
          <h2 className="text-2xl font-extrabold mb-8">Budget Guide for {destination.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-2">Budget</div>
              <p className="text-slate-300 text-sm leading-relaxed">{destination.budgetGuide.budget}</p>
            </div>
            <div>
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2">Mid-Range</div>
              <p className="text-slate-300 text-sm leading-relaxed">{destination.budgetGuide.midRange}</p>
            </div>
            <div>
              <div className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-2">Luxury</div>
              <p className="text-slate-300 text-sm leading-relaxed">{destination.budgetGuide.luxury}</p>
            </div>
          </div>
        </section>

        {/* Conversion CTA */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-center shadow-2xl shadow-blue-900/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Planning {destination.name} for {destination.quickInfo.idealDuration.split(' ')[0]} days?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Stop reading generic blogs. Let our AI instantly build a personalized itinerary complete with optimal routes, budget calculations, and booking links.
          </p>
          <Link href={`/dashboard?prompt=Plan a trip to ${destination.name}`}>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-50 rounded-full px-10 py-6 text-lg font-bold shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Build My Itinerary (Free)
            </Button>
          </Link>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6">
            {destination.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
