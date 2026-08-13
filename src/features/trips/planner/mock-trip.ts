import type { TripPlan } from "@/types/trip";

export const starterTrip: TripPlan = {
  destination: "Goa",
  durationDays: 5,
  budget: 19500,
  weather: "Sunny, 28°C",
  bestMonth: "November",
  summary:
    "A budget-friendly 5-day Goa escape balancing beaches, culture and adventure — perfect for a relaxed but memorable getaway.",
  budgetBreakdown: [
    { category: "Flights", amount: 5000, percentage: 26 },
    { category: "Accommodation", amount: 7200, percentage: 37 },
    { category: "Food", amount: 3400, percentage: 17 },
    { category: "Activities", amount: 2400, percentage: 12 },
    { category: "Transport & Local", amount: 1100, percentage: 6 },
    { category: "Misc", amount: 400, percentage: 2 }
  ],
  days: [
    {
      day: 1,
      title: "Arrival + North Goa",
      items: ["Airport pickup", "Baga beach", "Cafe dinner", "Night market"],
      structuredItems: [
        {
          type: "transport",
          title: "Airport pickup",
          description: "Pre-booked cab from Dabolim airport to your Baga stay.",
          time: "12:00",
          location: "Dabolim Airport",
          price: 900
        },
        {
          type: "activity",
          title: "Baga beach stroll",
          description: "Sunset walk along Baga beach with water sports on offer.",
          time: "16:00",
          location: "Baga Beach",
          price: 0
        },
        {
          type: "restaurant",
          title: "Cafe dinner",
          description: "Budget-friendly seafood thali at a local shacks on Baga stretch.",
          time: "19:30",
          location: "Baga",
          price: 400
        },
        {
          type: "activity",
          title: "Night market",
          description: "Browse the Arpora Saturday night market for souvenirs.",
          time: "21:00",
          location: "Arpora",
          price: 0
        }
      ]
    },
    {
      day: 2,
      title: "Beach circuit",
      items: ["Candolim", "Fort Aguada", "Sunset cruise", "Seafood thali"],
      structuredItems: [
        {
          type: "activity",
          title: "Candolim & Calangute",
          description: "Morning beach circuit across the classic North Goa stretches.",
          time: "09:00",
          location: "Candolim",
          price: 0
        },
        {
          type: "activity",
          title: "Fort Aguada",
          description: "Historic 17th-century Portuguese fort with great views.",
          time: "12:00",
          location: "Fort Aguada",
          price: 50
        },
        {
          type: "activity",
          title: "Sunset cruise",
          description: "Relaxing river cruise with music and views.",
          time: "17:00",
          location: "Mandovi River",
          price: 700
        },
        {
          type: "restaurant",
          title: "Seafood thali dinner",
          description: "Local fish thali at a riverside eatery.",
          time: "20:00",
          location: "Panjim",
          price: 450
        }
      ]
    },
    {
      day: 3,
      title: "Culture day",
      items: ["Fontainhas walk", "Old Goa churches", "Local bakery", "Latin quarter"],
      structuredItems: [
        {
          type: "activity",
          title: "Fontainhas walk",
          description: "Guided walk through Goa's colorful Latin quarter.",
          time: "09:30",
          location: "Fontainhas, Panjim",
          price: 300
        },
        {
          type: "activity",
          title: "Old Goa churches",
          description: "Visit the Basilica of Bom Jesus and Se Cathedral.",
          time: "12:00",
          location: "Old Goa",
          price: 0
        },
        {
          type: "restaurant",
          title: "Local bakery stop",
          description: "Try Portuguese-inspired sweet breads and pastries.",
          time: "15:00",
          location: "Panjim",
          price: 200
        },
        {
          type: "note",
          title: "Latin quarter evening",
          description: "Wander the narrow lanes and soak in the heritage vibe.",
          time: "18:00",
          location: "Panjim",
          price: 0
        }
      ]
    },
    {
      day: 4,
      title: "Adventure",
      items: ["Dudhsagar plan", "Spice farm", "Kayaking", "Quiet dinner"],
      structuredItems: [
        {
          type: "activity",
          title: "Dudhsagar waterfall",
          description: "Day trip to the famous Dudhsagar falls via jeep safari.",
          time: "08:00",
          location: "Dudhsagar",
          price: 1200
        },
        {
          type: "activity",
          title: "Spice farm tour",
          description: "Guided tour of a tropical spice plantation with lunch.",
          time: "14:00",
          location: "Ponda",
          price: 500
        },
        {
          type: "activity",
          title: "Kayaking",
          description: "Paddle through the calm backwaters at Palolem.",
          time: "17:00",
          location: "Palolem",
          price: 400
        },
        {
          type: "restaurant",
          title: "Quiet riverside dinner",
          description: "Low-key dinner to wind down the adventure day.",
          time: "20:00",
          location: "Nerul",
          price: 350
        }
      ]
    },
    {
      day: 5,
      title: "Checkout",
      items: ["Souvenir run", "Beach breakfast", "Airport transfer"],
      structuredItems: [
        {
          type: "activity",
          title: "Souvenir run",
          description: "Pick up cashews, feni and beachwear as keepsakes.",
          time: "09:00",
          location: "Panjim Market",
          price: 500
        },
        {
          type: "restaurant",
          title: "Beach breakfast",
          description: "Final relaxed breakfast by the sea.",
          time: "10:30",
          location: "Baga Beach",
          price: 250
        },
        {
          type: "transport",
          title: "Airport transfer",
          description: "Pre-booked cab back to Dabolim airport.",
          time: "13:00",
          location: "Dabolim Airport",
          price: 900
        }
      ]
    }
  ],
  deals: [
    {
      type: "hotel",
      title: "Casa Verde Resort",
      description: "4.6 rated stay near Candolim with pool, breakfast and scooter rentals.",
      price: 1800,
      rating: 4.6,
      location: "Candolim",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
    },
    {
      type: "flight",
      title: "Mumbai to Goa",
      description: "IndiGo morning flight. Direct route with cabin bag included.",
      price: 3500,
      rating: 4.2,
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80"
    },
    {
      type: "train",
      title: "12298 Duronto",
      description: "Sleeper available. Good budget route with overnight timing.",
      price: 590,
      rating: 4.0,
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=500&q=80"
    }
  ]
};
