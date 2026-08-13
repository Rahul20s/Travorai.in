export type ComparisonLabel = "BEST PRICE" | "FASTEST" | "BEST VALUE" | "RECOMMENDED";

export interface BaseTravelOption {
  id: string;
  provider: string;
  price: number;
  currency: string;
  deepLink?: string;
  image?: string;
  fetchedAt: string;
  expiresAt?: string;
  isMock?: boolean;
  comparisonLabels?: ComparisonLabel[];
}

export interface FlightOption extends BaseTravelOption {
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string; // e.g., "1h 10m"
  durationMinutes: number; // for sorting
  stops: number;
  cabinClass: string;
  baggage: string;
  refundable: boolean;
}

export interface TrainOption extends BaseTravelOption {
  trainName: string;
  trainNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  durationMinutes: number;
  class: string;
  availability: string;
}

export interface HotelOption extends BaseTravelOption {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  roomType: string;
  amenities: string[];
  nightlyPrice: number;
  totalPrice: number;
  taxes: number;
  breakfastIncluded: boolean;
  cancellationPolicy: string;
}

export interface ActivityOption extends BaseTravelOption {
  name: string;
  destination: string;
  location: string;
  category: string;
  duration: string; // e.g., "3 Hours"
  durationMinutes: number;
  rating: number;
  description: string;
}

export interface TransportOption extends BaseTravelOption {
  vehicleType: string;
  pickup: string;
  drop: string;
  duration: string;
  durationMinutes: number;
  capacity: number;
  availability: boolean;
}

// Search Requests
export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travellers: number;
  adults?: number;
  children?: number;
  infants?: number;
  budget?: number;
  currency?: string;
}

export interface TrainSearchRequest {
  origin: string;
  destination: string;
  date: string;
  class?: string;
  travellers: number;
}

export interface HotelSearchRequest {
  destination: string;
  checkIn: string;
  checkOut: string;
  travellers: number;
  rooms: number;
  budget?: number;
}

export interface ActivitySearchRequest {
  destination: string;
  date: string;
  category?: string;
  travellers: number;
  budget?: number;
}

export interface TransportSearchRequest {
  pickup: string;
  drop: string;
  date: string;
  time?: string;
  vehicleType?: string;
  travellers: number;
}
