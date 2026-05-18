"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartLineItem } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import { ROUTES } from "@/constants/routes";

interface CartItemProps {
  item: CartLineItem;
  onLinkClick?: () => void;
}

export function CartItem({ item, onLinkClick }: CartItemProps) {
  const update = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.remove);

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={ROUTES.product(item.slug)}
        onClick={onLinkClick}
        className="relative block aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-md bg-white/5"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={ROUTES.product(item.slug)}
              onClick={onLinkClick}
              className="text-sm font-medium text-white transition-colors hover:text-[color:var(--color-accent)]"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-[color:var(--color-fg-muted)]">
              {item.color.name} • {item.size}
            </p>
          </div>
          <button
            aria-label="Remove"
            onClick={() => remove(item.id)}
            className="text-white/50 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="inline-flex items-center rounded-full border border-[color:var(--color-border-strong)]">
            <button
              aria-label="Decrease quantity"
              onClick={() => update(item.id, item.quantity - 1)}
              className="inline-flex h-8 w-8 items-center justify-center text-white/70 transition-colors hover:text-white"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-xs tabular-nums">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => update(item.id, item.quantity + 1)}
              className="inline-flex h-8 w-8 items-center justify-center text-white/70 transition-colors hover:text-white"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-semibold tabular-nums text-white">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
