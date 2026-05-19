"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { Logo } from "@/website/components/common/logo";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";
import { EmptyState } from "@/website/components/common/empty-state";
import { useCartStore } from "@/website/store/cart";
import { useMounted } from "@/website/hooks/use-mounted";
import { formatCurrency } from "@/website/lib/format";
import { ROUTES } from "@/website/constants/routes";

type Step = "contact" | "shipping" | "payment";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clear);
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("contact");
  const mounted = useMounted();

  const handlePay = () => {
    clearCart();
    router.push("/checkout/success");
  };

  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <Container size="wide" className="py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Logo />
        <Link
          href={ROUTES.cart}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to bag
        </Link>
      </div>

      {!mounted ? null : items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-6 w-6" />}
          title="There's nothing to check out"
          description="Add some pieces to your bag first."
          cta={{ label: "Shop the latest", href: ROUTES.shop }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Stepper step={step} />

            {step === "contact" && (
              <CheckoutSection title="Contact">
                <Input type="email" placeholder="Email address" />
                <Input type="tel" placeholder="Phone number (optional)" />
                <Button size="lg" variant="primary" onClick={() => setStep("shipping")}>
                  Continue to shipping
                </Button>
              </CheckoutSection>
            )}

            {step === "shipping" && (
              <CheckoutSection title="Shipping">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="First name" />
                  <Input placeholder="Last name" />
                </div>
                <Input placeholder="Address line 1" />
                <Input placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="City" />
                  <Input placeholder="State" />
                  <Input placeholder="ZIP" />
                </div>
                <Input placeholder="Country" defaultValue="United States" />
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button variant="ghost" onClick={() => setStep("contact")}>
                    Back
                  </Button>
                  <Button size="lg" variant="primary" onClick={() => setStep("payment")} className="sm:ml-auto">
                    Continue to payment
                  </Button>
                </div>
              </CheckoutSection>
            )}

            {step === "payment" && (
              <CheckoutSection title="Payment">
                <Input placeholder="Card number" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM / YY" />
                  <Input placeholder="CVC" />
                </div>
                <Input placeholder="Name on card" />
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button variant="ghost" onClick={() => setStep("shipping")}>
                    Back
                  </Button>
                  <Button size="lg" variant="accent" className="sm:ml-auto" onClick={handlePay}>
                    <Lock className="h-4 w-4" />
                    Pay {formatCurrency(total)}
                  </Button>
                </div>
              </CheckoutSection>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6">
              <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
                Order summary
              </h2>
              <ul className="divide-y divide-[color:var(--color-border)]">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white/5">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[color:var(--color-ink)]">
                        {item.quantity}
                      </span>
                    </span>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      <span className="text-xs text-[color:var(--color-fg-muted)]">
                        {item.color.name} · {item.size}
                      </span>
                    </div>
                    <span className="text-sm tabular-nums text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-[color:var(--color-border)] pt-4 text-sm">
                <Row label="Subtotal" value={formatCurrency(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
                <Row label="Total" value={formatCurrency(total)} bold />
              </dl>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "contact", label: "Contact" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ];
  const idx = steps.findIndex((s) => s.key === step);
  return (
    <ol className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.18em]">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-center gap-3">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
              i <= idx
                ? "border-white bg-white text-[color:var(--color-ink)]"
                : "border-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)]"
            }`}
          >
            {i + 1}
          </span>
          <span className={i <= idx ? "text-white" : "text-[color:var(--color-fg-muted)]"}>
            {s.label}
          </span>
          {i < steps.length - 1 && <span className="h-px w-6 bg-[color:var(--color-border-strong)]" />}
        </li>
      ))}
    </ol>
  );
}

function CheckoutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6 md:p-8">
      <h2 className="mb-2 font-display text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className={bold ? "text-white" : "text-[color:var(--color-fg-muted)]"}>{label}</dt>
      <dd className={bold ? "text-base font-semibold text-white" : "text-sm text-white"}>{value}</dd>
    </div>
  );
}
