import Layout from "../components/Layout";
import { useSeo } from "../lib/useSeo";

export default function Terms() {
  useSeo({ title: "Terms", description: "Terms of use for the Serene Hands website." });
  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <h1 className="font-display text-3xl font-medium text-ink">Terms</h1>
        <p className="mt-6 text-ink-soft">
          This page is a placeholder for the site's terms of use, to be finalized before launch.
        </p>
      </section>
    </Layout>
  );
}
