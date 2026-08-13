export type BookingVertical = "hotel" | "flight" | "train" | "bus" | "activity" | "insurance";

export type BookingSearchInput = {
  vertical: BookingVertical;
  origin?: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  travelers: number;
  budget?: number;
};

export type BookingOption = {
  provider: string;
  title: string;
  price: number;
  currency: "INR" | "USD";
  affiliateUrl?: string;
  metadata: Record<string, string | number | boolean>;
};

export type BookingProvider = {
  name: string;
  search(input: BookingSearchInput): Promise<BookingOption[]>;
};

export const mockBookingProvider: BookingProvider = {
  name: "mock",
  async search(input) {
    return [
      {
        provider: "mock",
        title: `${input.destination} ${input.vertical} option`,
        price: input.budget ? Math.round(input.budget * 0.18) : 2500,
        currency: "INR",
        metadata: {
          refundable: true,
          startupMode: true
        }
      }
    ];
  }
};
