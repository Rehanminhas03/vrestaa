import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { Reveal } from "@/website/components/animations/reveal";
import { Parallax } from "@/website/components/animations/parallax";
import { Button } from "@/website/components/ui/button";
import { ROUTES } from "@/website/constants/routes";

export const metadata: Metadata = { title: "About" };

const VALUES = [
  {
    title: "Built with athletes",
    body: "Every piece is co-developed with strength athletes, hybrid athletes, and coaches. The gym is our prototype lab.",
  },
  {
    title: "No-compromise materials",
    body: "We source the heaviest, the softest, the most technical fabrics — and reject the spec sheet when reality doesn't match.",
  },
  {
    title: "Engineered, not designed",
    body: "Fit is calibrated to anatomy, not seasonal trend. Pieces last because they were measured to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-border)]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=2400&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/60 via-transparent to-[color:var(--color-ink)]" />
        </div>
        <Container size="wide" className="py-32 md:py-44">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Our story
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
              Built for the rise. Engineered against the &quot;good enough.&quot;
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
              Vresta started in a back-of-gym office with one rule: nothing ships
              until it survives a real session. We&apos;re still living by it.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container size="wide" className="grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <Parallax speed={-30}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85"
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </div>
        <div className="md:col-span-7 flex flex-col gap-6">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              The philosophy
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Performance is non-negotiable. Aesthetic is the bonus.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-[color:var(--color-fg-muted)]">
              We test everything under load — on the platform, on the run, on the
              tarmac. If it can&apos;t survive a full week of high-intensity
              training, it doesn&apos;t earn the logo. The result is technical
              apparel that earns its place in the bag, not just on the rack.
            </p>
          </Reveal>
        </div>
      </Container>

      <Container size="wide" className="py-24 md:py-32">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            Our values
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Three rules we don&apos;t break.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-white/[0.02] p-8">
                <span className="font-display text-3xl font-bold text-[color:var(--color-accent)]">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{v.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)]">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container size="wide" className="pb-24 md:pb-32">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[color:var(--color-border)] bg-white/[0.02] p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to train in it?
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
              Browse the full Vresta line — engineered for the rise.
            </p>
          </div>
          <Button asChild size="xl" variant="accent" shape="pill">
            <Link href={ROUTES.shop}>
              Shop the line
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
