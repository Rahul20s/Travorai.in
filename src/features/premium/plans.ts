export type PremiumPlan = {
  id: "free" | "plus" | "pro";
  name: string;
  monthlyPriceInr: number;
  aiTripLimit: number;
  features: string[];
};

export const premiumPlans: PremiumPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPriceInr: 0,
    aiTripLimit: 3,
    features: ["Basic itineraries", "Mock hotels and trains", "Shareable trip pages"]
  },
  {
    id: "plus",
    name: "Voyage Plus",
    monthlyPriceInr: 299,
    aiTripLimit: 25,
    features: ["Budget optimizer", "Packing lists", "Weather alerts", "Expense tracker"]
  },
  {
    id: "pro",
    name: "Voyage Pro",
    monthlyPriceInr: 799,
    aiTripLimit: 100,
    features: ["Group planning", "Premium AI models", "Priority support", "Advanced alerts"]
  }
];
