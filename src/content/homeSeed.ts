export type CarouselSeedItem = {
  publicPath: string;
  alt: string;
};

export type SponsorSeedItem = {
  publicPath: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
};

export const carouselSeed: CarouselSeedItem[] = [
  { publicPath: "carousel/1.avif", alt: "Cadet Junior Tour de France 2025" },
  { publicPath: "carousel/6.avif", alt: "Photo de groupe VTT - Foret de Eaunes" },
  { publicPath: "carousel/10.avif", alt: "Photo coureur - FestiBike 2023" },
  {
    publicPath: "carousel/2.avif",
    alt: "Stage VTT à Loudenvielle - Col de Val Louron-Azet",
  },
  { publicPath: "carousel/15.avif", alt: "Victoire course" },
  { publicPath: "carousel/16.avif", alt: "Photo de groupe - Sortie Route" },
  {
    publicPath: "carousel/5.avif",
    alt: "Opération casque jaunes - Tour de France 2025",
  },
  { publicPath: "carousel/8.avif", alt: "Interclubs VTT - Lagrâce-Dieu" },
  { publicPath: "carousel/12.avif", alt: "Photo de groupe - Sortie Route" },
  { publicPath: "carousel/3.avif", alt: "Stage VTT à Loudenvielle - Haut des pistes de DH" },
  { publicPath: "carousel/9.avif", alt: "Photo de groupe - Stage VTT à Loudenvielle" },
  { publicPath: "carousel/11.avif", alt: "Photo accompagnement avec la voiture du club" },
  {
    publicPath: "carousel/14.avif",
    alt: "Photo sur le départ de la course organisée par le club",
  },
  {
    publicPath: "carousel/7.avif",
    alt: "Stage VTT à Loudenvielle - Col de Val Louron-Azet",
  },
  { publicPath: "carousel/13.avif", alt: "Photo de groupe - Sortie Route" },
  { publicPath: "carousel/17.avif", alt: "Photo de groupe - Sortie Route" },
];

export const sponsorSeed: SponsorSeedItem[] = [
  { publicPath: "sponsor/Actiglass.webp", name: "Actiglass" },
  { publicPath: "sponsor/axa-dauriac.webp", name: "Assurances Dauriac" },
  {
    publicPath: "sponsor/axial.webp",
    name: "Axial Profession Carrossier",
    description: "Atelier de carrosserie automobile à Muret",
    address: "Z.I. Sans Souci, 6 Rue Aristide Berges, 31600 Muret",
    phone: "05 61 51 02 59",
  },
  {
    publicPath: "sponsor/ComElec.webp",
    name: "Comminges Electricité",
    description: "Électricien à Muret",
    address: "44 Rue de Marclan, 31600 Muret",
    phone: "05 61 08 16 18",
  },
  {
    publicPath: "sponsor/atelier-chic-et-branche.webp",
    name: "Atelier Chic & Branche",
    description: "Boutique de vêtements et accessoires de mode à prix abordable ",
    address:
      "Galerie commerciale Intermarché, 6 Rue Danielle Casanova, 31600 Seysses",
    phone: "05 62 23 43 03",
  },
  {
    publicPath: "sponsor/Credit-Mutuel-logo.webp",
    name: "Crédit Mutuel",
    description: "Banque mutualiste partenaire du club",
  },
  {
    publicPath: "sponsor/florisbigot.webp",
    name: "Bigot Floris",
    phone: "06.67.89.76.50",
    email: "bigotfloris.multiservices@gmail.com",
  },
  {
    publicPath: "sponsor/HG.webp",
    name: "Haute Garonne",
    description: "Soutiens institutionnel départemental",
  },
  {
    publicPath: "sponsor/Macon.webp",
    name: "Ent Maçonnerie Générale",
    address: "31600 Seysses",
    phone: "05 61 56 92 78",
  },
  {
    publicPath: "sponsor/logo-villemuret.webp",
    name: "Ville de Muret",
    description: "Collectivité qui soutient le club",
  },
  {
    publicPath: "sponsor/Occitanie.webp",
    name: "Région Occitanie",
    description: "Soutien institutionnel régional",
  },
  {
    publicPath: "sponsor/SDB.webp",
    name: "SDB Création",
    description:
      "Spécialiste dans la création ou la rénovation de salles de bains",
    address: "33 Bd de Joffrery, 31600 Muret",
    phone: "05 34 51 93 17",
  },
  { publicPath: "sponsor/stsi.webp", name: "STSI" },
  {
    publicPath: "sponsor/velo-station.webp",
    name: "Vélo Station",
    description: "Vente et réparation de vélos et accessoires",
    address: "30 Av. Jacques Douzans, 31600 Muret",
    phone: "05 82 95 45 33",
  },
  { publicPath: "sponsor/secretarie31.webp", name: "Solutions Secrétariat 31" },
];

