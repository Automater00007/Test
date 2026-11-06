export const site = {
  name: "Jade River Resort",
  group: "Defoy Hotels & Resorts",
  tagline: "Life, Slowed by the River.",
  description:
    "A thirteen-room luxury boutique resort on the banks of the Lidder River in Pahalgam, Kashmir. Wooden architecture, pine forest, and water at 2,130 metres.",
  phone: "+91 9541898820",
  phoneHref: "tel:+919541898820",
  whatsapp: "919541898820",
  email: "jaderiverresort@defoy.in",
  address: "Pahalgam, Jammu & Kashmir — 192125",
  coords: "33.882774, 75.271524",
  lat: 33.882774,
  lng: 75.271524,
  coordsDisplay: "33.8828° N · 75.2715° E",
  latDisplay: "33.8828° N",
  lngDisplay: "75.2715° E",
  elevation: "2,130 m",
  roomsTotal: 13,
  url: "https://defoyhotelsandresorts.com/jade-river-resort",
};

export const nav = [
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/post" },
  { label: "Location", href: "/location" },
];

const jade = (name: string) => `/images/jade/${name}.webp`;

export const img = {
  hero: jade("gallery-07"),
  cabin: jade("gallery-10"),
  valley: jade("mountain-sunset"),
  forest: jade("gallery-09"),
  aerial: jade("gallery-09"),
  mist: jade("mountain-sunset"),
  green: jade("gallery-11"),
  dark: jade("gallery-12"),
  tree: jade("gallery-11"),
  pines: jade("gallery-09"),
  dock: jade("gallery-09"),
  stars: jade("exp-bonfire"),
  roomWarm: jade("room-premium-1"),
  roomBed: jade("gallery-04"),
  roomSuite: jade("gallery-06"),
  roomLight: jade("room-duplex-4"),
};

export type Room = {
  slug: string;
  name: string;
  short: string;
  count: string;
  price: number;
  description: string;
  long: string;
  image: string;
  gallery: string[];
  amenities: string[];
  bestFor: string;
};

export const rooms: Room[] = [
  {
    slug: "premium-balcony-room",
    name: "Premium Balcony Room",
    short: "Balcony",
    count: "9 rooms",
    price: 6000,
    description:
      "A private balcony, a low chair, and the sound of water finding its way through stone.",
    long:
      "Our most-loved room. Wake to pine light on the ceiling, step onto a private balcony, and watch the Lidder carry the morning past. Luxury bedding, quiet Wi-Fi, and room service that arrives without ceremony.",
    image: jade("room-premium-1"),
    gallery: [
      jade("room-premium-1"),
      jade("room-premium-2"),
      jade("room-premium-3"),
      jade("room-premium-4"),
      jade("room-premium-5"),
    ],
    amenities: [
      "Private balcony",
      "Mountain and resort views",
      "Luxury bedding",
      "Wi-Fi",
      "Room service",
      "Hot water",
    ],
    bestFor: "Couples and slow mornings",
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    short: "Suite",
    count: "2 suites",
    price: 8000,
    description:
      "More room to do nothing. A wide living space, a king bed, and a bathroom built for long baths.",
    long:
      "Two suites, each with a generous living room and a deep, quiet bedroom. Built for anniversaries, honeymoons, and the kind of trip where the plan is no plan at all. Premium interiors, a king bed, and a luxury bathroom.",
    image: jade("room-suite-1"),
    gallery: [
      jade("room-suite-1"),
      jade("room-suite-2"),
      jade("room-suite-3"),
      jade("room-suite-4"),
      jade("room-suite-5"),
      jade("room-suite-6"),
    ],
    amenities: [
      "Separate living space",
      "King bed",
      "Luxury bathroom",
      "Premium interiors",
      "Wi-Fi",
      "Room service",
    ],
    bestFor: "Couples and special occasions",
  },
  {
    slug: "executive-duplex-family-room",
    name: "Executive Duplex Family Room",
    short: "Duplex",
    count: "2 rooms",
    price: 13000,
    description:
      "Two levels. The children take the upper floor, and you take the quiet one.",
    long:
      "A two-level duplex designed for families who want to be together and also, occasionally, not. Children get their own floor, the lawn is a short walk away, and the river is the soundtrack to both.",
    image: jade("room-duplex-1"),
    gallery: [
      jade("room-duplex-1"),
      jade("room-duplex-2"),
      jade("room-duplex-3"),
      jade("room-duplex-4"),
      jade("room-duplex-5"),
      jade("room-duplex-6"),
    ],
    amenities: [
      "Two-level duplex layout",
      "Private floor for children",
      "Family-friendly",
      "Wi-Fi",
      "Room service",
      "Lawn access",
    ],
    bestFor: "Families and longer stays",
  },
];

