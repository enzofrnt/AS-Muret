"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Preview = { src: string; alt: string };

type Ctx = {
  openPreview: (preview: Preview) => void;
};

const ImagePreviewContext = createContext<Ctx | null>(null);

function ImagePreviewModal({
  preview,
  onClose,
}: {
  preview: Preview | null;
  onClose: () => void;
}) {
  if (!preview) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-900/70 px-6 py-10"
      onClick={onClose}
      role="button"
      tabIndex={-1}
      aria-label="Fermer l’aperçu"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-zinc-800 shadow-md transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ✕
        </button>
        <div className="relative h-[75vh] w-full bg-white">
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="px-6 py-4 text-center text-sm text-zinc-600">
          {preview.alt}
        </div>
      </div>
    </div>
  );
}

export function ImagePreviewProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<Preview | null>(null);

  const openPreview = useCallback((next: Preview) => setPreview(next), []);
  const close = useCallback(() => setPreview(null), []);

  const value = useMemo<Ctx>(() => ({ openPreview }), [openPreview]);

  return (
    <ImagePreviewContext.Provider value={value}>
      {children}
      <ImagePreviewModal preview={preview} onClose={close} />
    </ImagePreviewContext.Provider>
  );
}

export function useImagePreview() {
  const ctx = useContext(ImagePreviewContext);
  if (!ctx) {
    throw new Error("useImagePreview doit être utilisé dans ImagePreviewProvider");
  }
  return ctx;
}

