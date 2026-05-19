"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/website/components/common/container";
import { Reveal } from "@/website/components/animations/reveal";
import { Parallax } from "@/website/components/animations/parallax";

const stats = [
  { value: "4.9â˜…", label: "Average product rating" },
  { value: "40+", label: "Countries shipped" },
  { value: "98%", label: "Repeat customer score" },
];

export function BrandStory() {
  return (
    <section className="relative border-t border-[color:var(--color-border)] py-28 md:py-40 overflow-hidden">
      <Container size="wide" className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <Parallax speed={-30}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=1400&q=80"
                alt="Athlete training in Vresta compression"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </Parallax>
        </div>

        <div className="md:col-span-7 flex flex-col gap-8">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Our philosophy
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Engineered with intent. Built without compromise.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xl text-base text-[color:var(--color-fg-muted)] sm:text-lg">
              Every Vresta piece starts in the gym, not in a moodboard. We prototype with
              athletes, test under load, and refuse the &quot;close enough.&quot; The result
              is technical apparel that disappears into your training — and turns heads outside it.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6"
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-display text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
