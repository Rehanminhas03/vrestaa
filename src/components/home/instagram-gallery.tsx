"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/common/brand-icons";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { SITE } from "@/constants/site";
import { EASE_OUT_QUART } from "@/lib/motion";

const PHOTOS = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
];

export function InstagramGallery() {
  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="@vresta"
          title="From the community."
          description="Tag #VrestaAthlete for a chance to feature."
          href={SITE.social.instagram}
          hrefLabel="Follow on Instagram"
        />

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {PHOTOS.map((src, i) => (
            <motion.a
              key={src}
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_OUT_QUART }}
              className="group relative block aspect-square overflow-hidden rounded-lg bg-white/5"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <Link
          href={SITE.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-[color:var(--color-accent)] md:hidden"
        >
          Follow @vresta
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </Container>
    </section>
  );
}
