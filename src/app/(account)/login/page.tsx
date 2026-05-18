import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-9rem)] grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            Members get more
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">
            Early drops. Exclusive colourways. Members-only sale.
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-10 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back.
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
            Sign in to your account to track orders, save addresses, and unlock members-only drops.
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <Input type="email" placeholder="Email" autoComplete="email" />
            <Input type="password" placeholder="Password" autoComplete="current-password" />
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-[color:var(--color-fg-muted)]">
                <input type="checkbox" className="accent-[color:var(--color-accent)]" />
                Remember me
              </label>
              <Link href="/forgot" className="text-white hover:text-[color:var(--color-accent)]">
                Forgot password?
              </Link>
            </div>
            <Button size="lg" variant="primary" className="mt-2">
              Sign in
            </Button>
          </form>

          <div className="my-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
            <span className="h-px flex-1 bg-[color:var(--color-border)]" /> Or <span className="h-px flex-1 bg-[color:var(--color-border)]" />
          </div>

          <Button variant="outline" size="lg" className="w-full">
            Continue with Google
          </Button>
          <Button variant="outline" size="lg" className="mt-3 w-full">
            Continue with Apple
          </Button>

          <p className="mt-10 text-center text-sm text-[color:var(--color-fg-muted)]">
            New to Vresta?{" "}
            <Link href={ROUTES.register} className="text-white hover:text-[color:var(--color-accent)]">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
