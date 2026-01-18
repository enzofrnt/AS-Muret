import { asc } from "drizzle-orm";

import HomePageClient, {
  type HomeCarouselImage,
  type HomeSponsor,
} from "../components/HomePageClient";
import { carouselSeed, sponsorSeed } from "../content/homeSeed";
import { getDb } from "@/db/client";
import {
  carouselImages as carouselImagesTable,
  sponsors as sponsorsTable,
} from "@/db/schema";

export default async function Home() {
  let carouselImages: HomeCarouselImage[] = carouselSeed.map((item) => ({
    src: `/${item.publicPath}`,
    alt: item.alt,
  }));

  let sponsors: HomeSponsor[] = sponsorSeed.map((item) => ({
    name: item.name,
    imageUrl: `/${item.publicPath}`,
    description: item.description ?? null,
    address: item.address ?? null,
    phone: item.phone ?? null,
    email: item.email ?? null,
    websiteUrl: item.websiteUrl ?? null,
  }));

  try {
    const db = getDb();

    const carouselRows = await db
      .select({
        alt: carouselImagesTable.alt,
        imageUrl: carouselImagesTable.imageUrl,
      })
      .from(carouselImagesTable)
      .orderBy(asc(carouselImagesTable.sortOrder));

    const sponsorRows = await db
      .select({
        id: sponsorsTable.id,
        name: sponsorsTable.name,
        imageUrl: sponsorsTable.imageUrl,
        description: sponsorsTable.description,
        address: sponsorsTable.address,
        phone: sponsorsTable.phone,
        email: sponsorsTable.email,
        websiteUrl: sponsorsTable.websiteUrl,
      })
      .from(sponsorsTable)
      .orderBy(asc(sponsorsTable.sortOrder));

    if (carouselRows.length > 0) {
      carouselImages = carouselRows.map((row) => ({
        src: row.imageUrl,
        alt: row.alt,
      }));
    }

    if (sponsorRows.length > 0) {
      sponsors = sponsorRows.map((row) => ({
        id: row.id,
        name: row.name,
        imageUrl: row.imageUrl,
        description: row.description,
        address: row.address,
        phone: row.phone,
        email: row.email,
        websiteUrl: row.websiteUrl,
      }));
    }
  } catch (error) {
    console.warn("Home: fallback contenu statique (DB indisponible)", error);
  }

  return <HomePageClient carouselImages={carouselImages} sponsors={sponsors} />;
}
