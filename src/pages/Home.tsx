import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import TrustStrip from "../components/TrustStrip";
import ServiceCard from "../components/ServiceCard";
import RingMotif from "../components/RingMotif";
import FAQAccordion from "../components/FAQAccordion";
import { useSeo } from "../lib/useSeo";
import { organizationJsonLd, websiteJsonLd } from "../lib/structuredData";
import {
  services,
  supportAreas,
  whyChooseUs,
  processSteps,
  faqs,
} from "../data/siteConfig";

export default function Home() {
  useSeo({
    title: "Compassionate Home Care for Children with Special Needs",
    description:
      "Serene Hands provides professional, compassionate home care for children with special needs — right at home, shaped around your child.",
    jsonLd: [organizationJsonLd(), websiteJsonLd()],
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <RingMotif
          variant="hero"
          className="pointer-events-none absolute -right-24 top-0 hidden h-[560px] w-[560px] opacity-90 sm:block sm:-right-10"
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-10 sm:gap-10 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-coral sm:mb-5">
              <HeartHandshake size={14} /> Every Child. Every Ability. Every Day.
            </p>
            <h1 className="text-balance font-display text-[2rem] font-medium leading-[1.12] text-ink sm:text-5xl lg:text-[3.4rem]">
              Care that meets your child exactly where they are.
            </h1>
            <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              Compassionate, professional home care designed to help children
              with special needs learn, grow and thrive — right at home.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 sm:mt-9">
              <Button to="/contact" size="lg" icon={<ArrowRight size={18} />}>
                Request Care
              </Button>
              <Button to="/how-it-works" variant="ghost" size="lg">
                See How It Works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center sm:max-w-md"
          >
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-coral/15 via-gold/10 to-teal/15" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-mist-deep bg-cloud/60 shadow-soft backdrop-blur-sm">
              <div className="px-6 text-center sm:px-10">
                <p className="font-display text-lg font-medium text-plum sm:text-2xl">
                  "Every Child.
                  <br />
                  Every Ability.
                  <br />
                  Every Day."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* Introduction */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Why Serene Hands"
            title="More than care. A little more peace of mind."
            description="Serene Hands is being built around a professional, structured approach to caring for children with special needs — one that respects your child's dignity, keeps you informed, and stays consistent as your family's needs change."
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {["Respect", "Dignity", "Reliability", "Communication", "Consistency", "Personalized Support"].map(
              (word) => (
                <div
                  key={word}
                  className="rounded-2xl border border-mist-deep bg-mist/50 px-5 py-6 text-center"
                >
                  <p className="font-display text-base font-semibold text-plum">{word}</p>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* Support areas */}
      <section className="bg-mist/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Who We Support"
            title="We support children with:"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {supportAreas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-mist-deep bg-cloud p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Services"
            title="Support built around your child."
            description="From daily routines to developmental play, every service is shaped around what your child actually needs."
          />
          <Button to="/services" variant="ghost">
            View all services
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-plum py-20 text-cloud sm:py-28">
        <RingMotif
          variant="corner"
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 opacity-40"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Serene"
            title="Care built around people, not routines."
            light
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-cloud/15 bg-cloud/5 p-6 backdrop-blur-sm"
              >
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cloud/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="The Process" title="How it works" align="center" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-display text-4xl font-semibold text-coral/30">{step.number}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/how-it-works" variant="ghost">
            More on how it works
          </Button>
        </div>
      </section>

      {/* Family focused */}
      <section className="bg-coral/5 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <SectionHeading
            title="You shouldn't have to carry everything alone."
            description="Arranging the right support for your child can feel overwhelming. Serene Hands is here to make it easier — with reliable care, clear communication, and a plan built around your family."
            align="center"
          />
          <div className="mt-8">
            <Button to="/contact" size="lg">
              Let's Talk About Care
            </Button>
          </div>
        </div>
      </section>

      {/* Caregiver CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-10 rounded-3xl border border-mist-deep bg-mist/40 p-8 sm:p-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Join Our Team"
            title="Great care starts with great people."
            description="Serene Hands is looking for patient, compassionate caregivers who want to make a real difference in a child's life."
          />
          <div className="flex lg:justify-end">
            <Button to="/careers" size="lg" variant="secondary">
              Join the Serene Team
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />
        <div className="mt-10">
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
        <div className="mt-8 text-center">
          <Button to="/faq" variant="ghost">
            View all questions
          </Button>
        </div>
      </section>
    </Layout>
  );
}