export type Experience = {
  title: string;
  subtitle: string;
  body: string;
  meta: string;
  image: string;
};

export const experiences: Experience[] = [
  {
    title: "Bonfire Evenings",
    subtitle: "Fire, water, and a sky with too many stars",
    body:
      "Beside the Lidder, after dark, we light a fire. Kashmiri nights are cold in the best way. Sit close. Stay as long as you like.",
    meta: "Every clear evening · Riverside",
    image: jade("exp-bonfire"),
  },
  {
    title: "River Walks",
    subtitle: "No guide. No schedule. No destination.",
    body:
      "Follow the water at your own pace. The path goes as far as you want it to. Some guests walk for twenty minutes; some disappear for three hours.",
    meta: "Dawn to dusk · Self-guided",
    image: jade("gallery-11"),
  },
  {
    title: "Pahalgam Sightseeing",
    subtitle: "Baisaran, Aru, Betaab, Chandanwari",
    body:
      "The valley keeps its famous places close. Mini Switzerland, the Aru meadows, the Betaab river bend, and the road to Chandanwari all sit within a short drive.",
    meta: "Half and full day · By road",
    image: jade("mountain-sunset"),
  },
  {
    title: "Photography",
    subtitle: "Every corner already framed",
    body:
      "Wooden facades, a stream in front, pine forest behind. The light changes every hour and never repeats itself. Bring the camera you keep meaning to use.",
    meta: "Golden hour · Across the property",
    image: jade("exp-photography"),
  },
  {
    title: "Family Moments",
    subtitle: "Lawns, duplex rooms, unhurried days",
    body:
      "Spacious lawns and a safe, enclosed property. Children run; parents sit. The duplex rooms mean everyone has somewhere to retreat to when the day is done.",
    meta: "All day · Lawns and duplex",
    image: jade("exp-family"),
  },
  {
    title: "Pure Luxury",
    subtitle: "Felt, not displayed",
    body:
      "Warm bedding at night, hot tea before you ask, a fire already lit. Luxury here is quiet, attentive, and almost invisible.",
    meta: "Included · Throughout your stay",
    image: jade("exp-luxury"),
  },
];

export const gallery = [
  { src: jade("gallery-01"), alt: "Balcony lounge looking out to the snowy Lidder valley", span: "wide" },
  { src: jade("gallery-02"), alt: "Duplex living room with a timber staircase", span: "std" },
  { src: jade("gallery-03"), alt: "Bedroom with a patterned bedspread and warm wood walls", span: "std" },
  { src: jade("gallery-04"), alt: "Bedroom headboard with warm bedside lighting", span: "wide" },
  { src: jade("gallery-05"), alt: "Private balcony facing the Pahalgam valley", span: "wide" },
  { src: jade("gallery-06"), alt: "Suite living area opening into the bedroom", span: "std" },
  { src: jade("gallery-07"), alt: "Jade River Resort at dusk in snow", span: "wide" },
  { src: jade("gallery-08"), alt: "Cocktails in the resort lounge", span: "std" },
  { src: jade("gallery-09"), alt: "Snow-covered resort below the mountains", span: "wide" },
  { src: jade("gallery-10"), alt: "Fire pit and lit resort exterior at night", span: "wide" },
  { src: jade("gallery-11"), alt: "Lawn and the Lidder River beside the resort", span: "wide" },
  { src: jade("gallery-12"), alt: "Lounge with a Persian rug and warm lighting", span: "wide" },
];

