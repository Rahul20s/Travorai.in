# Voyage AI SaaS Starter

AI travel planner built as a startup-grade Next.js SaaS skeleton.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS v4 design system
- shadcn-style UI primitives
- Clerk auth placeholder
- Prisma + Supabase PostgreSQL
- Vercel AI SDK with provider abstraction
- Mapbox-ready travel layer
- Upstash Redis, Resend, PostHog, Sentry-ready placeholders

## Run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add keys only when you need each service. Start without paid travel APIs; use affiliate links and mock provider data while validating users.

## Suggested build order

1. Planner UI and static itinerary generation
2. Clerk auth and saved trips
3. Supabase PostgreSQL with Prisma
4. OpenAI planning endpoint with structured output
5. Mapbox maps and weather
6. Affiliate hotel/activity links
7. Payments and premium features
