"use client";

import { useImagePreview } from "./ImagePreview";

export default function ImagePreviewButton({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const { openPreview } = useImagePreview();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => openPreview({ src, alt })}
      className={
        className ??
        "absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm opacity-0 transition hover:bg-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 21l-4.3-4.3" />
        <circle cx="11" cy="11" r="7" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    </button>
  );
}

