"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2, Sparkles, Truck } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic-button";
import { Marquee } from "@/components/animations/marquee";
import { ROUTES } from "@/constants/routes";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";

const PERKS = [
  { icon: Truck, label: "Free express over $120" },
  { icon: CheckCircle2, label: "30-day returns" },
  { icon: Sparkles, label: "Members get 10% off" },
];

const TAGLINE_WORDS = [
  "Verified athletic grade",
  "Engineered in LA",
  "Premium technical",
  "Built to outlast",
  "Drop 03 — live now",
];

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageWrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const gsap = ensureGsap();
    if (!containerRef.current || !imageWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imageWrapRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, containerRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)]"
    >
      <div ref={imageWrapRef} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)] via-[color:var(--color-ink)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-transparent to-transparent" />
      </div>

      {/* Floating "just dropped" card — desktop only */}
      <FloatingDropCard />

      {/* Vertical editorial strip on far left edge — desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE_OUT_EXPO }}
        className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
        aria-hidden="true"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-white/30" />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50"
          style={{ writingMode: "vertical-rl" }}
        >
          Vresta — Volume 03 · 2026
        </span>
        <span className="h-16 w-px bg-gradient-to-t from-transparent to-white/30" />
      </motion.div>

      <Container size="wide" className="relative z-10 flex flex-1 flex-col justify-end pb-20 pt-32 md:pt-44">
        {/* Massive outlined ghost wordmark behind the headline for editorial impact */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute left-0 right-0 bottom-[26%] select-none whitespace-nowrap text-center font-display font-bold leading-none tracking-tighter md:left-auto md:right-[-3%] md:text-right xl:right-[-2%]"
          style={{
            fontSize: "clamp(120px, 22vw, 360px)",
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          RISE
        </motion.span>

        {/* Stacked editorial headline — "rise." dominates at extreme size */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          className="relative font-display flex flex-col leading-[0.86] tracking-tight"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
            }}
            className="text-4xl font-semibold uppercase text-white/90 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Engineered
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
            }}
            className="mt-1 text-3xl font-medium uppercase text-white/55 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            for the
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
            }}
            className="-mt-2 text-[96px] font-bold italic text-white sm:text-[140px] md:text-[200px] lg:text-[240px] xl:text-[280px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            rise<span className="text-[color:var(--color-accent)]">.</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-6 max-w-md text-base text-white/75 sm:text-lg"
        >
          Premium technical gymwear built for athletes who don&apos;t settle. Sculpted fits, performance fabrics, uncompromising design.
        </motion.p>

        {/* Perks chips */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
          }}
          className="mt-8 flex flex-wrap items-center gap-2 self-start"
        >
          {PERKS.map((perk) => (
            <motion.li
              key={perk.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
            >
              <perk.icon className="h-3 w-3 text-[color:var(--color-accent)]" />
              {perk.label}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT_EXPO }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button asChild size="xl" variant="accent" shape="pill">
              <Link href={ROUTES.shop}>
                Shop the drop
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild size="xl" variant="outline" shape="pill">
            <Link href={ROUTES.category("compression")}>Explore compression</Link>
          </Button>
        </motion.div>

        {/* Subtle tagline marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 self-stretch overflow-hidden"
        >
          <Marquee speed="slow" pauseOnHover={false}>
            {TAGLINE_WORDS.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40"
              >
                {word}
                <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent)]/60" />
              </span>
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex items-end justify-between gap-6 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowDown className="h-3 w-3" /> Scroll to discover
          </span>
          <div className="hidden gap-8 sm:flex md:gap-12">
            <CountStat value={48} suffix="hr" label="Express dispatch" />
            <CountStat value={40} suffix="+" label="Countries shipped" />
            <CountStat value={4.9} suffix="★" label="Avg rating" decimals={1} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FloatingDropCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 1.3, ease: EASE_OUT_EXPO }}
      className="pointer-events-auto absolute right-10 top-1/2 z-20 hidden w-72 -translate-y-1/2 lg:block xl:right-16"
      aria-hidden="true"
    >
      <Link
        href={ROUTES.product("round-neck-compression-shirt")}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85"
            alt=""
            fill
            sizes="288px"
            className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
            <Sparkles className="h-3 w-3" />
            Just Dropped
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Round Neck Compression
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
              5 colourways · From $58
            </p>
          </div>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--color-ink)] transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.aside>
  );
}

function CountStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => v.toFixed(decimals));

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionVal, value]);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="font-display text-xs font-semibold tabular-nums text-white">
        <motion.span>{display}</motion.span>
        {suffix}
      </span>
      <span>{label}</span>
    </div>
  );
}
