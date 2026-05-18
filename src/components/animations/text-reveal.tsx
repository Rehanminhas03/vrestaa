"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerChildren = 0.04,
  as: As = "h1",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <As className={cn("flex flex-wrap overflow-hidden", className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-flex overflow-hidden last:mr-0">
          <motion.span
            initial={{ y: reduce ? 0 : "120%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduce ? 0 : 0.9,
              delay: delay + i * staggerChildren,
              ease: EASE_OUT_EXPO,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </As>
  );
}
