"use client";

import { useActionState } from "react";
import { Lock, User } from "lucide-react";
import { loginAction, type LoginResult } from "@/admin/lib/actions";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";

const initial: LoginResult | null = null;

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      {next && <input type="hidden" name="next" value={next} />}

      <label className="relative block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-fg-muted)]">
          <User className="h-4 w-4" />
        </span>
        <Input
          name="username"
          placeholder="Username"
          autoComplete="username"
          required
          className="pl-9"
        />
      </label>

      <label className="relative block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-fg-muted)]">
          <Lock className="h-4 w-4" />
        </span>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="pl-9"
        />
      </label>

      {state?.error && (
        <p className="rounded-md border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 px-3 py-2 text-xs text-[color:var(--color-danger)]">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" variant="accent" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
