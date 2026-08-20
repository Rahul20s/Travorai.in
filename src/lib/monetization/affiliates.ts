export type LinkType = "exact_deep_link" | "provider_search" | "category_link" | "generic_fallback";

const TRAVELPAYOUTS_MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "764020";

function generateTpMediaDeepLink(
  campaignId: string,
  targetUrl: string,
  subId: string,
  p: string,
  trs: string
) {
  return `https://tp.media/r?campaign_id=${campaignId}&marker=${TRAVELPAYOUTS_MARKER}&p=${p}&sub_id=${subId}&trs=${trs}&u=${encodeURIComponent(targetUrl)}`;
}

export interface AffiliateProviderRecord {
  provider: string;
  category: string | string[]; // Can handle multiple alias categories if needed
  affiliateUrl: string;
  linkType: LinkType;
  priority: number;
  enabled: boolean;
  label: string;
  trackingSubId: string;
  destination?: string;
  productId?: string;
  productUrl?: string;
}

export interface AffiliateRecommendation {
  providerName: string;
  url: string;
  ctaText: string;
  icon: string;
  linkType: LinkType;
  trackingSubId: string;
}

const registry: AffiliateProviderRecord[] = [
  // Flights
  {
    provider: "Kiwi.com",
    category: "flight",
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_KIWI_URL || "https://kiwi.tpo.li/ZjSPBjni",
    linkType: "generic_fallback",
    priority: 1,
    enabled: true,
    label: "Kiwi",
    trackingSubId: "travora_flight_kiwi"
  },
  {
    provider: "Aviasales",
    category: "flight",
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_AVIASALES_URL || "https://aviasales.tpo.li/QsKUQSxh",
    linkType: "generic_fallback",
    priority: 2,
    enabled: true,
    label: "Aviasales",
    trackingSubId: "travora_flight_aviasales"
  },
  // Activities / Attractions
  {
    provider: "Klook",
    category: ["activity", "attraction", "tour", "restaurant"],
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_KLOOK_URL || "https://klook.tpo.li/RDxJ5k8N",
    linkType: "generic_fallback",
    priority: 1,
    enabled: true,
    label: "Klook",
    trackingSubId: "travora_activity"
  },
  {
    provider: "KKday",
    category: ["activity", "attraction", "tour", "restaurant"],
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_KKDAY_URL || "https://kkday.tpo.li/Jegs54RK",
    linkType: "generic_fallback",
    priority: 2,
    enabled: true,
    label: "KKday",
    trackingSubId: "travora_activity_kkday"
  },
  // Transfers
  {
    provider: "Kiwitaxi",
    category: ["transfer", "airport_transfer", "transport"],
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_KIWITAXI_URL || "https://kiwitaxi.tpo.li/piqeiuOC",
    linkType: "generic_fallback",
    priority: 1,
    enabled: true,
    label: "Kiwitaxi",
    trackingSubId: "travora_transfer"
  },
  // Car Rentals
  {
    provider: "QEEQ",
    category: "car_rental",
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_QEEQ_URL || "https://qeeq.tpo.li/U4dTnOs9",
    linkType: "generic_fallback",
    priority: 1,
    enabled: true,
    label: "QEEQ",
    trackingSubId: "travora_car"
  },
  // Hotels (Temporary Fallback)
  {
    provider: "Klook",
    category: "stay",
    affiliateUrl: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_KLOOK_URL || "https://klook.tpo.li/RDxJ5k8N",
    linkType: "generic_fallback",
    priority: 1,
    enabled: true,
    label: "Klook",
    trackingSubId: "travora_hotel" // Added a logical sub id for stay
  }
];

