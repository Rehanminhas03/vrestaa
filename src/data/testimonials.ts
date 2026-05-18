export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: 5;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mateo R.",
    role: "Powerlifter, 92kg",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
    quote:
      "The Apex compression tee finally fixed the loose-around-the-elbow problem. Locks in like a second skin.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya K.",
    role: "Coach, F45",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    quote:
      "I've coached in the Flow Pants 5 days a week for 3 months. They've outlasted everything else in my drawer.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Damian W.",
    role: "Bodybuilder",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=300&q=80",
    quote:
      "Vresta hoodies feel heavier than my winter jacket. Worth every penny.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Ana S.",
    role: "Hyrox athlete",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote:
      "Wore the Studio crop through a full Hyrox sim. Zero ride-up, zero chafe. Just works.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Joel T.",
    role: "Strength coach",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote:
      "Took the Frame Tracksuit on tour. Survived 12 flights, 4 wash cycles, and still looks new.",
    rating: 5,
  },
];
