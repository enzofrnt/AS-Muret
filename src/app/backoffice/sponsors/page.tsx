import { and, asc, eq, gt, gte, lt, lte, sql } from "drizzle-orm";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";

import { getDb } from "@/db/client";
import { sponsors } from "@/db/schema";

function toInt(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  const num = Number.parseInt(value, 10);
  return Number.isFinite(num) ? num : null;
}

function toStr(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value;
}

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

async function normalizeSponsorOrder(db: ReturnType<typeof getDb>) {
  const rows = await db
    .select({ id: sponsors.id })
    .from(sponsors)
    .orderBy(asc(sponsors.sortOrder), asc(sponsors.id));

  for (let i = 0; i < rows.length; i += 1) {
    await db.update(sponsors).set({ sortOrder: i }).where(eq(sponsors.id, rows[i].id));
  }
}

async function getSponsorCount(db: ReturnType<typeof getDb>) {
  const row = await db
    .select({ count: sql<number>`count(*)` })
    .from(sponsors)
    .get();
  return Number(row?.count ?? 0);
}

async function uploadSponsorLogo(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const pathname = `sponsors/${crypto.randomUUID()}-${safeFilename(file.name)}`;

  const blob = await put(pathname, bytes, {
    access: "public",
    contentType: file.type || undefined,
  });

  return { url: blob.url, pathname: blob.pathname };
}

