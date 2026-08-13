# Travora — Start Here

Travora is an AI travel platform for Indian travellers with international coverage. Budget-first, but built for everyone: solo, couples, families, students, luxury.

## Before coding

1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) — set up Supabase, Clerk, and OpenAI
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) — platform structure
3. Read [ROADMAP.md](./ROADMAP.md) — 12-week plan

## Project structure

```text
src/
  app/           → pages (home, dashboard, onboarding, sign-in/up)
  components/    → UI, trip planner, onboarding
  data/          → destinations, travel styles
  features/      → ai, trips, booking, premium
  services/      → ai orchestrator, travel providers
  lib/           → auth, prisma, utils
prisma/          → schema + seed
docs/            → setup, architecture, roadmap
```

## Main principle

UI → API routes → Trip Engine → AI Orchestrator → OpenAI (or mock)

Components never call OpenAI or external APIs directly.

## Your next steps

1. Create Supabase project (Mumbai region)
2. Create Clerk application
3. Get OpenAI API key
4. Copy `.env.example` → `.env.local`
5. Run `npm install && npx prisma db push && npm run dev`
