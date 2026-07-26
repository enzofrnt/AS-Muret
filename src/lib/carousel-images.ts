/** Chemins dérivés des images carousel (fichiers dans public/carousel/). */

export function carouselMediumSrc(src: string): string {
  const match = src.match(/^\/carousel\/(.+)\.avif$/);
  if (!match) return src;
  return `/carousel/md/${match[1]}.webp`;
}

export function carouselLqipSrc(src: string): string {
  const match = src.match(/^\/carousel\/(.+)\.avif$/);
  if (!match) return src;
  return `/carousel/lqip/${match[1]}.webp`;
}
