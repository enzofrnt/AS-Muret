type ContactSectionProps = {
  title: string;
  sectionId?: string;
  columns?: 1 | 2;
  onPresidentClick?: () => void;
};

const contacts = [
  {
    name: "Yannick Ferré",
    role: "Président - Encadrement Route",
    phoneHref: "tel:+33608522839",
    phoneLabel: "Tél. 06 08 52 28 39",
    emailHref: "mailto:yannickferre31@orange.fr",
    emailLabel: "yannickferre31@orange.fr",
    isPresident: true,
  },
  {
    name: "Enzo Fournet",
    role: "Encadrement VTT",
    phoneHref: "tel:+33783723926",
    phoneLabel: "Tél. 07 83 72 39 26",
    emailHref: "mailto:enzofournet13@gmail.com",
    emailLabel: "enzofournet13@gmail.com",
    isPresident: false,
  },
] as const;

export default function ContactSection({
  title,
  sectionId,
  columns = 1,
  onPresidentClick,
}: ContactSectionProps) {
  return (
    <section
      id={sectionId}
      className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div
        className={[
          "mt-6 grid gap-6 text-sm text-zinc-600",
          columns === 2 ? "sm:grid-cols-2" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {contacts.map((contact) => (
          <div key={contact.emailHref}>
            {contact.isPresident && onPresidentClick ? (
              <p
                className="text-base font-semibold text-zinc-900"
                onClick={onPresidentClick}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    onPresidentClick();
                  }
                }}
                aria-label="Déclencher Détartelage"
              >
                {contact.name}
              </p>
            ) : (
              <p className="text-base font-semibold text-zinc-900">
                {contact.name}
              </p>
            )}
            <p>{contact.role}</p>
            <p>
              <a href={contact.phoneHref} className="hover:text-blue-700">
                {contact.phoneLabel}
              </a>
            </p>
            <p>
              <a href={contact.emailHref} className="hover:text-blue-700">
                {contact.emailLabel}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

