import "dotenv/config";

import path from "node:path";
import { readFile } from "node:fs/promises";

import { put } from "@vercel/blob";

import { getDb } from "../src/db/client";
import { carouselImages, sponsors } from "../src/db/schema";
import { carouselSeed, sponsorSeed } from "../src/content/homeSeed";

function guessContentType(filePath: string) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return undefined;
}

async function uploadFromPublic(options: {
  publicPath: string;
  blobPath: string;
}) {
  const absolutePath = path.join(process.cwd(), "public", options.publicPath);
  const bytes = await readFile(absolutePath);

  const contentType = guessContentType(options.publicPath);

  const result = await put(options.blobPath, bytes, {
    access: "public",
    contentType,
    // Idempotent: permet de relancer le seed sans changer les URLs en DB.
    // Certaines versions typent mal `allowOverwrite`, on le force donc.
    ...( { allowOverwrite: true } as Record<string, unknown> ),
  });

  return { url: result.url, pathname: result.pathname };
}

async function main() {
  console.log("Seed: upload images vers Vercel Blob + insert DB (Turso)");
  const db = getDb();

  const uploadedCarousel = await Promise.all(
    carouselSeed.map(async (item) => {
      const filename = path.basename(item.publicPath);
      const upload = await uploadFromPublic({
        publicPath: item.publicPath,
        blobPath: `carousel/${filename}`,
      });
      return { ...item, ...upload };
    })
  );

  const uploadedSponsors = await Promise.all(
    sponsorSeed.map(async (item) => {
      const filename = path.basename(item.publicPath);
      const upload = await uploadFromPublic({
        publicPath: item.publicPath,
        blobPath: `sponsors/${filename}`,
      });
      return { ...item, ...upload };
    })
  );

  await db.delete(carouselImages);
  await db.delete(sponsors);

  await db.insert(carouselImages).values(
    uploadedCarousel.map((item, index) => ({
      alt: item.alt,
      imageUrl: item.url,
      imagePathname: item.pathname,
      sortOrder: index,
      isActive: true,
    }))
  );

  await db.insert(sponsors).values(
    uploadedSponsors.map((item, index) => ({
      name: item.name,
      imageUrl: item.url,
      imagePathname: item.pathname,
      websiteUrl: item.websiteUrl ?? null,
      description: item.description ?? null,
      address: item.address ?? null,
      phone: item.phone ?? null,
      email: item.email ?? null,
      sortOrder: index,
      isActive: true,
    }))
  );

  console.log(
    `Seed OK: ${uploadedCarousel.length} images carrousel, ${uploadedSponsors.length} sponsors.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

