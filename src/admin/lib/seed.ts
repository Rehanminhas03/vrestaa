/**
 * Mulberry32 — a tiny, fast, deterministic 32-bit PRNG. Same seed always
 * produces the same sequence, which is exactly what we want for mock data
 * (the demo shouldn't shuffle every reload).
 */
export function makeRng(seed: number) {
  let s = seed >>> 0;
  return {
    next(): number {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    /** Integer in [min, max] inclusive */
    int(min: number, max: number): number {
      return Math.floor(this.next() * (max - min + 1)) + min;
    },
    pick<T>(arr: readonly T[]): T {
      return arr[Math.floor(this.next() * arr.length)];
    },
    /** Weighted pick: pass [[item, weight], ...] */
    weighted<T>(entries: readonly [T, number][]): T {
      const total = entries.reduce((sum, [, w]) => sum + w, 0);
      let r = this.next() * total;
      for (const [item, w] of entries) {
        r -= w;
        if (r <= 0) return item;
      }
      return entries[entries.length - 1][0];
    },
  };
}

export type Rng = ReturnType<typeof makeRng>;
