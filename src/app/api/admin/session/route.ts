import { NextResponse } from "next/server";

import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/backoffice/session";

export async function GET(request: Request) {
  // On lit le cookie HTTPOnly via l'API Request (accessible côté serveur).
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));

  const token = match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
  const isAdmin = token ? await verifyAdminSessionToken(token) : false;

  return NextResponse.json({ isAdmin });
}