async function createSponsorAction(formData: FormData) {
  "use server";
  const db = getDb();

  const name = toStr(formData.get("name")).trim();
  const requestedOrder = toInt(formData.get("sortOrder")) ?? 0;
  const description = toStr(formData.get("description")).trim();
  const address = toStr(formData.get("address")).trim();
  const phone = toStr(formData.get("phone")).trim();
  const email = toStr(formData.get("email")).trim();
  const websiteUrl = toStr(formData.get("websiteUrl")).trim();

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Image manquante");
  }

  if (!name) {
    throw new Error("Nom manquant");
  }

  const upload = await uploadSponsorLogo(file);

  await db.transaction(async (tx) => {
    const count = await getSponsorCount(tx as unknown as ReturnType<typeof getDb>);
    const sortOrder = clampInt(requestedOrder, 0, count);

    // Insertion: on décale tous les éléments à partir de sortOrder.
    await tx
      .update(sponsors)
      .set({ sortOrder: sql`${sponsors.sortOrder} + 1` })
      .where(gte(sponsors.sortOrder, sortOrder));

    await tx.insert(sponsors).values({
      name,
      imageUrl: upload.url,
      imagePathname: upload.pathname,
      websiteUrl: websiteUrl || null,
      description: description || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      sortOrder,
      isActive: true,
      updatedAt: new Date(),
    });

    await normalizeSponsorOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  revalidatePath("/");
  revalidatePath("/backoffice/sponsors");
  redirect("/backoffice/sponsors");
}

async function updateSponsorAction(formData: FormData) {
  "use server";
  const db = getDb();

  const id = toInt(formData.get("id"));
  if (!id) throw new Error("ID sponsor invalide");

  const name = toStr(formData.get("name")).trim();
  const requestedOrder = toInt(formData.get("sortOrder"));
  const description = toStr(formData.get("description")).trim();
  const address = toStr(formData.get("address")).trim();
  const phone = toStr(formData.get("phone")).trim();
  const email = toStr(formData.get("email")).trim();
  const websiteUrl = toStr(formData.get("websiteUrl")).trim();

  if (!name) {
    throw new Error("Nom manquant");
  }

  const existing = await db
    .select({ imagePathname: sponsors.imagePathname, sortOrder: sponsors.sortOrder })
    .from(sponsors)
    .where(eq(sponsors.id, id))
    .get();

  const file = formData.get("image");
  let imageUrl: string | undefined;
  let imagePathname: string | undefined;

  if (file instanceof File && file.size > 0) {
    const upload = await uploadSponsorLogo(file);
    imageUrl = upload.url;
    imagePathname = upload.pathname;
  }

  await db.transaction(async (tx) => {
    const count = await getSponsorCount(tx as unknown as ReturnType<typeof getDb>);
    const currentOrder = existing?.sortOrder ?? 0;
    const targetOrder =
      requestedOrder == null ? currentOrder : clampInt(requestedOrder, 0, Math.max(0, count - 1));

    if (targetOrder !== currentOrder) {
      // Déplacement: on décale les autres entre les bornes.
      if (targetOrder > currentOrder) {
        await tx
          .update(sponsors)
          .set({ sortOrder: sql`${sponsors.sortOrder} - 1` })
          .where(
            and(
              gt(sponsors.sortOrder, currentOrder),
              lte(sponsors.sortOrder, targetOrder)
            )
          );
      } else {
        await tx
          .update(sponsors)
          .set({ sortOrder: sql`${sponsors.sortOrder} + 1` })
          .where(
            and(
              gte(sponsors.sortOrder, targetOrder),
              lt(sponsors.sortOrder, currentOrder)
            )
          );
      }
    }

    await tx
      .update(sponsors)
      .set({
        name,
        sortOrder: targetOrder,
        isActive: true,
        websiteUrl: websiteUrl || null,
        description: description || null,
        address: address || null,
        phone: phone || null,
        email: email || null,
        ...(imageUrl ? { imageUrl } : {}),
        ...(imagePathname ? { imagePathname } : {}),
        updatedAt: new Date(),
      })
      .where(eq(sponsors.id, id));

    await normalizeSponsorOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  if (imagePathname && existing?.imagePathname) {
    await del(existing.imagePathname);
  }

  revalidatePath("/");
  revalidatePath("/backoffice/sponsors");
  redirect("/backoffice/sponsors");
}

async function deleteSponsorAction(formData: FormData) {
  "use server";
  const db = getDb();

  const id = toInt(formData.get("id"));
  if (!id) throw new Error("ID sponsor invalide");

  const existing = await db
    .select({ imagePathname: sponsors.imagePathname })
    .from(sponsors)
    .where(eq(sponsors.id, id))
    .get();

  await db.transaction(async (tx) => {
    await tx.delete(sponsors).where(eq(sponsors.id, id));
    await normalizeSponsorOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  if (existing?.imagePathname) {
    await del(existing.imagePathname);
  }

  revalidatePath("/");
  revalidatePath("/backoffice/sponsors");
  redirect("/backoffice/sponsors");
}

export default async function BackofficeSponsorsPage() {
  const db = getDb();
  const items = await db.select().from(sponsors).orderBy(asc(sponsors.sortOrder));

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-10 pb-14 sm:px-10 lg:px-16">
        <div>
          <p className="text-sm text-zinc-500">
            <a className="underline underline-offset-2" href="/backoffice">
              Backoffice
            </a>{" "}
            / Sponsors
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sponsors</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Ajout / modification / ordre / activation.
          </p>
        </div>

        <details className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold">
            Ajouter un sponsor
            <span className="ml-2 text-sm font-normal text-zinc-500">
              (cliquer pour ouvrir)
            </span>
          </summary>
          <div className="px-6 pb-6">
            <form action={createSponsorAction} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Nom *
                  </label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Logo *
                  </label>
                  <p className="mt-1 text-xs text-zinc-500">
                    Formats recommandés : WebP ou AVIF.
                  </p>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Ordre
                  </label>
                  <input
                    name="sortOrder"
                    type="number"
                    min={0}
                    max={items.length}
                    defaultValue={items.length}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Description
                  </label>
                  <input
                    name="description"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Site web
                  </label>
                  <input
                    name="websiteUrl"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Adresse
                  </label>
                  <input
                    name="address"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Téléphone
                  </label>
                  <input
                    name="phone"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <input
                    name="email"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-fit"
              >
                Ajouter
              </button>
            </form>
          </div>
        </details>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Ordre {item.sortOrder} • {item.isActive ? "Actif" : "Inactif"}
                  </p>
                </div>
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-semibold text-blue-700 underline underline-offset-2"
                >
                  Ouvrir
                </a>
              </div>

              <div className="relative h-28 w-full bg-white">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className="object-contain p-3"
                />
              </div>

              <details className="border-t border-zinc-100">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-zinc-800">
                  Modifier
                  <span className="ml-2 text-xs font-normal text-zinc-500">
                    (cliquer pour ouvrir)
                  </span>
                </summary>
                <div className="px-4 pb-4">
                  <form action={updateSponsorAction} className="grid gap-3">
                    <input type="hidden" name="id" value={item.id} />

                    <div className="grid gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Nom *
                        </label>
                        <input
                          name="name"
                          required
                          defaultValue={item.name}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Remplacer le logo
                        </label>
                        <p className="mt-1 text-xs text-zinc-500">
                          Formats recommandés : WebP ou AVIF.
                        </p>
                        <input
                          name="image"
                          type="file"
                          accept="image/*"
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Ordre
                        </label>
                        <input
                          name="sortOrder"
                          type="number"
                          min={0}
                          max={Math.max(0, items.length - 1)}
                          defaultValue={item.sortOrder}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Description
                        </label>
                        <input
                          name="description"
                          defaultValue={item.description ?? ""}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Site web
                        </label>
                        <input
                          name="websiteUrl"
                          defaultValue={item.websiteUrl ?? ""}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Adresse
                        </label>
                        <input
                          name="address"
                          defaultValue={item.address ?? ""}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700">
                          Téléphone
                        </label>
                        <input
                          name="phone"
                          defaultValue={item.phone ?? ""}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-zinc-700">
                          Email
                        </label>
                        <input
                          name="email"
                          defaultValue={item.email ?? ""}
                          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-fit"
                    >
                      Enregistrer
                    </button>
                  </form>

                  <form action={deleteSponsorAction} className="mt-2">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="w-full rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              </details>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