export const posts = [
  {
    slug: "the-sound-of-the-lidder-at-six",
    title: "The sound of the Lidder at six",
    excerpt:
      "Before the valley wakes, the river is the loudest thing in Pahalgam. A short note on the first hour of the day.",
    date: "12 October 2025",
    read: "4 min",
    category: "Notes from the river",
    image: img.aerial,
    quote: "The first hour of the day belongs to the water. Everything else arrives later.",
    body: [
      "There is a moment, a little before six, when the valley is still holding its breath. The pines are black against a sky that has not decided on a colour yet, and the Lidder is the loudest thing in Pahalgam. Not loud in the way a city is loud. Loud in the way a room is loud when someone you love is sleeping in it.",
      "The water comes down from the high meadows and moves through the property at a pace that has nothing to do with clocks. Guests who arrive from Delhi or Mumbai tend to wake early on the first morning, still running on the speed of their week. They stand on the balcony with a cup of tea and listen. By the third morning, they are sleeping in.",
      "We do not schedule anything at this hour. There is hot water for tea, a chair facing the river, and a path that follows the bank for as long as you want to walk it. Some guests go twenty minutes. Some disappear until breakfast. One guest last autumn walked to the far bend and back and said it was the first time in a year he had not checked his phone.",
      "The light changes slowly. First the water turns from grey to green, then the far ridge catches the sun, then the wooden facades warm up and the whole property looks like it has been awake for hours. By seven, the kitchen is moving and the first trays are going out.",
      "If you come, set an alarm for one morning. Just one. Stand outside before the valley gets busy with itself. The river will already be there, doing exactly what it has always done, and for a few minutes you will have the strange feeling that nothing needs to be hurried.",
    ],
  },
  {
    slug: "a-slow-guide-to-aru-valley",
    title: "A slow guide to Aru Valley",
    excerpt:
      "Thirty-five minutes by road, then meadows, horses, and a silence that takes a while to notice.",
    date: "28 September 2025",
    read: "6 min",
    category: "Field guide",
    image: img.green,
    quote: "Aru is not a checklist. It is a meadow, a road, and the decision to stop walking.",
    body: [
      "Aru Valley is a short drive from the resort, up a road that keeps folding back on itself. The climb is gentle enough to keep the window open. Pine gives way to open meadow, and then the valley widens and you are somewhere that feels less like a destination and more like a place someone forgot to build on.",
      "Most visitors arrive with a list: see the meadow, take the photograph, find the horse, leave. It is possible to do Aru that way. It is also possible to sit on the grass for an hour and watch the light move across the far slope, which is what we would suggest.",
      "There are horses and small tea stalls and, depending on the season, a handful of families with picnic blankets. There is no schedule. The meadow does not have an opening time. This is the point.",
      "Go early if you want the quiet, or late if you want the light. Bring a layer — the valley is cooler than Pahalgam, and the weather changes its mind quickly. Leave the itinerary in the car.",
      "On the way back, stop where the road meets the river and walk down to the water. You will not need directions. You will hear it.",
    ],
  },
  {
    slug: "why-thirteen-rooms-is-the-point",
    title: "Why thirteen rooms is the point",
    excerpt:
      "A small property is not a limitation. It is the whole idea. On scale, attention, and knowing a guest's name.",
    date: "9 September 2025",
    read: "5 min",
    category: "Philosophy",
    image: img.cabin,
    quote: "Thirteen is not a number we settled on. It is the number the property could hold without becoming something else.",
    body: [
      "A larger hotel can be many things to many people. It can have three restaurants, a spa, a business centre, a lobby that smells the same in every city. There is nothing wrong with that. It is simply not what this property was built to do.",
      "Thirteen rooms means that on a full night, there are at most a few dozen people on the property. It means the kitchen knows how you take your eggs. It means the person at reception remembers which room asked for an extra blanket. It means the lawn is never crowded and the riverbank is never a queue.",
      "Small has its own kind of luxury. It is not the luxury of marble or chandeliers. It is the luxury of being recognised, of not repeating yourself, of a place that can adjust to the guest rather than asking the guest to adjust to the system.",
      "There is also a practical side. A small property can afford to be quiet. It can afford to keep the music low and the lights warm. It can afford to leave the trees where they are and build around them. Everything we would have spent on scale, we spend on attention instead.",
      "Guests sometimes ask whether we plan to expand. The honest answer is that expansion would change the thing they are asking about. Thirteen rooms is the whole idea. The river was here first; we are just keeping it company.",
    ],
  },
];

