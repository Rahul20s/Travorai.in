/**
 * Centralized Google Analytics Event Tracking
 * 
 * Usage:
 * import { trackAffiliateClick, trackSearchEvent } from "@/lib/analytics/events";
 */
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Track when a user clicks on an affiliate booking link
 */
export function trackAffiliateClick(params: {
  provider: string;
  category: string;
  destination: string;
  itemTitle?: string;
  linkType?: string;
  tripId?: string;
}) {
  sendGAEvent("event", "affiliate_click", {
    provider_name: params.provider,
    service_category: params.category,
    destination: params.destination,
    item_title: params.itemTitle || "unknown",
    link_type: params.linkType || "unknown",
    trip_id: params.tripId || "unknown",
  });
}

/**
 * Track when a user performs a search
 */
export function trackSearchEvent(
  query: string,
  destination?: string,
  filters?: Record<string, any>
) {
  sendGAEvent("event", "search", {
    search_term: query,
    destination: destination || "unknown",
    ...filters,
  });
}

/**
 * Track when an AI trip is successfully generated and saved
 */
export function trackTripCreation(
  destination: string,
  durationDays: number,
  budget: number,
  isAuth: boolean
) {
  sendGAEvent("event", "trip_created", {
    destination,
    duration: durationDays,
    budget_inr: budget,
    is_authenticated: isAuth,
  });
}

/**
 * Track high-intent booking actions (e.g. clicking 'View Deal' on a specific item)
 */
export function trackBookingIntent(
  tripId: string,
  itemTitle: string,
  category: string
) {
  sendGAEvent("event", "booking_intent", {
    trip_id: tripId,
    item_title: itemTitle,
    category,
  });
}
