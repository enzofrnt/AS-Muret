import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
} from "@/backoffice/session";

function safeNextUrl(value: unknown) {
  if (typeof value !== "string") return "/backoffice";
  if (!value.startsWith("/")) return "/backoffice";
  if (value.startsWith("//")) return "/backoffice";
  if (!value.startsWith("/backoffice")) return "/backoffice";
  return value;
}

async function loginAction(formData: FormData) {
  "use server";

  const password = formData.get("password");
  const nextUrl = safeNextUrl(formData.get("next"));

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    throw new Error("ADMIN_PASSWORD manquant");
  }

  if (typeof password !== "string" || password !== expectedPassword) {
    redirect(`/backoffice/login?error=1&next=${encodeURIComponent(nextUrl)}`);
  }

  const token = await createAdminSessionToken();
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());

  redirect(nextUrl);
}

export default async function BackofficeLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextUrl = safeNextUrl(params.next);
  const hasError = params.error === "1";

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pt-10 pb-14 sm:px-10 lg:px-16">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Backoffice</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Connexion administrateur (1 utilisateur).
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="next" value={nextUrl} />

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {hasError ? (
                <p className="mt-2 text-sm text-red-600">
                  Mot de passe incorrect.
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

