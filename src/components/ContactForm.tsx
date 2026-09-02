import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Field, FormSuccess, inputClass } from "./FormField";
import { forms } from "../data/siteConfig";
import { submitToFormspree } from "../lib/formSubmit";

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
  const [emailFailed, setEmailFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "Phone" },
  });


  const onSubmit = async (data: FormData) => {
    const result = await submitToFormspree(forms.contactFormspreeId, data);
    setEmailFailed(!result.ok);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <FormSuccess
        title={emailFailed ? "We couldn’t send your request yet" : "Thank you. Your request has been received."}
        description={
          emailFailed
            ? "The form could not be submitted right now. Please try again in a moment."
            : "Someone from Serene Hands will be in touch using the details you provided."
        }

      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8" noValidate>
      <p className="mb-6 rounded-xl bg-sage-soft/60 px-4 py-3 text-sm leading-6 text-ink-soft">Care requests submitted here are sent to the Serene Hands email inbox through Formspree. The phone and WhatsApp number is for general questions only.</p>
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

      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-rose-deep disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Request Care"}
        </button>

      </div>
    </form>
  );
}

