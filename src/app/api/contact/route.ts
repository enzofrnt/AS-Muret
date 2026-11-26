import { NextResponse } from "next/server";

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (Number(request.headers.get("content-length") || 0) > 12000) {
    return NextResponse.json({ error: "Message trop volumineux." }, { status: 413 });
  }
  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 12000) throw new Error("too large");
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  const field = (name: string) => typeof data[name] === "string" ? (data[name] as string).trim() : "";
  const name = field("name"), email = field("email"), phone = field("phone"), message = field("message");
  if (field("website")) return NextResponse.json({ ok: true });
  if (!name || name.length > 120 || /[\r\n]/.test(name) || !emailPattern.test(email) || email.length > 254 || phone.length > 40 || /[\r\n]/.test(phone) || !message || message.length > 5000) {
    return NextResponse.json({ error: "Vérifiez les champs du formulaire." }, { status: 400 });
  }
  const token = field("token");
  const secret = process.env.TURNSTILE_SECRET;
  const allowedHosts = new Set((process.env.TURNSTILE_HOSTNAMES ?? "").split(",").map((host) => host.trim()).filter(Boolean));
  if (!secret || !token || token.length > 2048 || allowedHosts.size === 0) {
    return NextResponse.json({ error: "La vérification antispam a échoué. Réessayez." }, { status: 403 });
  }
  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(10000),
    });
    const result = await verification.json();
    if (!verification.ok || result.success !== true || result.action !== "contact" || !allowedHosts.has(result.hostname)) throw new Error("verification failed");
    if (process.env.VERCEL_ENV === "preview") {
      const replay = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(10000),
      });
      const replayResult = await replay.json();
      if (!replay.ok || replayResult.success !== false || !replayResult["error-codes"]?.includes("timeout-or-duplicate")) throw new Error("replay check failed");
    }
  } catch {
    return NextResponse.json({ error: "La vérification antispam a échoué. Réessayez." }, { status: 403 });
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return NextResponse.json({ error: "Le formulaire est momentanément indisponible." }, { status: 503 });
  }
  const send = async (payload: object) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(10000),
    });
    return response.ok;
  };
  try {
    const delivered = await send({ from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], reply_to: email,
      subject: "Nouveau message — AS Muret Cycliste", text: `Nom : ${name}\nEmail : ${email}\nTéléphone : ${phone || "Non renseigné"}\n\nMessage :\n${message}` });
    if (!delivered) throw new Error("delivery failed");
  } catch {
    return NextResponse.json({ error: "L’envoi a échoué. Veuillez réessayer." }, { status: 502 });
  }
  try {
    const acknowledged = await send({ from: CONTACT_FROM_EMAIL, to: [email], reply_to: CONTACT_TO_EMAIL,
      subject: "Nous avons bien reçu votre message – AS Muret Cycliste",
      text: "Bonjour,\n\nNous vous remercions pour votre message et pour l'intérêt que vous portez à l'AS Muret Cycliste.\n\nVotre demande a bien été transmise à notre équipe. Nous reviendrons vers vous dès que possible.\n\nÀ bientôt,\n\nL'équipe de l'AS Muret Cycliste" });
    return NextResponse.json({ ok: true, acknowledged });
  } catch {
    return NextResponse.json({ ok: true, acknowledged: false });
  }
}
