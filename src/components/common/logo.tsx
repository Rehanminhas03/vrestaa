import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE } from "@/constants/site";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  href?: string;
}

export function Logo({ className, size = 36, showWordmark = true, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${SITE.name} home`}
      className={cn("inline-flex items-center gap-2 group", className)}
    >
      <span
        className="relative inline-block shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo/vresta.png"
          alt=""
          fill
          sizes={`${size}px`}
          className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          priority
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white">
          {SITE.name}
        </span>
      )}
    </Link>
  );
}
