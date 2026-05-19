export const ROUTES = {
  home: "/",
  shop: "/shop",
  category: (slug: string) => `/shop/${slug}`,
  product: (slug: string) => `/product/${slug}`,
  cart: "/cart",
  wishlist: "/wishlist",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  orders: "/orders",
  track: "/track",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
} as const;

export const PRIMARY_NAV = [
  { label: "Shop", href: ROUTES.shop },
  { label: "Men", href: "/shop?gender=men" },
  { label: "Women", href: "/shop?gender=women" },
  { label: "New", href: "/shop?sort=newest" },
  { label: "About", href: ROUTES.about },
] as const;
