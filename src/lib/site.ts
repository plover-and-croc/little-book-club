export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteName = "Little Book Club";
export const tagline = "Adventures for today. Readers for life.";

export type Bundle = {
  id: "little_discovery" | "reading_adventure" | "family_library";
  name: string;
  books: number;
  price: number;
  pricePerBook: number;
  badge?: string;
  description: string;
  image: string;
};

export const bundles: Bundle[] = [
  {
    id: "little_discovery",
    name: "Little Discovery",
    books: 5,
    price: 495,
    pricePerBook: 99,
    description: "Perfect for discovering Little Book Club.",
    image: "/illustrations/bundle-discovery.png",
  },
  {
    id: "reading_adventure",
    name: "Reading Adventure",
    books: 10,
    price: 795,
    pricePerBook: 80,
    badge: "Most Popular",
    description: "Our most popular bundle for growing readers.",
    image: "/illustrations/bundle-adventure.png",
  },
  {
    id: "family_library",
    name: "Family Library",
    books: 20,
    price: 1395,
    pricePerBook: 70,
    badge: "Best Value",
    description: "The fastest way to build a home library.",
    image: "/illustrations/bundle-library.png",
  },
];

/** Flat-rate delivery across Thailand (THB), added at checkout. */
export const flatRateShippingTHB = 100;

export function orderTotal(bundlePrice: number): number {
  return bundlePrice + flatRateShippingTHB;
}

export const ageRanges = ["0-2", "3-5", "6-8", "9-12"] as const;

export const ageRangeOptions = [
  {
    id: "0-2" as const,
    label: "0–2 Years",
    description: "First books, board books, and early discovery.",
  },
  {
    id: "3-5" as const,
    label: "3–5 Years",
    description: "Picture books, stories, and early learning.",
  },
  {
    id: "6-8" as const,
    label: "6–8 Years",
    description: "Early readers and growing confidence.",
  },
  {
    id: "9-12" as const,
    label: "9–12 Years",
    description: "Independent readers and bigger adventures.",
  },
];

export const readingStages = [
  { id: "board_books", label: "Board Books", description: "Mostly pictures and very few words." },
  {
    id: "picture_books",
    label: "Picture Books",
    description: "Stories usually read together with a parent or caregiver.",
  },
  {
    id: "early_readers",
    label: "Early Readers",
    description: "Simple books a child can start reading independently.",
  },
  {
    id: "independent_readers",
    label: "Independent Readers",
    description: "Longer books with fewer pictures and more text.",
  },
  {
    id: "chapter_books",
    label: "Chapter Books",
    description: "Full stories divided into chapters.",
  },
] as const;

export const interests = [
  "Stories & Adventures",
  "Fairytales & Magic",
  "Animals & Pets",
  "Dinosaurs",
  "Nature & Environment",
  "Science & Discovery",
  "Space & Astronomy",
  "Maths & Numbers",
  "History & Ancient Worlds",
  "Geography & Cultures",
  "Vehicles & Transport",
  "Sport & Active Kids",
  "Arts & Creativity",
  "Food & Cooking",
  "Construction & Engineering",
  "Early Learning",
  "School & Learning",
  "Friendship & Feelings",
  "Family & Everyday Life",
  "Bedtime & Calm Stories",
  "Surprise Me",
] as const;

/** Thai Baht sign (U+0E3F) */
export const BAHT = "\u0E3F";

export function formatTHB(amount: number): string {
  return `${BAHT}${amount.toLocaleString("en-TH")}`;
}

export function formatTHBPerBook(amount: number): string {
  return `${BAHT}${amount.toLocaleString("en-TH")} per book`;
}
