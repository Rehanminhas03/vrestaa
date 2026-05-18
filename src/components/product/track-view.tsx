"use client";

import * as React from "react";
import { useRecentlyViewedStore } from "@/store/recently-viewed";

export function TrackView({ slug }: { slug: string }) {
  const push = useRecentlyViewedStore((s) => s.push);
  React.useEffect(() => {
    push(slug);
  }, [push, slug]);
  return null;
}
