"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { SectionHeading } from "@/website/components/common/section-heading";
import { CATEGORIES } from "@/website/constants/categories";
import { ROUTES } from "@/website/constants/routes";
import { EASE_OUT_QUART } from "@/website/lib/motion";

export function FeaturedCategories() {
  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Shop by category"
          title="Built for every set."
          description="Nine purpose-built categories, engineered for the room, the platform, and the street."
          href={ROUTES.shop}
          hrefLabel="View all"
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: EASE_OUT_QUART }}
            >
              <Link
                href={ROUTES.category(cat.slug)}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--color-surface)]"
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                    Category
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 md:text-sm">{cat.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    Shop now
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
