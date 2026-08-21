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

export const DEFAULT_FALLBACK = "https://image.pollinations.ai/prompt/beautiful%20travel%20destination%20landscape%20photography?width=800&height=600&nologo=true";

/**
 * Centralized Image Resolver
 * Resolves a context string to a highly stable travel image using Pollinations AI.
 * This guarantees a beautiful, context-aware image even if the AI hallucinates a URL or Unsplash 403s.
 */
export function resolveTravelImage(contextInput: TravelImageContext | string): string {
  // Normalize input into a search string
  let searchContext = "";
  if (typeof contextInput === "string") {
    searchContext = contextInput;
  } else {
    // Prioritize descriptive fields
    const parts = [];
    if (contextInput.destination) parts.push(contextInput.destination);
    if (contextInput.location) parts.push(contextInput.location);
    if (contextInput.title) parts.push(contextInput.title);
    if (contextInput.category) parts.push(contextInput.category);
    
    searchContext = parts.length > 0 
      ? parts.join(" ") 
      : Object.values(contextInput).filter((v) => typeof v === "string" && v.trim().length > 0).join(" ");
  }

  searchContext = searchContext.trim();
  
  if (!searchContext) {
    return DEFAULT_FALLBACK;
  }

  // Add some photography keywords to make it look like a high-quality travel photo
  const prompt = `${searchContext} beautiful travel photography high quality`;
  
  // Use pollinations.ai to generate a reliable context-aware image on the fly
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true`;
}
