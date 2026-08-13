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
} from "./types";

export interface FlightProvider {
  name: string;
  searchFlights(request: FlightSearchRequest): Promise<FlightOption[]>;
}

export interface TrainProvider {
  name: string;
  searchTrains(request: TrainSearchRequest): Promise<TrainOption[]>;
}

export interface HotelProvider {
  name: string;
  searchHotels(request: HotelSearchRequest): Promise<HotelOption[]>;
}

export interface ActivityProvider {
  name: string;
  searchActivities(request: ActivitySearchRequest): Promise<ActivityOption[]>;
}

export interface TransportProvider {
  name: string;
  searchTransport(request: TransportSearchRequest): Promise<TransportOption[]>;
}

class ProviderRegistry {
  private flightProviders: FlightProvider[] = [];
  private trainProviders: TrainProvider[] = [];
  private hotelProviders: HotelProvider[] = [];
  private activityProviders: ActivityProvider[] = [];
  private transportProviders: TransportProvider[] = [];

  registerFlightProvider(provider: FlightProvider) {
    this.flightProviders.push(provider);
  }

  registerTrainProvider(provider: TrainProvider) {
    this.trainProviders.push(provider);
  }

  registerHotelProvider(provider: HotelProvider) {
    this.hotelProviders.push(provider);
  }

  registerActivityProvider(provider: ActivityProvider) {
    this.activityProviders.push(provider);
  }

  registerTransportProvider(provider: TransportProvider) {
    this.transportProviders.push(provider);
  }

  getFlightProviders(): FlightProvider[] {
    return this.flightProviders;
  }

  getTrainProviders(): TrainProvider[] {
    return this.trainProviders;
  }

  getHotelProviders(): HotelProvider[] {
    return this.hotelProviders;
  }

  getActivityProviders(): ActivityProvider[] {
    return this.activityProviders;
  }

  getTransportProviders(): TransportProvider[] {
    return this.transportProviders;
  }
}

// Export a singleton instance
export const travelProviderRegistry = new ProviderRegistry();
