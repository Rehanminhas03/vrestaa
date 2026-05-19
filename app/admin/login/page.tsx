import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/admin/lib/auth";
import { LoginForm } from "@/admin/components/login-form";
import { SITE } from "@/website/constants/site";

export const metadata: Metadata = {
  title: "Admin · Sign in",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ next?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  const { next } = await searchParams;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            {SITE.name} · Admin
          </p>
          <h2 className="mt-3 max-w-md font-display text-4xl font-bold tracking-tight text-white">
            Run the floor. Manage every order, product, and customer from one place.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/65">
            Demo credentials are pre-filled in the helper below. Real Firebase auth
            slots in by changing one file.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            {SITE.name}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Sign in to admin.
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
            Authorised personnel only.
          </p>

          <LoginForm next={next} />

          <div className="mt-8 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-4 text-xs text-[color:var(--color-fg-muted)]">
            <p className="font-semibold text-white/80">Demo credentials</p>
            <p className="mt-1">Username: <span className="font-mono text-white">zia</span></p>
            <p>Password: <span className="font-mono text-white">zia123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
