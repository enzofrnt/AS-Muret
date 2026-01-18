import SiteHeader from "@/components/SiteHeader";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-full flex flex-col bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 sm:px-10 lg:px-16">
        <SiteHeader />
      </div>
      <div className="mt-6 flex-1">{children}</div>
    </div>
  );
}

