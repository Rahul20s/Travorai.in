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
  }
];
