"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import ContactSection from "../components/ContactSection";

const disciplines = [
  "Route",
  "VTT",
  "Cyclocross",
  "Cyclosport",
  "Gravel",
];

const values = ["Esprit d'équipe", "Humilité", "Respect", "Passion"];

const events = [
  "Deux courses cyclistes sous l'égide FSGT/FFC/UFOLEP",
  "Journée de fin de saison multi-activité",
  "Stages route en Espagne et VTT descente à Loudenvielle",
  "Entraînements Route et VTT toutes les semaines",
  "Assemblée générale & soirée remise des prix",
];

const partnershipBenefits = [
  "Visibilité sur le site internet et les réseaux sociaux",
  "Rencontres partenaires & journée dédiée",
  "Présence sur le book et les maillots",
  "Invitation VIP sur une épreuve",
  "Équipe au nom du partenaire",
];

const projects = [
  "Former 2 éducateurs VTT auprès de la FFC",
  "Créer une école de cyclisme Route (+11 ans)",
  "Accompagner les jeunes sur la sécurité, le pilotage et la compétition",
  "Besoins matériels : vélos, tenues, casques, matériel pédagogique",
];

const carouselImages = [
  { src: "/carousel/1.avif", alt: "Cadet Junior Tour de France 2025" },
  { src: "/carousel/2.avif", alt: "Stage VTT à Loudenvielle - Col de Val Louron-Azet" },
  { src: "/carousel/3.avif", alt: "Stage VTT à Loudenvielle - Haut des pistes de DH" },
  { src: "/carousel/5.avif", alt: "Opération casque jaunes - Tour de France 2025" },
  { src: "/carousel/6.avif", alt: "Photo de groupe VTT - Foret de Eaunes" },
  { src: "/carousel/7.avif", alt: "Stage VTT à Loudenvielle - Col de Val Louron-Azet" },
  { src: "/carousel/8.avif", alt: "Interclubs VTT - Lagrâce-Dieu" },
  { src: "/carousel/9.avif", alt: "Photo de groupe - Stage VTT à Loudenvielle" },
  { src: "/carousel/10.avif", alt: "Photo coureur - FestiBike 2023" },
  { src: "/carousel/11.avif", alt: "Nouvelle photo du club (11)" },
  { src: "/carousel/12.avif", alt: "Nouvelle photo du club (12)" },
  { src: "/carousel/13.avif", alt: "Nouvelle photo du club (13)" },
  { src: "/carousel/14.avif", alt: "Nouvelle photo du club (14)" },
  { src: "/carousel/15.avif", alt: "Nouvelle photo du club (15)" },
  { src: "/carousel/16.avif", alt: "Nouvelle photo du club (16)" },
  { src: "/carousel/17.avif", alt: "Nouvelle photo du club (17)" },
];

const secretImages = [
  { src: "/Secret/1.avif", alt: "Secret 1" },
  { src: "/Secret/2.avif", alt: "Secret 2" },
  { src: "/Secret/3.avif", alt: "Secret 3" },
];

const secretSequence = [0, 1, 2, 1];

