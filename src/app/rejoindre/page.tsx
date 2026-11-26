import ContactForm from "../../components/ContactForm";
import SiteHeader from "../../components/SiteHeader";

export default function RejoindrePage() {
  return (
    <div className="bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-8 pb-14 sm:px-10 lg:gap-16 lg:px-16">
        <SiteHeader activePage="rejoindre" />

        <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Rejoindre le club
        </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Découvrez comment le club s&apos;organise et prenez contact avec
            nous pour nous rejoindre.
          </p>
        </div>

        <section className="grid gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Comment nous rejoindre ?</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600">
                <p>
                  Pour rejoindre l&apos;AS Muret Cycliste, contactez-nous
                  grâce au formulaire ci-dessous. Nous vous répondrons rapidement pour
                  discuter de vos attentes et vous présenter le club.
                </p>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <h3 className="mb-3 font-semibold text-blue-900">
                    Processus d&apos;adhésion
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-800">
                    <li>1. Contactez-nous via le formulaire</li>
                    <li>2. Échange avec un membre du club</li>
                    <li>3. Participation à une sortie d&apos;essai</li>
                    <li>4. Adhésion et intégration au club</li>
                  </ol>
                </div>
                <p className="text-sm">
                  L&apos;adhésion au club vous donne accès à toutes les
                  activités : entraînements, sorties, compétitions et stages.
                  Le club est ouvert à tous, du débutant au compétiteur
                  expérimenté.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Disciplines et activités</h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-zinc-600">
                <p>
                  Le club propose les activités suivantes :
                </p>
                <div className="grid gap-3">
                  {["Route", "École VTT", "École Route"].map((discipline) => (
                    <div
                      key={discipline}
                      className="rounded-xl bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700"
                    >
                      {discipline}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm">
                  Encadrement adapté et calendrier spécifique selon
                  l&apos;activité. Vous pouvez sélectionner une ou plusieurs
                  activités selon votre profil.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
    </div>
  );
}
