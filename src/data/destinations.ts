export type DestinationSeed = {
  name: string;
  country: string;
  region: "india" | "international";
  meta: string;
  image: string;
  bestMonths: string[];
  budgetHint: string;
  tags: string[];
};

export const destinations: DestinationSeed[] = [
  {
    name: "Goa",
    country: "India",
    region: "india",
    meta: "Beaches, nightlife, budget stays",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["November", "December", "January", "February"],
    budgetHint: "Rs. 15,000-Rs. 40,000 for 5 days",
    tags: ["budget", "solo", "couple", "student"]
  },
  {
    name: "Manali",
    country: "India",
    region: "india",
    meta: "Snow, cafes, adventure",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["March", "April", "May", "December"],
    budgetHint: "Rs. 12,000-Rs. 35,000 for 5 days",
    tags: ["budget", "family", "adventure", "couple"]
  },
  {
    name: "Jaipur",
    country: "India",
    region: "india",
    meta: "Palaces, culture, street food",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["October", "November", "December", "February"],
    budgetHint: "Rs. 10,000-Rs. 30,000 for 4 days",
    tags: ["budget", "family", "student", "couple"]
  },
  {
    name: "Kerala",
    country: "India",
    region: "india",
    meta: "Backwaters, Ayurveda, nature",
    image: "https://images.unsplash.com/photo-1593693411511-95a3d471dd83?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["September", "October", "November", "January"],
    budgetHint: "Rs. 18,000-Rs. 50,000 for 6 days",
    tags: ["family", "couple", "luxury", "relax"]
  },
  {
    name: "Rishikesh",
    country: "India",
    region: "india",
    meta: "Yoga, rafting, spiritual retreats",
    image: "https://images.unsplash.com/photo-1587474260587-136d5ac9a42e?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["March", "April", "September", "October"],
    budgetHint: "Rs. 8,000-Rs. 20,000 for 4 days",
    tags: ["budget", "solo", "student", "adventure"]
  },
  {
    name: "Ladakh",
    country: "India",
    region: "india",
    meta: "Mountains, monasteries, road trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["June", "July", "August", "September"],
    budgetHint: "Rs. 25,000-Rs. 60,000 for 7 days",
    tags: ["adventure", "solo", "couple", "student"]
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "international",
    meta: "Beaches, temples, villas",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["April", "May", "June", "September"],
    budgetHint: "Rs. 40,000-Rs. 1,20,000 for 6 days",
    tags: ["couple", "luxury", "budget", "solo"]
  },
  {
    name: "Dubai",
    country: "UAE",
    region: "international",
    meta: "Shopping, desert, family fun",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["November", "December", "January", "February"],
    budgetHint: "Rs. 50,000-Rs. 1,50,000 for 5 days",
    tags: ["family", "luxury", "couple"]
  },
  {
    name: "Paris",
    country: "France",
    region: "international",
    meta: "Art, romance, iconic landmarks",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["April", "May", "June", "September"],
    budgetHint: "Rs. 80,000-Rs. 2,00,000 for 6 days",
    tags: ["couple", "luxury", "romantic", "student"]
  },
  {
    name: "Tokyo",
    country: "Japan",
    region: "international",
    meta: "Culture, food, tech, solo-friendly",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["March", "April", "October", "November"],
    budgetHint: "Rs. 1,00,000-Rs. 2,50,000 for 7 days",
    tags: ["solo", "student", "adventure", "couple"]
  },
  {
    name: "Bangkok",
    country: "Thailand",
    region: "international",
    meta: "Street food, temples, nightlife",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["November", "December", "January", "February"],
    budgetHint: "Rs. 30,000-Rs. 80,000 for 5 days",
    tags: ["budget", "solo", "student", "couple"]
  },
  {
    name: "Singapore",
    country: "Singapore",
    region: "international",
    meta: "Clean, family-friendly, food hub",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    bestMonths: ["February", "March", "July", "August"],
    budgetHint: "Rs. 45,000-Rs. 1,00,000 for 4 days",
    tags: ["family", "couple", "luxury"]
  }
];

export const indiaDestinations = destinations.filter((d) => d.region === "india");
export const internationalDestinations = destinations.filter((d) => d.region === "international");
