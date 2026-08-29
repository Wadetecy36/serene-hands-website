import Layout from "../components/Layout";
import { useSeo } from "../lib/useSeo";

export default function Privacy() {
  useSeo({ title: "Privacy Policy", description: "How Serene Hands handles your information." });
  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <h1 className="font-display text-3xl font-medium text-ink">Privacy Policy</h1>
        <p className="mt-6 text-ink-soft">
          This page is a placeholder. A full privacy policy — covering what
          information is collected through enquiry and application forms, how
          it's stored, and how it's used — will be added here before launch.
        </p>
      </section>
    </Layout>
  );
}
