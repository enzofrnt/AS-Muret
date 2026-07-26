"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  /** Tiny preview shown instantly (blurred) — URL vers un fichier LQIP. */
  placeholderSrc?: string;
  /** Optional medium-quality src shown before the final high-quality src. */
  mediumSrc?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
};

/**
 * Affiche d'abord un aperçu flou (LQIP), puis éventuellement une version
 * moyenne, puis la version haute qualité — sans case vide pendant le chargement.
 */
export default function ProgressiveImage({
  src,
  mediumSrc,
  placeholderSrc,
  alt,
  className = "",
  fill = true,
  sizes,
  quality = 80,
  priority = false,
  objectFit = "cover",
}: ProgressiveImageProps) {
  const [mediumReady, setMediumReady] = useState(false);
  const [highReady, setHighReady] = useState(false);
  const [loadFull, setLoadFull] = useState(!mediumSrc);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  useEffect(() => {
    setMediumReady(false);
    setHighReady(false);
    setLoadFull(!mediumSrc);
  }, [src, mediumSrc]);

  return (
    <div
      className={
        fill ? "absolute inset-0 overflow-hidden" : "relative overflow-hidden"
      }
    >
      {placeholderSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- LQIP léger, hors pipeline Next
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden
          className={[
            "absolute inset-0 h-full w-full scale-110 blur-lg",
            fitClass,
            "transition-opacity duration-500",
            mediumReady || highReady ? "opacity-0" : "opacity-100",
            className,
          ].join(" ")}
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-mc-badge/80" />
      )}

      {mediumSrc ? (
        <Image
          src={mediumSrc}
          alt={alt}
          fill={fill}
          sizes={sizes}
          quality={60}
          priority={priority}
          unoptimized
          onLoad={() => {
            setMediumReady(true);
            setLoadFull(true);
          }}
          className={[
            fitClass,
            "transition-opacity duration-500",
            mediumReady && !highReady ? "opacity-100" : "opacity-0",
            className,
          ].join(" ")}
        />
      ) : null}

      {loadFull ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          onLoad={() => setHighReady(true)}
          className={[
            fitClass,
            "transition-opacity duration-500",
            highReady ? "opacity-100" : "opacity-0",
            className,
          ].join(" ")}
        />
      ) : null}
    </div>
  );
}
