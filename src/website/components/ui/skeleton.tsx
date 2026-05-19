import { cn } from "@/website/lib/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-white/5",
        className,
      )}
      {...props}
    />
  );
}