export default function Home() {
  const [secretActive, setSecretActive] = useState(false);
  const [secretIndex, setSecretIndex] = useState(0);
  const logoClickCount = useRef(0);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [detartelageOpen, setDetartelageOpen] = useState(false);
  const detartelageClickCount = useRef(0);
  const [vttSecretOpen, setVttSecretOpen] = useState(false);
  const vttClickCount = useRef(0);

  useEffect(() => {
    if (!secretActive) return;

    const interval = setInterval(() => {
      setSecretIndex((current) => (current + 1) % secretSequence.length);
    }, 200);

    return () => clearInterval(interval);
  }, [secretActive]);

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current >= 50 && !secretActive) {
      setSecretIndex(0);
      setSecretActive(true);
    }
  };

  const secretFrame = secretSequence[secretIndex % secretSequence.length];
  const handleCarouselOpen = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };
  const handleCarouselNext = () => {
    setCarouselIndex((current) => (current + 1) % carouselImages.length);
  };
  const handleCarouselPrev = () => {
    setCarouselIndex(
      (current) => (current - 1 + carouselImages.length) % carouselImages.length
    );
  };
  const handleDetartelageClick = () => {
    detartelageClickCount.current += 1;
    if (detartelageClickCount.current >= 20 && !detartelageOpen) {
      detartelageClickCount.current = 0;
      setDetartelageOpen(true);
    }
  };
  const handleVttClick = () => {
    vttClickCount.current += 1;
    if (vttClickCount.current >= 50 && !vttSecretOpen) {
      vttClickCount.current = 0;
      setVttSecretOpen(true);
    }
  };

  return (
    <div className="bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-8 pb-14 sm:px-10 lg:gap-16 lg:px-16">
        <SiteHeader activePage="home" onLogoClick={handleLogoClick} />
        <section className="flex flex-col gap-10 min-[1160px]:flex-row min-[1160px]:items-center min-[1160px]:justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              AS Muret Cycliste
            </h1>
            <span className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
              Club cycliste & VTT depuis 1962
            </span>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Club multigénérationnel orienté compétition, l&apos;AS Muret Cycliste
              rassemble passion, performance et convivialité autour de la route,
              du VTT, du cyclocross, du cyclosport et du gravel.
            </p>
            <div className="flex flex-col gap-4 min-[711px]:flex-row min-[711px]:flex-nowrap">
              <Link
                href="/rejoindre"
                className="flex items-center justify-center whitespace-nowrap rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Rejoindre le club
              </Link>
              <Link
                href="/activites"
                className="flex items-center justify-center whitespace-nowrap rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-white"
              >
                Découvrir nos activités
              </Link>
              <a
                className="flex items-center justify-center whitespace-nowrap rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-white"
                href="/20250506%20Presentation%20%20AS%20%20Muret%20Cycl%20isme%20Route__%20%26%20Vtt%20-%20Mairie%20Muret%20.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Télécharger la présentation 2025
              </a>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-sm min-[1160px]:max-w-md">
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-2xl font-semibold">50</p>
              <p className="text-sm text-zinc-600">adhérents</p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-2xl font-semibold">63 ans</p>
              <p className="text-sm text-zinc-600">d&apos;histoire en 2025</p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-2xl font-semibold">200 000 km</p>
              <p className="text-sm text-zinc-600">par an parcourus</p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-2xl font-semibold">14 victoires</p>
              <p className="text-sm text-zinc-600">en 2024</p>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Qui sommes-nous ?</h2>
            <p className="text-base leading-7 text-zinc-600">
              L&apos;AS Muret Cycliste est une association loi 1901 fondée en 1962,
              affiliée aux fédérations FFC, FSGT et UFOLEP. Le club accompagne
              ses coureurs sur des compétitions régionales et nationales, tout
              en cultivant une ambiance d&apos;entraide et de progression.
            </p>
            <div className="flex flex-wrap gap-2">
              {disciplines.map((discipline) => (
                <span
                  key={discipline}
                  className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700"
                  onClick={discipline === "VTT" ? handleVttClick : undefined}
                  onKeyDown={
                    discipline === "VTT"
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            handleVttClick();
                          }
                        }
                      : undefined
                  }
                  role={discipline === "VTT" ? "button" : undefined}
                  tabIndex={discipline === "VTT" ? 0 : undefined}
                  aria-label={discipline === "VTT" ? "Secret VTT" : undefined}
                >
                  {discipline}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Nos valeurs</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {values.map((value) => (
                <li key={value}>• {value}</li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600">
              École VTT : 20 jeunes de 10 à 17 ans formés chaque année aux bases
              du pilotage et de la sécurité.
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Nos activités en images</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Route, VTT, cyclocross, stages et vie du club.
              </p>
            </div>
            <span className="hidden text-xs font-semibold uppercase tracking-wide text-zinc-400 sm:block">
              Faites défiler
            </span>
          </div>
          <div className="carousel-scroll mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-2">
            {carouselImages.map((image, index) => (
              <div
                key={image.src}
                className="min-w-[220px] snap-start overflow-hidden rounded-2xl bg-zinc-100 shadow-sm sm:min-w-[260px]"
              >
                <button
                  type="button"
                  onClick={() => handleCarouselOpen(index)}
                  aria-label={`Agrandir ${image.alt}`}
                  className="block w-full"
                >
                  <div className="relative h-40 w-full sm:h-48">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 640px) 260px, 220px"
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Un club actif et compétitif</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Présent sur les compétitions route, cyclocross et VTT, le club
              aligne en moyenne 10 coureurs par course avec plus de 100 courses
              FFC par an en Occitanie et en France.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              L&apos;ASMC participe aux coupes nationales, aux championnats régionaux
              et aux courses départementales, avec de nombreux podiums.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Évènements & stages</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {events.map((event) => (
                <li key={event}>• {event}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Partenariat</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Soutenir l&apos;ASMC, c&apos;est accompagner les ambitions des coureurs,
              leur encadrement et leur participation aux compétitions
              départementales, régionales et nationales.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {partnershipBenefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Projets 2025</h2>
            <ul className="mt-4 space-y-2 text-sm text-blue-100">
              {projects.map((project) => (
                <li key={project}>• {project}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Nos partenaires</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Ils soutiennent l&apos;AS Muret Cycliste au quotidien.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                src: "/sponsor/Actiglass.webp",
                alt: "Actiglass",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/axa-dauriac.webp",
                alt: "Assurances Dauriac",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/ComElec.webp",
                alt: "ComElec",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/atelier-chic-et-branche.webp",
                alt: "Atelier Chic & Branche",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "Boutique de vêtements et accessoires de mode à prix abordable ",
                address: "Galerie commerciale Intermarché, 6 Rue Danielle Casanova, 31600 Seysses",
                phone: "05 62 23 43 03",
                email: "",
              },
              {
                src: "/sponsor/Credit-Mutuel-logo.webp",
                alt: "Crédit Mutuel",
                frameClass: "aspect-[2/1] max-w-[170px]",
                description: "Banque mutualiste partenaire du club",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/florisbigot.webp",
                alt: "Bigot Floris",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "",
                phone: "06.67.89.76.50",
                email: "bigotfloris.multiservices@gmail.com",
              },
              {
                src: "/sponsor/HG.webp",
                alt: "Haute Garonne",
                frameClass: "aspect-square max-w-[130px]",
                description: "Soutiens institutionnel départemental",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/Macon.webp",
                alt: "Ent Maçonnerie Générale",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "31600 Seysses",
                phone: "05 61 56 92 78",
                email: "",
              },
              {
                src: "/sponsor/logo-villemuret.webp",
                alt: "Ville de Muret",
                frameClass: "aspect-[4/3] max-w-[150px]",
                description: "Collectivité qui soutient le club",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/Occitanie.webp",
                alt: "Région Occitanie",
                frameClass: "aspect-[5/2] max-w-[180px]",
                description: "Soutien institutionnel régional",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/SDB.webp",
                alt: "SDB Création",
                frameClass: "aspect-square max-w-[130px]",
                description: "Spécialiste dans la création ou la rénovation de salles de bains",
                address: "33 Bd de Joffrery, 31600 Muret",
                phone: "05 34 51 93 17",
                email: "",
              },
              {
                src: "/sponsor/stsi.webp",
                alt: "STSI",
                frameClass: "aspect-[3/2] max-w-[150px]",
                description: "",
                address: "",
                phone: "",
                email: "",
              },
              {
                src: "/sponsor/velo-station.webp",
                alt: "Vélo Station",
                frameClass: "aspect-[4/3] max-w-[150px]",
                description: "Vente et réparation de vélos et accessoires",
                address: "30 Av. Jacques Douzans, 31600 Muret",
                phone: "05 82 95 45 33",
                email: "",
              },
            ].map((partner) => (
              <div
                key={partner.src}
                className="group relative flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white px-4 py-5 shadow-sm"
              >
                <div className={`relative w-full ${partner.frameClass}`}>
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900/75 px-3 text-center text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>
                    {partner.alt}
                    {partner.description?.trim() ? (
                      <span className="mt-1 block text-[10px] font-medium normal-case tracking-normal text-white/85">
                        {partner.description}
                      </span>
                    ) : null}
                    {partner.address?.trim() ? (
                      <a
                        className="pointer-events-auto mt-1 block text-[10px] font-normal normal-case tracking-normal text-white/75 underline decoration-white/60 underline-offset-2 transition hover:text-white"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          partner.address
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {partner.address}
                      </a>
                    ) : null}
                    {partner.phone?.trim() ? (
                      <a
                        className="pointer-events-auto mt-1 block text-[10px] font-normal normal-case tracking-normal text-white/75 underline decoration-white/60 underline-offset-2 transition hover:text-white"
                        href={`tel:${partner.phone.replace(/\s+/g, "")}`}
                      >
                        {partner.phone}
                      </a>
                    ) : null}
                    {partner.email?.trim() ? (
                      <a
                        className="pointer-events-auto mt-1 block text-[10px] font-normal normal-case tracking-normal text-white/75 underline decoration-white/60 underline-offset-2 transition hover:text-white"
                        href={`mailto:${partner.email}`}
                      >
                        {partner.email}
                      </a>
                    ) : null}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactSection
          sectionId="contact"
          title="Contact"
          columns={2}
          onPresidentClick={handleDetartelageClick}
        />

      </main>
      {secretActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 px-6 py-10"
          onClick={() => setSecretActive(false)}
          role="button"
          tabIndex={-1}
          aria-label="Fermer le secret"
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSecretActive(false)}
              aria-label="Fermer la fenêtre"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ✕
            </button>
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src={secretImages[secretFrame].src}
                alt={secretImages[secretFrame].alt}
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
      {carouselOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/70 px-6 py-10"
          onClick={() => setCarouselOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Fermer l'aperçu"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCarouselOpen(false)}
              aria-label="Fermer l'aperçu"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={handleCarouselPrev}
              aria-label="Image précédente"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 -translate-x-0 place-items-center rounded-full bg-white text-2xl font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleCarouselNext}
              aria-label="Image suivante"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ›
            </button>
            <div className="relative h-[70vh] w-full bg-zinc-100">
              <Image
                src={carouselImages[carouselIndex].src}
                alt={carouselImages[carouselIndex].alt}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="px-6 py-4 text-center text-sm text-zinc-600">
              {carouselImages[carouselIndex].alt}
            </div>
          </div>
        </div>
      )}
      {detartelageOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-900/70 px-6 py-10"
          onClick={() => setDetartelageOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Fermer Détartelage"
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-white px-8 py-16 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDetartelageOpen(false)}
              aria-label="Fermer la fenêtre"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ✕
            </button>
            <p className="detartelage-spin text-5xl font-black uppercase tracking-wide text-blue-700 sm:text-6xl lg:text-7xl">
              Détartelage
            </p>
          </div>
        </div>
      )}
      {vttSecretOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-900/70 px-6 py-10"
          onClick={() => setVttSecretOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Fermer la vidéo secrète"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVttSecretOpen(false)}
              aria-label="Fermer la fenêtre"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ✕
            </button>
            <div className="relative mx-auto w-full max-w-[min(960px,92vw)] rounded-2xl bg-black">
              <video
                className="max-h-[70vh] w-full object-contain"
                src="/video/secret/glissade.mp4"
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
