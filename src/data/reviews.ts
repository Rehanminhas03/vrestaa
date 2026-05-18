export interface Review {
  id: string;
  productSlug: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string; // ISO
  verified: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    productSlug: "round-neck-compression-shirt",
    author: "Tomas L.",
    rating: 5,
    title: "Best compression I've worn",
    body: "I've tried every brand. The mapped venting actually works — back is dry where every other tee soaks through.",
    date: "2026-03-12",
    verified: true,
  },
  {
    id: "r2",
    productSlug: "round-neck-compression-shirt",
    author: "Reece M.",
    rating: 5,
    title: "True to size",
    body: "6'1\" 195lb, M fits like a glove. Holds shape after 30+ washes.",
    date: "2026-02-28",
    verified: true,
  },
  {
    id: "r3",
    productSlug: "round-neck-compression-shirt",
    author: "Jared P.",
    rating: 4,
    title: "Great but pricey",
    body: "Worth it on sale. Wish the colour range was bigger.",
    date: "2026-02-09",
    verified: false,
  },
  {
    id: "r4",
    productSlug: "leggings",
    author: "Sara K.",
    rating: 5,
    title: "Sculpts everything",
    body: "Wore these on a 12-hour travel day plus a hot yoga class. Zero ride-up, zero see-through.",
    date: "2026-03-01",
    verified: true,
  },
  {
    id: "r5",
    productSlug: "mens-oversized-shirt",
    author: "Diego A.",
    rating: 5,
    title: "Drapes perfectly",
    body: "Finally an oversized tee that doesn't look like a tent. The drop shoulder hits the right spot.",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "r6",
    productSlug: "sports-bra",
    author: "Priya K.",
    rating: 5,
    title: "Locks in for HIIT",
    body: "Coach 5 sessions a day in this. Supportive without the underwire dig.",
    date: "2026-03-18",
    verified: true,
  },
];

export function reviewsForProduct(slug: string): Review[] {
  return REVIEWS.filter((r) => r.productSlug === slug);
}
