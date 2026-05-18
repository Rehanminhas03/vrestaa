import type { Size } from "./product";

export interface CartLineItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: { name: string; hex: string };
  size: Size;
  quantity: number;
  maxQuantity?: number;
}
