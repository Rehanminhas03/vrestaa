import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="grid min-h-[calc(100vh-9rem)] grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            10% off your first order
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">
            Join the Vresta drop list.
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-10 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Create your account.
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
            Track orders, manage shipping, and earn rewards on every drop.
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="First name" autoComplete="given-name" />
              <Input placeholder="Last name" autoComplete="family-name" />
            </div>
            <Input type="email" placeholder="Email" autoComplete="email" />
            <Input type="password" placeholder="Password" autoComplete="new-password" />
            <p className="text-xs text-[color:var(--color-fg-muted)]">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="underline">Terms</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
            <Button size="lg" variant="primary" className="mt-2">
              Create account
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-[color:var(--color-fg-muted)]">
            Already have an account?{" "}
            <Link href={ROUTES.login} className="text-white hover:text-[color:var(--color-accent)]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
