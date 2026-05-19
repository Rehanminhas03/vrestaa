"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_CREDENTIALS, ADMIN_SESSION_DAYS } from "./auth";

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function loginAction(
  _prev: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (
    username !== ADMIN_CREDENTIALS.username ||
    password !== ADMIN_CREDENTIALS.password
  ) {
    return { ok: false, error: "Invalid credentials. Try zia / zia123." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, username, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: ADMIN_SESSION_DAYS * 24 * 60 * 60,
  });

  const next = String(formData.get("next") ?? "/admin");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