export const reviews: {
  name: string;
  from: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
}[] = [];


export const faqs = [
  {
    q: "Where is Jade River Resort located?",
    a: "Jade River Resort is in Pahalgam, Jammu & Kashmir, India, at an elevation of 2,130 metres on the banks of the Lidder River. The address is Pahalgam, Jammu & Kashmir — 192125. Coordinates are 33.882774, 75.271524.",
  },
  {
    q: "How many rooms does Jade River Resort have?",
    a: "Thirteen. There are nine Premium Balcony Rooms, two Executive Suites, and two Executive Duplex Family Rooms. The property is intentionally small so every guest gets personal attention.",
  },
  {
    q: "What are the room rates?",
    a: "Rooms start at ₹6,000 per night for a Premium Balcony Room, ₹8,000 per night for an Executive Suite, and ₹13,000 per night for an Executive Duplex Family Room. Rates are confirmed at the time of booking.",
  },
  {
    q: "How do I book a stay?",
    a: "Bookings are direct only — Jade River Resort does not use MakeMyTrip, Booking.com, or any other OTA. Use the contact page to build a WhatsApp message with your room, dates, and guest count, or message +91 9541898820 directly.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation 15 or more days before arrival receives a full refund. Cancellation 15 to 10 days before arrival carries a 50% retention charge. Cancellation within 10 days of arrival carries a 100% retention charge.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is at 2:00 PM and check-out is at 12:00 noon. A minimum 50% advance payment is required to confirm a booking.",
  },
  {
    q: "What ID is required at check-in?",
    a: "A valid government photo ID is required from every guest at check-in. Foreign nationals must present a passport and visa. PAN cards are not accepted as address or ID proof.",
  },
  {
    q: "How far is Srinagar Airport?",
    a: "Srinagar Airport is approximately 96 km from the resort, or about 2.5 to 3 hours by road.",
  },
  {
    q: "What is there to do nearby?",
    a: "Baisaran Valley (Mini Switzerland), Aru Valley, Betaab Valley, and Chandanwari are all a short drive away. On the property there are river walks, bonfire evenings, lawns for families, and some of the best photography light in the valley.",
  },
  {
    q: "Is the resort suitable for families?",
    a: "Yes. The two Executive Duplex Family Rooms have two levels so children have their own floor, and the property has spacious, safe lawns for families.",
  },
  {
    q: "Are pets allowed?",
    a: "Please contact the resort directly about pets before booking so the team can confirm what is possible for your dates. Call or message +91 9541898820.",
  },
  {
    q: "Who do I contact for invoices or policy queries?",
    a: "For group reservations, policy questions, GST, and invoices, email jaderiverresort@defoy.in or message +91 9541898820.",
  },
];

export const stats = [
  { value: 13, suffix: "", label: "Rooms, no more" },
  { value: 2130, suffix: " m", label: "Above sea level" },
  { value: 96, suffix: " km", label: "From Srinagar airport" },
  { value: 1, suffix: "", label: "River, always" },
];

export const policies = [
  {
    title: "Cancellation",
    items: [
      "15 or more days before arrival — full refund.",
      "15 to 10 days before arrival — 50% retention charge.",
      "Within 10 days of arrival — 100% retention charge.",
    ],
  },
  {
    title: "Check-in & check-out",
    items: [
      "Check-in from 2:00 PM.",
      "Check-out by 12:00 noon.",
      "Early check-in and late check-out are subject to availability.",
    ],
  },
  {
    title: "Payment",
    items: [
      "A minimum 50% advance is required to confirm a booking.",
      "The balance is payable at the property.",
      "Rates are confirmed at the time of booking.",
    ],
  },
  {
    title: "Identification",
    items: [
      "A valid government photo ID is required at check-in.",
      "Foreign nationals must present a passport and visa.",
      "PAN cards are not accepted as address or ID proof.",
    ],
  },
];
