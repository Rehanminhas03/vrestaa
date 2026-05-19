import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vresta_admin";
export const ADMIN_SESSION_DAYS = 7;

/**
 * Pull admin credentials from env so a Firebase swap-in can just change
 * env vars + the middleware. Falls back to the locally agreed defaults
 * so the demo Just Works without any setup.
 */
export const ADMIN_CREDENTIALS = {
  username: process.env.VRESTA_ADMIN_USER ?? "zia",
  password: process.env.VRESTA_ADMIN_PASS ?? "zia123",
} as const;

/** Server-side: returns the admin's identifier if logged in, else null. */
export async function getAdminSession(): Promise<string | null> {
  const store = await cookies();
  const v = store.get(ADMIN_COOKIE)?.value;
  return v ?? null;
}

/** Server-side: throws-then-redirects if not authed. Use in admin layout. */
export async function requireAdmin(): Promise<string> {
  const session = await getAdminSession();
  if (!session) {
    // Layouts can't redirect from a thrown error in Next 16, so callers should
    // check first and call redirect() themselves. We provide both helpers.
    throw new Error("UNAUTHENTICATED");
  }
  return session;
}
