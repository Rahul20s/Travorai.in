import { travelProviderRegistry } from "./provider-registry";
import { ComparisonEngine } from "./comparison-engine";
import type {
  FlightSearchRequest,
  FlightOption,
  TrainSearchRequest,
  TrainOption,
  HotelSearchRequest,
  HotelOption,
  ActivitySearchRequest,
  ActivityOption,
  TransportSearchRequest,
  TransportOption,
} from "./types";

export class TravelSearchService {
  async searchFlights(request: FlightSearchRequest): Promise<FlightOption[]> {
    if (!request.origin || !request.destination || !request.departureDate) {
      throw new Error("Missing required flight search parameters.");
    }

    const providers = travelProviderRegistry.getFlightProviders();
    const results = await Promise.all(
      providers.map((p) => p.searchFlights(request).catch(() => []))
    );

    const merged = results.flat();
    return ComparisonEngine.evaluate(merged);
  }

  async searchTrains(request: TrainSearchRequest): Promise<TrainOption[]> {
    if (!request.origin || !request.destination || !request.date) {
      throw new Error("Missing required train search parameters.");
    }

    const providers = travelProviderRegistry.getTrainProviders();
    const results = await Promise.all(
      providers.map((p) => p.searchTrains(request).catch(() => []))
    );

    const merged = results.flat();
    return ComparisonEngine.evaluate(merged);
  }

  async searchHotels(request: HotelSearchRequest): Promise<HotelOption[]> {
    if (!request.destination || !request.checkIn || !request.checkOut) {
      throw new Error("Missing required hotel search parameters.");
    }

    const providers = travelProviderRegistry.getHotelProviders();
    const results = await Promise.all(
      providers.map((p) => p.searchHotels(request).catch(() => []))
    );

    const merged = results.flat();
    return ComparisonEngine.evaluate(merged);
  }

  async searchActivities(request: ActivitySearchRequest): Promise<ActivityOption[]> {
    if (!request.destination || !request.date) {
      throw new Error("Missing required activity search parameters.");
    }

    const providers = travelProviderRegistry.getActivityProviders();
    const results = await Promise.all(
      providers.map((p) => p.searchActivities(request).catch(() => []))
    );

    const merged = results.flat();
    return ComparisonEngine.evaluate(merged);
  }

  async searchTransport(request: TransportSearchRequest): Promise<TransportOption[]> {
    if (!request.pickup || !request.drop || !request.date) {
      throw new Error("Missing required transport search parameters.");
    }

    const providers = travelProviderRegistry.getTransportProviders();
    const results = await Promise.all(
      providers.map((p) => p.searchTransport(request).catch(() => []))
    );

    const merged = results.flat();
    return ComparisonEngine.evaluate(merged);
  }
}

export const travelSearchService = new TravelSearchService();