function getCategoryConfig(category: string, providerName: string, linkType: LinkType) {
  const isGeneric = linkType === "generic_fallback";
  switch (category.toLowerCase()) {
    case "flight":
      return {
        ctaText: isGeneric ? `Search flights on ${providerName} →` : `Compare flights →`,
        icon: "✈️"
      };
    case "stay":
      return {
        ctaText: isGeneric ? `Find hotels on ${providerName} →` : `Find hotels →`,
        icon: "🏨"
      };
    case "activity":
    case "tour":
    case "attraction":
    case "restaurant":
      return {
        ctaText: isGeneric ? `Find experiences on ${providerName} →` : `Book this experience →`,
        icon: "🎟️"
      };
    case "transfer":
    case "transport":
    case "airport_transfer":
      return {
        ctaText: isGeneric ? `Find airport transfers on ${providerName} →` : `Book transfer →`,
        icon: "🚕"
      };
    case "car_rental":
      return {
        ctaText: isGeneric ? `Find rental cars on ${providerName} →` : `Find rental cars →`,
        icon: "🚗"
      };
    default:
      return {
        ctaText: `Book on ${providerName} →`,
        icon: "✨"
      };
  }
}

// ─── Helper: produce a date string YYYY-MM-DD offset from today ───────────────
function offsetDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

// ─── Helper: convert a city name to a lowercase URL slug ─────────────────────
function toSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Booking.com affiliate ID — swap this env var once you have your aid number
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "2311236";

