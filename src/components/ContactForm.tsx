import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  preferredContact: z.enum(["Phone", "WhatsApp", "Email"]),
  whoNeedsCare: z.string().min(2, "Please let us know who needs care"),
  supportType: z.string().min(2, "Please describe the kind of support needed"),
  schedule: z.string().optional(),
  location: z.string().min(2, "Please share your location"),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "Phone" },
  });

  const onSubmit = async () => {
    // NOTE: this form currently submits nowhere. Wire this up to a form
    // backend (e.g. Netlify Forms, Formspree, or a custom endpoint) before
    // launch — see the pattern used on the Idrowhyt build.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-mist-deep bg-cloud px-6 py-14 text-center">
        <CheckCircle2 size={40} className="text-teal" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          Thank you. Your request has been received.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Someone from Serene Hands will be in touch to discuss the next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-mist-deep bg-cloud p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register("fullName")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Phone number" error={errors.phone?.message}>
          <input {...register("phone")} className={inputClass} autoComplete="tel" />
        </Field>
        <Field label="Email (optional)" error={errors.email?.message}>
          <input {...register("email")} className={inputClass} autoComplete="email" />
        </Field>
        <Field label="Preferred contact method">
          <select {...register("preferredContact")} className={inputClass}>
            <option>Phone</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </Field>
        <Field label="Who needs care?" error={errors.whoNeedsCare?.message}>
          <input {...register("whoNeedsCare")} className={inputClass} placeholder="e.g. My son, age 7" />
        </Field>
        <Field label="Location" error={errors.location?.message}>
          <input {...register("location")} className={inputClass} />
        </Field>
        <Field label="Type of support needed" error={errors.supportType?.message} full>
          <input {...register("supportType")} className={inputClass} placeholder="e.g. Behavior support, daily living skills" />
        </Field>
        <Field label="Preferred care schedule (optional)" full>
          <input {...register("schedule")} className={inputClass} placeholder="e.g. Weekday afternoons" />
        </Field>
        <Field label="Additional information (optional)" full>
          <textarea {...register("additionalInfo")} rows={4} className={inputClass} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-plum-deep disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Request Care"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-mist-deep bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-coral focus:outline-none";

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-coral">{error}</span>}
    </label>
  );
}
