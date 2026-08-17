import { z } from "zod";

export const tripDayItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(["flight", "train", "stay", "activity", "restaurant", "transport", "note"]).optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  image: z.string().url().optional(),
  price: z.number().int().nonnegative().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const tripDaySchema = z.object({
  day: z.number().int(),
  title: z.string(),
  items: z.array(z.string()).min(2).max(8),
  structuredItems: z.array(tripDayItemSchema).min(2).max(10).optional()
});

export const budgetBreakdownSchema = z.object({
  category: z.string(),
  amount: z.number().int().nonnegative(),
  percentage: z.number().int().min(0).max(100)
});

export const tripPlanSchema = z.object({
  destination: z.string(),
  origin: z.string().optional(),
  durationDays: z.number().int().min(1).max(30),
  budget: z.number().int().positive(),
  weather: z.string(),
  bestMonth: z.string(),
  summary: z.string().optional(),
  budgetBreakdown: z.array(budgetBreakdownSchema).min(2).max(6).optional(),
  days: z.array(tripDaySchema),
  deals: z.array(
    z.object({
      type: z.enum(["hotel", "flight", "train"]),
      title: z.string(),
      description: z.string(),
      price: z.number().int().nonnegative(),
      image: z.string().url(),
      rating: z.number().min(0).max(5).optional(),
      location: z.string().optional()
    })
  ).min(1).max(5)
});

export const tripRefinementSchema = tripPlanSchema.partial();