export function getAffiliateProvider(
  category: string,
  destination?: string,
  itemTitle?: string,
  origin?: string,
  startDate?: string,      // ISO: "2025-12-15" — optional, falls back to 30 days from now
  durationDays?: number,   // trip length — used to calculate checkout date
  travelers?: number       // number of travelers in the group
): AffiliateRecommendation | null {
  const normCategory = category.toLowerCase();
  const dest = destination || "World";
  const orig = origin || "Delhi";
  const adults = travelers || 1;

  // ── Compute dates (fallback: depart 30 days from now, return after durationDays) ──
  const checkin  = startDate || offsetDate(30);
  const checkout = (() => {
    const base = new Date(checkin);
    base.setDate(base.getDate() + (durationDays || 3));
    return base.toISOString().split("T")[0];
  })();
  const [ciYear, ciMonth, ciDay]   = checkin.split("-");
  const [coYear, coMonth, coDay]   = checkout.split("-");

  // ── Activities / Tours / Restaurants → Klook (direct affiliate search, no wrapper) ──
  if (
    normCategory === "activity" ||
    normCategory === "tour"     ||
    normCategory === "attraction" ||
    normCategory === "restaurant"
  ) {
    // Direct Klook search URL — no TravelPayouts wrapper to avoid extra redirects
    const query = itemTitle && destination
      ? `${destination} ${itemTitle}`
      : dest;
    const url = `https://www.klook.com/search/result/?query=${encodeURIComponent(query)}&aid=${TRAVELPAYOUTS_MARKER}&adults=${adults}`;

    const config = getCategoryConfig(normCategory, "Klook", "provider_search");
    return {
      providerName: "Klook",
      url,
      ctaText: `Book "${itemTitle || dest}" on Klook →`,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_activity"
    };
  }

  // ── Hotels / Stays → Booking.com with city + date + group size pre-fill ─────
  if (normCategory === "stay" || normCategory === "hotel") {
    const url =
      `https://www.booking.com/searchresults.html` +
      `?ss=${encodeURIComponent(dest)}` +
      `&checkin_year=${ciYear}&checkin_month=${ciMonth}&checkin_monthday=${ciDay}` +
      `&checkout_year=${coYear}&checkout_month=${coMonth}&checkout_monthday=${coDay}` +
      `&group_adults=${adults}&no_rooms=1` +
      `&aid=${BOOKING_AID}` +
      `&label=travora-${toSlug(dest)}`;

    return {
      providerName: "Booking.com",
      url,
      ctaText: `Find hotels in ${dest} for ${adults} on Booking.com →`,
      icon: "🏨",
      linkType: "provider_search",
      trackingSubId: "travora_hotel"
    };
  }

  // ── Flights → Kiwi.com with origin, destination, dates, and passenger count ─
  if (normCategory === "flight") {
    const origSlug = toSlug(orig);
    const destSlug = toSlug(dest);
    const url =
      `https://www.kiwi.com/en/search/results/${origSlug}/${destSlug}` +
      `/${checkin}/${checkout}` +
      `?adults=${adults}&children=0&infants=0` +
      `&affilid=travelpayoutsdeeplink_${TRAVELPAYOUTS_MARKER}`;

    const config = getCategoryConfig(normCategory, "Kiwi.com", "provider_search");
    return {
      providerName: "Kiwi.com",
      url,
      ctaText: `Search ${orig} → ${dest} flights for ${adults} on Kiwi →`,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_flight"
    };
  }

  // Trains via Klook (Since Klook supports Trains & Buses)
  if (normCategory === "train") {
    // Klook's /transport/ route defaults to Japan Trains. 
    // We use the global search with "Train" appended to find local transport options globally.
    const targetUrl = `https://www.klook.com/search/result/?query=${encodeURIComponent(dest + ' Train')}`;
    const deepLink = generateTpMediaDeepLink("137", targetUrl, "travora_train", "4110", "561821");
    
    const config = getCategoryConfig(normCategory, "Klook", "provider_search");
    return {
      providerName: "Klook",
      url: deepLink,
      ctaText: "Check train tickets on Klook →",
      icon: "🚆",
      linkType: "provider_search",
      trackingSubId: "travora_train"
    };
  }

  // Airport Transfers via Kiwitaxi
  if (normCategory === "transfer" || normCategory === "transport" || normCategory === "airport_transfer") {
    // Avoid /search which might 302 redirect if the city isn't an exact match
    const targetUrl = `https://kiwitaxi.com/en/?place_to=${encodeURIComponent(dest)}`;
    const deepLink = generateTpMediaDeepLink("1", targetUrl, "travora_transfer", "647", "561821");
    
    const config = getCategoryConfig(normCategory, "Kiwitaxi", "provider_search");
    return {
      providerName: "Kiwitaxi",
      url: deepLink,
      ctaText: config.ctaText,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_transfer"
    };
  }

  // Car Rentals via QEEQ
  if (normCategory === "car" || normCategory === "car_rental") {
    // Avoid /search which causes a 302 /error redirect on unknown locations
    const targetUrl = `https://www.qeeq.com/?pickUpLocationName=${encodeURIComponent(dest)}`;
    const deepLink = generateTpMediaDeepLink("172", targetUrl, "travora_car", "4845", "561821");
    
    const config = getCategoryConfig(normCategory, "QEEQ", "provider_search");
    return {
      providerName: "QEEQ",
      url: deepLink,
      ctaText: config.ctaText,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_car"
    };
  }

  // Fallback to registry for anything else
  const matches = registry.filter(p => 
    p.enabled && (Array.isArray(p.category) ? p.category.includes(normCategory) : p.category === normCategory)
  );

  if (matches.length === 0) return null;

  // Prioritize exact_deep_link > provider_search > category_link > generic_fallback, then by provider priority
  const sorted = matches.sort((a, b) => {
    const linkWeights: Record<LinkType, number> = {
      exact_deep_link: 4,
      provider_search: 3,
      category_link: 2,
      generic_fallback: 1
    };
    
    if (linkWeights[a.linkType] !== linkWeights[b.linkType]) {
      return linkWeights[b.linkType] - linkWeights[a.linkType];
    }
    
    return a.priority - b.priority;
  });

  const selected = sorted[0];
  const config = getCategoryConfig(normCategory, selected.label, selected.linkType);

  return {
    providerName: selected.label,
    url: selected.affiliateUrl,
    ctaText: config.ctaText,
    icon: config.icon,
    linkType: selected.linkType,
    trackingSubId: selected.trackingSubId
  };
}
