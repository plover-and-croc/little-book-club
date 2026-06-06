export type FaqItem = {
  q: string;
  a: string;
  contactLink?: boolean;
};

export const faqs: FaqItem[] = [
  {
    q: "Are the books new?",
    a: "No. Little Book Club bundles are made up of carefully selected pre-loved English children's books. Every book is quality checked before it is packed, so families receive books they can feel confident bringing into their homes.",
  },
  {
    q: "How do you choose books for my child's bundle?",
    a: "We curate each bundle using your child's reading stage first, then age range suitability, then the interests you select. Our goal is to send books that feel right for where your child is today — and exciting enough to keep them reaching for the shelf.",
  },
  {
    q: "What ages do you cater for?",
    a: "We curate bundles for children aged 0–12. You can tell us your child's age range when building your bundle, and we use that alongside reading stage and interests to shape the selection.",
  },
  {
    q: "What condition are the pre-loved books in?",
    a: "We only include books we would be happy for our own families to read. Titles are checked for wear, completeness, and overall quality. If a book does not meet our standard, it does not make it into a bundle.",
  },
  {
    q: "Do I need an account to order?",
    a: "No. Checkout is guest-friendly and designed to be quick. You can place an order with your delivery details and bundle preferences without creating an account.",
  },
  {
    q: "Do you deliver across Thailand?",
    a: "Yes. We deliver curated bundles to families across Thailand. Enter your delivery address at checkout and we will be in touch with order updates by email.",
  },
  {
    q: "How much does shipping cost?",
    a: "We charge a flat rate of ฿100 for delivery anywhere in Thailand — the same whether you choose our smallest or largest bundle. We absorb as much of the real postage cost as we can, which is why a bigger bundle often works out better value overall: more books for your child, with the same simple delivery charge.",
  },
  {
    q: "Can I tell you topics or books to avoid?",
    a: "Yes. Use the \"Anything else we should know?\" section when building your bundle to share preferences, favourite characters, topics to avoid, or anything else that helps us curate thoughtfully for your child.",
  },
  {
    q: "Do you offer refunds or returns?",
    a: "We do not offer refunds on individual books, and we are unable to accept returns. As a small family business shipping carefully curated pre-loved titles, managing book returns is not practical for us. If something in your bundle is not quite right, please let us know before your next order — we will gladly add a replacement title as an extra book in that order, at no additional charge.",
    contactLink: true,
  },
  {
    q: "How long does delivery take?",
    a: "Delivery times depend on your location in Thailand. Once your order is confirmed, we will email you with updates. Every bundle is curated for your child, so we take care to pack thoughtfully rather than rush.",
  },
];
