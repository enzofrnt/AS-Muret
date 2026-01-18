import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
} from "@/backoffice/session";

export async function POST() {
  const jar = await cookies();
  const base = getAdminSessionCookieOptions();
  jar.set(ADMIN_SESSION_COOKIE, "", { ...base, maxAge: 0 });

  return NextResponse.json({ ok: true });
}

