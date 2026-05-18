import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { SITE } from "@/constants/site";

export const metadata: Metadata = { title: "Contact" };

const CHANNELS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
  { icon: MapPin, label: "HQ", value: SITE.address, href: SITE.social.instagram },
  {
    icon: MessageSquare,
    label: "Live chat",
    value: "Mon–Fri · 8am to 8pm PT",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <Container size="wide" className="py-12 md:py-20">
      <header className="mb-14 flex flex-col gap-4">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            We&apos;re here
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            Talk to us.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)] md:text-base">
            Question about fit, an order, a wholesale enquiry — pick a channel.
            Real humans on the other side.
          </p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 space-y-3">
          {CHANNELS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex items-center gap-4 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-5 transition-colors hover:border-white/30"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white">
                <c.icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                  {c.label}
                </p>
                <p className="text-sm text-white">{c.value}</p>
              </div>
            </Link>
          ))}
        </div>

        <form className="lg:col-span-7 flex flex-col gap-4 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-white">Send us a message</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input type="email" placeholder="Email" />
          <Input placeholder="Subject" />
          <textarea
            placeholder="Tell us what's up…"
            rows={6}
            className="flex w-full rounded-md border border-[color:var(--color-border-strong)] bg-transparent px-4 py-3 text-sm text-white placeholder:text-[color:var(--color-fg-muted)] focus:border-white focus-visible:outline-none"
          />
          <Button size="lg" variant="primary" className="self-start">
            Send message
          </Button>
        </form>
      </div>
    </Container>
  );
}
