import { z } from "zod";
import { ageRanges, bundles, interests, readingStages } from "@/lib/site";

const bundleIds = bundles.map((b) => b.id) as [string, ...string[]];
const stages = readingStages.map((s) => s.id) as [string, ...string[]];
const ages = [...ageRanges] as [string, ...string[]];
const allowedInterests: Set<string> = new Set(interests);

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postcode: z.string().optional(),
  country: z.string().default("Thailand"),
  bundleId: z.enum(bundleIds),
  ageRanges: z.array(z.enum(ages)).min(1, "Select at least one age range"),
  readingStages: z.array(z.enum(stages)).min(1, "Select at least one reading stage"),
  interests: z
    .array(z.string())
    .max(5, "Select up to 5 interests")
    .refine((list) => list.every((item) => allowedInterests.has(item)), "Invalid interest"),
  preferences: z.string().max(1000).optional(),
  deliveryNotes: z.string().max(1000).optional(),
  marketingOptIn: z.boolean().default(false),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;
