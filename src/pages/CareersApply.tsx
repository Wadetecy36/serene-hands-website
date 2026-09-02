import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import { Field, FormSuccess, inputClass } from "../components/FormField";
import { useSeo } from "../lib/useSeo";
import { forms } from "../data/siteConfig";
import { submitToFormspreeFormData } from "../lib/formSubmit";

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

export default function CareersApply() {
  useSeo({
    title: "Apply to Join Serene Hands",
    description: "Apply to join the Serene Hands caregiver team.",
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const file = cvInputRef.current?.files?.[0];
    if (file) formData.append("cv", file);

    const result = await submitToFormspreeFormData(forms.careersFormspreeId, formData);
    setEmailFailed(!result.ok);
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
            <FormSuccess
              title={
                emailFailed
                  ? "We couldn't confirm your application"
                  : "Thank you. Your application has been received."
              }
              description={
                emailFailed
                  ? "We couldn't confirm email delivery just now. Please try submitting again later or contact Serene Hands with a general question."
                  : "Your application has been sent to the Serene Hands email inbox. Someone from the team will be in touch to discuss the next steps."
              }
            />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8"
              noValidate
            >
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
                  <input
                    {...register("availability")}
                    className={inputClass}
                    placeholder="e.g. Weekdays, full-time"
                  />
                </Field>

                <Field label="Relevant qualifications (optional)">
                  <input {...register("qualifications")} className={inputClass} />
                </Field>

                <Field label="Short introduction" error={errors.introduction?.message} full>
                  <textarea
                    {...register("introduction")}
                    rows={4}
                    className={inputClass}
                    placeholder="Tell us a bit about yourself and why you'd like to join Serene Hands."
                  />
                </Field>

                <div className="sm:col-span-2">
                  <label htmlFor="cv-upload" className="mb-1.5 block text-sm font-medium text-ink">
                    CV upload (optional)
                  </label>
                  <input
                    ref={cvInputRef}
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="block w-full rounded-xl border border-dashed border-blush-deep bg-cream px-4 py-4 text-sm text-ink-soft file:mr-4 file:rounded-full file:border-0 file:bg-rose file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cloud hover:file:bg-rose-deep"
                  />
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-rose-deep disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? "Sending…" : "Submit Application"}
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Applications are sent to the Serene Hands email inbox. The phone and WhatsApp contact on this website are for general questions only.
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
