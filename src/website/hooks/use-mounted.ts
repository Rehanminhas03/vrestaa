"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns true after the component has hydrated on the client.
 * Uses useSyncExternalStore so we don't trigger react-hooks/set-state-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
