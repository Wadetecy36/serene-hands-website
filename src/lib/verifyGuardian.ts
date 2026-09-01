import { ensureSession } from "./supabaseClient";

export type VerificationResult = {
  id: string;
  overall_status: "auto_approved" | "needs_review" | "rejected";
  reasons: string[];
  ocr: { raw_text: string; id_number: string | null; date_of_birth: string | null };
  face_match: { status: string; similarity: number | null; detail: string };
};

export async function verifyGuardian(params: {
  idImage: Blob;
  selfieImage: Blob;
  bookingId: string;
}): Promise<VerificationResult> {
  const session = await ensureSession();
  if (!session) throw new Error("Could not start a verification session");

  const form = new FormData();
  form.append("id_image", params.idImage, "id.jpg");
  form.append("selfie_image", params.selfieImage, "selfie.jpg");
  form.append("booking_id", params.bookingId);

  const res = await fetch(
    `${(import.meta.env.VITE_SUPABASE_URL as string).replace(/\/$/, "")}/functions/v1/verify-guardian`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: form,
    },
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || "Verification request failed");
  }

  return res.json();
}
