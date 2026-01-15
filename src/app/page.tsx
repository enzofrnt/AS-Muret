import Image from "next/image";

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

export default function Home() {
  return (
    <div className="bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 py-14 sm:px-10 lg:px-16">
        <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/as-muret-logo.png"
                alt="Logo AS Muret Cycliste"
                width={140}
                height={80}
                priority
              />
              <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Club cycliste & VTT depuis 1962
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              AS Muret Cycliste
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Club multigénérationnel orienté compétition, l&apos;AS Muret Cycliste
              rassemble passion, performance et convivialité autour de la route,
              du VTT, du cyclocross, du cyclosport et du gravel.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                href="#contact"
              >
                Nous contacter
              </a>
              <a
                className="flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-white"
                href="/20250506%20Presentation%20%20AS%20%20Muret%20Cycl%20isme%20Route__%20%26%20Vtt%20-%20Mairie%20Muret%20.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Télécharger la présentation 2025
              </a>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-sm lg:max-w-md">
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

        <section
          id="contact"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-6 grid gap-6 text-sm text-zinc-600 sm:grid-cols-2">
            <div>
              <p className="text-base font-semibold text-zinc-900">
                Yannick Ferré
              </p>
              <p>Président</p>
              <p>Tél. 06 08 52 28 39</p>
              <p>yannickferre31@orange.fr</p>
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900">
                Gauthier Lopez-Camoche
              </p>
              <p>Communication / relation</p>
              <p>Tél. 06 83 98 87 57</p>
              <p>glopezcamoche@gmail.com</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          AS Muret Cycliste · Route · VTT · Cyclocross · Cyclosport · Gravel
        </footer>
      </main>
    </div>
  );
}
