"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyState } from "@/components/common/empty-state";
import { useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { ROUTES } from "@/constants/routes";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const mounted = useMounted();

  return (
    <Container size="wide" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          Your bag
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          Checkout review
        </h1>
      </header>

      {!mounted ? null : items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Your bag is empty"
          description="Add a few pieces and they'll show up here."
          cta={{ label: "Shop the latest", href: ROUTES.shop }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-8 divide-y divide-[color:var(--color-border)] rounded-xl border border-[color:var(--color-border)]">
            {items.map((item) => (
              <div key={item.id} className="px-5">
                <CartItem item={item} />
              </div>
            ))}
          </ul>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6">
              <h2 className="mb-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
                Summary
              </h2>
              <CartSummary subtotal={subtotal} />
              <Button asChild size="lg" variant="primary" className="mt-6 w-full">
                <Link href={ROUTES.checkout}>Proceed to checkout</Link>
              </Button>
              <Button asChild variant="ghost" size="md" className="mt-2 w-full">
                <Link href={ROUTES.shop}>Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
