"use client";

import { useRef } from "react";

import { useActionFeedback } from "./ActionFeedback";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  feedback: {
    loadingTitle: string;
    loadingMessage?: string;
    successTitle: string;
    successMessage?: string;
    errorTitle?: string;
  };
  className?: string;
  children: React.ReactNode;
};

export default function ActionForm({ action, feedback, className, children }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const { runAction } = useActionFeedback();

  return (
    <form
      ref={ref}
      action={action}
      className={className}
      onSubmit={(event) => {
        // On intercepte pour afficher la modal, puis on appelle la server action.
        event.preventDefault();
        const form = ref.current;
        if (!form) return;
        const formData = new FormData(form);
        void runAction(action, formData, {
          loadingTitle: feedback.loadingTitle,
          loadingMessage: feedback.loadingMessage,
          successTitle: feedback.successTitle,
          successMessage: feedback.successMessage,
          errorTitle: feedback.errorTitle,
        });
      }}
    >
      {children}
    </form>
  );
}

