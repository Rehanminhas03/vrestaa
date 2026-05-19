import type { Metadata } from "next";
import { getAdminSession } from "@/admin/lib/auth";
import { Sidebar } from "@/admin/components/sidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Vresta Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page provides its own layout below; we only guard the rest.
  // This layout still wraps /admin/login so we need to handle that branch.
  // Easiest: don't redirect here — middleware already redirects unauthenticated
  // visitors to /admin/login. If a session exists OR the path is /admin/login
  // (handled by middleware bypass), we just render children.
  return (
    <div className="min-h-screen bg-[color:var(--color-ink)]">
      <AdminFrame>{children}</AdminFrame>
    </div>
  );
}

async function AdminFrame({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // /admin/login renders without the shell. If we got here unauthenticated
  // it means we're on the login page (middleware bypass).
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

// Force this layout (and every page under it) to render dynamically so
// `cookies()` works. Admin is interactive — there's nothing to prerender.
export const dynamic = "force-dynamic";
