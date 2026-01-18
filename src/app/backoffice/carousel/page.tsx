import { and, asc, eq, gt, gte, lt, lte, sql } from "drizzle-orm";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import Image from "next/image";

import { getDb } from "@/db/client";
import { carouselImages } from "@/db/schema";
import ActionForm from "@/components/ActionForm";
import ImagePreviewButton from "@/components/ImagePreviewButton";

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

async function normalizeCarouselOrder(db: ReturnType<typeof getDb>) {
  const rows = await db
    .select({ id: carouselImages.id })
    .from(carouselImages)
    .orderBy(asc(carouselImages.sortOrder), asc(carouselImages.id));

  for (let i = 0; i < rows.length; i += 1) {
    await db
      .update(carouselImages)
      .set({ sortOrder: i })
      .where(eq(carouselImages.id, rows[i].id));
  }
}

async function getCarouselCount(db: ReturnType<typeof getDb>) {
  const row = await db
    .select({ count: sql<number>`count(*)` })
    .from(carouselImages)
    .get();
  return Number(row?.count ?? 0);
}

async function uploadCarouselImage(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const pathname = `carousel/${crypto.randomUUID()}-${safeFilename(file.name)}`;

  const blob = await put(pathname, bytes, {
    access: "public",
    contentType: file.type || undefined,
  });

  return { url: blob.url, pathname: blob.pathname };
}

