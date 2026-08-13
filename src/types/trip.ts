export type TripDayItem = {
  title: string;
  description?: string;
  type?: "flight" | "stay" | "activity" | "restaurant" | "transport" | "note";
  time?: string;
  location?: string;
  image?: string;
  price?: number;
  latitude?: number;
  longitude?: number;
};

export type TripDay = {
  day: number;
  title: string;
  items: string[];
  structuredItems?: TripDayItem[];
};

export type Deal = {
  type: "hotel" | "flight" | "train";
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  location?: string;
};

export type BudgetBreakdown = {
  category: string;
  amount: number;
  percentage: number;
};

export type TripPlan = {
  destination: string;
  durationDays: number;
  budget: number;
  weather: string;
  bestMonth: string;
  summary?: string;
  budgetBreakdown?: BudgetBreakdown[];
  days: TripDay[];
  deals: Deal[];
};
