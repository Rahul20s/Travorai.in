export interface DestinationData {
  slug: string;
  name: string;
  country: string;
  heroImageContext: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  quickInfo: {
    bestTime: string;
    idealDuration: string;
    approxBudget: string;
    visaInfo: string;
    howToReach: string;
    localTransport: string;
  };
  whatToDo: {
    category: string;
    items: string[];
  }[];
  sampleItineraries: {
    days: number;
    title: string;
    description: string;
  }[];
  budgetGuide: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const destinations: DestinationData[] = [
  {
    slug: "goa",
    name: "Goa",
    country: "India",
    heroImageContext: "Goa India beach sunset",
    heroSubtitle: "Plan a personalized Goa trip with Travora AI.",
    metaTitle: "Goa Travel Guide & Itineraries | Travora",
    metaDescription: "Plan your perfect Goa trip. Discover the best time to visit, budget guides, sample itineraries, and beaches in North and South Goa.",
    quickInfo: {
      bestTime: "November to February for perfect beach weather.",
      idealDuration: "4 to 5 days is usually enough to combine North Goa nightlife with a quieter South Goa day.",
      approxBudget: "₹15,000 - ₹25,000 per person (excluding flights).",
      visaInfo: "No visa required for Indian citizens. E-visa available for most foreign nationals.",
      howToReach: "Fly into Mopa (GOX) or Dabolim (GOI) airports, or take a train to Madgaon or Thivim.",
      localTransport: "Rent a scooter (₹400-₹600/day) or a car. Goa Miles app works better than Ola/Uber here.",
    },
    whatToDo: [
      {
        category: "Beaches",
        items: ["Baga & Calangute (Action & Water Sports)", "Anjuna & Vagator (Trance & Cliff Cafes)", "Palolem & Agonda (Quiet & Scenic)"]
      },
      {
        category: "Forts & Culture",
        items: ["Aguada Fort for sunset", "Chapora Fort (Dil Chahta Hai fame)", "Basilica of Bom Jesus in Old Goa"]
      },
      {
        category: "Nightlife",
        items: ["Tito's Lane", "Curlies", "Thalassa", "LPK Waterfront"]
      }
    ],
    sampleItineraries: [
      { days: 3, title: "Weekend Getaway", description: "Stick to North Goa. Hit Baga beach, party at Tito's, and catch a sunset at Chapora Fort." },
      { days: 5, title: "The Classic Goa Experience", description: "3 days exploring North Goa beaches and nightlife, 2 days relaxing in South Goa (Palolem)." },
      { days: 7, title: "The Slow Traveller", description: "Include Old Goa heritage walks, spice plantation tours, and hidden beaches like Kakolem." }
    ],
    budgetGuide: {
      budget: "₹1,500 - ₹2,500/day (Hostels, local shacks, rented scooter)",
      midRange: "₹4,000 - ₹7,000/day (3-star beach resorts, popular cafes, cab rentals)",
      luxury: "₹15,000+/day (5-star properties like Taj Exotica, fine dining, private yachts)"
    },
    faqs: [
      { question: "Is Goa safe for solo female travelers?", answer: "Yes, generally safe, especially around popular North and South Goa beaches. Stick to well-lit areas at night." },
      { question: "Which airport is better: Mopa or Dabolim?", answer: "Mopa (GOX) is much closer to North Goa (Arambol/Vagator). Dabolim (GOI) is closer to South Goa." }
    ]
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    heroImageContext: "Dubai Burj Khalifa skyline",
    heroSubtitle: "Plan a personalized Dubai trip with Travora AI.",
    metaTitle: "Dubai Travel Guide & Itineraries | Travora",
    metaDescription: "Explore Dubai like a pro. Find out the best time to visit, metro tips, budget breakdowns, and perfect 3 to 7 day itineraries.",
    quickInfo: {
      bestTime: "November to March when the desert heat is manageable.",
      idealDuration: "5 to 6 days to cover major attractions, theme parks, and a desert safari.",
      approxBudget: "₹40,000 - ₹70,000 per person (excluding flights).",
      visaInfo: "E-visa required for most Indians, easily processed in 2-3 days.",
      howToReach: "Direct flights to DXB from almost all major global cities.",
      localTransport: "The Dubai Metro is immaculate and cheap. Taxis and Uber are easily available but expensive.",
    },
    whatToDo: [
      {
        category: "Iconic Landmarks",
        items: ["Burj Khalifa (Book sunset slots in advance)", "The Dubai Mall & Fountains", "Dubai Frame"]
      },
      {
        category: "Adventure & Parks",
        items: ["Desert Safari with Dune Bashing", "Aquaventure Waterpark", "Ski Dubai"]
      },
      {
        category: "Culture",
        items: ["Gold & Spice Souks in Deira", "Al Fahidi Historical Neighbourhood", "Museum of the Future"]
      }
    ],
    sampleItineraries: [
      { days: 3, title: "Dubai Highlights", description: "Burj Khalifa, Dubai Mall, Desert Safari, and a quick walk through the Marina." },
      { days: 5, title: "Family Fun", description: "Add a full day at Atlantis Aquaventure and an evening at Global Village." },
      { days: 7, title: "The Grand Tour", description: "Include a day trip to Abu Dhabi to see the Sheikh Zayed Grand Mosque and Ferrari World." }
    ],
    budgetGuide: {
      budget: "₹4,000 - ₹6,000/day (Deira/Bur Dubai hotels, metro travel, food courts)",
      midRange: "₹10,000 - ₹15,000/day (Downtown/Marina 4-star hotels, taxis, nice restaurants)",
      luxury: "₹40,000+/day (Burj Al Arab/Atlantis stays, fine dining, private desert camps)"
    },
    faqs: [
      { question: "Can I drink alcohol in Dubai?", answer: "Yes, alcohol is served in licensed hotels, bars, and clubs. However, drinking in public is strictly prohibited." },
      { question: "Is the metro easy to use?", answer: "Incredibly easy. Buy a NOL card at any station; it connects the airport, Dubai Mall, and the Marina seamlessly." }
    ]
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    heroImageContext: "Bali Indonesia rice terraces temple",
    heroSubtitle: "Plan a personalized Bali trip with Travora AI.",
    metaTitle: "Bali Travel Guide & Itineraries | Travora",
    metaDescription: "Your ultimate Bali travel guide. Discover Ubud, Seminyak, Nusa Penida, and budget-friendly itineraries for honeymoons and solo trips.",
    quickInfo: {
      bestTime: "April to October (Dry season).",
      idealDuration: "7 to 10 days to experience beaches, culture, and nearby islands.",
      approxBudget: "₹30,000 - ₹50,000 per person.",
      visaInfo: "Visa on Arrival (VoA) for many nationalities, including Indians.",
      howToReach: "Fly into Ngurah Rai International Airport (DPS) in Denpasar.",
      localTransport: "Gojek and Grab (bike taxis) are cheapest. Hire a private driver for full-day sightseeing (approx ₹2500/day).",
    },
    whatToDo: [
      {
        category: "Culture & Temples",
        items: ["Uluwatu Temple (Kecak Fire Dance)", "Tanah Lot Temple", "Tirta Empul (Holy Spring)"]
      },
      {
        category: "Nature",
        items: ["Tegallalang Rice Terraces", "Mount Batur Sunrise Trek", "Ubud Monkey Forest"]
      },
      {
        category: "Beaches & Islands",
        items: ["Seminyak Beach Clubs", "Nusa Penida (Kelingking Beach)", "Gili Islands"]
      }
    ],
    sampleItineraries: [
      { days: 5, title: "The Bali Sampler", description: "2 days in Seminyak for beach clubs, 3 days in Ubud for culture and rice terraces." },
      { days: 7, title: "Honeymoon Special", description: "Add a 2-day trip to Nusa Penida or a luxury villa stay in Uluwatu." },
      { days: 10, title: "The Explorer", description: "Ubud, Seminyak, North Bali waterfalls, and a hop over to the Gili Islands." }
    ],
    budgetGuide: {
      budget: "₹2,000 - ₹3,000/day (Guesthouses, local warungs, Gojek bikes)",
      midRange: "₹6,000 - ₹10,000/day (Private pool villas, western cafes, private drivers)",
      luxury: "₹25,000+/day (5-star resorts in Nusa Dua, beach club VIP beds)"
    },
    faqs: [
      { question: "Do I need an International Driving Permit?", answer: "Yes, police frequently check tourists driving scooters. Always wear a helmet." },
      { question: "Is Bali expensive?", answer: "No, Bali can be incredibly cheap if you eat local food (Nasi Goreng) and stay in guesthouses." }
    ]
  },
  {
    slug: "manali",
    name: "Manali",
    country: "India",
    heroImageContext: "Manali India snow mountains",
    heroSubtitle: "Plan a personalized Manali trip with Travora AI.",
    metaTitle: "Manali Travel Guide & Itineraries | Travora",
    metaDescription: "Explore the Himalayas. Discover the best time for snow, Rohtang Pass permits, and actionable Manali itineraries for families and backpackers.",
    quickInfo: {
      bestTime: "October to February for snow; March to June for pleasant summer weather.",
      idealDuration: "4 to 5 days, plus travel time from Delhi/Chandigarh.",
      approxBudget: "₹10,000 - ₹18,000 per person.",
      visaInfo: "Domestic destination for Indians.",
      howToReach: "Volvo bus from Delhi/Chandigarh (overnight) or fly to Bhuntar airport (50km away).",
      localTransport: "Auto-rickshaws for local drops. Rent a bike or hire a taxi for day trips to Solang or Rohtang.",
    },
    whatToDo: [
      {
        category: "Adventure",
        items: ["Solang Valley (Paragliding, Skiing)", "Rohtang Pass (Snow activities)", "River Rafting in Kullu"]
      },
      {
        category: "Sightseeing",
        items: ["Hadimba Temple", "Old Manali Cafes", "Vashisht Hot Springs"]
      },
      {
        category: "Day Trips",
        items: ["Sissu (via Atal Tunnel)", "Kasol & Manikaran", "Naggar Castle"]
      }
    ],
    sampleItineraries: [
      { days: 3, title: "Quick Escape", description: "Local sightseeing (Hadimba, Old Manali) and one full day at Solang Valley/Atal Tunnel." },
      { days: 5, title: "The Complete Valley", description: "Add Rohtang Pass (permit required) and a day trip to Kullu for rafting." },
      { days: 7, title: "Manali + Kasol", description: "Spend 4 days in Manali, then head to Kasol/Tosh for 3 days to experience the Parvati Valley." }
    ],
    budgetGuide: {
      budget: "₹1,500 - ₹2,500/day (Hostels in Old Manali, local buses, dhabas)",
      midRange: "₹4,000 - ₹7,000/day (3-star hotels with valley views, private cabs for sightseeing)",
      luxury: "₹12,000+/day (Boutique resorts, customized 4x4 tours)"
    },
    faqs: [
      { question: "How do I get a Rohtang Pass permit?", answer: "Permits are limited and must be booked online via the official HP website, or through a local taxi driver." },
      { question: "Is Atal Tunnel open in winter?", answer: "Generally yes, making Lahaul Valley (Sissu) accessible even in heavy snow, unlike Rohtang." }
    ]
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    heroImageContext: "Kashmir Dal Lake shikara mountains",
    heroSubtitle: "Plan a personalized Kashmir trip with Travora AI.",
    metaTitle: "Kashmir Travel Guide & Itineraries | Travora",
    metaDescription: "Paradise on Earth. Plan a safe, unforgettable trip to Srinagar, Gulmarg, and Pahalgam with our complete Kashmir travel guide.",
    quickInfo: {
      bestTime: "April to October for pleasant weather/tulips; December to February for snow.",
      idealDuration: "6 to 7 days to cover Srinagar, Gulmarg, Pahalgam, and Sonamarg.",
      approxBudget: "₹20,000 - ₹35,000 per person.",
      visaInfo: "Domestic destination. Keep valid ID handy.",
      howToReach: "Fly directly into Srinagar Airport (SXR).",
      localTransport: "Pre-booked private cabs are highly recommended for the entire circuit. Local transport is not reliable for tourists.",
    },
    whatToDo: [
      {
        category: "Srinagar",
        items: ["Shikara Ride on Dal Lake", "Stay in a Houseboat", "Mughal Gardens (Shalimar & Nishat)"]
      },
      {
        category: "Gulmarg",
        items: ["Gulmarg Gondola (Book months in advance)", "Skiing and Snowboarding", "Apharwat Peak"]
      },
      {
        category: "Pahalgam & Sonamarg",
        items: ["Betaab Valley", "Aru Valley", "Thajiwas Glacier Trek"]
      }
    ],
    sampleItineraries: [
      { days: 4, title: "Short & Sweet", description: "2 days in Srinagar (Houseboat + Gardens) and a 2-day trip to Gulmarg." },
      { days: 6, title: "The Golden Triangle", description: "Srinagar (2N), Gulmarg (1N), and Pahalgam (2N)." },
      { days: 8, title: "Complete Kashmir", description: "Include Sonamarg for glacier views and spend a night in a luxury resort in Pahalgam." }
    ],
    budgetGuide: {
      budget: "₹2,500 - ₹4,000/day (Budget guesthouses, shared taxis)",
      midRange: "₹6,000 - ₹10,000/day (Good 3/4-star hotels, dedicated private cab, standard gondola tickets)",
      luxury: "₹20,000+/day (Luxury houseboats, Khyber Resort in Gulmarg)"
    },
    faqs: [
      { question: "Is Kashmir safe for tourists?", answer: "Yes, tourist areas are heavily guarded and extremely safe. Locals are known for their warm hospitality." },
      { question: "When should I book the Gulmarg Gondola?", answer: "Book online at least 1-2 months in advance, tickets sell out incredibly fast." }
    ]
  },
  {
    slug: "kerala",
    name: "Kerala",
    country: "India",
    heroImageContext: "Kerala India backwaters houseboat",
    heroSubtitle: "Plan a personalized Kerala trip with Travora AI.",
    metaTitle: "Kerala Travel Guide & Itineraries | Travora",
    metaDescription: "God's Own Country. Explore Munnar's tea estates, Alleppey's backwaters, and Kochi's heritage with our Kerala travel guide.",
    quickInfo: {
      bestTime: "September to March for cooler, dry weather.",
      idealDuration: "6 to 8 days.",
      approxBudget: "₹18,000 - ₹30,000 per person.",
      visaInfo: "Domestic destination.",
      howToReach: "Fly into Kochi (COK) or Trivandrum (TRV) airports.",
      localTransport: "Private taxis are the most comfortable way to do the Munnar-Thekkady-Alleppey circuit.",
    },
    whatToDo: [
      {
        category: "Munnar",
        items: ["Tea Museum & Estates", "Eravikulam National Park", "Echo Point"]
      },
      {
        category: "Alleppey / Kumarakom",
        items: ["Overnight Houseboat Cruise", "Village Canoe Tours", "Vembanad Lake"]
      },
      {
        category: "Culture & Nature",
        items: ["Fort Kochi Heritage Walk", "Kathakali Performance", "Periyar Wildlife Sanctuary (Thekkady)"]
      }
    ],
    sampleItineraries: [
      { days: 4, title: "Tea & Backwaters", description: "2 days in Munnar, 1 night in an Alleppey houseboat, 1 day in Kochi." },
      { days: 6, title: "The Classic Circuit", description: "Kochi (1N) -> Munnar (2N) -> Thekkady (1N) -> Alleppey (1N)." },
      { days: 8, title: "Extended Kerala", description: "Add beach time at Varkala or Kovalam down south near Trivandrum." }
    ],
    budgetGuide: {
      budget: "₹2,000 - ₹3,500/day (Hostels/Homestays, public buses)",
      midRange: "₹6,000 - ₹9,000/day (3/4-star hotels, private AC cab, shared houseboat)",
      luxury: "₹18,000+/day (5-star wellness resorts, premium private AC houseboats)"
    },
    faqs: [
      { question: "Is a houseboat worth it?", answer: "Yes, an overnight houseboat is iconic. Ensure you book an AC houseboat as the backwaters get humid at night." },
      { question: "Munnar or Wayanad?", answer: "Munnar is better for classic tea garden views and fits perfectly in the Kochi-Alleppey circuit. Wayanad is wilder and better accessed from Bangalore/Calicut." }
    ]
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    heroImageContext: "Paris France Eiffel Tower",
    heroSubtitle: "Plan a personalized Paris trip with Travora AI.",
    metaTitle: "Paris Travel Guide & Itineraries | Travora",
    metaDescription: "The City of Light. Curated itineraries for Paris, including Eiffel tower tips, Louvre hacks, and budget travel advice.",
    quickInfo: {
      bestTime: "April-June or September-October for great weather and fewer crowds.",
      idealDuration: "4 to 5 days.",
      approxBudget: "₹70,000 - ₹1,20,000 per person (excluding flights).",
      visaInfo: "Schengen Visa required for Indians.",
      howToReach: "Fly into Charles de Gaulle (CDG) Airport.",
      localTransport: "The Paris Metro is incredible. Walk as much as possible to soak in the architecture.",
    },
    whatToDo: [
      {
        category: "The Classics",
        items: ["Eiffel Tower (Sparkles every hour after sunset)", "Louvre Museum", "Arc de Triomphe & Champs-Élysées"]
      },
      {
        category: "Neighborhoods",
        items: ["Montmartre & Sacré-Cœur", "Le Marais (Boutiques & Cafes)", "Latin Quarter"]
      },
      {
        category: "Day Trips",
        items: ["Palace of Versailles", "Disneyland Paris", "Mont Saint-Michel"]
      }
    ],
    sampleItineraries: [
      { days: 3, title: "Paris in a Hurry", description: "Eiffel Tower, Louvre, Seine River Cruise, and a walk through Montmartre." },
      { days: 5, title: "The Perfect Paris", description: "Add a full day trip to Versailles, and spend a slow afternoon drinking wine in Le Marais." },
      { days: 7, title: "Art & Magic", description: "Include Musée d'Orsay, Sainte-Chapelle, and a 2-day trip to Disneyland Paris." }
    ],
    budgetGuide: {
      budget: "₹8,000 - ₹12,000/day (Hostels, bakery breakfasts, metro passes)",
      midRange: "₹20,000 - ₹30,000/day (3-star boutique hotels, brasserie dinners, museum passes)",
      luxury: "₹60,000+/day (Hotels with Eiffel views, Michelin star dining)"
    },
    faqs: [
      { question: "Do people speak English in Paris?", answer: "Yes, in tourist areas. However, learning to say 'Bonjour' (Hello) and 'Merci' (Thank you) will get you much better service." },
      { question: "How much time is needed for the Louvre?", answer: "You could spend weeks there. Focus on 3-4 hours prioritizing the Mona Lisa, Venus de Milo, and Winged Victory." }
    ]
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    heroImageContext: "Singapore Marina Bay Sands night skyline",
    heroSubtitle: "Plan a personalized Singapore trip with Travora AI.",
    metaTitle: "Singapore Travel Guide & Itineraries | Travora",
    metaDescription: "Future city meets nature. The perfect Singapore travel guide featuring Marina Bay, Sentosa Island, and local hawker food.",
    quickInfo: {
      bestTime: "Year-round destination, but February-April is slightly drier.",
      idealDuration: "4 to 5 days.",
      approxBudget: "₹40,000 - ₹70,000 per person.",
      visaInfo: "E-visa required for Indians, must be applied through authorized agents.",
      howToReach: "Direct flights to Changi Airport (SIN) - widely considered the best airport in the world.",
      localTransport: "The MRT (subway) connects everything and is cheap. Just tap your contactless credit card.",
    },
    whatToDo: [
      {
        category: "Iconic Sights",
        items: ["Gardens by the Bay (Supertrees & Cloud Forest)", "Marina Bay Sands Light Show", "Singapore Flyer"]
      },
      {
        category: "Family Fun",
        items: ["Universal Studios Singapore", "Singapore Zoo & Night Safari", "S.E.A. Aquarium"]
      },
      {
        category: "Culture & Food",
        items: ["Chinatown & Little India", "Hawker Centres (Maxwell, Lau Pa Sat)", "Clarke Quay Nightlife"]
      }
    ],
    sampleItineraries: [
      { days: 3, title: "Singapore Highlights", description: "Gardens by the Bay, Marina Bay Walk, Chinatown, and a Night Safari." },
      { days: 5, title: "Family Vacation", description: "Dedicate 2 full days to Sentosa Island (Universal Studios, Beaches)." },
      { days: 7, title: "The Deep Dive", description: "Add Jewel Changi Airport exploration, shopping at Orchard Road, and Kampong Glam." }
    ],
    budgetGuide: {
      budget: "₹5,000 - ₹8,000/day (Hostels, Hawker centre meals, MRT)",
      midRange: "₹12,000 - ₹20,000/day (4-star hotels, mixed dining, grab rides)",
      luxury: "₹40,000+/day (Marina Bay Sands stay, fine dining, VIP park passes)"
    },
    faqs: [
      { question: "Is Singapore expensive?", answer: "Hotels and alcohol are very expensive, but food (Hawker Centres) and transport (MRT) are incredibly cheap and world-class." },
      { question: "Can I chew gum in Singapore?", answer: "No, bringing chewing gum into the country is illegal and heavily fined." }
    ]
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    heroImageContext: "Maldives overwater bungalows clear water",
    heroSubtitle: "Plan a personalized Maldives trip with Travora AI.",
    metaTitle: "Maldives Travel Guide & Itineraries | Travora",
    metaDescription: "The ultimate honeymoon destination. How to plan a Maldives trip, choose between resorts and local islands, and budget properly.",
    quickInfo: {
      bestTime: "November to April (Dry season).",
      idealDuration: "4 to 5 days.",
      approxBudget: "₹60,000 - ₹2,00,000+ per person.",
      visaInfo: "Free Visa on Arrival for Indian citizens.",
      howToReach: "Fly into Malé (MLE), then take a speedboat or seaplane to your resort.",
      localTransport: "Speedboats (cheaper, closer to Malé) or Seaplanes (expensive, remote resorts).",
    },
    whatToDo: [
      {
        category: "Relaxation",
        items: ["Overwater Bungalow Stay", "Luxury Spa Treatments", "Private Sandbank Dinners"]
      },
      {
        category: "Water Activities",
        items: ["Snorkeling with Manta Rays", "Scuba Diving", "Sunset Dolphin Cruises"]
      },
      {
        category: "Local Experience",
        items: ["Visit Maafushi (Local island)", "Male City Tour", "Try traditional Mas Huni"]
      }
    ],
    sampleItineraries: [
      { days: 4, title: "The Honeymoon Weekend", description: "Pure resort relaxation. 2 nights beach villa, 2 nights overwater villa." },
      { days: 5, title: "Action & Relax", description: "Resort stay with daily excursions: snorkeling, dolphin watching, and a spa day." },
      { days: 7, title: "Local + Luxury", description: "Spend 3 days on a local island (Maafushi) to save money and dive, then 4 days in a luxury resort." }
    ],
    budgetGuide: {
      budget: "₹8,000 - ₹12,000/day (Local island guesthouses like Maafushi, public ferries)",
      midRange: "₹25,000 - ₹40,000/day (4-star all-inclusive resorts accessible by speedboat)",
      luxury: "₹80,000+/day (5-star overwater villas, seaplane transfers, underwater restaurants)"
    },
    faqs: [
      { question: "Are all-inclusive packages worth it?", answer: "Yes! Everything is imported to the islands, so paying for meals/drinks individually at a resort will cost a fortune." },
      { question: "Can I drink alcohol?", answer: "Alcohol is only legal on private resort islands. It is strictly banned on local islands (like Malé and Maafushi)." }
    ]
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    heroImageContext: "Switzerland Alps train mountains lake",
    heroSubtitle: "Plan a personalized Switzerland trip with Travora AI.",
    metaTitle: "Switzerland Travel Guide & Itineraries | Travora",
    metaDescription: "The crown jewel of Europe. Everything you need to know about the Swiss Travel Pass, Jungfraujoch, and stunning alpine itineraries.",
    quickInfo: {
      bestTime: "June to September for hiking/lakes; December to March for skiing.",
      idealDuration: "7 to 10 days.",
      approxBudget: "₹1,20,000 - ₹2,00,000+ per person (excluding flights).",
      visaInfo: "Schengen Visa required.",
      howToReach: "Fly into Zurich (ZRH) or Geneva (GVA).",
      localTransport: "The Swiss Travel Pass (trains/buses/boats) is expensive but an absolute must-have. The train system is flawless.",
    },
    whatToDo: [
      {
        category: "The Alps",
        items: ["Jungfraujoch (Top of Europe)", "Matterhorn (Zermatt)", "Mount Titlis (Ice Flyer)"]
      },
      {
        category: "Lakes & Cities",
        items: ["Lake Lucerne Cruise", "Interlaken (Adventure Capital)", "Zurich Old Town"]
      },
      {
        category: "Scenic Trains",
        items: ["Glacier Express", "Bernina Express", "GoldenPass Line"]
      }
    ],
    sampleItineraries: [
      { days: 5, title: "Swiss Highlights", description: "Zurich, Lucerne (Mt. Titlis), and Interlaken (Jungfraujoch)." },
      { days: 7, title: "The Alpine Dream", description: "Zurich -> Lucerne -> Interlaken -> Zermatt (Matterhorn views)." },
      { days: 10, title: "The Grand Train Tour", description: "Complete circuit adding the Glacier Express route and Geneva/Montreux." }
    ],
    budgetGuide: {
      budget: "₹12,000 - ₹18,000/day (Hostels, supermarket food (Coop/Migros), basic Swiss Travel Pass)",
      midRange: "₹25,000 - ₹40,000/day (3/4-star hotels, restaurant dinners, mountain excursions)",
      luxury: "₹70,000+/day (5-star hotels in Zermatt/St. Moritz, 1st Class train travel)"
    },
    faqs: [
      { question: "Is the Swiss Travel Pass worth the money?", answer: "Absolutely. It covers all trains, buses, and boats, provides free entry to 500+ museums, and offers 50% discounts on mountain cable cars." },
      { question: "Can I do a day trip to Paris from Zurich?", answer: "Yes, the TGV high-speed train takes about 4 hours, but it's better to dedicate at least 3 days to Paris." }
    ]
  },
  {
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    heroImageContext: "Thailand Phi Phi islands longtail boat",
    heroSubtitle: "Plan a personalized Thailand trip with Travora AI.",
    metaTitle: "Thailand Travel Guide & Itineraries | Travora",
    metaDescription: "The ultimate Thailand travel guide. Discover Bangkok's street food, Chiang Mai's temples, and Phuket's beaches with our custom itineraries.",
    quickInfo: {
      bestTime: "November to early April for cool and dry weather.",
      idealDuration: "7 to 10 days.",
      approxBudget: "₹30,000 - ₹50,000 per person.",
      visaInfo: "Visa free entry for Indians (temporary program) or Visa on Arrival.",
      howToReach: "Direct flights to Bangkok (BKK/DMK) or Phuket (HKT).",
      localTransport: "BTS/MRT in Bangkok. Grab app for taxis. Domestic flights are very cheap via AirAsia.",
    },
    whatToDo: [
      {
        category: "City & Culture",
        items: ["Grand Palace (Bangkok)", "Wat Pho (Reclining Buddha)", "Chatuchak Weekend Market"]
      },
      {
        category: "Islands & Beaches",
        items: ["Phi Phi Islands Island Hopping", "Railay Beach (Krabi)", "Full Moon Party (Koh Phangan)"]
      },
      {
        category: "Nature & Temples",
        items: ["Elephant Nature Park (Chiang Mai)", "Doi Suthep Temple", "Ayutthaya Historical Park"]
      }
    ],
    sampleItineraries: [
      { days: 5, title: "Bangkok & Phuket", description: "2 days exploring Bangkok's temples and markets, 3 days relaxing in Phuket." },
      { days: 7, title: "The Classic Route", description: "Bangkok (2N) -> Chiang Mai (2N) -> Phuket/Krabi (3N)." },
      { days: 10, title: "Island Hopper", description: "Skip the north. Focus on Bangkok and the southern islands (Phuket, Koh Phi Phi, Krabi)." }
    ],
    budgetGuide: {
      budget: "₹2,500 - ₹3,500/day (Hostels, street food (Pad Thai), local buses)",
      midRange: "₹6,000 - ₹10,000/day (3/4-star hotels, Grab taxis, island day tours)",
      luxury: "₹25,000+/day (5-star beach resorts, private speedboats, rooftop dining in BKK)"
    },
    faqs: [
      { question: "Is street food safe to eat?", answer: "Yes! Look for stalls with high turnover and locals queuing. It's the best food in the country." },
      { question: "Phuket or Krabi?", answer: "Phuket has more nightlife and luxury resorts. Krabi is more laid-back with dramatic limestone cliffs." }
    ]
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    heroImageContext: "Vietnam Halong Bay cruise",
    heroSubtitle: "Plan a personalized Vietnam trip with Travora AI.",
    metaTitle: "Vietnam Travel Guide & Itineraries | Travora",
    metaDescription: "Explore Vietnam from North to South. Plan trips to Hanoi, Halong Bay, Hoi An, and Ho Chi Minh City.",
    quickInfo: {
      bestTime: "March to April or September to November (varies heavily by region).",
      idealDuration: "10 to 14 days to see North, Central, and South.",
      approxBudget: "₹35,000 - ₹60,000 per person.",
      visaInfo: "E-visa required for Indians (apply online, takes 3-5 days).",
      howToReach: "Direct flights via VietJet to Hanoi (HAN) or Ho Chi Minh City (SGN).",
      localTransport: "Domestic flights (VietJet/VN Airlines) or the Reunification Express train. Grab is widely used.",
    },
    whatToDo: [
      {
        category: "The North",
        items: ["Halong Bay Overnight Cruise", "Hanoi Old Quarter", "Sapa Trekking"]
      },
      {
        category: "Central",
        items: ["Hoi An Ancient Town (Lanterns)", "Golden Bridge (Da Nang)", "Imperial City (Hue)"]
      },
      {
        category: "The South",
        items: ["Cu Chi Tunnels", "Mekong Delta Boat Tour", "War Remnants Museum (HCMC)"]
      }
    ],
    sampleItineraries: [
      { days: 7, title: "Northern Vietnam", description: "Hanoi (2N), Halong Bay Cruise (1N), Ninh Binh (2N), Sapa (2N)." },
      { days: 10, title: "North & Central", description: "Hanoi & Halong Bay (4N), fly to Da Nang to explore Hoi An and Hue (6N)." },
      { days: 14, title: "The Full Length", description: "Hanoi -> Halong -> Da Nang -> Hoi An -> Ho Chi Minh City." }
    ],
    budgetGuide: {
      budget: "₹2,000 - ₹3,000/day (Hostels, Pho/Banh Mi, sleeper buses)",
      midRange: "₹5,000 - ₹8,000/day (Boutique hotels, domestic flights, guided day tours)",
      luxury: "₹20,000+/day (Luxury Halong Bay cruises, 5-star resorts in Da Nang)"
    },
    faqs: [
      { question: "Is it safe to cross the street?", answer: "Traffic is chaotic! Walk slowly and predictably, and the motorbikes will weave around you." },
      { question: "Do I need to book the Halong Bay cruise in advance?", answer: "Yes, especially if you want a quality mid-range or luxury boat. Budget boats can be booked locally." }
    ]
  },
  {
    slug: "andaman",
    name: "Andaman Islands",
    country: "India",
    heroImageContext: "Andaman Havelock Radhanagar beach",
    heroSubtitle: "Plan a personalized Andaman trip with Travora AI.",
    metaTitle: "Andaman Islands Travel Guide & Itineraries | Travora",
    metaDescription: "India's tropical paradise. A complete guide to Port Blair, Havelock, Neil Island, and the best scuba diving spots.",
    quickInfo: {
      bestTime: "October to May for calm seas and clear diving visibility.",
      idealDuration: "6 to 7 days.",
      approxBudget: "₹25,000 - ₹45,000 per person.",
      visaInfo: "Domestic destination for Indians (No visa). Foreigners need a Restricted Area Permit (RAP).",
      howToReach: "Fly into Port Blair (IXZ) from Chennai, Kolkata, or Delhi.",
      localTransport: "Private ferries (Makruzz/Green Ocean) between islands. Rent scooters locally.",
    },
    whatToDo: [
      {
        category: "Beaches",
        items: ["Radhanagar Beach (Havelock)", "Elephant Beach (Water Sports)", "Laxmanpur Beach (Neil Island)"]
      },
      {
        category: "History",
        items: ["Cellular Jail Light & Sound Show", "Ross Island (Netaji Subhash Chandra Bose Dweep)"]
      },
      {
        category: "Diving",
        items: ["Scuba Diving at Havelock", "Snorkeling at North Bay", "Sea Walk"]
      }
    ],
    sampleItineraries: [
      { days: 5, title: "Andaman Express", description: "Port Blair (1N) -> Havelock (3N) -> Port Blair (1N)." },
      { days: 7, title: "The Island Hopper", description: "Port Blair (2N) -> Havelock (3N) -> Neil Island (2N)." },
      { days: 9, title: "The Deep Dive", description: "Include Baratang Island (Limestone Caves) and Diglipur for a truly offbeat experience." }
    ],
    budgetGuide: {
      budget: "₹3,000 - ₹4,500/day (Budget guesthouses, government ferries, rented scooters)",
      midRange: "₹8,000 - ₹12,000/day (3-star beach resorts, private Makruzz ferries, scuba diving)",
      luxury: "₹20,000+/day (Taj Exotica Havelock, private chartered boats)"
    },
    faqs: [
      { question: "Can I book the private ferries locally?", answer: "It is highly recommended to book Makruzz or Green Ocean tickets online well in advance as they sell out." },
      { question: "Is internet available?", answer: "Internet connectivity has improved drastically with the undersea cable, but expect occasional outages on remote islands." }
    ]
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    heroImageContext: "Rajasthan Jaipur Hawa Mahal palace",
    heroSubtitle: "Plan a personalized Rajasthan trip with Travora AI.",
    metaTitle: "Rajasthan Travel Guide & Itineraries | Travora",
    metaDescription: "The Land of Kings. Plan your royal journey through Jaipur, Udaipur, Jodhpur, and Jaisalmer with our expert itineraries.",
    quickInfo: {
      bestTime: "October to March. Avoid the extreme summer heat.",
      idealDuration: "8 to 12 days for the full circuit.",
      approxBudget: "₹20,000 - ₹40,000 per person.",
      visaInfo: "Domestic destination.",
      howToReach: "Fly into Jaipur (JAI) or Udaipur (UDR). Excellent train connectivity via Indian Railways.",
      localTransport: "Hiring a private AC taxi for the entire 10-day circuit is the most comfortable and popular way to travel.",
    },
    whatToDo: [
      {
        category: "Forts & Palaces",
        items: ["Amer Fort (Jaipur)", "Mehrangarh Fort (Jodhpur)", "City Palace (Udaipur)"]
      },
      {
        category: "Desert Experience",
        items: ["Sam Sand Dunes (Jaisalmer)", "Camel Safari", "Desert Camp Overnight Stay"]
      },
      {
        category: "Culture",
        items: ["Pushkar Camel Fair (November)", "Ranthambore Tiger Safari", "Chokhi Dhani (Jaipur)"]
      }
    ],
    sampleItineraries: [
      { days: 5, title: "The Golden Triangle Extension", description: "Delhi -> Agra -> Jaipur (2N) -> Ranthambore (2N)." },
      { days: 8, title: "The Royal Cities", description: "Jaipur (2N) -> Jodhpur (2N) -> Udaipur (3N)." },
      { days: 12, title: "The Grand Rajasthan Tour", description: "Jaipur -> Bikaner -> Jaisalmer (Desert) -> Jodhpur -> Udaipur." }
    ],
    budgetGuide: {
      budget: "₹2,000 - ₹3,500/day (Zostel/Hostels, trains, local thalis)",
      midRange: "₹6,000 - ₹10,000/day (Heritage havelis, private AC cab, nice rooftop restaurants)",
      luxury: "₹30,000+/day (Taj Lake Palace/Umaid Bhawan stays, private guides)"
    },
    faqs: [
      { question: "Is Rajasthan safe?", answer: "Very safe. It is one of the most tourist-friendly states in India, though beware of aggressive touts and shopping scams." },
      { question: "Can I do the whole circuit by train?", answer: "Yes, cities like Jaipur, Jodhpur, and Jaisalmer are well connected by rail, but a private taxi offers more flexibility." }
    ]
  }
,
  {
    "slug": "rishikesh",
    "name": "Rishikesh",
    "country": "India",
    "heroImageContext": "Rishikesh Ganges river suspension bridge",
    "heroSubtitle": "Plan a personalized Rishikesh trip with Travora AI.",
    "metaTitle": "Rishikesh Travel Guide & Itineraries | Travora",
    "metaDescription": "Yoga capital and adventure hub. Plan your Rishikesh trip for river rafting, Ganga Aarti, and serene ashram retreats.",
    "quickInfo": {
      "bestTime": "September to November and February to early May for rafting.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹6,000 - ₹12,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Dehradun (Jolly Grant Airport) or take a train to Haridwar/Rishikesh.",
      "localTransport": "Rented scooters or auto-rickshaws. Many areas near Laxman Jhula are pedestrian-only."
    },
    "whatToDo": [
      {
        "category": "Adventure",
        "items": [
          "White Water Rafting in the Ganges",
          "Bungee Jumping at Jumpin Heights",
          "Camping in Shivpuri"
        ]
      },
      {
        "category": "Spiritual",
        "items": [
          "Triveni Ghat Evening Ganga Aarti",
          "Visit Parmarth Niketan",
          "The Beatles Ashram (Chaurasi Kutia)"
        ]
      },
      {
        "category": "Nature",
        "items": [
          "Neer Garh Waterfall Trek",
          "Sunrise at Kunjapuri Temple",
          "Vashishta Gufa"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Adventure Weekend",
        "description": "Rafting in Shivpuri, bungee jumping, and evenings at cafes overlooking the Ganges."
      },
      {
        "days": 5,
        "title": "The Balanced Retreat",
        "description": "Combine rafting with ashram visits, yoga sessions, and a trek to Neer Garh waterfall."
      },
      {
        "days": 7,
        "title": "Yoga & Wellness",
        "description": "Check into a wellness retreat, attend daily yoga, and explore Haridwar as a day trip."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Backpacker hostels, local dhabas, shared autos)",
      "midRange": "₹4,000 - ₹7,000/day (3-star hotels/campsites, private rafting boats, popular cafes)",
      "luxury": "₹15,000+/day (Luxury spa resorts like Taj Rishikesh, private spiritual guides)"
    },
    "faqs": [
      {
        "question": "Is alcohol allowed in Rishikesh?",
        "answer": "No, Rishikesh is a holy city. Alcohol and non-vegetarian food are strictly prohibited within city limits."
      },
      {
        "question": "Do I need to know swimming for river rafting?",
        "answer": "No, non-swimmers can raft safely. You will be provided with a life jacket and briefed by an expert guide."
      }
    ]
  },
  {
    "slug": "munnar",
    "name": "Munnar",
    "country": "India",
    "heroImageContext": "Munnar tea plantations misty hills",
    "heroSubtitle": "Plan a personalized Munnar trip with Travora AI.",
    "metaTitle": "Munnar Travel Guide & Itineraries | Travora",
    "metaDescription": "Rolling tea gardens and misty hills. Your complete Munnar travel guide for a serene hill station escape in Kerala.",
    "quickInfo": {
      "bestTime": "September to March. Monsoons (June-August) are lush but heavy.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹10,000 - ₹18,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Kochi (COK) and drive 4 hours up the winding hills.",
      "localTransport": "Private taxis or local tuk-tuks. The roads are winding so self-drive requires hill experience."
    },
    "whatToDo": [
      {
        "category": "Tea & Nature",
        "items": [
          "Kolukkumalai Tea Estate (Highest in the world)",
          "Tata Tea Museum",
          "Mattupetty Dam"
        ]
      },
      {
        "category": "Wildlife & Parks",
        "items": [
          "Eravikulam National Park (Nilgiri Tahr)",
          "Carmelagiri Elephant Park",
          "Chinnar Wildlife Sanctuary"
        ]
      },
      {
        "category": "Viewpoints",
        "items": [
          "Echo Point",
          "Top Station",
          "Pothamedu View Point"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "The Tea Trail",
        "description": "Visit the Tea Museum, Mattupetty Dam, and catch the sunset at Top Station."
      },
      {
        "days": 4,
        "title": "Nature & Wildlife",
        "description": "Include a safari in Eravikulam National Park to spot the endangered Nilgiri Tahr."
      },
      {
        "days": 5,
        "title": "The Explorer",
        "description": "Add a rugged jeep safari to Kolukkumalai for an unforgettable sunrise over the clouds."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Homestays, local buses, modest eateries)",
      "midRange": "₹5,000 - ₹8,000/day (Boutique tea estate resorts, dedicated private cab)",
      "luxury": "₹15,000+/day (5-star eco-resorts, private guided jeep safaris, Ayurvedic spas)"
    },
    "faqs": [
      {
        "question": "Are the winding roads to Munnar difficult?",
        "answer": "They can cause motion sickness. Keep medication handy if you're prone to it."
      },
      {
        "question": "Is the Kolukkumalai sunrise trek difficult?",
        "answer": "It is accessible via a very bumpy 4x4 jeep ride rather than a trek, but totally worth the views."
      }
    ]
  },
  {
    "slug": "ooty",
    "name": "Ooty",
    "country": "India",
    "heroImageContext": "Ooty Nilgiri mountain railway",
    "heroSubtitle": "Plan a personalized Ooty trip with Travora AI.",
    "metaTitle": "Ooty Travel Guide & Itineraries | Travora",
    "metaDescription": "The Queen of Hill Stations. Plan a nostalgic trip to Ooty featuring the toy train, botanical gardens, and nearby Coonoor.",
    "quickInfo": {
      "bestTime": "October to June.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹8,000 - ₹15,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Coimbatore (CJB) and drive 3 hours, or take the toy train from Mettupalayam.",
      "localTransport": "Auto-rickshaws for short distances, private taxis for day trips to Coonoor or Pykara."
    },
    "whatToDo": [
      {
        "category": "Heritage & Parks",
        "items": [
          "Nilgiri Mountain Railway (Toy Train)",
          "Government Botanical Garden",
          "Ooty Lake Boating"
        ]
      },
      {
        "category": "Viewpoints",
        "items": [
          "Doddabetta Peak",
          "Dolphin's Nose (Coonoor)",
          "Lamb's Rock"
        ]
      },
      {
        "category": "Nature Escapes",
        "items": [
          "Pykara Lake and Waterfalls",
          "Emerald Lake",
          "Pine Tree Forests"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Classic Ooty",
        "description": "Botanical gardens, Ooty Lake, and a ride on the historic Toy Train to Coonoor."
      },
      {
        "days": 4,
        "title": "Lakes & Peaks",
        "description": "Add Doddabetta Peak for sunrise and spend an afternoon at the peaceful Pykara Lake."
      },
      {
        "days": 5,
        "title": "Ooty & Coonoor",
        "description": "Spend 3 days in Ooty and 2 days in the quieter, tea-covered hills of Coonoor."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Budget hotels near the bus stand, local buses)",
      "midRange": "₹4,000 - ₹7,000/day (Heritage colonial bungalows, private day cabs)",
      "luxury": "₹12,000+/day (Taj Savoy or similar luxury heritage properties)"
    },
    "faqs": [
      {
        "question": "How do I book the Toy Train?",
        "answer": "Book via the IRCTC website well in advance. Tickets sell out extremely fast during summer."
      },
      {
        "question": "Is Ooty very crowded?",
        "answer": "During summer holidays (May), the town center gets congested. Stay slightly outside (or in Coonoor) for peace."
      }
    ]
  },
  {
    "slug": "jaipur",
    "name": "Jaipur",
    "country": "India",
    "heroImageContext": "Jaipur Amer Fort elephant",
    "heroSubtitle": "Plan a personalized Jaipur trip with Travora AI.",
    "metaTitle": "Jaipur Travel Guide & Itineraries | Travora",
    "metaDescription": "The Pink City. Discover the best of Jaipur with curated itineraries covering Amer Fort, Hawa Mahal, and local shopping.",
    "quickInfo": {
      "bestTime": "October to March to avoid the intense desert summer heat.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹8,000 - ₹15,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Jaipur International Airport (JAI) or take the Shatabdi train from Delhi.",
      "localTransport": "Uber and Ola are widely available. E-rickshaws are great for the walled Pink City."
    },
    "whatToDo": [
      {
        "category": "Forts & Palaces",
        "items": [
          "Amer Fort",
          "City Palace",
          "Hawa Mahal & Jantar Mantar"
        ]
      },
      {
        "category": "Culture & Shopping",
        "items": [
          "Johari Bazaar & Bapu Bazaar",
          "Patrika Gate",
          "Chokhi Dhani (Rajasthani Village experience)"
        ]
      },
      {
        "category": "Views & Architecture",
        "items": [
          "Nahargarh Fort (Sunset views)",
          "Jal Mahal",
          "Albert Hall Museum"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 2,
        "title": "Pink City Highlights",
        "description": "Amer Fort in the morning, Hawa Mahal and City Palace in the afternoon."
      },
      {
        "days": 3,
        "title": "The Royal Tour",
        "description": "Add Nahargarh Fort for sunset and dinner, plus shopping in Johari Bazaar."
      },
      {
        "days": 4,
        "title": "Culture & Cuisine",
        "description": "Include an evening at Chokhi Dhani and a photography tour of Patrika Gate and Albert Hall."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Hostels like Zostel, street food (Pyaaz Kachori), e-rickshaws)",
      "midRange": "₹5,000 - ₹8,000/day (Heritage Havelis, good restaurants, Uber/Ola)",
      "luxury": "₹25,000+/day (Stay in a former royal palace like Rambagh Palace, private chauffeur)"
    },
    "faqs": [
      {
        "question": "Is shopping in Jaipur expensive?",
        "answer": "It depends. Bargaining is expected in the bazaars for textiles and handicrafts."
      },
      {
        "question": "Can I do a day trip from Delhi?",
        "answer": "You can, but it's exhausting. It's much better to spend at least one or two nights."
      }
    ]
  },
  {
    "slug": "udaipur",
    "name": "Udaipur",
    "country": "India",
    "heroImageContext": "Udaipur Lake Pichola City Palace sunset",
    "heroSubtitle": "Plan a personalized Udaipur trip with Travora AI.",
    "metaTitle": "Udaipur Travel Guide & Itineraries | Travora",
    "metaDescription": "The City of Lakes. Plan a romantic getaway to Udaipur featuring Lake Pichola, City Palace, and beautiful rooftop cafes.",
    "quickInfo": {
      "bestTime": "September to March. Monsoons are also beautiful as the lakes fill up.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹10,000 - ₹20,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Maharana Pratap Airport (UDR) or take an overnight train.",
      "localTransport": "Auto-rickshaws and walking. The old city streets are very narrow, so large cars struggle."
    },
    "whatToDo": [
      {
        "category": "Lakes & Palaces",
        "items": [
          "City Palace Complex",
          "Lake Pichola Boat Ride",
          "Jag Mandir"
        ]
      },
      {
        "category": "Views & Gardens",
        "items": [
          "Sajjangarh (Monsoon Palace)",
          "Saheliyon Ki Bari",
          "Ambrai Ghat for sunset"
        ]
      },
      {
        "category": "Culture",
        "items": [
          "Bagore Ki Haveli Folk Dance Show",
          "Rooftop dining near Lal Ghat",
          "Vintage Car Museum"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Romantic Weekend",
        "description": "City Palace, sunset boat ride on Lake Pichola, and dinner at Ambrai."
      },
      {
        "days": 4,
        "title": "The Royal Retreat",
        "description": "Add the Monsoon Palace, Bagore Ki Haveli show, and shopping for miniatures."
      },
      {
        "days": 5,
        "title": "Udaipur & Kumbhalgarh",
        "description": "Take a day trip to the massive Kumbhalgarh Fort and Ranakpur Jain Temples."
      }
    ],
    "budgetGuide": {
      "budget": "₹2,000 - ₹3,000/day (Lakeside hostels, local cafes, walking/autos)",
      "midRange": "₹6,000 - ₹12,000/day (Lake-view boutique hotels, rooftop dining, private cabs for day trips)",
      "luxury": "₹40,000+/day (Taj Lake Palace or Oberoi Udaivilas, private sunset cruises)"
    },
    "faqs": [
      {
        "question": "Is the Bagore Ki Haveli show worth it?",
        "answer": "Yes, it's highly recommended. Buy tickets early in the day as they sell out."
      },
      {
        "question": "Can I swim in Lake Pichola?",
        "answer": "No, swimming is not allowed. Enjoy the views from a boat or a lakeside cafe."
      }
    ]
  },
  {
    "slug": "coorg",
    "name": "Coorg",
    "country": "India",
    "heroImageContext": "Coorg coffee plantations hills",
    "heroSubtitle": "Plan a personalized Coorg trip with Travora AI.",
    "metaTitle": "Coorg Travel Guide & Itineraries | Travora",
    "metaDescription": "The Scotland of India. Explore lush coffee plantations, waterfalls, and Tibetan settlements in Kodagu (Coorg).",
    "quickInfo": {
      "bestTime": "October to March. Monsoons are incredibly green but restrict outdoor activities.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹8,000 - ₹15,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Kannur (CNN) or drive 5-6 hours from Bangalore or Mysore.",
      "localTransport": "Having your own car or a hired taxi from Bangalore/Mysore is highly recommended. Local transport is sparse."
    },
    "whatToDo": [
      {
        "category": "Nature & Waterfalls",
        "items": [
          "Abbey Falls",
          "Tadiandamol Peak Trek",
          "Dubare Elephant Camp"
        ]
      },
      {
        "category": "Culture",
        "items": [
          "Namdroling Monastery (Golden Temple) in Bylakuppe",
          "Madikeri Fort",
          "Raja's Seat for sunset"
        ]
      },
      {
        "category": "Experiences",
        "items": [
          "Coffee Plantation Tour",
          "Mandalpatti Jeep Safari",
          "Try traditional Pandi Curry"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Quick Coffee Break",
        "description": "Abbey Falls, Raja's Seat, and a relaxed coffee plantation tour."
      },
      {
        "days": 4,
        "title": "Nature & Culture",
        "description": "Add the Tibetan Golden Temple and a morning with elephants at Dubare Camp."
      },
      {
        "days": 5,
        "title": "The Adventurer",
        "description": "Dedicate a full day to trekking Tadiandamol Peak and taking a jeep to Mandalpatti."
      }
    ],
    "budgetGuide": {
      "budget": "₹2,000 - ₹3,000/day (Basic homestays, local transport)",
      "midRange": "₹5,000 - ₹9,000/day (Comfortable estate homestays, private dedicated cab)",
      "luxury": "₹20,000+/day (Taj Madikeri or Evolve Back resorts, spa treatments)"
    },
    "faqs": [
      {
        "question": "Is Coorg better than Wayanad?",
        "answer": "Coorg is known more for coffee and culture (Kodava heritage, Tibetan settlements), while Wayanad is wilder and slightly less commercial."
      },
      {
        "question": "Do I need a 4x4 for Mandalpatti?",
        "answer": "Yes, you cannot take a regular car up. You must hire a local jeep at the base."
      }
    ]
  },
  {
    "slug": "shimla",
    "name": "Shimla",
    "country": "India",
    "heroImageContext": "Shimla mall road snow church",
    "heroSubtitle": "Plan a personalized Shimla trip with Travora AI.",
    "metaTitle": "Shimla Travel Guide & Itineraries | Travora",
    "metaDescription": "The Summer Capital. Plan your trip to Shimla featuring the Mall Road, Jakhoo Temple, and nearby Kufri.",
    "quickInfo": {
      "bestTime": "March to June (Summer) and December to February (Snow).",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹10,000 - ₹16,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Take the toy train from Kalka or drive/take a Volvo from Delhi/Chandigarh.",
      "localTransport": "The core area (Mall Road/Ridge) is strictly pedestrian. Taxis are needed for Kufri or Mashobra."
    },
    "whatToDo": [
      {
        "category": "Heritage & Walks",
        "items": [
          "The Ridge & Christ Church",
          "Stroll on Mall Road",
          "Viceregal Lodge (Indian Institute of Advanced Study)"
        ]
      },
      {
        "category": "Views & Temples",
        "items": [
          "Jakhoo Temple (Highest point)",
          "Chadwick Falls",
          "Tara Devi Temple"
        ]
      },
      {
        "category": "Day Trips",
        "items": [
          "Kufri (Snow activities)",
          "Mashobra (Quiet pine forests)",
          "Naldehra Golf Course"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Classic Shimla",
        "description": "The Ridge, Mall Road shopping, Viceregal Lodge, and Jakhoo Temple."
      },
      {
        "days": 4,
        "title": "Shimla & Kufri",
        "description": "Add a full day trip to Kufri for horse riding and snow (in winter)."
      },
      {
        "days": 5,
        "title": "The Quiet Hills",
        "description": "Spend 2 days in Shimla, then move to quieter Mashobra or Narkanda for 3 days."
      }
    ],
    "budgetGuide": {
      "budget": "₹2,000 - ₹3,000/day (Budget hotels, walking, local eateries)",
      "midRange": "₹5,000 - ₹8,000/day (Good 3-star hotels with valley views, occasional cabs)",
      "luxury": "₹15,000+/day (Oberoi Cecil or Wildflower Hall, private luxury transport)"
    },
    "faqs": [
      {
        "question": "Are cars allowed on Mall Road?",
        "answer": "No, the Mall Road and Ridge are strictly pedestrian zones. You must park below and take the lift or walk up."
      },
      {
        "question": "Beware of monkeys?",
        "answer": "Yes, especially near Jakhoo Temple. Keep your glasses and loose items securely inside your bag."
      }
    ]
  },
  {
    "slug": "rann-of-kutch",
    "name": "Rann of Kutch",
    "country": "India",
    "heroImageContext": "Rann of Kutch white salt desert camel",
    "heroSubtitle": "Plan a personalized Rann of Kutch trip with Travora AI.",
    "metaTitle": "Rann of Kutch Travel Guide & Itineraries | Travora",
    "metaDescription": "The Great White Desert. Guide to visiting the Rann Utsav, Dholavira, and experiencing the culture of Gujarat.",
    "quickInfo": {
      "bestTime": "November to February (During the Rann Utsav when the salt desert dries up).",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹12,000 - ₹25,000 per person.",
      "visaInfo": "Domestic destination. A permit is required to visit the white salt desert.",
      "howToReach": "Fly to Bhuj (BHJ) or take a train to Bhuj, then drive to the Rann (approx 2 hours).",
      "localTransport": "Private taxis hired from Bhuj are essential. Public transport is very limited in the desert."
    },
    "whatToDo": [
      {
        "category": "The Desert",
        "items": [
          "Sunrise/Sunset on the White Salt Desert",
          "Rann Utsav Tent City",
          "Camel Safari"
        ]
      },
      {
        "category": "History",
        "items": [
          "Dholavira (Harappan Civilization Site)",
          "Kalo Dungar (Highest point with panoramic views)",
          "Bhujodi Village for handicrafts"
        ]
      },
      {
        "category": "Bhuj Sightseeing",
        "items": [
          "Aina Mahal",
          "Prag Mahal",
          "Swaminarayan Temple"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 3,
        "title": "Rann Utsav Quick Trip",
        "description": "1 day exploring Bhuj, 2 days at the Rann Utsav tent city experiencing the white desert."
      },
      {
        "days": 4,
        "title": "Culture & Desert",
        "description": "Add Kalo Dungar and a visit to handicraft villages like Bhujodi and Nirona."
      },
      {
        "days": 5,
        "title": "The Indus Valley Trail",
        "description": "Dedicate a full day to drive out to Dholavira to see the ancient Harappan ruins."
      }
    ],
    "budgetGuide": {
      "budget": "₹3,000 - ₹5,000/day (Stay in Bhuj, shared transport or local buses, standard permits)",
      "midRange": "₹8,000 - ₹15,000/day (Bhunga mud-hut resorts near the Rann, private cab from Bhuj)",
      "luxury": "₹20,000+/day (Premium AC tents inside the official Rann Utsav city)"
    },
    "faqs": [
      {
        "question": "How do I get the permit for the Rann?",
        "answer": "You can apply online via the Rann Permit website or get it at the Bhirandiyara checkpoint on the way."
      },
      {
        "question": "Is the desert always white?",
        "answer": "No, during the monsoon it is submerged in water. It only turns into a dry white salt crust from November to March."
      }
    ]
  },
  {
    "slug": "pondicherry",
    "name": "Pondicherry",
    "country": "India",
    "heroImageContext": "Pondicherry French quarter yellow walls cafe",
    "heroSubtitle": "Plan a personalized Pondicherry trip with Travora AI.",
    "metaTitle": "Pondicherry Travel Guide & Itineraries | Travora",
    "metaDescription": "The French Riviera of the East. Your guide to exploring White Town, Auroville, and the beaches of Pondicherry.",
    "quickInfo": {
      "bestTime": "October to March. Summers are extremely hot and humid.",
      "idealDuration": "3 to 4 days.",
      "approxBudget": "₹8,000 - ₹15,000 per person.",
      "visaInfo": "Domestic destination.",
      "howToReach": "Fly to Chennai (MAA) and drive 3 hours via the scenic East Coast Road (ECR).",
      "localTransport": "Renting a scooter or bicycle is the best way to explore White Town and Auroville."
    },
    "whatToDo": [
      {
        "category": "Heritage & Cafes",
        "items": [
          "Walk through White Town (French Quarter)",
          "Promenade Beach at sunset",
          "Cafe hopping (Coromandel Cafe, Cafe des Arts)"
        ]
      },
      {
        "category": "Spiritual",
        "items": [
          "Auroville (Matrimandir)",
          "Sri Aurobindo Ashram",
          "Manakula Vinayagar Temple"
        ]
      },
      {
        "category": "Beaches",
        "items": [
          "Paradise Beach (Take a ferry from Chunnambar)",
          "Serenity Beach (Surfing)",
          "Auroville Beach"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 2,
        "title": "Weekend Getaway",
        "description": "Explore White Town, relax at the Promenade, and visit Sri Aurobindo Ashram."
      },
      {
        "days": 3,
        "title": "French Flavor & Auroville",
        "description": "Add a half-day trip to Auroville to see the Matrimandir and grab lunch at a vegan cafe."
      },
      {
        "days": 4,
        "title": "Beaches & Heritage",
        "description": "Include a trip to Paradise Beach and try a surfing lesson at Serenity Beach."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Hostels, rented cycle/scooter, local south Indian food)",
      "midRange": "₹5,000 - ₹8,000/day (Heritage boutique hotels in White Town, French dining, cabs)",
      "luxury": "₹15,000+/day (Luxury heritage properties like Palais de Mahe, premium spa treatments)"
    },
    "faqs": [
      {
        "question": "Can I go inside the Matrimandir?",
        "answer": "You can view it from the outside without booking. To go inside, you must book days in advance in person."
      },
      {
        "question": "Is alcohol cheaper in Pondicherry?",
        "answer": "Yes, as a Union Territory, taxes on alcohol are lower compared to neighboring states like Tamil Nadu."
      }
    ]
  },
  {
    "slug": "sri-lanka",
    "name": "Sri Lanka",
    "country": "Sri Lanka",
    "heroImageContext": "Sri Lanka train Ella tea plantations",
    "heroSubtitle": "Plan a personalized Sri Lanka trip with Travora AI.",
    "metaTitle": "Sri Lanka Travel Guide & Itineraries | Travora",
    "metaDescription": "The Pearl of the Indian Ocean. A complete guide to Colombo, Ella, Kandy, and the southern beaches.",
    "quickInfo": {
      "bestTime": "December to April (South/West Coasts); May to September (East Coast).",
      "idealDuration": "7 to 10 days.",
      "approxBudget": "₹30,000 - ₹50,000 per person.",
      "visaInfo": "ETA (Electronic Travel Authorization) required, very easy for Indians.",
      "howToReach": "Direct flights to Colombo (CMB) from major Indian cities.",
      "localTransport": "Trains (especially Kandy to Ella) are scenic and cheap. Hire a private driver or use Uber/PickMe in cities."
    },
    "whatToDo": [
      {
        "category": "The Hill Country",
        "items": [
          "Kandy to Ella Scenic Train Ride",
          "Hike Little Adam's Peak",
          "Nine Arches Bridge"
        ]
      },
      {
        "category": "Heritage & Wildlife",
        "items": [
          "Sigiriya Lion Rock",
          "Yala National Park Safari (Leopards)",
          "Temple of the Sacred Tooth Relic (Kandy)"
        ]
      },
      {
        "category": "Southern Beaches",
        "items": [
          "Mirissa (Whale Watching)",
          "Unawatuna & Galle Fort",
          "Arugam Bay (Surfing)"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 5,
        "title": "Hills & History",
        "description": "Colombo -> Kandy -> Nuwara Eliya -> Ella (Scenic Train)."
      },
      {
        "days": 7,
        "title": "The Classic Loop",
        "description": "Sigiriya -> Kandy -> Ella -> Yala National Park -> Galle."
      },
      {
        "days": 10,
        "title": "Beaches & Beyond",
        "description": "Complete loop plus 3 days relaxing and surfing on the southern beaches."
      }
    ],
    "budgetGuide": {
      "budget": "₹2,500 - ₹3,500/day (Hostels/Guesthouses, public trains/buses, local Kottu Roti)",
      "midRange": "₹6,000 - ₹10,000/day (3/4-star hotels, private driver for the trip, safari tours)",
      "luxury": "₹20,000+/day (Boutique eco-lodges, luxury beach resorts, seaplane transfers)"
    },
    "faqs": [
      {
        "question": "How do I book the Kandy to Ella train?",
        "answer": "Book reserved seats online well in advance, or show up early for unreserved tickets (though you might have to stand)."
      },
      {
        "question": "Is Sri Lanka safe for tourists right now?",
        "answer": "Yes, it is very safe and welcoming to tourists, having recovered from past economic disruptions."
      }
    ]
  },
  {
    "slug": "nepal",
    "name": "Nepal",
    "country": "Nepal",
    "heroImageContext": "Nepal Kathmandu Boudhanath stupa prayer flags",
    "heroSubtitle": "Plan a personalized Nepal trip with Travora AI.",
    "metaTitle": "Nepal Travel Guide & Itineraries | Travora",
    "metaDescription": "The Roof of the World. Your guide to exploring Kathmandu, Pokhara, and trekking in the Himalayas.",
    "quickInfo": {
      "bestTime": "October to November and March to May for clear mountain views.",
      "idealDuration": "6 to 8 days (longer if trekking).",
      "approxBudget": "₹20,000 - ₹35,000 per person.",
      "visaInfo": "No visa required for Indian citizens (carry Voter ID or Passport).",
      "howToReach": "Fly to Kathmandu (KTM) or cross the border by road from UP/Bihar.",
      "localTransport": "Domestic flights (Buddha Air) save a lot of time. Tourist buses connect Kathmandu, Pokhara, and Chitwan."
    },
    "whatToDo": [
      {
        "category": "Kathmandu Valley",
        "items": [
          "Boudhanath Stupa",
          "Pashupatinath Temple",
          "Bhaktapur Durbar Square"
        ]
      },
      {
        "category": "Pokhara & Adventure",
        "items": [
          "Phewa Lake Boating",
          "Paragliding in Sarangkot",
          "World Peace Pagoda"
        ]
      },
      {
        "category": "Wildlife",
        "items": [
          "Chitwan National Park Safari",
          "Elephant/Rhino spotting",
          "Canoe rides"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 5,
        "title": "Kathmandu & Pokhara",
        "description": "2 days exploring temples in Kathmandu, 3 days relaxing and paragliding in Pokhara."
      },
      {
        "days": 7,
        "title": "The Golden Triangle",
        "description": "Kathmandu -> Pokhara -> Chitwan National Park."
      },
      {
        "days": 10,
        "title": "Short Trekking Route",
        "description": "Include the Poon Hill trek from Pokhara for spectacular Annapurna sunrise views."
      }
    ],
    "budgetGuide": {
      "budget": "₹1,500 - ₹2,500/day (Backpacker hostels in Thamel, tourist buses, momos/dal bhat)",
      "midRange": "₹4,000 - ₹8,000/day (3/4-star hotels, domestic flights between cities)",
      "luxury": "₹15,000+/day (Heritage boutique hotels like Dwarika's, Everest sightseeing flights)"
    },
    "faqs": [
      {
        "question": "Do I need a passport to visit Nepal as an Indian?",
        "answer": "No, a valid Indian Voter ID or Passport is sufficient. Aadhaar card is technically not accepted for air travel."
      },
      {
        "question": "Is the Everest Base Camp trek for beginners?",
        "answer": "No, EBC requires 12-14 days and good physical fitness due to high altitude. Try Poon Hill for a beginner trek."
      }
    ]
  },
  {
    "slug": "turkey",
    "name": "Turkey",
    "country": "Turkey",
    "heroImageContext": "Turkey Cappadocia hot air balloons",
    "heroSubtitle": "Plan a personalized Turkey trip with Travora AI.",
    "metaTitle": "Turkey Travel Guide & Itineraries | Travora",
    "metaDescription": "Where East meets West. Plan your perfect Turkey itinerary covering Istanbul, Cappadocia, and Pamukkale.",
    "quickInfo": {
      "bestTime": "April to May and September to October.",
      "idealDuration": "8 to 10 days.",
      "approxBudget": "₹70,000 - ₹1,10,000 per person.",
      "visaInfo": "E-visa available if you hold a valid US/UK/Schengen visa. Otherwise, sticker visa required.",
      "howToReach": "Fly to Istanbul (IST).",
      "localTransport": "Domestic flights (Pegasus/Turkish Airlines) are cheap and essential. Trams in Istanbul are great."
    },
    "whatToDo": [
      {
        "category": "Istanbul",
        "items": [
          "Hagia Sophia & Blue Mosque",
          "Grand Bazaar & Spice Bazaar",
          "Bosphorus Cruise"
        ]
      },
      {
        "category": "Cappadocia",
        "items": [
          "Hot Air Balloon Ride at Sunrise",
          "Goreme Open Air Museum",
          "Underground Cities"
        ]
      },
      {
        "category": "Nature & Ruins",
        "items": [
          "Pamukkale Thermal Pools",
          "Ephesus Ancient City",
          "Antalya Coastline"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 5,
        "title": "Istanbul & Balloons",
        "description": "3 days in Istanbul for history and food, 2 days in Cappadocia."
      },
      {
        "days": 8,
        "title": "The Classic Triangle",
        "description": "Istanbul -> Cappadocia -> Pamukkale/Ephesus."
      },
      {
        "days": 10,
        "title": "The Grand Tour",
        "description": "Add a couple of days relaxing on the Mediterranean coast in Antalya."
      }
    ],
    "budgetGuide": {
      "budget": "₹4,000 - ₹6,000/day (Hostels, street kebabs, overnight buses between cities)",
      "midRange": "₹10,000 - ₹18,000/day (Boutique cave hotels, domestic flights, balloon ride (expensive!))",
      "luxury": "₹30,000+/day (Premium Bosphorus view hotels, private yacht tours)"
    },
    "faqs": [
      {
        "question": "Are the hot air balloons in Cappadocia guaranteed?",
        "answer": "No, they depend heavily on weather and wind. Always book for your first morning so you have backup days."
      },
      {
        "question": "Is Istanbul safe?",
        "answer": "Yes, it's generally very safe, but beware of common tourist scams around the Grand Bazaar and Taksim Square."
      }
    ]
  },
  {
    "slug": "bhutan",
    "name": "Bhutan",
    "country": "Bhutan",
    "heroImageContext": "Bhutan Tiger's Nest monastery cliff",
    "heroSubtitle": "Plan a personalized Bhutan trip with Travora AI.",
    "metaTitle": "Bhutan Travel Guide & Itineraries | Travora",
    "metaDescription": "The Land of the Thunder Dragon. Guide to visiting Bhutan, understanding the SDF fee, and hiking to Tiger's Nest.",
    "quickInfo": {
      "bestTime": "March to May and September to November.",
      "idealDuration": "6 to 8 days.",
      "approxBudget": "₹40,000 - ₹60,000 per person.",
      "visaInfo": "No visa for Indians, but a permit and Sustainable Development Fee (SDF) of ₹1200/day applies.",
      "howToReach": "Fly to Paro (PBH) via Drukair/Bhutan Airlines, or cross the land border at Phuentsholing.",
      "localTransport": "Tourists must hire a local guide and driver. Public transport is not meant for tourists."
    },
    "whatToDo": [
      {
        "category": "Paro",
        "items": [
          "Hike to Tiger's Nest Monastery (Taktsang)",
          "Paro Dzong",
          "National Museum"
        ]
      },
      {
        "category": "Thimphu",
        "items": [
          "Buddha Dordenma",
          "Tashichho Dzong",
          "Simply Bhutan Museum"
        ]
      },
      {
        "category": "Punakha & Beyond",
        "items": [
          "Punakha Dzong",
          "Dochula Pass",
          "Phobjikha Valley"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 5,
        "title": "Thimphu & Paro",
        "description": "2 days exploring the capital Thimphu, 3 days in Paro ending with the Tiger's Nest hike."
      },
      {
        "days": 7,
        "title": "The Essential Bhutan",
        "description": "Paro -> Thimphu -> Punakha (crossing Dochula Pass) -> Paro."
      },
      {
        "days": 9,
        "title": "Deep into the Kingdom",
        "description": "Add Phobjikha Valley to spot the rare Black-necked Cranes."
      }
    ],
    "budgetGuide": {
      "budget": "₹4,000 - ₹6,000/day (Includes mandatory ₹1200 SDF, budget hotels, shared vehicle)",
      "midRange": "₹8,000 - ₹12,000/day (3/4-star hotels, dedicated private guide and SUV)",
      "luxury": "₹35,000+/day (Six Senses or Aman properties, premium private experiences)"
    },
    "faqs": [
      {
        "question": "How difficult is the Tiger's Nest hike?",
        "answer": "It is a steep 2-3 hour climb. Take it slow, use trekking poles, and take breaks at the cafeteria."
      },
      {
        "question": "Can I travel independently in Bhutan?",
        "answer": "Indians can, but it is highly recommended and sometimes required to book through a certified Bhutanese tour operator for permits and logistics."
      }
    ]
  },
  {
    "slug": "malaysia",
    "name": "Malaysia",
    "country": "Malaysia",
    "heroImageContext": "Malaysia Kuala Lumpur Petronas twin towers",
    "heroSubtitle": "Plan a personalized Malaysia trip with Travora AI.",
    "metaTitle": "Malaysia Travel Guide & Itineraries | Travora",
    "metaDescription": "Truly Asia. Plan a trip to Kuala Lumpur, Penang, and Langkawi with our perfect Malaysia itineraries.",
    "quickInfo": {
      "bestTime": "West Coast (Penang/Langkawi): December to April. East Coast: April to October.",
      "idealDuration": "6 to 8 days.",
      "approxBudget": "₹35,000 - ₹55,000 per person.",
      "visaInfo": "Visa free for Indian citizens (subject to current immigration policies).",
      "howToReach": "Direct flights to Kuala Lumpur (KUL).",
      "localTransport": "KTM/LRT trains in KL. Grab is the go-to app for taxis everywhere."
    },
    "whatToDo": [
      {
        "category": "Kuala Lumpur",
        "items": [
          "Petronas Twin Towers",
          "Batu Caves",
          "Bukit Bintang Shopping & Street Food"
        ]
      },
      {
        "category": "Penang",
        "items": [
          "George Town Street Art",
          "Penang Hill",
          "Kek Lok Si Temple"
        ]
      },
      {
        "category": "Langkawi",
        "items": [
          "Langkawi Sky Bridge & Cable Car",
          "Island Hopping",
          "Pantai Cenang Beach"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 4,
        "title": "KL City Break",
        "description": "Petronas Towers, Batu Caves, and a day trip to Genting Highlands."
      },
      {
        "days": 7,
        "title": "City & Island",
        "description": "Kuala Lumpur (3N) -> Fly to Langkawi (3N) for beaches and duty-free shopping."
      },
      {
        "days": 9,
        "title": "The West Coast Trail",
        "description": "Kuala Lumpur -> Penang (Food & Culture) -> Langkawi (Beaches)."
      }
    ],
    "budgetGuide": {
      "budget": "₹2,500 - ₹4,000/day (Hostels, Hawker centres, public transport)",
      "midRange": "₹6,000 - ₹10,000/day (4-star hotels with rooftop pools, domestic flights, Grab rides)",
      "luxury": "₹20,000+/day (5-star resorts in Langkawi, fine dining at KL tower)"
    },
    "faqs": [
      {
        "question": "Is Langkawi duty-free?",
        "answer": "Yes, alcohol and chocolates are incredibly cheap in Langkawi compared to the rest of Malaysia."
      },
      {
        "question": "Penang or Langkawi?",
        "answer": "Penang is for culture, history, and world-class street food. Langkawi is for beaches, nature, and relaxation."
      }
    ]
  },
  {
    "slug": "georgia",
    "name": "Georgia",
    "country": "Georgia",
    "heroImageContext": "Georgia Caucasus mountains church",
    "heroSubtitle": "Plan a personalized Georgia trip with Travora AI.",
    "metaTitle": "Georgia Travel Guide & Itineraries | Travora",
    "metaDescription": "The gem of the Caucasus. Discover Tbilisi, Kazbegi, and affordable European vibes in Georgia.",
    "quickInfo": {
      "bestTime": "May to June and September to October. Winter for skiing in Gudauri.",
      "idealDuration": "6 to 8 days.",
      "approxBudget": "₹45,000 - ₹70,000 per person.",
      "visaInfo": "E-visa required, but Indians with a valid US/UK/Schengen/GCC visa get Visa on Arrival.",
      "howToReach": "Fly to Tbilisi (TBS), often via Middle Eastern hubs (Dubai/Sharjah).",
      "localTransport": "Bolt app for taxis in Tbilisi. Marshrutkas (minibuses) or private drivers for intercity travel."
    },
    "whatToDo": [
      {
        "category": "Tbilisi",
        "items": [
          "Wander Old Tbilisi & Narikala Fortress",
          "Sulfur Baths in Abanotubani",
          "Holy Trinity Cathedral"
        ]
      },
      {
        "category": "The Caucasus",
        "items": [
          "Gergeti Trinity Church in Kazbegi",
          "Gudauri Ski Resort",
          "Ananuri Fortress Complex"
        ]
      },
      {
        "category": "Wine & History",
        "items": [
          "Kakheti Wine Region Tour",
          "Uplistsikhe Cave Town",
          "Mtskheta (Ancient Capital)"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 5,
        "title": "Tbilisi & Mountains",
        "description": "3 days in Tbilisi, 1 full day trip to Kazbegi via the Georgian Military Highway."
      },
      {
        "days": 7,
        "title": "The Highlights Tour",
        "description": "Tbilisi, Kazbegi, plus a day trip to the Kakheti wine region."
      },
      {
        "days": 9,
        "title": "Complete Georgia",
        "description": "Include a trip to Batumi on the Black Sea coast."
      }
    ],
    "budgetGuide": {
      "budget": "₹3,000 - ₹5,000/day (Hostels, Khachapuri/Khinkali, Marshrutkas)",
      "midRange": "₹7,000 - ₹12,000/day (Boutique hotels, Bolt rides, private guided day tours)",
      "luxury": "₹25,000+/day (Rooms Hotel Kazbegi, premium wine tasting, private 4x4)"
    },
    "faqs": [
      {
        "question": "Is Georgian food suitable for vegetarians?",
        "answer": "Yes! While meat-heavy, dishes like Khachapuri (cheese bread), Lobio (bean stew), and Badrijani Nigvzit (eggplant with walnut) are fantastic veg options."
      },
      {
        "question": "Is the road to Kazbegi safe?",
        "answer": "The Georgian Military Highway is stunning but winding. Hire an experienced local driver rather than self-driving."
      }
    ]
  },
  {
    "slug": "japan",
    "name": "Japan",
    "country": "Japan",
    "heroImageContext": "Japan Kyoto Arashiyama bamboo forest",
    "heroSubtitle": "Plan a personalized Japan trip with Travora AI.",
    "metaTitle": "Japan Travel Guide & Itineraries | Travora",
    "metaDescription": "Where tradition meets the future. Plan your ultimate trip to Tokyo, Kyoto, and Osaka with our Japan itineraries.",
    "quickInfo": {
      "bestTime": "March to May (Cherry Blossoms) or September to November (Autumn leaves).",
      "idealDuration": "10 to 14 days.",
      "approxBudget": "₹1,00,000 - ₹1,80,000 per person.",
      "visaInfo": "Tourist visa required for Indians (applied through VFS).",
      "howToReach": "Fly to Tokyo (NRT/HND) or Osaka (KIX).",
      "localTransport": "The Shinkansen (Bullet Train) and local subways. Purchase an IC card (Suica/Pasmo) for seamless tap-and-go travel."
    },
    "whatToDo": [
      {
        "category": "Tokyo",
        "items": [
          "Shibuya Crossing & Shinjuku Nightlife",
          "Senso-ji Temple",
          "teamLab Planets"
        ]
      },
      {
        "category": "Kyoto",
        "items": [
          "Fushimi Inari Shrine",
          "Arashiyama Bamboo Grove",
          "Kinkaku-ji (Golden Pavilion)"
        ]
      },
      {
        "category": "Osaka & Beyond",
        "items": [
          "Dotonbori Street Food",
          "Universal Studios Japan",
          "Day trip to Nara (Deer Park)"
        ]
      }
    ],
    "sampleItineraries": [
      {
        "days": 7,
        "title": "The Golden Route Lite",
        "description": "Tokyo (3N), Kyoto (2N), Osaka (1N)."
      },
      {
        "days": 10,
        "title": "Classic Golden Route",
        "description": "Tokyo (4N), Hakone/Mt. Fuji (1N), Kyoto (3N), Osaka/Nara (2N)."
      },
      {
        "days": 14,
        "title": "The Deep Explorer",
        "description": "Add Hiroshima, Miyajima Island, and a stay in a traditional Ryokan."
      }
    ],
    "budgetGuide": {
      "budget": "₹6,000 - ₹9,000/day (Capsule hotels/Hostels, Convenience store (Konbini) meals, local trains)",
      "midRange": "₹15,000 - ₹25,000/day (3-star business hotels, Shinkansen tickets, nice Izakayas)",
      "luxury": "₹45,000+/day (High-end Ryokans with private onsens, Omakase sushi, first-class trains)"
    },
    "faqs": [
      {
        "question": "Do I need the JR Pass?",
        "answer": "The JR Pass price increased significantly in 2023. It's often cheaper now to buy individual Shinkansen tickets unless you are traveling long distances every day."
      },
      {
        "question": "Is it difficult to travel without speaking Japanese?",
        "answer": "Not in major cities. Signs are in English, and Google Translate (camera feature) is a lifesaver for menus."
      }
    ]
  }

];
