export type TravelProvider = "mapbox" | "openweather" | "amadeus" | "booking" | "viator" | "irctc";

export const providerRoadmap: Record<TravelProvider, { phase: number; purpose: string }> = {
  mapbox: { phase: 1, purpose: "Maps, nearby places and route context" },
  openweather: { phase: 1, purpose: "Weather timeline and seasonal advice" },
  viator: { phase: 2, purpose: "Activity affiliate links" },
  booking: { phase: 2, purpose: "Hotel affiliate and later partner booking" },
  amadeus: { phase: 3, purpose: "Flight search and booking workflows" },
  irctc: { phase: 4, purpose: "India train data through approved partners" }
};

export function getEnabledProviders() {
  return Object.entries(providerRoadmap)
    .filter(([, provider]) => provider.phase <= 2)
    .map(([name]) => name as TravelProvider);
}
