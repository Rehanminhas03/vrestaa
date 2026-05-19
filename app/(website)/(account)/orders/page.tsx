import type { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { EmptyState } from "@/website/components/common/empty-state";
import { ROUTES } from "@/website/constants/routes";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <Container size="default" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          Account
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          Your orders
        </h1>
      </header>

      <EmptyState
        icon={<Package className="h-6 w-6" />}
        title="No orders yet"
        description="Once you place an order, it'll show up here with live tracking."
        cta={{ label: "Shop the latest", href: ROUTES.shop }}
      />

      <p className="mt-8 text-center text-sm text-[color:var(--color-fg-muted)]">
        Already have an order?{" "}
        <Link href={ROUTES.track} className="text-white underline-offset-4 hover:underline">
          Track it by order number
        </Link>
      </p>
    </Container>
  );
}
