export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQS: FaqGroup[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        q: "When will my order ship?",
        a: "Orders placed before 2pm PT ship the same business day. You'll receive a tracking link as soon as your package is handed off to the carrier.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — we ship to 70+ countries via DHL Express. Duties and taxes are calculated and displayed at checkout (DDP).",
      },
      {
        q: "How long does delivery take?",
        a: "Domestic standard: 2–4 business days. Domestic express: 1–2 business days. International express: 3–6 business days.",
      },
      {
        q: "Is shipping free?",
        a: "Standard shipping is free on US orders over $120. International thresholds vary by region.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery, on unworn items in original condition. Returns are free for US orders.",
      },
      {
        q: "How do I start a return?",
        a: "Head to your order in the account portal and click 'Start a return'. We'll email you a prepaid label.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes — request a size exchange instead of a refund in the return flow. We'll ship the new size as soon as the original is scanned in transit.",
      },
    ],
  },
  {
    title: "Product & Fit",
    items: [
      {
        q: "How do your sizes run?",
        a: "Our oversized tees run true to the oversized silhouette — size down for a slimmer drape. Compression runs tight by design; refer to the size guide on each product page.",
      },
      {
        q: "What fabric do you use?",
        a: "Cotton-blend pieces are 240–480gsm depending on weight. Compression is a recycled nylon/elastane seamless 3D-knit.",
      },
      {
        q: "How should I care for my pieces?",
        a: "Cold wash inside-out with similar colours, hang dry. Avoid fabric softener — it coats the technical yarns and reduces stretch.",
      },
    ],
  },
];
