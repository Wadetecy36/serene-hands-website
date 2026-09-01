/**
 * Form delivery helpers.
 *
 * This is a static site with no backend, so email delivery goes through
 * Formspree (https://formspree.io) — free tier, no server code needed.
 * WhatsApp delivery needs no third-party account at all: it just opens
 * a wa.me link with the message pre-filled from what the person typed.
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

/** Build a wa.me link that opens WhatsApp with the message pre-filled. */
export function buildWhatsAppLink(phoneE164: string, lines: (string | undefined)[]): string {
  const message = lines.filter(Boolean).join("\n");
  const digits = phoneE164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
