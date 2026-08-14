/**
 * OpenStreetMap Nominatim Geocoding Service
 * Respects usage policy: 1 request per second, caching, user-agent.
 */

// Simple in-memory cache for the lifecycle of the server process
const geocodeCache = new Map<string, { lat: number; lon: number }>();

// Rate limiting queue
let lastRequestTime = 0;
const NOMINATIM_DELAY_MS = 1000; // 1 request per second as per their policy

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function geocodeLocation(query: string): Promise<{ lat: number; lon: number } | null> {
  const cacheKey = query.toLowerCase().trim();
  
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  // Rate limit
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < NOMINATIM_DELAY_MS) {
    await wait(NOMINATIM_DELAY_MS - timeSinceLast);
  }
  
  lastRequestTime = Date.now();

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'TravoraApp/1.0 (https://travorai.in)'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
      
      // Cache the result
      geocodeCache.set(cacheKey, result);
      return result;
    }
    
    return null;
  } catch (error) {
    console.error("Geocoding failed for", query, error);
    return null;
  }
}
