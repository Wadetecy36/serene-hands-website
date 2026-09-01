import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import RingMotif from "../components/RingMotif";
import Button from "../components/Button";
import { useSeo } from "../lib/useSeo";

const principles = [
  { title: "Compassion", description: "Treat every child with patience, kindness and dignity." },
  { title: "Reliability", description: "Families should know that care is being handled responsibly." },
  { title: "Communication", description: "Keep families informed and involved every step of the way." },
  { title: "Professionalism", description: "Clear standards guide how care is delivered." },
  { title: "Personalization", description: "Support should reflect your child's individual needs." },
  { title: "Continuity", description: "Building systems that keep quality care consistent as we grow." },
];

export default function About() {
  useSeo({
    title: "About",
    description:
      "Serene Hands is a home-care service built around children with special needs — and the families who love them.",
  });

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <RingMotif variant="hero" className="pointer-events-none absolute -left-32 -top-20 hidden h-96 w-96 opacity-60 sm:block" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blossom">About Serene Hands</p>
          <h1 className="text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
            Care built for children — and the families raising them.
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
            Serene Hands exists to give families of children with special needs a
            caregiver they can trust — someone patient, consistent, and genuinely
            invested in helping their child thrive at home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Our Approach"
            title="Every child. Every ability. Every day."
            description="That's not just a tagline — it's how care is approached at Serene Hands. No two children are the same, so no two care plans look the same. What stays consistent is the patience, structure and warmth every child is met with."
          />
          <div className="rounded-3xl border border-blush-deep bg-blush/40 p-8">
            <p className="font-display text-xl leading-relaxed text-rose">
              "Compassionate care you can trust in the comfort of your own home."
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blush/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="What Guides Us" title="Care built around people, not routines." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-2xl border border-blush-deep bg-cloud p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Where We're Headed" title="Building toward something bigger." />
        <p className="mt-5 max-w-2xl text-balance leading-relaxed text-ink-soft">
          Serene Hands is being built as a structured, growing care organization —
          with clear standards, trained caregivers and, in time, a dedicated care
          facility. Today, that means a disciplined, professional approach to home
          care. Tomorrow, it means even more capacity to support families.
        </p>
      </section>

      <section className="bg-blossom/5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Let's talk about your child.
          </h2>
          <div className="mt-7">
            <Button to="/book" size="lg">Request Care</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
