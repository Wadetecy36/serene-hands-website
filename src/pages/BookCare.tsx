import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ShieldCheck, AlertTriangle, MessageCircle } from "lucide-react";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import { Field, FormSuccess, inputClass } from "../components/FormField";
import CameraCapture from "../components/CameraCapture";
import { useSeo } from "../lib/useSeo";
import { business, forms } from "../data/siteConfig";
import { submitToFormspreeFormData, buildWhatsAppLink } from "../lib/formSubmit";
import { verifyGuardian, type VerificationResult } from "../lib/verifyGuardian";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const guardianSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  relationship: z.enum(["Parent", "Legal Guardian", "Other family member"]),
});
type GuardianData = z.infer<typeof guardianSchema>;

const childSchema = z.object({
  childName: z.string().min(2, "Please enter the child's name"),
  childAge: z.string().min(1, "Please enter the child's age"),
  supportType: z.string().min(2, "Please describe the kind of support needed"),
  schedule: z.string().optional(),
  location: z.string().min(2, "Please share your location"),
  additionalInfo: z.string().optional(),
});
type ChildData = z.infer<typeof childSchema>;

type Step = "guardian" | "child" | "review";

export default function BookCare() {
  useSeo({
    title: "Book Care — Serene Hands",
    description: "Book home care for your child in two short steps: guardian verification, then your child's care needs.",
  });

  const bookingId = useMemo(() => crypto.randomUUID(), []);
  const [step, setStep] = useState<Step>("guardian");
  const [idImage, setIdImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const guardianForm = useForm<GuardianData>({
    resolver: zodResolver(guardianSchema),
    defaultValues: { relationship: "Parent" },
  });
  const childForm = useForm<ChildData>({ resolver: zodResolver(childSchema) });

  const handleVerify = async () => {
    if (!idImage || !selfieImage) return;
    setVerifying(true);
    setVerifyError(null);
    try {
      const result = await verifyGuardian({ idImage, selfieImage, bookingId });
      setVerification(result);
    } catch (err) {
      setVerifyError((err as Error).message || "Verification failed — you can still continue, we'll review manually.");
    } finally {
      setVerifying(false);
    }
  };

  const goToChildStep = guardianForm.handleSubmit(async () => {
    if (idImage && selfieImage && !verification && !verifyError) {
      await handleVerify();
    }
    setStep("child");
  });

  const goToReview = childForm.handleSubmit(() => setStep("review"));

  const submitBooking = async () => {
    const guardianData = guardianForm.getValues();
    const childData = childForm.getValues();

    const formData = new FormData();
    formData.append("booking_id", bookingId);
    Object.entries(guardianData).forEach(([k, v]) => v && formData.append(`guardian_${k}`, v));
    Object.entries(childData).forEach(([k, v]) => v && formData.append(`child_${k}`, v));
    formData.append("verification_status", verification?.overall_status ?? "not_completed");
    if (idImage) formData.append("id_image", idImage);
    if (selfieImage) formData.append("selfie_image", selfieImage);

    const result = await submitToFormspreeFormData(forms.bookingFormspreeId, formData);
    setEmailFailed(!result.ok);
    setSubmitted(true);
  };

  const whatsappHref = buildWhatsAppLink(business.whatsappHref, [
    `Hi Serene Hands, I'd like to book care.`,
    `Booking reference: ${bookingId.slice(0, 8)}`,
    guardianForm.getValues("fullName") && `Guardian: ${guardianForm.getValues("fullName")}`,
    guardianForm.getValues("phone") && `Phone: ${guardianForm.getValues("phone")}`,
    childForm.getValues("childName") && `Child: ${childForm.getValues("childName")}, age ${childForm.getValues("childAge") || "—"}`,
    childForm.getValues("supportType") && `Support needed: ${childForm.getValues("supportType")}`,
    childForm.getValues("location") && `Location: ${childForm.getValues("location")}`,
    "(I'll attach my ID and selfie photo here in the chat if needed.)",
  ]);

  if (submitted) {
    return (
      <Layout>
        <section className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
          <FormSuccess
            title={emailFailed ? "Almost there — send it on WhatsApp too" : "Booking received."}
            description={
              emailFailed
                ? "We couldn't confirm email delivery just now. Tap below to send your booking details on WhatsApp instead."
                : "Someone from Serene Hands will review your booking and be in touch shortly to confirm next steps."
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
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Book Care"
          title="Let's get your booking started."
          description="Two short steps: a quick identity check for the guardian booking, then a few details about your child."
        />

        <Stepper current={step} />

        {step === "guardian" && (
          <form onSubmit={goToChildStep} className="mt-8 rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" error={guardianForm.formState.errors.fullName?.message}>
                <input {...guardianForm.register("fullName")} className={inputClass} autoComplete="name" />
              </Field>
              <Field label="Phone number" error={guardianForm.formState.errors.phone?.message}>
                <input {...guardianForm.register("phone")} className={inputClass} autoComplete="tel" />
              </Field>
              <Field label="Email (optional)" error={guardianForm.formState.errors.email?.message}>
                <input {...guardianForm.register("email")} className={inputClass} autoComplete="email" />
              </Field>
              <Field label="Relationship to child">
                <select {...guardianForm.register("relationship")} className={inputClass}>
                  <option>Parent</option>
                  <option>Legal Guardian</option>
                  <option>Other family member</option>
                </select>
              </Field>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink">Photo of your ID</span>
                <label className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-blush-deep bg-cream text-center text-sm text-ink-soft hover:border-blossom/40">
                  {idImage ? (
                    <img src={URL.createObjectURL(idImage)} alt="Uploaded ID preview" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <span className="px-4">Tap to take a photo or upload your ID card</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={(e) => setIdImage(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink">Selfie for verification</span>
                <CameraCapture captured={selfieImage} onCapture={setSelfieImage} />
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              We use your ID and selfie only to confirm you're the guardian booking this service. Photos
              aren't stored after verification — only the result. See our{" "}
              <a href="/privacy" className="underline hover:text-blossom">privacy policy</a> for details.
            </p>

            {!isSupabaseConfigured && (
              <p className="mt-3 flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-3 text-sm text-ink">
                <AlertTriangle size={16} className="shrink-0 text-gold" aria-hidden="true" />
                Identity verification is being finalized — you can still continue, and our team will confirm your details directly.
              </p>
            )}
            {verifying && <p className="mt-3 text-sm text-ink-soft">Verifying your identity…</p>}
            {verification && <VerificationBanner result={verification} />}
            {verifyError && (
              <p className="mt-3 flex items-center gap-2 rounded-xl bg-blossom/10 px-4 py-3 text-sm text-ink">
                <AlertTriangle size={16} className="shrink-0 text-blossom" aria-hidden="true" />
                {verifyError}
              </p>
            )}

            <button
              type="submit"
              disabled={verifying}
              className="mt-7 w-full rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-rose-deep disabled:opacity-60 sm:w-auto"
            >
              {verifying ? "Verifying…" : "Continue to child details"}
            </button>
          </form>
        )}

        {step === "child" && (
          <form onSubmit={goToReview} className="mt-8 rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Child's name" error={childForm.formState.errors.childName?.message}>
                <input {...childForm.register("childName")} className={inputClass} />
              </Field>
              <Field label="Child's age" error={childForm.formState.errors.childAge?.message}>
                <input {...childForm.register("childAge")} className={inputClass} />
              </Field>
              <Field label="Type of support needed" error={childForm.formState.errors.supportType?.message} full>
                <input {...childForm.register("supportType")} className={inputClass} placeholder="e.g. Behavior support, daily living skills" />
              </Field>
              <Field label="Preferred care schedule (optional)">
                <input {...childForm.register("schedule")} className={inputClass} placeholder="e.g. Weekday afternoons" />
              </Field>
              <Field label="Location" error={childForm.formState.errors.location?.message}>
                <input {...childForm.register("location")} className={inputClass} />
              </Field>
              <Field label="Additional information (optional)" full>
                <textarea {...childForm.register("additionalInfo")} rows={4} className={inputClass} />
              </Field>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep("guardian")}
                className="text-sm font-semibold text-ink-soft hover:text-ink"
              >
                Back to guardian details
              </button>
              <button
                type="submit"
                className="w-full rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-rose-deep sm:w-auto"
              >
                Review booking
              </button>
            </div>
          </form>
        )}

        {step === "review" && (
          <div className="mt-8 rounded-2xl border border-blush-deep bg-cloud p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">Review your booking</h3>

            <ReviewSection title="Guardian">
              <ReviewRow label="Name" value={guardianForm.getValues("fullName")} />
              <ReviewRow label="Phone" value={guardianForm.getValues("phone")} />
              <ReviewRow label="Relationship" value={guardianForm.getValues("relationship")} />
              <ReviewRow
                label="Verification"
                value={verification ? verification.overall_status.replace("_", " ") : "Not completed — will be confirmed manually"}
              />
            </ReviewSection>

            <ReviewSection title="Child">
              <ReviewRow label="Name" value={childForm.getValues("childName")} />
              <ReviewRow label="Age" value={childForm.getValues("childAge")} />
              <ReviewRow label="Support needed" value={childForm.getValues("supportType")} />
              <ReviewRow label="Location" value={childForm.getValues("location")} />
            </ReviewSection>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep("child")}
                className="text-sm font-semibold text-ink-soft hover:text-ink"
              >
                Back to child details
              </button>
              <button
                type="button"
                onClick={submitBooking}
                className="w-full rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cloud transition-colors hover:bg-rose-deep sm:w-auto"
              >
                Submit booking
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

function Stepper({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "guardian", label: "Guardian" },
    { key: "child", label: "Child" },
    { key: "review", label: "Review" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === current);

  return (
    <ol className="mt-8 flex items-center gap-2" aria-label="Booking progress">
      {steps.map((s, i) => (
        <li key={s.key} className="flex flex-1 items-center gap-2">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              i <= currentIndex ? "bg-rose text-cloud" : "bg-blush text-ink-soft"
            }`}
            aria-current={i === currentIndex ? "step" : undefined}
          >
            {i < currentIndex ? <Check size={14} aria-hidden="true" /> : i + 1}
          </span>
          <span className={`text-xs font-medium ${i <= currentIndex ? "text-ink" : "text-ink-soft"}`}>{s.label}</span>
          {i < steps.length - 1 && <span className="h-px flex-1 bg-blush-deep" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function VerificationBanner({ result }: { result: VerificationResult }) {
  const copy: Record<VerificationResult["overall_status"], { text: string; tone: string }> = {
    auto_approved: { text: "Identity verified.", tone: "bg-sage/10 text-sage" },
    needs_review: { text: "We'll confirm your identity manually — no action needed from you.", tone: "bg-gold/10 text-ink" },
    rejected: { text: "We couldn't match your ID and selfie automatically. You can retake the photos, or continue — our team will follow up.", tone: "bg-blossom/10 text-ink" },
  };
  const { text, tone } = copy[result.overall_status];

  return (
    <p className={`mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${tone}`}>
      <ShieldCheck size={16} className="shrink-0" aria-hidden="true" />
      {text}
    </p>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-blush-deep bg-cream p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{title}</p>
      <div className="mt-2 space-y-1.5">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <p className="text-sm text-ink">
      <span className="text-ink-soft">{label}: </span>
      {value || "—"}
    </p>
  );
}
