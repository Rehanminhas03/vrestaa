"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/website/components/ui/sheet";
import { Sidebar } from "./sidebar";

interface TopbarProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, description, actions }: TopbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--color-border)] bg-[color:var(--color-ink)]/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-5">
        <div className="flex items-center gap-3 min-w-0">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-xs p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Admin navigation</SheetTitle>
              </SheetHeader>
              <Sidebar onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
              {title}
            </h1>
            {description && (
              <p className="mt-0.5 truncate text-xs text-[color:var(--color-fg-muted)] md:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