async function createCarouselAction(formData: FormData) {
  "use server";
  const db = getDb();

  const alt = toStr(formData.get("alt")).trim();
  const requestedOrder = toInt(formData.get("sortOrder")) ?? 0;

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Image manquante");
  }

  if (!alt) {
    throw new Error("Texte alternatif manquant");
  }

  const upload = await uploadCarouselImage(file);

  await db.transaction(async (tx) => {
    const count = await getCarouselCount(tx as unknown as ReturnType<typeof getDb>);
    const sortOrder = clampInt(requestedOrder, 0, count);

    await tx
      .update(carouselImages)
      .set({ sortOrder: sql`${carouselImages.sortOrder} + 1` })
      .where(gte(carouselImages.sortOrder, sortOrder));

    await tx.insert(carouselImages).values({
      alt,
      imageUrl: upload.url,
      imagePathname: upload.pathname,
      sortOrder,
      isActive: true,
      updatedAt: new Date(),
    });

    await normalizeCarouselOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  revalidatePath("/");
  revalidatePath("/backoffice/carousel");
  return { ok: true };
}

async function updateCarouselAction(formData: FormData) {
  "use server";
  const db = getDb();

  const id = toInt(formData.get("id"));
  if (!id) throw new Error("ID image invalide");

  const alt = toStr(formData.get("alt")).trim();
  const requestedOrder = toInt(formData.get("sortOrder"));

  if (!alt) {
    throw new Error("Texte alternatif manquant");
  }

  const existing = await db
    .select({
      imagePathname: carouselImages.imagePathname,
      sortOrder: carouselImages.sortOrder,
    })
    .from(carouselImages)
    .where(eq(carouselImages.id, id))
    .get();

  const file = formData.get("image");
  let imageUrl: string | undefined;
  let imagePathname: string | undefined;

  if (file instanceof File && file.size > 0) {
    const upload = await uploadCarouselImage(file);
    imageUrl = upload.url;
    imagePathname = upload.pathname;
  }

  await db.transaction(async (tx) => {
    const count = await getCarouselCount(tx as unknown as ReturnType<typeof getDb>);
    const currentOrder = existing?.sortOrder ?? 0;
    const targetOrder =
      requestedOrder == null ? currentOrder : clampInt(requestedOrder, 0, Math.max(0, count - 1));

    if (targetOrder !== currentOrder) {
      if (targetOrder > currentOrder) {
        await tx
          .update(carouselImages)
          .set({ sortOrder: sql`${carouselImages.sortOrder} - 1` })
          .where(
            and(
              gt(carouselImages.sortOrder, currentOrder),
              lte(carouselImages.sortOrder, targetOrder)
            )
          );
      } else {
        await tx
          .update(carouselImages)
          .set({ sortOrder: sql`${carouselImages.sortOrder} + 1` })
          .where(
            and(
              gte(carouselImages.sortOrder, targetOrder),
              lt(carouselImages.sortOrder, currentOrder)
            )
          );
      }
    }

    await tx
      .update(carouselImages)
      .set({
        alt,
        sortOrder: targetOrder,
        isActive: true,
        ...(imageUrl ? { imageUrl } : {}),
        ...(imagePathname ? { imagePathname } : {}),
        updatedAt: new Date(),
      })
      .where(eq(carouselImages.id, id));

    await normalizeCarouselOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  if (imagePathname && existing?.imagePathname) {
    await del(existing.imagePathname);
  }

  revalidatePath("/");
  revalidatePath("/backoffice/carousel");
  return { ok: true };
}

async function deleteCarouselAction(formData: FormData) {
  "use server";
  const db = getDb();

  const id = toInt(formData.get("id"));
  if (!id) throw new Error("ID image invalide");

  const existing = await db
    .select({ imagePathname: carouselImages.imagePathname })
    .from(carouselImages)
    .where(eq(carouselImages.id, id))
    .get();

  await db.transaction(async (tx) => {
    await tx.delete(carouselImages).where(eq(carouselImages.id, id));
    await normalizeCarouselOrder(tx as unknown as ReturnType<typeof getDb>);
  });

  if (existing?.imagePathname) {
    await del(existing.imagePathname);
  }

  revalidatePath("/");
  revalidatePath("/backoffice/carousel");
  return { ok: true };
}

export default async function BackofficeCarouselPage() {
  const db = getDb();
  const items = await db
    .select()
    .from(carouselImages)
    .orderBy(asc(carouselImages.sortOrder));

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-10 pb-14 sm:px-10 lg:px-16">
        <div>
          <p className="text-sm text-zinc-500">
            <a className="underline underline-offset-2" href="/backoffice">
              Backoffice
            </a>{" "}
            / Carrousel
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Carrousel
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Ajout / modification / ordre / activation.
          </p>
        </div>

        <details className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold">
            Ajouter une image
            <span className="ml-2 text-sm font-normal text-zinc-500">
              (cliquer pour ouvrir)
            </span>
          </summary>
          <div className="px-6 pb-6">
            <ActionForm
              action={createCarouselAction}
              className="grid gap-4"
              feedback={{
                loadingTitle: "Ajout de l’image…",
                loadingMessage: "Upload de l’image et mise à jour de la base.",
                successTitle: "Création terminée",
                successMessage: "L’image a bien été ajoutée.",
                errorTitle: "Création impossible",
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Texte alternatif (alt) *
                  </label>
                  <input
                    name="alt"
                    required
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Image *
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

              <button
                type="submit"
                className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-fit"
              >
                Ajouter
              </button>
            </ActionForm>
          </div>
        </details>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {item.alt}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Ordre {item.sortOrder} • {item.isActive ? "Actif" : "Inactif"}
                  </p>
                </div>
              </div>

              <div className="relative h-40 w-full bg-white">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className="object-cover"
                />
                <ImagePreviewButton
                  src={item.imageUrl}
                  alt={item.alt}
                  label={`Agrandir l'image ${item.alt}`}
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
                  <ActionForm
                    action={updateCarouselAction}
                    className="grid gap-3"
                    feedback={{
                      loadingTitle: "Enregistrement…",
                      loadingMessage: "Mise à jour de l’image en cours.",
                      successTitle: "Modification terminée",
                      successMessage: "L’image a bien été mise à jour.",
                      errorTitle: "Modification impossible",
                    }}
                  >
                    <input type="hidden" name="id" value={item.id} />

                    <div>
                      <label className="block text-xs font-medium text-zinc-700">
                        Texte alternatif (alt) *
                      </label>
                      <input
                        name="alt"
                        required
                        defaultValue={item.alt}
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700">
                        Remplacer l&apos;image
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

                    <button
                      type="submit"
                      className="w-full rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-fit"
                    >
                      Enregistrer
                    </button>
                  </ActionForm>

                  <ActionForm
                    action={deleteCarouselAction}
                    className="mt-2"
                    feedback={{
                      loadingTitle: "Suppression…",
                      loadingMessage: "Suppression de l’image et de la base.",
                      successTitle: "Suppression terminée",
                      successMessage: "L’image a bien été supprimée.",
                      errorTitle: "Suppression impossible",
                    }}
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="w-full rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </ActionForm>
                </div>
              </details>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

