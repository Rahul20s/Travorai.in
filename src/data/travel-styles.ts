export type TravelStyleId =
  | "budget"
  | "solo"
  | "couple"
  | "family"
  | "student"
  | "luxury"
  | "adventure"
  | "romantic";

export type TravelStyleOption = {
  id: TravelStyleId;
  label: string;
  description: string;
  emoji: string;
  primary?: boolean;
};

export const travelStyles: TravelStyleOption[] = [
  {
    id: "budget",
    label: "Budget traveller",
    description: "Hostels, trains, street food - maximum trip, minimum spend",
    emoji: "Rs",
    primary: true
  },
  {
    id: "solo",
    label: "Solo explorer",
    description: "Flexible plans, safe routes, meet-new-people vibes",
    emoji: "S"
  },
  {
    id: "couple",
    label: "Couple getaway",
    description: "Romantic stays, sunset spots, cozy dinners",
    emoji: "C"
  },
  {
    id: "family",
    label: "Family trip",
    description: "Kid-friendly activities, comfortable transport, easy pacing",
    emoji: "F"
  },
  {
    id: "student",
    label: "Student traveller",
    description: "Weekend trips, group deals, adventure on a tight budget",
    emoji: "ST"
  },
  {
    id: "luxury",
    label: "Luxury escape",
    description: "Premium stays, private transfers, curated experiences",
    emoji: "L"
  },
  {
    id: "adventure",
    label: "Adventure seeker",
    description: "Trekking, rafting, offbeat routes, adrenaline",
    emoji: "A"
  },
  {
    id: "romantic",
    label: "Romantic retreat",
    description: "Honeymoon-style planning, scenic stays, special moments",
    emoji: "R"
  }
];

export const budgetPresets = [
  { label: "Weekend (Rs. 5k-10k)", min: 5000, max: 10000 },
  { label: "Short trip (Rs. 10k-25k)", min: 10000, max: 25000 },
  { label: "Standard (Rs. 25k-50k)", min: 25000, max: 50000 },
  { label: "Premium (Rs. 50k-1L)", min: 50000, max: 100000 },
  { label: "Luxury (Rs. 1L+)", min: 100000, max: 500000 }
] as const;
