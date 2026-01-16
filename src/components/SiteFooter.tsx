export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/90 text-sm text-zinc-500">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-start sm:px-10 lg:px-16">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            AS Muret Cycliste
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-zinc-600">
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">•</span>Route
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">•</span>VTT
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">•</span>Cyclocross
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">•</span>Cyclosport
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">•</span>Gravel
            </span>
          </div>
          <div className="text-xs text-zinc-400">© {currentYear}</div>
        </div>
        <div className="space-y-2 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400">•</span>
            <a
              href="https://github.com/enzofrnt/AS-Muret/tree/main"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-600"
            >
              Site réalisé par Enzo Fournet
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400">•</span>
            <a href="mailto:contact@enzo-frnt.fr" className="hover:text-zinc-600">
              contact@enzo-frnt.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
