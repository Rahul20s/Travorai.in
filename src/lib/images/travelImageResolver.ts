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

const DESTINATION_IMAGES: Record<string, string> = {
  // Guaranteed fast, reliable Wikimedia Commons images for main dashboard cards
  goa: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Goa_beach_sunset.jpg/800px-Goa_beach_sunset.jpg",
  dubai: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg/800px-Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg",
  bali: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Bali_Indonesia_Pura-Ulun-Danu-Bratan-01.jpg/800px-Bali_Indonesia_Pura-Ulun-Danu-Bratan-01.jpg",
  kashmir: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dal_Lake_Srinagar_Kashmir.jpg/800px-Dal_Lake_Srinagar_Kashmir.jpg",
  paris: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques_0002.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques_0002.jpg",
  switzerland: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/800px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg",
  kerala: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kerala_backwaters_boating.jpg/800px-Kerala_backwaters_boating.jpg",
  rajasthan: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Hawa_Mahal%2C_Jaipur%2C_Rajasthan.jpg/800px-Hawa_Mahal%2C_Jaipur%2C_Rajasthan.jpg",
  himachal: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manali_City.jpg/800px-Manali_City.jpg",
  london: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/800px-London_Montage_L.jpg",
  tokyo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg",
  rome: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/800px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
  maldives: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Maldives_resort.jpg/800px-Maldives_resort.jpg"
};

export const DEFAULT_FALLBACK = "https://picsum.photos/800/600";

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
 * Uses rock-solid fast Wikimedia Commons images for known destinations,
 * and falls back to fastly-cached picsum for anything else so we NEVER time out.
 */
export function resolveTravelImage(contextInput: TravelImageContext | string): string {
  let searchContext = "";
  if (typeof contextInput === "string") {
    searchContext = contextInput;
  } else {
    searchContext = Object.values(contextInput)
      .filter((v) => typeof v === "string" && v.trim().length > 0)
      .join(" ");
  }

  // 1. Try to match highly reliable known destination images first
  const destMatch = findBestMatch(searchContext, DESTINATION_IMAGES);
  if (destMatch) return destMatch;

  // 2. Fallback to picsum seeded with the destination name (fast, never 404s, prevents timeouts)
  const seedWord = searchContext.trim().split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  if (seedWord) {
    return `https://picsum.photos/seed/${seedWord}/800/600`;
  }

  return DEFAULT_FALLBACK;
}
