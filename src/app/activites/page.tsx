"use client";

import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function ActivitesPage(props: any) {
  // #region agent log
  try {
      fetch('http://127.0.0.1:7245/ingest/30dbd7b4-eca0-4a89-8873-ce565e0ab020',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/app/activites/page.tsx:ActivitesPage',message:'ActivitesPage received props',data:{keys: Object.keys(props), hasParams: 'params' in props},timestamp:Date.now(),sessionId:'debug-session'})}).catch(()=>{});
  } catch (e) {}
  // #endregion
  return (
    <div className="bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-8 pb-14 sm:px-10 lg:gap-16 lg:px-16">
        <SiteHeader activePage="activites" />

        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Nos Activités
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Découvrez nos écoles de cyclisme et nos sorties organisées pour tous
            les niveaux.
          </p>
        </div>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">École VTT</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600">
              <p>
                L&apos;école VTT de l&apos;AS Muret Cycliste accueille chaque année
                environ 20 jeunes de 10 ans à tant que c&apos;est possible. Nos éducateurs diplômés FFC
                forment les jeunes aux bases du pilotage, de la sécurité et de
                la compétition.
              </p>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="mb-2 font-semibold text-zinc-900">
                  Informations pratiques
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Âge :</strong> 10 à 17 ans</li>
                  <li>• <strong>Effectif :</strong> ~20 jeunes par saison</li>
                  <li>• <strong>Formation :</strong> Pilotage, sécurité, compétition</li>
                  <li>• <strong>Éducateurs :</strong> Diplômés FFC</li>
                  <li>• <strong>Organisation :</strong> Semaine pair séance technique, semaine impaire séance compétition</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="mb-2 font-semibold text-zinc-900">
                  Objectifs
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Développer la maîtrise du VTT en sécurité</li>
                  <li>• Apprendre les bases du pilotage en terrain varié</li>
                  <li>• Construire l&apos;esprit d&apos;équipe et l&apos;autonomie</li>
                  <li>• Préparer aux sorties et compétitions du club</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">Stage VTT</h3>
                <p className="text-sm text-blue-800">
                  Le club organise généralement un stage en juin pour une
                  initiation DH/enduro, pour le moment à Loudenvielle.
                </p>
              </div>
              <p className="text-sm">
                Les entraînements ont lieu régulièrement et permettent aux jeunes
                de progresser dans un cadre sécurisé et bienveillant.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">École de Route</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600">
              <p>
                Nouvelle école de cyclisme sur route pour les jeunes à partir de
                11 ans. Cette école fait partie des projets 2025 du club et
                permettra d&apos;accompagner les jeunes dans leur progression sur
                route.
              </p>
              <div className="rounded-2xl bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">
                  Projet 2025
                </h3>
                <p className="text-sm text-blue-800">
                  L&apos;école de route est en cours de création. Elle
                  s&apos;adressera aux jeunes de 11 ans et plus, avec un
                  encadrement adapté pour apprendre les techniques de route, la
                  sécurité et la compétition.
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="mb-2 font-semibold text-zinc-900">
                  Objectifs
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Formation aux techniques de route</li>
                  <li>• Apprentissage de la sécurité routière</li>
                  <li>• Préparation à la compétition</li>
                  <li>• Accompagnement personnalisé</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Sorties Route</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-7 text-zinc-600">
              <p>
                Le club organise des sorties route régulières pour tous les
                niveaux. Que vous soyez débutant ou expérimenté, vous trouverez
                un groupe adapté à votre niveau.
              </p>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="mb-3 font-semibold text-zinc-900">
                  Organisation des sorties
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Fréquence :</strong> Sorties hebdomadaires</li>
                  <li>• <strong>Groupes :</strong> Niveaux adaptés</li>
                  <li>• <strong>Encadrement :</strong> Éducateurs diplômés</li>
                  <li>• <strong>Parcours :</strong> Variés selon les saisons</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="mb-3 font-semibold text-zinc-900">
                  Objectifs
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Améliorer l&apos;endurance et la régularité</li>
                  <li>• Progresser en groupe selon le niveau</li>
                  <li>• Découvrir des parcours variés en sécurité</li>
                  <li>• Préparer les compétitions et cyclosportives</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4 text-base leading-7 text-zinc-600">
              <div className="rounded-2xl bg-blue-50 p-4">
                <h3 className="mb-3 font-semibold text-blue-900">
                  Stages Route
                </h3>
                <p className="mb-3 text-sm text-blue-800">
                  Le club organise également des stages route en Espagne,
                  permettant aux coureurs de s&apos;entraîner dans des
                  conditions optimales et de progresser ensemble.
                </p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Stages annuels en Espagne</li>
                  <li>• Entraînement intensif</li>
                  <li>• Ambiance conviviale</li>
                  <li>• Progression garantie</li>
                </ul>
              </div>
              <p className="text-sm">
                Les sorties sont l&apos;occasion de partager la passion du
                cyclisme, de progresser ensemble et de préparer les compétitions
                dans une ambiance conviviale et bienveillante.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-700 p-6 text-white shadow-sm">
          <h2 className="text-2xl font-semibold">Comment participer ?</h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-blue-100">
            <p>
              Pour participer à nos activités, il suffit d&apos;être adhérent au
              club. Les entraînements et sorties sont ouverts à tous les membres
              selon leur niveau et leurs objectifs.
            </p>
            <div className="mt-6">
              <Link
                href="/rejoindre"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Rejoindre le club
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
