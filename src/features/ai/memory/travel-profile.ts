export type TravelProfile = {
  userId: string;
  homeCity?: string;
  defaultBudget?: number;
  preferredAirlines: string[];
  foodPreferences: string[];
  seatPreference?: "window" | "aisle" | "no-preference";
  travelStyle: Array<
    "budget" | "luxury" | "adventure" | "relax" | "backpacking" | "family" | "romantic" | "solo" | "couple" | "student"
  >;
  languages: string[];
  companions: string[];
  passportCountry?: string;
  defaultCurrency: "INR" | "USD" | "AED" | "JPY";
};

export const emptyTravelProfile = (userId: string): TravelProfile => ({
  userId,
  preferredAirlines: [],
  foodPreferences: [],
  travelStyle: [],
  languages: ["English"],
  companions: [],
  defaultCurrency: "INR"
});
