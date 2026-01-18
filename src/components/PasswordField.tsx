"use client";

import { useId, useState } from "react";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  error?: string | null;
  autoFocus?: boolean;
};

export default function PasswordField({
  name,
  label,
  required,
  error,
  autoFocus,
}: Props) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <div className="mt-1 flex overflow-hidden rounded-lg border border-zinc-300 bg-white focus-within:ring-2 focus-within:ring-blue-500">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          autoFocus={autoFocus}
          className="w-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          className="shrink-0 border-l border-zinc-200 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
        >
          {visible ? "Masquer" : "Afficher"}
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

