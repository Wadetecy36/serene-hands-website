import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// If the project isn't set up yet, we still export a client (pointed at
// harmless placeholder values) rather than throwing at import time —
// callers check `isSupabaseConfigured` and show a clear "booking
// verification isn't available yet" state instead of a crashed page.
export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder-anon-key",
);

/**
 * Ensures we have a session to call the verify-guardian Edge Function
 * with (it requires a valid JWT). Uses Supabase anonymous auth so a
 * first-time visitor booking care isn't forced to create a real
 * account/password just to submit a booking.
 */
export async function ensureSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;

  const { data: signInData, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return signInData.session;
}
