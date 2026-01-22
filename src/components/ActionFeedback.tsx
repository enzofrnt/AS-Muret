"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

type ActionFeedbackOptions = {
  loadingTitle: string;
  loadingMessage?: string;
  successTitle: string;
  successMessage?: string;
  errorTitle?: string;
  errorMessageFallback?: string;
  refreshAfter?: boolean;
};

type Ctx = {
  runAction: (
    action: (formData: FormData) => void | Promise<void>,
    formData: FormData,
    options: ActionFeedbackOptions
  ) => Promise<void>;
};

const ActionFeedbackContext = createContext<Ctx | null>(null);

function Modal({
  open,
  status,
  title,
  message,
  onClose,
}: {
  open: boolean;
  status: Exclude<Status, "idle">;
  title: string;
  message?: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/55 px-6 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start gap-4 px-6 py-5">
          {status === "loading" ? (
            <div className="mt-1 h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600" />
          ) : status === "success" ? (
            <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
              ✓
            </div>
          ) : (
            <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-100 text-red-700">
              !
            </div>
          )}

          <div className="min-w-0">
            <p className="text-base font-semibold text-zinc-900">{title}</p>
            {message ? (
              <p className="mt-1 text-sm leading-6 text-zinc-600">{message}</p>
            ) : null}
          </div>
        </div>

        {status === "loading" ? null : (
          <div className="border-t border-zinc-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ActionFeedbackProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | undefined>(undefined);

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setTitle("");
    setMessage(undefined);
  }, []);

  const runAction = useCallback<Ctx["runAction"]>(
    async (action, formData, options) => {
      setOpen(true);
      setStatus("loading");
      setTitle(options.loadingTitle);
      setMessage(options.loadingMessage);

      try {
        await action(formData);
        if (options.refreshAfter !== false) {
          router.refresh();
        }
        setStatus("success");
        setTitle(options.successTitle);
        setMessage(options.successMessage);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : options.errorMessageFallback ?? "Une erreur est survenue.";
        setStatus("error");
        setTitle(options.errorTitle ?? "Erreur");
        setMessage(msg);
      }
    },
    [router]
  );

  const value = useMemo<Ctx>(() => ({ runAction }), [runAction]);

  return (
    <ActionFeedbackContext.Provider value={value}>
      {children}
      <Modal
        open={open && status !== "idle"}
        status={status === "idle" ? "loading" : (status as Exclude<Status, "idle">)}
        title={title}
        message={message}
        onClose={close}
      />
    </ActionFeedbackContext.Provider>
  );
}

export function useActionFeedback() {
  const ctx = useContext(ActionFeedbackContext);
  if (!ctx) {
    throw new Error("useActionFeedback doit être utilisé dans ActionFeedbackProvider");
  }
  return ctx;
}

