/**
 * Form delivery helpers.
 *
 * This is a static site with no backend, so Formspree handles all form submissions.
 * The public phone/WhatsApp contact is intentionally kept separate from forms.
 */

/** Submit a set of form fields to a Formspree form endpoint. */
export async function submitToFormspree(
  formId: string,
  data: Record<string, string | undefined>,
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/** Submit multipart form data (e.g. with a file attachment) to Formspree. */
export async function submitToFormspreeFormData(
  formId: string,
  formData: FormData,
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
