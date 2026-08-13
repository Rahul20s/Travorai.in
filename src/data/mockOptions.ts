export interface MockTravelOption {
  id: string;
  provider: string;
  route: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  type: "Flight" | "Train";
  baggage?: string;
  stops?: string;
  cancellation?: string;
}

export interface MockStayOption {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  type: "Hotel" | "Resort" | "Villa" | "Hostel" | "Boutique";
  amenities: string[];
  cancellation?: string;
}

export interface MockActivityOption {
  id: string;
  name: string;
  duration: string;
  rating: number;
  price: number;
  image: string;
  type: "Tour" | "Water Sport" | "Cultural" | "Nature";
  inclusions: string[];
}

export interface MockFoodOption {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceEstimate: string;
  image: string;
  type: "Restaurant" | "Cafe" | "Street Food" | "Fine Dining";
  mustTry: string;
}

export interface MockTransportOption {
  id: string;
  provider: string;
  vehicle: string;
  price: number;
  type: "Cab" | "Scooter" | "Self-Drive";
  details: string;
}

export const MOCK_FLIGHTS: MockTravelOption[] = [
  {
    id: "f1",
    provider: "IndiGo",
    route: "BOM → GOI",
    departure: "08:30",
    arrival: "09:40",
    duration: "1h 10m",
    price: 4200,
    type: "Flight",
    baggage: "15kg Cabin",
    stops: "Non-stop",
    cancellation: "Partial Refund"
  },
  {
    id: "f2",
    provider: "Vistara",
    route: "BOM → GOI",
    departure: "11:15",
    arrival: "12:35",
    duration: "1h 20m",
    price: 5800,
    type: "Flight",
    baggage: "20kg Checked",
    stops: "Non-stop",
    cancellation: "Free Cancellation"
  },
  {
    id: "f3",
    provider: "Air India",
    route: "BOM → GOI",
    departure: "14:00",
    arrival: "15:15",
    duration: "1h 15m",
    price: 3900,
    type: "Flight",
    baggage: "15kg Cabin",
    stops: "Non-stop",
    cancellation: "Non-refundable"
  }
];

export const MOCK_TRAINS: MockTravelOption[] = [
  {
    id: "t1",
    provider: "IRCTC (Tejas Exp)",
    route: "CSMT → MAO",
    departure: "05:50",
    arrival: "14:20",
    duration: "8h 30m",
    price: 2400,
    type: "Train",
    baggage: "Included",
    stops: "6 Stops",
    cancellation: "Free Cancellation"
  }
];

export const MOCK_STAYS: MockStayOption[] = [
  {
    id: "s1",
    name: "Taj Exotica Resort & Spa",
    location: "Benaulim, South Goa",
    rating: 4.8,
    price: 18500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    type: "Resort",
    amenities: ["Pool", "Spa", "Beach Access", "Breakfast Included"],
    cancellation: "Free Cancellation"
  },
  {
    id: "s2",
    name: "W Goa",
    location: "Vagator, North Goa",
    rating: 4.6,
    price: 15200,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    type: "Resort",
    amenities: ["Party Deck", "Spa", "Gym", "Breakfast Included"],
    cancellation: "Partial Refund"
  },
  {
    id: "s3",
    name: "The Postcard Hotel",
    location: "Moira, North Goa",
    rating: 4.9,
    price: 22000,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    type: "Boutique",
    amenities: ["Heritage", "Pool", "Anytime Breakfast", "Yoga"],
    cancellation: "Free Cancellation"
  }
];

export const MOCK_ACTIVITIES: MockActivityOption[] = [
  {
    id: "a1",
    name: "Scuba Diving at Grande Island",
    duration: "6 Hours",
    rating: 4.7,
    price: 3500,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    type: "Water Sport",
    inclusions: ["PADI Instructor", "Equipment", "Lunch"]
  },
  {
    id: "a2",
    name: "Old Goa Heritage Walk",
    duration: "3 Hours",
    rating: 4.9,
    price: 1200,
    image: "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?w=600&h=400&fit=crop",
    type: "Cultural",
    inclusions: ["Expert Guide", "Church Entry", "Water Bottle"]
  }
];

export const MOCK_FOOD: MockFoodOption[] = [
  {
    id: "d1",
    name: "Gunpowder",
    cuisine: "South Indian Coastal",
    rating: 4.8,
    priceEstimate: "₹1,500 for two",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    type: "Restaurant",
    mustTry: "Andhra Prawn Curry"
  },
  {
    id: "d2",
    name: "Thalassa",
    cuisine: "Greek",
    rating: 4.6,
    priceEstimate: "₹2,500 for two",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    type: "Fine Dining",
    mustTry: "Spicy Feta Dip"
  }
];

export const MOCK_TRANSPORT: MockTransportOption[] = [
  {
    id: "tr1",
    provider: "GoaMiles",
    vehicle: "Sedan (AC)",
    price: 1200,
    type: "Cab",
    details: "Airport to North Goa (Flat Rate)"
  },
  {
    id: "tr2",
    provider: "Local Rental",
    vehicle: "Honda Activa",
    price: 500,
    type: "Scooter",
    details: "Per day rental (Excludes fuel)"
  }
];
