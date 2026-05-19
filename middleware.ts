import { NextRequest, NextResponse } from "next/server";

// Keep these in sync with src/admin/lib/auth.ts. We can't import from there
// because middleware runs in the Edge runtime and `next/headers` isn't allowed.
const ADMIN_COOKIE = "vresta_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login and /admin/logout don't require an existing session.
  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return NextResponse.next();
  }

  const session = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
