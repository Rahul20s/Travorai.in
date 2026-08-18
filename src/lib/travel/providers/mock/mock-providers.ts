import {
  MOCK_FLIGHTS,
  MOCK_TRAINS,
  MOCK_STAYS,
  MOCK_ACTIVITIES,
  MOCK_TRANSPORT,
} from "@/data/mockOptions";
import { travelProviderRegistry, type FlightProvider, type TrainProvider, type HotelProvider, type ActivityProvider, type TransportProvider } from "../../provider-registry";
import type {
  FlightOption,
  FlightSearchRequest,
  TrainOption,
  TrainSearchRequest,
  HotelOption,
  HotelSearchRequest,
  ActivityOption,
  ActivitySearchRequest,
  TransportOption,
  TransportSearchRequest,
} from "../../types";

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function durationToMinutes(durationStr: string): number {
  let minutes = 0;
  const hMatch = durationStr.match(/(\d+)\s*h/i);
  const mMatch = durationStr.match(/(\d+)\s*m/i);
  if (hMatch) minutes += parseInt(hMatch[1]) * 60;
  if (mMatch) minutes += parseInt(mMatch[1]);
  return minutes;
}

export class MockFlightProvider implements FlightProvider {
  name = "MockFlights";

  async searchFlights(request: FlightSearchRequest): Promise<FlightOption[]> {
    await simulateDelay(600);
    const origin = request.origin || "BOM";
    const dest = request.destination || "GOI";
    return MOCK_FLIGHTS.map((f) => ({
      id: f.id,
      provider: f.provider,
      airline: f.provider,
      flightNumber: `AI-${Math.floor(Math.random() * 900) + 100}`,
      origin: origin,
      destination: dest,
      departureTime: f.departure,
      arrivalTime: f.arrival,
      duration: f.duration,
      durationMinutes: durationToMinutes(f.duration),
      stops: f.stops === "Non-stop" ? 0 : 1,
      cabinClass: "Economy",
      price: f.price,
      currency: "INR",
      baggage: f.baggage || "15kg",
      refundable: f.cancellation === "Free Cancellation" || f.cancellation === "Partial Refund",
      fetchedAt: new Date().toISOString(),
      isMock: true,
      deepLink: `https://aviasales.tp.st/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}&marker=${process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "561821"}`,
    }));
  }
}

export class MockTrainProvider implements TrainProvider {
  name = "MockTrains";

  async searchTrains(request: TrainSearchRequest): Promise<TrainOption[]> {
    await simulateDelay(600);
    const origin = request.origin || "CSMT";
    const dest = request.destination || "MAO";
    return MOCK_TRAINS.map((t) => ({
      id: t.id,
      provider: t.provider,
      trainName: t.provider,
      trainNumber: "12432",
      origin: origin,
      destination: dest,
      departureTime: t.departure,
      arrivalTime: t.arrival,
      duration: t.duration,
      durationMinutes: durationToMinutes(t.duration),
      class: "3A",
      availability: "Available",
      price: t.price,
      currency: "INR",
      fetchedAt: new Date().toISOString(),
      isMock: true,
      deepLink: "#",
    }));
  }
}

export class MockHotelProvider implements HotelProvider {
  name = "MockHotels";

  async searchHotels(request: HotelSearchRequest): Promise<HotelOption[]> {
    await simulateDelay(800);
    const destName = request.destination || "Goa";
    return MOCK_STAYS.map((s) => ({
      id: s.id,
      provider: "MockBookings",
      name: s.name.replace(/Goa/gi, destName),
      location: s.location.replace(/Goa/gi, destName),
      rating: s.rating,
      reviewCount: Math.floor(Math.random() * 500) + 50,
      roomType: "Standard Room",
      amenities: s.amenities,
      price: s.price * request.rooms,
      nightlyPrice: s.price,
      totalPrice: s.price * request.rooms,
      taxes: Math.floor(s.price * 0.12),
      breakfastIncluded: s.amenities.includes("Breakfast Included"),
      cancellationPolicy: s.cancellation || "Non-refundable",
      image: s.image,
      currency: "INR",
      fetchedAt: new Date().toISOString(),
      isMock: true,
      deepLink: `https://hotellook.tp.st/search?destination=${encodeURIComponent(destName)}&marker=${process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "561821"}`,
    }));
  }
}

export class MockActivityProvider implements ActivityProvider {
  name = "MockActivities";

  async searchActivities(request: ActivitySearchRequest): Promise<ActivityOption[]> {
    await simulateDelay(700);
    const destName = request.destination || "Goa";
    return MOCK_ACTIVITIES.map((a) => ({
      id: a.id,
      provider: "MockTours",
      name: a.name.replace(/Goa/gi, destName),
      destination: destName,
      location: destName, // MOCK_ACTIVITIES doesn't have location
      category: a.type,
      duration: a.duration,
      durationMinutes: durationToMinutes(a.duration),
      rating: a.rating,
      description: a.inclusions.join(", "),
      price: a.price,
      currency: "INR",
      image: a.image,
      fetchedAt: new Date().toISOString(),
      isMock: true,
      deepLink: `https://getyourguide.tp.st/search?q=${encodeURIComponent(destName)}&marker=${process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "561821"}`,
    }));
  }
}

export class MockTransportProvider implements TransportProvider {
  name = "MockTransports";

  async searchTransport(request: TransportSearchRequest): Promise<TransportOption[]> {
    await simulateDelay(500);
    const destName = request.drop || "Goa";
    return MOCK_TRANSPORT.map((tr) => ({
      id: tr.id,
      provider: tr.provider.replace(/Goa/gi, destName),
      vehicleType: tr.vehicle,
      pickup: request.pickup,
      drop: request.drop,
      duration: "1h",
      durationMinutes: 60,
      capacity: tr.type === "Cab" ? 4 : 2,
      availability: true,
      price: tr.price,
      currency: "INR",
      fetchedAt: new Date().toISOString(),
      isMock: true,
      deepLink: "#",
      details: tr.details.replace(/Goa/gi, destName)
    }));
  }
}

// Auto-register mock providers
travelProviderRegistry.registerFlightProvider(new MockFlightProvider());
travelProviderRegistry.registerTrainProvider(new MockTrainProvider());
travelProviderRegistry.registerHotelProvider(new MockHotelProvider());
travelProviderRegistry.registerActivityProvider(new MockActivityProvider());
travelProviderRegistry.registerTransportProvider(new MockTransportProvider());
