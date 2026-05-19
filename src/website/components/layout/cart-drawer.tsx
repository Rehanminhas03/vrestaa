"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/website/components/ui/sheet";
import { Button } from "@/website/components/ui/button";
import { useUIStore } from "@/website/store/ui";
import { useCartStore } from "@/website/store/cart";
import { CartItem } from "@/website/components/cart/cart-item";
import { CartSummary } from "@/website/components/cart/cart-summary";
import { FreeShippingBar } from "@/website/components/cart/free-shipping-bar";
import { EmptyState } from "@/website/components/common/empty-state";
import { ROUTES } from "@/website/constants/routes";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="max-w-md">
        <SheetHeader>
          <SheetTitle>Your bag · {items.length}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <EmptyState
              icon={<ShoppingBag className="h-6 w-6" />}
              title="Your bag is empty"
              description="Start exploring premium technical gymwear engineered for the rise."
              cta={{ label: "Shop the latest", href: ROUTES.shop }}
            />
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[color:var(--color-border)] overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} onLinkClick={() => setOpen(false)} />
              ))}
            </ul>

            <FreeShippingBar subtotal={subtotal} />

            <SheetFooter>
              <CartSummary subtotal={subtotal} />
              <Button
                asChild
                size="lg"
                variant="primary"
                shape="rounded"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                <Link href={ROUTES.checkout}>Checkout · ${subtotal.toFixed(0)}</Link>
              </Button>
              <Button
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Continue shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
