import { cloneElement, isValidElement, useId } from "react";
import type { ReactElement, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

export const inputClass =
  "w-full rounded-xl border border-blush-deep bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:border-blossom focus:outline-none focus-visible:ring-2 focus-visible:ring-blossom/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

type FieldProps = {
  label: string;
  error?: string;
  full?: boolean;
  children: ReactNode;
};

/**
 * Labeled form field wrapper. Clones the single form-control child to wire
 * up id / aria-invalid / aria-describedby so errors are announced by
 * screen readers, not just shown visually.
 */
export function Field({ label, error, full, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })
    : children;

  return (
    <label htmlFor={id} className={`block text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      {control}
      {error && (
        <span id={errorId} role="alert" className="mt-1 block text-xs font-medium text-blossom">
          {error}
        </span>
      )}
    </label>
  );
}

/** Success panel shown after a form submits, announced to screen readers. */
export function FormSuccess({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center rounded-2xl border border-blush-deep bg-cloud px-6 py-14 text-center"
    >
      <CheckCircle2 size={40} className="text-sage" aria-hidden="true" />
      <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
