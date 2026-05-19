"use client";

import * as React from "react";
import { cn } from "@/website/lib/cn";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  speed?: "slow" | "normal" | "fast";
}

const speedClass = {
  slow: "[animation-duration:50s]",
  normal: "[animation-duration:30s]",
  fast: "[animation-duration:18s]",
};

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  speed = "normal",
}: MarqueeProps) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 animate-marquee items-center gap-12",
          speedClass[speed],
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
