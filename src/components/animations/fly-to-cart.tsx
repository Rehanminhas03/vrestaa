"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useUIStore } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { EASE_OUT_EXPO } from "@/lib/motion";

export const CART_ICON_ID = "vresta-cart-icon";

/**
 * Global, mount-once overlay that listens for fly-to-cart events from the
 * UI store. When an event arrives it renders a fixed-position image at the
 * source rect, then animates it toward the header cart icon and clears.
 *
 * Skips the animation under reduced motion — still pulses the cart bubble.
 */
export function FlyToCart() {
  const event = useUIStore((s) => s.flyEvent);
  const clearFlyEvent = useUIStore((s) => s.clearFlyEvent);
  const bumpCartPulse = useUIStore((s) => s.bumpCartPulse);
  const reduce = useReducedMotion();
  const mounted = useMounted();

  // Resolve target rect once per event nonce.
  const targetRect = React.useMemo(() => {
    if (!event || !mounted) return null;
    const target = document.getElementById(CART_ICON_ID);
    return target ? target.getBoundingClientRect() : null;
  }, [event, mounted]);

  // If we can't show the animation (reduced motion, or target missing), just
  // confirm the add via pulse + clear. Done as an effect to avoid setting state in render.
  const shouldShortCircuit = mounted && event && (reduce || !targetRect);
  React.useEffect(() => {
    if (!shouldShortCircuit) return;
    bumpCartPulse();
    clearFlyEvent();
  }, [shouldShortCircuit, bumpCartPulse, clearFlyEvent]);

  if (!mounted || !event || !targetRect || reduce) return null;

  const SIZE = 72;
  const fromX = event.fromRect.x + event.fromRect.width / 2 - SIZE / 2;
  const fromY = event.fromRect.y + event.fromRect.height / 2 - SIZE / 2;
  const toX = targetRect.x + targetRect.width / 2 - SIZE / 2;
  const toY = targetRect.y + targetRect.height / 2 - SIZE / 2;

  return createPortal(
    <motion.div
      key={event.nonce}
      initial={{ x: fromX, y: fromY, opacity: 0, scale: 1, rotate: 0 }}
      animate={{
        x: toX,
        y: toY,
        opacity: [0, 1, 1, 0],
        scale: [1, 1, 0.4],
        rotate: 14,
      }}
      transition={{
        duration: 0.75,
        ease: EASE_OUT_EXPO,
        times: [0, 0.1, 0.85, 1],
      }}
      onAnimationComplete={() => {
        bumpCartPulse();
        clearFlyEvent();
      }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 100,
        willChange: "transform, opacity",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.src}
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 12,
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)",
        }}
      />
    </motion.div>,
    document.body,
  );
}

/**
 * Helper for click handlers: pass the event currentTarget and an image URL,
 * and we'll dispatch a fly-to-cart event from that element's rect.
 */
export function dispatchFlyToCart(target: HTMLElement | null, src: string) {
  if (!target) return;
  const rect = target.getBoundingClientRect();
  useUIStore
    .getState()
    .triggerFlyToCart(src, { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
}
