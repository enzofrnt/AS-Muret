"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ActivePage = "home" | "activites" | "rejoindre";

type SiteHeaderProps = {
  activePage?: ActivePage;
  onLogoClick?: () => void;
};

const navItemClass =
  "rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-zinc-900 w-full text-center min-[891px]:w-auto min-[891px]:text-left";

export default function SiteHeader({ activePage, onLogoClick }: SiteHeaderProps) {
  const isActive = (page: ActivePage) => activePage === page;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logoutPending, setLogoutPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { isAdmin?: boolean };
        if (!cancelled) setIsAdmin(!!data.isAdmin);
      } catch {
        // ignore
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLogoutPending(true);
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setLogoutPending(false);
      setIsAdmin(false);
      window.location.href = "/";
    }
  };

  return (
    <header className="relative flex flex-col gap-4 min-[891px]:flex-row min-[891px]:items-center min-[891px]:justify-between">
      <div className="flex items-center justify-between gap-4 min-[891px]:justify-start">
        <div className="flex flex-wrap items-center gap-3 min-[480px]:gap-4">
          {onLogoClick ? (
            <button
              type="button"
              aria-label="Logo AS Muret Cycliste"
              onClick={onLogoClick}
              className="rounded-2xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Image
                src="/as-muret-logo.avif"
                alt="Logo AS Muret Cycliste"
                width={140}
                height={80}
                priority
              />
            </button>
          ) : (
            <Link
              href="/"
              className="rounded-2xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Image
                src="/as-muret-logo.avif"
                alt="Logo AS Muret Cycliste"
                width={140}
                height={80}
                priority
              />
            </Link>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 min-[891px]:hidden"
          aria-controls="site-nav"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Fermer" : "Menu"}
        </button>
      </div>
      <nav
        id="site-nav"
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute left-0 right-0 top-full z-50 w-full flex-col gap-2 rounded-2xl border border-blue-100 bg-white p-3 shadow-lg min-[891px]:static min-[891px]:flex min-[891px]:w-auto min-[891px]:flex-row min-[891px]:flex-wrap min-[891px]:justify-end min-[891px]:border-none min-[891px]:bg-transparent min-[891px]:p-0 min-[891px]:shadow-none`}
      >
        <Link
          href="/"
          aria-current={isActive("home") ? "page" : undefined}
          className={
            isActive("home")
              ? "rounded-full bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white min-[891px]:w-auto min-[891px]:text-left"
              : `${navItemClass} text-zinc-600`
          }
        >
          Accueil
        </Link>
        <Link
          href="/activites"
          aria-current={isActive("activites") ? "page" : undefined}
          className={
            isActive("activites")
              ? "rounded-full bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white min-[891px]:w-auto min-[891px]:text-left"
              : `${navItemClass} text-zinc-600`
          }
        >
          Activités
        </Link>
        <Link
          href="/rejoindre"
          aria-current={isActive("rejoindre") ? "page" : undefined}
          className={
            isActive("rejoindre")
              ? "rounded-full bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white min-[891px]:w-auto min-[891px]:text-left"
              : `${navItemClass} text-zinc-600`
          }
        >
          Rejoindre le club
        </Link>

        {isAdmin ? (
          <>
            <Link
              href="/backoffice"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 w-full text-center min-[891px]:w-auto min-[891px]:text-left"
            >
              Backoffice
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutPending}
              className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60 w-full text-center min-[891px]:w-auto min-[891px]:text-left"
            >
              {logoutPending ? "Déconnexion..." : "Se déconnecter"}
            </button>
          </>
        ) : null}
      </nav>
    </header>
  );
}
