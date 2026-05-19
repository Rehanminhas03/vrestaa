"use client";

import * as React from "react";
import { cn } from "@/website/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-[color:var(--color-border-strong)] bg-transparent px-4 py-2 text-sm text-white placeholder:text-[color:var(--color-fg-muted)] transition-colors duration-200 focus:border-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
