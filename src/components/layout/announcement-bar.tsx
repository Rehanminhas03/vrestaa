"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/constants/site";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_QUART } from "@/lib/motion";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full bg-[color:var(--color-ink)] text-white">
      <div className="relative mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-center text-[11px] font-medium uppercase tracking-[0.18em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
            className="text-[color:var(--color-silver)]"
          >
            {ANNOUNCEMENTS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}
