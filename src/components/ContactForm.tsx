import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Field, FormSuccess, inputClass } from "./FormField";
import { business, forms } from "../data/siteConfig";
import { submitToFormspree, buildWhatsAppLink } from "../lib/formSubmit";
import { MessageCircle } from "lucide-react";

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
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "Phone" },
  });

  const values = watch();
  const whatsappHref = buildWhatsAppLink(business.whatsappHref, [
    `Hi Serene Hands, I'd like to request care.`,
    values.fullName && `Name: ${values.fullName}`,
    values.phone && `Phone: ${values.phone}`,
    values.whoNeedsCare && `Who needs care: ${values.whoNeedsCare}`,
    values.supportType && `Support needed: ${values.supportType}`,
    values.location && `Location: ${values.location}`,
    values.schedule && `Preferred schedule: ${values.schedule}`,
    values.additionalInfo && `Additional info: ${values.additionalInfo}`,
  ]);

  const onSubmit = async (data: FormData) => {
    const result = await submitToFormspree(forms.contactFormspreeId, data);
    setEmailFailed(!result.ok);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <FormSuccess
        title={emailFailed ? "Almost there — send it on WhatsApp too" : "Thank you. Your request has been received."}
        description={
          emailFailed
            ? "We couldn't confirm email delivery just now. Tap below to send the same details straight to us on WhatsApp."
            : "Someone from Serene Hands will be in touch to discuss the next steps."
        }
        action={
          emailFailed ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-cloud transition-colors hover:bg-sage-deep"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Send via WhatsApp
            </a>
          ) : undefined
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8" noValidate>
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
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage hover:text-sage-deep"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Or send via WhatsApp instead
        </a>
      </div>
    </form>
  );
}

