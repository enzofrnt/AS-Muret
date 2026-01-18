import Link from "next/link";

export default function BackofficeHomePage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pt-10 pb-14 sm:px-10 lg:px-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Backoffice</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Gestion des sponsors et du carrousel.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/backoffice/sponsors"
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-semibold">Sponsors</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Ajouter / modifier / réordonner les sponsors et leurs logos.
            </p>
          </Link>

          <Link
            href="/backoffice/carousel"
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-semibold">Carrousel</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Gérer les photos du carrousel (upload, ordre, activation).
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

