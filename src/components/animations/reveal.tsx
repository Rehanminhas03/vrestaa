"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";
import { EASE_OUT_QUART } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: keyof Pick<HTMLElementTagNameMap, "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li">;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : duration, delay, ease: EASE_OUT_QUART },
    },
  };

  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}
