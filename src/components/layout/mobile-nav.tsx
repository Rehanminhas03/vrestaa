"use client";

import Link from "next/link";
import { ChevronRight, Heart, User, Package } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUIStore } from "@/store/ui";
import { CATEGORIES } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { Logo } from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";

export function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const setOpen = useUIStore((s) => s.setMobileNavOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="max-w-sm">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SheetTitle className="sr-only">Menu</SheetTitle>
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 pt-2">
          <ul className="flex flex-col">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={ROUTES.category(c.slug)}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-[color:var(--color-border)] py-4 text-base font-medium text-white transition-colors hover:text-[color:var(--color-accent)]"
                >
                  <span>{c.name}</span>
                  <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
              Quick links
            </p>
            <ul className="flex flex-col gap-1">
              <MobileLink
                href={ROUTES.about}
                onClick={() => setOpen(false)}
                label="About"
              />
              <MobileLink
                href={ROUTES.contact}
                onClick={() => setOpen(false)}
                label="Contact"
              />
              <MobileLink
                href={ROUTES.faq}
                onClick={() => setOpen(false)}
                label="FAQ"
              />
              <MobileLink
                href={ROUTES.track}
                onClick={() => setOpen(false)}
                label="Track order"
              />
            </ul>
          </div>
        </nav>

        <Separator />

        <div className="grid grid-cols-3 gap-3 p-6">
          <MobileActionLink href={ROUTES.login} icon={<User className="h-4 w-4" />} label="Account" onClose={() => setOpen(false)} />
          <MobileActionLink href={ROUTES.wishlist} icon={<Heart className="h-4 w-4" />} label="Wishlist" onClose={() => setOpen(false)} />
          <MobileActionLink href={ROUTES.orders} icon={<Package className="h-4 w-4" />} label="Orders" onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center justify-between rounded-md px-2 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
      >
        {label}
        <ChevronRight className="h-4 w-4 text-white/30" />
      </Link>
    </li>
  );
}

function MobileActionLink({
  href,
  icon,
  label,
  onClose,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex flex-col items-center gap-2 rounded-lg border border-[color:var(--color-border)] px-3 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
