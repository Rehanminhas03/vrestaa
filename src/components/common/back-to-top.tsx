"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = React.useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8,
        pointerEvents: show ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[color:var(--color-charcoal)]/85 text-white shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-white/40 hover:text-[color:var(--color-accent)] md:bottom-10 md:right-10"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
