import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import RingMotif from "../components/RingMotif";
import { processSteps } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";

export default function HowItWorks() {
  useSeo({
    title: "How It Works",
    description: "How care with Serene Hands begins — from your first message to ongoing support at home.",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="The Process"
          title="How it works"
          description="Getting the right support for your child shouldn't be complicated. Here's what to expect."
          align="center"
        />
      </section>

      <section className="relative mx-auto max-w-4xl overflow-hidden px-5 pb-20 sm:px-8 sm:pb-28">
        <RingMotif variant="corner" className="pointer-events-none absolute -right-16 top-0 hidden h-56 w-56 opacity-40 sm:block" />
        <div className="relative space-y-5">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 rounded-2xl border border-blush-deep bg-cloud p-7 sm:flex-row sm:items-start sm:gap-8"
            >
              <span className="font-display text-3xl font-semibold text-blossom/40">{step.number}</span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-rose py-16 text-cloud sm:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">Ready for step one?</h2>
          <p className="mt-3 text-cloud/75">Tell us about your child, and we'll take it from there.</p>
          <div className="mt-7">
            <Button to="/book" size="lg" variant="secondary">Request Care</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
