"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-wide transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-bone)]",
        accent:
          "bg-[color:var(--color-accent)] text-[color:var(--color-ink)] hover:shadow-[var(--shadow-glow)]",
        outline:
          "border border-[color:var(--color-border-strong)] bg-transparent text-white hover:bg-white hover:text-[color:var(--color-ink)]",
        ghost:
          "bg-transparent text-white hover:bg-white/5",
        dark:
          "bg-[color:var(--color-surface-elevated)] text-white border border-[color:var(--color-border)] hover:border-white/40",
        link: "text-white underline-offset-4 hover:underline px-0 py-0",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-xs",
        lg: "h-14 px-8 text-sm",
        xl: "h-16 px-10 text-sm",
        icon: "h-10 w-10 p-0",
      },
      shape: {
        sharp: "rounded-none",
        rounded: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "rounded",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
