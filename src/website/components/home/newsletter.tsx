"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Container } from "@/website/components/common/container";
import { Reveal } from "@/website/components/animations/reveal";
import { Button } from "@/website/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section className="border-t border-[color:var(--color-border)] py-24 md:py-32">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-8 md:p-14 lg:p-20"
        >
          {/* Background gradient orbs */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(199,255,62,0.18),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] blur-3xl" />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Reveal>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                  The drop list
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                  First access. Best prices. Zero spam.
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-sm text-[color:var(--color-fg-muted)] md:text-base">
                  Join 80k+ athletes. Get early access to drops, exclusive
                  members-only colourways, and 10% off your first order.
                </p>
              </Reveal>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative w-full"
              aria-label="Newsletter signup"
            >
              <div className="relative flex h-14 items-center overflow-hidden rounded-full border border-[color:var(--color-border-strong)] bg-black/50 backdrop-blur md:h-16">
                <Mail className="ml-5 h-4 w-4 text-[color:var(--color-fg-muted)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="h-full flex-1 bg-transparent px-3 text-sm text-white placeholder:text-[color:var(--color-fg-muted)] focus:outline-none md:text-base"
                />
                <Button
                  type="submit"
                  variant="accent"
                  shape="pill"
                  size="md"
                  className="mr-1 hidden md:inline-flex"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-ink)] md:hidden"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-[11px] text-[color:var(--color-fg-muted)]">
                By subscribing you agree to our Privacy Policy.
              </p>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--color-accent)]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  You&apos;re in. Check your inbox.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
