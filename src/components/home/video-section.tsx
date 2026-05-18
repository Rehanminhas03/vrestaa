"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/animations/reveal";

export function VideoSection() {
  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <Reveal>
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            On film
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Phase 03 — the film.
          </h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-[color:var(--color-surface)]"
        >
          <Image
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=2400&q=85"
            alt="Vresta Phase 03 film"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <button
            aria-label="Play film"
            className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[color:var(--color-ink)] shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-110 md:h-24 md:w-24"
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 md:p-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Now featuring
              </p>
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Compression. Rebuilt.
              </h3>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-white/70">
              2:48 · Watch
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
