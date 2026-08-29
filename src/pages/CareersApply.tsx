import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import { useSeo } from "../lib/useSeo";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  location: z.string().min(2, "Please share your location"),
  experience: z.string().min(2, "Please tell us about your experience"),
  availability: z.string().min(2, "Please share your availability"),
  qualifications: z.string().optional(),
  introduction: z.string().min(10, "Please write a short introduction"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border border-mist-deep bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-coral focus:outline-none";

export default function CareersApply() {
  useSeo({
    title: "Apply to Join Serene Hands",
    description: "Apply to join the Serene Hands caregiver team.",
  });

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    // NOTE: wire this to a real submission endpoint / CV upload handler
    // before launch — currently client-side only.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  };

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Careers"
          title="Apply to join the team"
          description="Tell us a little about yourself. If it looks like a good fit, we'll follow up to talk next steps."
        />

        <div className="mt-10">
          {submitted ? (
            <div className="flex flex-col items-center rounded-2xl border border-mist-deep bg-cloud px-6 py-14 text-center">
              <CheckCircle2 size={40} className="text-teal" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                Thank you. Your application has been received.
              </h3>
              <p className="mt-2 max-w-sm text-sm text-ink-soft">
                Someone from Serene Hands will be in touch to discuss the next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-mist-deep bg-cloud p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.fullName?.message}>
                  <input {...register("fullName")} className={inputClass} />
                </Field>
                <Field label="Phone number" error={errors.phone?.message}>
                  <input {...register("phone")} className={inputClass} />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input {...register("email")} className={inputClass} />
                </Field>
                <Field label="Location" error={errors.location?.message}>
                  <input {...register("location")} className={inputClass} />
                </Field>
                <Field label="Relevant experience" error={errors.experience?.message} full>
                  <textarea {...register("experience")} rows={3} className={inputClass} />
                </Field>
                <Field label="Availability" error={errors.availability?.message}>
                  <input {...register("availability")} className={inputClass} placeholder="e.g. Weekdays, full-time" />
                </Field>
                <Field label="Relevant qualifications (optional)">
                  <input {...register("qualifications")} className={inputClass} />
                </Field>
                <Field label="Short introduction" error={errors.introduction?.message} full>
                  <textarea {...register("introduction")} rows={4} className={inputClass} placeholder="Tell us a bit about yourself and why you'd like to join Serene Hands." />
                </Field>
                <div className="sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-ink">CV upload</span>
                  <div className="rounded-xl border border-dashed border-mist-deep bg-ivory px-4 py-6 text-center text-sm text-ink-soft">
                    CV upload will be enabled once a submission backend is connected.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-plum-deep disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}

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
