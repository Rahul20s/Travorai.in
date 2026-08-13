# Travora — Account Setup Guide

Follow these steps in order. Each service has a free tier suitable for MVP.

---

## What you need

| Service | Purpose | Sign up |
|---------|---------|---------|
| **Supabase** | Database (trips, profiles) | [supabase.com](https://supabase.com) |
| **Clerk** | Login / signup | [clerk.com](https://clerk.com) |
| **OpenAI** | AI trip planning | [platform.openai.com](https://platform.openai.com) |
| **Vercel** | Host the app | [vercel.com](https://vercel.com) |
| **GoDaddy** | Domain name (optional) | [godaddy.com](https://godaddy.com) |

---

## Step 1: Supabase (Database)

1. Sign in at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New project**
3. Name: `travora`
4. Region: **South Asia (Mumbai)** — closest to India
5. Set a database password — save it in a password manager
6. Wait ~2 minutes for the project to be ready
7. Go to **Project Settings → Database**
8. Under **Connection string**, choose **URI** and copy the **Transaction pooler** URL (port 6543)
9. Replace `[YOUR-PASSWORD]` with your actual password

In your project folder:

```bash
cp .env.example .env.local
```

Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres.xxxx:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
```

Then create tables and seed destinations:

```bash
npm install
npx prisma db push
npm run db:seed
```

---

## Step 2: Clerk (Authentication)

1. Sign in at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Click **Create application** → name: `Travora`
3. Enable sign-in methods:
   - **Email** ✓
   - **Google** ✓ (recommended for Indian users)
4. Go to **Configure → Paths** and set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/onboarding`
5. Go to **API Keys** and copy both keys into `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Free tier:** 10,000 monthly active users.

---

## Step 3: OpenAI (AI Trip Planner)

1. Sign in at [platform.openai.com](https://platform.openai.com)
2. Go to **API keys → Create new secret key**
3. Copy the key immediately (shown only once)
4. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-proj-...
```

5. Go to **Settings → Billing** and add a payment method
6. Set a **usage limit** (e.g. $10/month) under **Usage limits**

**Without OpenAI key:** Travora still works with mock trip data. Add the key when ready for real AI plans.

**Cost estimate:** ~₹0.15 per trip plan with `gpt-4o-mini`.

---

## Step 4: Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test flow:**
1. Homepage → try "Plan my trip" (works without login)
2. Click **Get started** → create account via Clerk
3. Complete onboarding (travel style, budget, home city)
4. Dashboard → plan a personalized trip

---

## Step 5: Deploy to Vercel

1. Push your code to **GitHub**
2. Sign in at [vercel.com](https://vercel.com) with GitHub
3. **Add New Project** → import your Travora repo
4. Add these **Environment Variables** (same as `.env.local`):
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `OPENAI_API_KEY`
5. Click **Deploy**

Your app will be live at `your-project.vercel.app`.

---

## Step 6: Connect GoDaddy domain (when ready)

1. Buy domain on GoDaddy (e.g. `travora.in`)
2. In Vercel → your project → **Settings → Domains**
3. Add `travora.in` — Vercel shows DNS records
4. In GoDaddy → **DNS Management** → add the CNAME/A records Vercel provides
5. Wait 10–60 minutes for DNS to propagate

---

## Environment variables checklist

Copy `.env.example` to `.env.local` and fill in:

```env
# Required for database
DATABASE_URL=""

# Required for login
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# Required for AI plans (optional for mock mode)
OPENAI_API_KEY=""

# Add later when needed
NEXT_PUBLIC_MAPBOX_TOKEN=""
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Unauthorized" on onboarding | Make sure Clerk keys are in `.env.local` and restart `npm run dev` |
| Database connection failed | Use Supabase **pooler** URL (port 6543), not direct connection |
| AI returns mock data | Add `OPENAI_API_KEY` and restart dev server |
| Clerk redirect loop | Check Paths in Clerk dashboard match `/sign-in`, `/sign-up`, `/dashboard` |

---

## Monthly cost (MVP)

| Service | Cost |
|---------|------|
| Vercel | Free |
| Supabase | Free |
| Clerk | Free |
| OpenAI | ~₹500–2000/month |
| GoDaddy domain | ~₹800–1500/year |
| **Total** | **~₹500–3000/month** |
