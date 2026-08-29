import Layout from "../components/Layout";
import Button from "../components/Button";
import { useSeo } from "../lib/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page Not Found",
    description: "The page you're looking for couldn't be found.",
  });

  return (
    <Layout>
      <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center sm:px-8">
        <p className="font-display text-6xl font-semibold text-coral/50">404</p>
        <h1 className="mt-4 font-display text-2xl font-medium text-ink">
          We couldn't find that page.
        </h1>
        <p className="mt-3 text-ink-soft">
          It may have moved, or the link may be out of date.
        </p>
        <div className="mt-8">
          <Button to="/">Back to Home</Button>
        </div>
      </section>
    </Layout>
  );
}
