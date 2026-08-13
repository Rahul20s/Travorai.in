# Software Requirements Specification

## Objective

Build an AI travel platform that helps users plan, compare, save and eventually book trips while keeping MVP operating costs low.

## MVP Scope

- User authentication with Clerk.
- AI itinerary generation with structured JSON output.
- Saved trips with days, activities, budget and notes.
- Mock hotel, train and flight options.
- Weather and map-ready trip sections.
- Shareable trip page.
- Travel profile memory.
- Basic notifications.
- Admin metrics shell.

## Non-Goals For MVP

- Direct hotel booking.
- Direct flight booking.
- IRCTC integration.
- Complex multi-agent autonomous booking.
- Paid ads marketplace.

## Functional Requirements

- Users can create a trip from a natural language prompt.
- The AI layer returns structured trip JSON, never plain paragraphs as the main contract.
- Users can save, revisit and share trips.
- Users can track budget categories and expenses.
- Users can maintain travel preferences.
- Booking providers must follow a common interface.
- Admin users can inspect growth, bookings, revenue, AI costs and feedback.

## Non-Functional Requirements

- Initial monthly operating cost should remain under Rs. 2,000-3,000 excluding heavy AI usage.
- Provider adapters must be replaceable without rewriting UI.
- Database tables should be normalized where workflows need search, filtering, ownership or reporting.
- All paid provider integrations should be feature-flagged.
- API responses should be typed and validated with Zod.
