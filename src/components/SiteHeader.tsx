"use client";

import Image from "next/image";
import Link from "next/link";

type ActivePage = "home" | "activites" | "rejoindre";

type SiteHeaderProps = {
  activePage?: ActivePage;
  onLogoClick?: () => void;
};

const navItemClass =
  "rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-zinc-900";

export default function SiteHeader({ activePage, onLogoClick }: SiteHeaderProps) {
  const isActive = (page: ActivePage) => activePage === page;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {onLogoClick ? (
          <button
            type="button"
            aria-label="Logo AS Muret Cycliste"
            onClick={onLogoClick}
            className="rounded-2xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Image
              src="/as-muret-logo.png"
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
              src="/as-muret-logo.png"
              alt="Logo AS Muret Cycliste"
              width={140}
              height={80}
              priority
            />
          </Link>
        )}
        <span className="whitespace-nowrap rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Club cycliste & VTT depuis 1962
        </span>
      </div>
      <nav className="flex flex-wrap gap-2">
        <Link
          href="/"
          aria-current={isActive("home") ? "page" : undefined}
          className={
            isActive("home")
              ? "rounded-full bg-blue-700 px-4 py-2 text-sm font-medium text-white"
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
              ? "rounded-full bg-blue-700 px-4 py-2 text-sm font-medium text-white"
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
              ? "rounded-full bg-blue-700 px-4 py-2 text-sm font-medium text-white"
              : `${navItemClass} text-zinc-600`
          }
        >
          Rejoindre le club
        </Link>
      </nav>
    </header>
  );
}
