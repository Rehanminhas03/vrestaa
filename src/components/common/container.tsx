import * as React from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[1600px]",
};

export function Container({
  as: Comp = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn("container-px mx-auto w-full", sizes[size], className)}
      {...props}
    />
  );
}
