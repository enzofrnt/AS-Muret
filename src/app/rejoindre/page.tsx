"use client";

import { useRef, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

export default function RejoindrePage() {
  const activityOptions = [
    { value: "route", label: "Route" },
    { value: "vtt", label: "VTT" },
    { value: "cyclocross", label: "Cyclocross" },
    { value: "cyclosport", label: "Cyclosport" },
    { value: "gravel", label: "Gravel" },
    { value: "ecole-vtt", label: "Ecole VTT" },
    { value: "ecole-route", label: "Ecole Route" },
  ];

  const nextParticipantId = useRef(2);
  const createParticipant = () => ({
    id: `p-${nextParticipantId.current++}`,
    nom: "",
    prenom: "",
    age: "",
    lien: "parent",
    activites: [] as string[],
  });

  const [formData, setFormData] = useState(() => ({
    contact: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
    },
    participants: [
      {
        id: "p-1",
        nom: "",
        prenom: "",
        age: "",
        lien: "parent",
        activites: [] as string[],
      },
    ],
    message: "",
  }));
  const [submitted, setSubmitted] = useState(false);
  const responsableId =
    formData.participants.find((participant) => participant.lien === "responsable")
      ?.id ?? null;

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedContact = {
        ...prev.contact,
        [name]: value,
      };
      const hasResponsable = prev.participants.some(
        (participant) => participant.lien === "responsable"
      );
      if (!hasResponsable) {
        return {
          ...prev,
          contact: updatedContact,
        };
      }
      return {
        ...prev,
        contact: updatedContact,
        participants: prev.participants.map((participant) =>
          participant.lien === "responsable"
            ? {
                ...participant,
                nom: updatedContact.nom,
                prenom: updatedContact.prenom,
              }
            : participant
        ),
      };
    });
  };

  const handleParticipantChange = (
    id: string,
    field: "nom" | "prenom" | "age" | "lien",
    value: string
  ) => {
    if (field === "lien" && value === "responsable") {
      setFormData((prev) => ({
        ...prev,
        participants: prev.participants.map((participant) => {
          if (participant.id === id) {
            return {
              ...participant,
              lien: "responsable",
              nom: prev.contact.nom,
              prenom: prev.contact.prenom,
            };
          }
          if (participant.lien === "responsable") {
            return {
              ...participant,
              lien: "parent",
            };
          }
          return participant;
        }),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.map((participant) =>
        participant.id === id
          ? {
              ...participant,
              [field]: value,
            }
          : participant
      ),
    }));
  };

  const toggleParticipantActivity = (id: string, activity: string) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.map((participant) => {
        if (participant.id !== id) {
          return participant;
        }
        const alreadySelected = participant.activites.includes(activity);
        return {
          ...participant,
          activites: alreadySelected
            ? participant.activites.filter((item) => item !== activity)
            : [...participant.activites, activity],
        };
      }),
    }));
  };

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...prev.participants, createParticipant()],
    }));
  };

  const removeParticipant = (id: string) => {
    setFormData((prev) => {
      if (prev.participants.length <= 1) {
        return prev;
      }
      return {
        ...prev,
        participants: prev.participants.filter(
          (participant) => participant.id !== id
        ),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    // Par exemple, envoyer un email ou sauvegarder dans une base de données
    console.log("Formulaire soumis:", formData);
    setSubmitted(true);
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setSubmitted(false);
      nextParticipantId.current = 2;
      setFormData({
        contact: {
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
        },
        participants: [createParticipant()],
        message: "",
      });
    }, 5000);
  };

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

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Comment nous rejoindre ?</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600">
                <p>
                  Pour rejoindre l&apos;AS Muret Cycliste, il suffit de remplir
                  le formulaire de contact ci-contre. Nous vous recontacterons
                  rapidement pour discuter de vos attentes et vous présenter le
                  club.
                </p>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <h3 className="mb-3 font-semibold text-blue-900">
                    Processus d&apos;adhésion
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-800">
                    <li>1. Contactez-nous via le formulaire</li>
                    <li>2. Échange avec un membre du bureau</li>
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
                  Le club propose plusieurs disciplines pour répondre à tous les
                  goûts :
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Route", "VTT", "Cyclocross", "Cyclosport", "Gravel"].map(
                    (discipline) => (
                      <div
                        key={discipline}
                        className="rounded-xl bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700"
                      >
                        {discipline}
                      </div>
                    )
                  )}
                </div>
                <p className="mt-4 text-sm">
                  Chaque discipline dispose d&apos;un encadrement adapté et
                  d&apos;un calendrier d&apos;activités spécifique. Vous pouvez
                  pratiquer une ou plusieurs disciplines selon vos envies.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Formulaire de contact (ça marche pas mockup)</h2>
            {submitted ? (
              <div className="mt-6 rounded-2xl bg-green-50 p-6 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Merci pour votre message !
                </p>
                <p className="mt-2 text-sm text-green-700">
                  Nous vous recontacterons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <h3 className="text-base font-semibold text-zinc-900">
                    Coordonnées du responsable
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    Cette personne sera notre contact principal.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-nom"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="contact-nom"
                        name="nom"
                        required
                        value={formData.contact.nom}
                        onChange={handleContactChange}
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-prenom"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="contact-prenom"
                        name="prenom"
                        required
                        value={formData.contact.prenom}
                        onChange={handleContactChange}
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.contact.email}
                        onChange={handleContactChange}
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-telephone"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="contact-telephone"
                        name="telephone"
                        required
                        value={formData.contact.telephone}
                        onChange={handleContactChange}
                        className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900">
                        Personnes à inscrire
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Ajoutez une fiche par personne (parent, enfant, ami).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addParticipant}
                      className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:text-blue-800"
                    >
                      Ajouter une personne
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {formData.participants.map((participant, index) => {
                      const isResponsable = participant.lien === "responsable";
                      return (
                      <div
                        key={participant.id}
                        className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-zinc-900">
                            Personne {index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeParticipant(participant.id)}
                            disabled={formData.participants.length <= 1}
                            className="cursor-pointer text-xs font-semibold text-zinc-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:text-zinc-300"
                          >
                            Retirer
                          </button>
                        </div>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`participant-nom-${participant.id}`}
                              className="block text-sm font-medium text-zinc-700"
                            >
                              Nom *
                            </label>
                            <input
                              type="text"
                              id={`participant-nom-${participant.id}`}
                              required
                              value={participant.nom}
                              onChange={(event) =>
                                handleParticipantChange(
                                  participant.id,
                                  "nom",
                                  event.target.value
                                )
                              }
                              disabled={isResponsable}
                              className={`mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isResponsable
                                  ? "bg-zinc-100 text-zinc-500 ring-0"
                                  : ""
                              }`}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`participant-prenom-${participant.id}`}
                              className="block text-sm font-medium text-zinc-700"
                            >
                              Prénom *
                            </label>
                            <input
                              type="text"
                              id={`participant-prenom-${participant.id}`}
                              required
                              value={participant.prenom}
                              onChange={(event) =>
                                handleParticipantChange(
                                  participant.id,
                                  "prenom",
                                  event.target.value
                                )
                              }
                              disabled={isResponsable}
                              className={`mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isResponsable
                                  ? "bg-zinc-100 text-zinc-500 ring-0"
                                  : ""
                              }`}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`participant-age-${participant.id}`}
                              className="block text-sm font-medium text-zinc-700"
                            >
                              Âge
                            </label>
                            <input
                              type="number"
                              id={`participant-age-${participant.id}`}
                              min="1"
                              max="120"
                              value={participant.age}
                              onChange={(event) =>
                                handleParticipantChange(
                                  participant.id,
                                  "age",
                                  event.target.value
                                )
                              }
                              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`participant-lien-${participant.id}`}
                              className="block text-sm font-medium text-zinc-700"
                            >
                              Lien avec le responsable
                            </label>
                            <select
                              id={`participant-lien-${participant.id}`}
                              value={participant.lien}
                              onChange={(event) =>
                                handleParticipantChange(
                                  participant.id,
                                  "lien",
                                  event.target.value
                                )
                              }
                              className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option
                                value="responsable"
                                disabled={
                                  !!responsableId && responsableId !== participant.id
                                }
                              >
                                Moi-meme (responsable)
                              </option>
                              <option value="parent">Parent</option>
                              <option value="enfant">Enfant</option>
                              <option value="autre">Autre</option>
                            </select>
                            <p className="mt-1 text-xs text-zinc-500">
                              Une seule personne peut etre le responsable.
                            </p>
                          </div>
                        </div>
                        <p
                          className={`mt-3 min-h-[16px] text-xs text-zinc-500 transition-opacity ${
                            isResponsable
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                          aria-hidden={!isResponsable}
                        >
                          Les informations du responsable sont remplies
                          automatiquement depuis le contact principal.
                        </p>
                        <div className="mt-4">
                          <span className="block text-sm font-medium text-zinc-700">
                            Activités d&apos;intérêt
                          </span>
                          <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {activityOptions.map((option) => (
                              <label
                                key={`${participant.id}-${option.value}`}
                                className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 transition hover:border-blue-200"
                              >
                                <input
                                  type="checkbox"
                                  checked={participant.activites.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    toggleParticipantActivity(
                                      participant.id,
                                      option.value
                                    )
                                  }
                                  className="peer sr-only"
                                />
                                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-300 bg-white transition peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2">
                                  <svg
                                    viewBox="0 0 16 16"
                                    className="h-3.5 w-3.5 text-white opacity-0 transition"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M4 8.5l2.5 2.5L12 5.5" />
                                  </svg>
                                </span>
                                <span className="transition peer-checked:text-blue-700">
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
                          <p className="mt-2 text-xs text-zinc-500">
                            Sélection multiple possible.
                          </p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleMessageChange}
                    placeholder="Si besoin, indiquez des informations importantes sur vous, vos enfants ou vos attentes."
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Contact direct</h2>
          <div className="mt-6 grid gap-6 text-sm text-zinc-600 sm:grid-cols-2">
            <div>
              <p className="text-base font-semibold text-zinc-900">
                Yannick Ferré
              </p>
              <p>Président</p>
              <p>
                <a href="tel:+33608522839" className="hover:text-blue-700">
                  Tél. 06 08 52 28 39
                </a>
              </p>
              <p>
                <a href="mailto:yannickferre31@orange.fr" className="hover:text-blue-700">
                  yannickferre31@orange.fr
                </a>
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900">
                Gauthier Lopez-Camoche
              </p>
              <p>Communication / relation</p>
              <p>
                <a href="tel:+33683988757" className="hover:text-blue-700">
                  Tél. 06 83 98 87 57
                </a>
              </p>
              <p>
                <a href="mailto:glopezcamoche@gmail.com" className="hover:text-blue-700">
                  glopezcamoche@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
