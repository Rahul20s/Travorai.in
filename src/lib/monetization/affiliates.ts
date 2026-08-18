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

export function getAffiliateProvider(category: string, destination?: string, itemTitle?: string, origin?: string): AffiliateRecommendation | null {
  const normCategory = category.toLowerCase();
  const dest = destination || "World";
  const orig = origin || "Delhi"; // Default origin if not provided
  
  // Try to generate a deep search link for Klook
  if (normCategory === "activity" || normCategory === "tour" || normCategory === "attraction" || normCategory === "restaurant") {
    // If we have an itemTitle and destination, we can make a provider_search link
    const query = itemTitle && destination ? `${itemTitle} ${destination}` : (destination || "World");
    const targetUrl = `https://www.klook.com/search/result/?query=${encodeURIComponent(query)}`;
    const deepLink = generateTpMediaDeepLink("137", targetUrl, "travora_activity", "4110", "561821");
    
    const config = getCategoryConfig(normCategory, "Klook", "provider_search");
    return {
      providerName: "Klook",
      url: deepLink,
      ctaText: config.ctaText,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_activity"
    };
  }

  if (normCategory === "stay" || normCategory === "hotel") {
    // Klook's dedicated hotel search often 404s on deep links or requires strict IDs.
    // The global search handles "Location Hotel" perfectly.
    const targetUrl = `https://www.klook.com/search/result/?query=${encodeURIComponent(dest + ' Hotel')}`;
    const deepLink = generateTpMediaDeepLink("137", targetUrl, "travora_hotel", "4110", "561821");
    
    const config = getCategoryConfig(normCategory, "Klook", "provider_search");
    return {
      providerName: "Klook",
      url: deepLink,
      ctaText: config.ctaText,
      icon: config.icon,
      linkType: "provider_search",
      trackingSubId: "travora_hotel"
    };
  }

  // Flights via Aviasales
  if (normCategory === "flight") {
    // Use the official /search path with origin_name and destination_name which parses text to IATA on the fly
    const targetUrl = `https://www.aviasales.com/search?origin_name=${encodeURIComponent(orig)}&destination_name=${encodeURIComponent(dest)}`;
    const deepLink = generateTpMediaDeepLink("100", targetUrl, "travora_flight", "4114", "561821");
    
    const config = getCategoryConfig(normCategory, "Aviasales", "provider_search");
    return {
      providerName: "Aviasales",
      url: deepLink,
      ctaText: config.ctaText,
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
