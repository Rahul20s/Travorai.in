export interface TravelImageContext {
  src?: string | null;
  alt?: string | null;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  destination?: string | null;
  category?: string | null;
  type?: string | null;
}

const locationFallbacks: Record<string, string> = {
  // GOA
  calangute: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  anjuna: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=60",
  vagator: "https://images.unsplash.com/photo-1544280544-77bfd03fc84c?w=800&auto=format&fit=crop&q=60",
  baga: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  candolim: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  panjim: "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?w=800&auto=format&fit=crop&q=60",
  panaji: "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?w=800&auto=format&fit=crop&q=60",
  morjim: "https://images.unsplash.com/photo-1544280544-77bfd03fc84c?w=800&auto=format&fit=crop&q=60",
  palolem: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  chapora: "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?w=800&auto=format&fit=crop&q=60",
  "old goa": "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?w=800&auto=format&fit=crop&q=60",
  "fort aguada": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  mandrem: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  arpora: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60",

  // KERALA
  kochi: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  munnar: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  alleppey: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  alappuzha: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  varkala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  kovalam: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  backwaters: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",

  // RAJASTHAN
  jaipur: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  udaipur: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  jodhpur: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  jaisalmer: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  pushkar: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",

  // HIMACHAL
  manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60",
  shimla: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60",
  kasol: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60",
  dharamshala: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60",

  // KASHMIR
  srinagar: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=60",
  gulmarg: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=60",
  pahalgam: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=60",
  
  // INTERNATIONAL
  uluwatu: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60",
  "burj khalifa": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60",
  "eiffel tower": "https://images.unsplash.com/photo-1502602898657-3e907614f1be?w=800&auto=format&fit=crop&q=60",
};

const destinationFallbacks: Record<string, string> = {
  goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=60",
  rajasthan: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  himachal: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60",
  kashmir: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=60",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60",
  uae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60",
  paris: "https://images.unsplash.com/photo-1502602898657-3e907614f1be?w=800&auto=format&fit=crop&q=60",
  france: "https://images.unsplash.com/photo-1502602898657-3e907614f1be?w=800&auto=format&fit=crop&q=60",
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=60",
  japan: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=60",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=60",
  bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=60",
  thailand: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=60",
  london: "https://images.unsplash.com/photo-1513635269975-59693e2498ef?w=800&auto=format&fit=crop&q=60",
  italy: "https://images.unsplash.com/photo-1516483638261-f40af5ed3228?w=800&auto=format&fit=crop&q=60",
  rome: "https://images.unsplash.com/photo-1516483638261-f40af5ed3228?w=800&auto=format&fit=crop&q=60",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=60",
};

const categoryFallbacks: Record<string, string> = {
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
  market: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60",
  "flea market": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60",
  temple: "https://images.unsplash.com/photo-1514222287412-d1d7bb0757a3?w=800&auto=format&fit=crop&q=60",
  fort: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
  museum: "https://images.unsplash.com/photo-1518998053401-a28c2e6462dc?w=800&auto=format&fit=crop&q=60",
  waterfall: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=60",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
  trek: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
  sightseeing: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format&fit=crop&q=60",
  adventure: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format&fit=crop&q=60",
  shopping: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60",
  nightlife: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=60",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
  cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60",
  "street food": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
  resort: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
  train: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=60",
  flight: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
  airport: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
  cab: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60",
  transfer: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60",
  activity: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format&fit=crop&q=60",
  city: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format&fit=crop&q=60",
  "local transport": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60"
};

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60";

/**
 * Searches a text string against a dictionary, matching longest keys first to ensure specificity.
 */
function findBestMatch(text: string, dictionary: Record<string, string>): string | null {
  const lowerText = text.toLowerCase();
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (lowerText.includes(key)) {
      return dictionary[key];
    }
  }
  return null;
}

/**
 * Centralized Image Resolver
 * Resolves a context string to the most relevant highly stable travel fallback image.
 * Uses a strict matching priority: Location -> Destination -> Category -> Generic Travel
 */
export function resolveTravelImage(contextInput: TravelImageContext | string): string {
  // Normalize input into a search string
  let searchContext = "";
  if (typeof contextInput === "string") {
    searchContext = contextInput;
  } else {
    searchContext = Object.values(contextInput)
      .filter((v) => typeof v === "string" && v.trim().length > 0)
      .join(" ");
  }

  // 1. Try to match specific location (e.g. "Calangute Beach")
  const locationMatch = findBestMatch(searchContext, locationFallbacks);
  if (locationMatch) return locationMatch;

  // 2. Try to match destination (e.g. "Goa")
  const destMatch = findBestMatch(searchContext, destinationFallbacks);
  if (destMatch) return destMatch;

  // 3. Try to match specific category (e.g. "Flea Market", "Beach")
  const catMatch = findBestMatch(searchContext, categoryFallbacks);
  if (catMatch) return catMatch;

  // 4. Default global travel fallback
  return DEFAULT_FALLBACK;
}
