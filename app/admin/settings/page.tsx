import type { Metadata } from "next";
import {
  Briefcase,
  CreditCard,
  Database,
  Palette,
  Truck,
} from "lucide-react";
import { Topbar } from "@/admin/components/topbar";
import { Button } from "@/website/components/ui/button";

export const metadata: Metadata = { title: "Settings" };

const SECTIONS = [
  {
    icon: Briefcase,
    title: "Store information",
    description: "Brand name, contact email, support phone, business address.",
  },
  {
    icon: Truck,
    title: "Shipping zones & rates",
    description: "Free-shipping thresholds, per-region rates, carriers, transit times.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Stripe / PayPal connection, accepted cards, tax rules.",
  },
  {
    icon: Palette,
    title: "Brand & content",
    description: "Logo asset, announcement bar copy, hero copy, featured drops.",
  },
];

export default function AdminSettingsPage() {
  return (
    <>
      <Topbar
        title="Settings"
        description="Configure the store · real fields land with the Firebase migration"
      />

      <div className="flex flex-col gap-6 p-5 md:p-8">
        <section className="rounded-xl border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/8 p-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-ink)]">
                <Database className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
                  Backend
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-white">
                  Connect Firebase
                </h2>
                <p className="mt-1 max-w-md text-sm text-[color:var(--color-fg-muted)]">
                  Wire up real persistence for orders, customers, and product
                  inventory. Auth swaps to Firebase Auth ID tokens in one file.
                </p>
              </div>
            </div>
            <Button variant="accent" size="md" disabled>
              Connect — coming soon
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                  <s.icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                    {s.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-md border border-dashed border-[color:var(--color-border)] px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                Configuration lands with the backend
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
