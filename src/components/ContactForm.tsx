"use client";

import { useState } from "react";

const inputClass = "mt-1 w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "partial" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Une erreur est survenue.");
      form.reset();
      setStatus(result.acknowledged === false ? "partial" : "success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  return <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-semibold">Nous contacter</h2>
    <p className="mt-4 leading-7 text-zinc-600">Pour une demande concernant votre enfant, pensez à nous préciser son prénom, son âge, son expérience à vélo et la discipline qui l’intéresse (route ou VTT).</p>
    <p className="mt-3 text-zinc-600">Vous pouvez aussi nous écrire à <a className="text-blue-700 underline" href="mailto:asmuretcycliste@gmail.com">asmuretcycliste@gmail.com</a>.</p>
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div><label htmlFor="name" className="font-medium">Nom et prénom *</label><input className={inputClass} id="name" name="name" autoComplete="name" required maxLength={120} /></div>
      <div><label htmlFor="email" className="font-medium">Adresse email *</label><input className={inputClass} id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      <div><label htmlFor="phone" className="font-medium">Téléphone (facultatif)</label><input className={inputClass} id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
      <div><label htmlFor="message" className="font-medium">Message *</label><textarea className={inputClass} id="message" name="message" rows={6} required maxLength={5000} /></div>
      <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="website">Site web</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <button disabled={status === "loading"} className="rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">{status === "loading" ? "Envoi en cours…" : "Envoyer le message"}</button>
      <div role="status" aria-live="polite" className="text-sm">{status === "success" && <p className="text-green-700">Votre message a bien été envoyé. Merci !</p>}{status === "partial" && <p className="text-green-700">Votre message a bien été envoyé au club, mais l’accusé de réception n’a pas pu être envoyé.</p>}{status === "error" && <p className="text-red-700">{error}</p>}</div>
    </form>
  </div>;
}
