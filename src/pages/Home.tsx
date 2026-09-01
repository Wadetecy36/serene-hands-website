import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Heart, HeartHandshake, Sparkles, UsersRound } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import FAQAccordion from "../components/FAQAccordion";
import { useSeo } from "../lib/useSeo";
import { organizationJsonLd, websiteJsonLd } from "../lib/structuredData";
import { services, whyChooseUs, processSteps, faqs } from "../data/siteConfig";

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  useSeo({
    title: "Serene Hands | Care That Feels Like Home",
    description:
      "Serene Hands provides warm, personalized home care for children, young people, and adults, with care shaped around every person and family.",
    jsonLd: [organizationJsonLd(), websiteJsonLd()],
  });

  return (
    <Layout>
      <section className="hero-glow soft-grid relative overflow-hidden">
        <div className="serene-container relative grid min-h-[calc(100vh-76px)] items-center gap-10 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <motion.div
            variants={fade}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blush-deep bg-cloud/80 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-rose">
              <Heart size={14} fill="currentColor" />
              Home care, with heart
            </div>
            <h1 className="text-balance text-[3.4rem] font-semibold leading-[.96] text-ink sm:text-[5rem] lg:text-[6.25rem]">
              Care that feels <span className="text-rose">like home.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-ink-soft sm:text-xl">
              For children, young people, and adults. Thoughtful support, genuine companionship, and care shaped around the person, not a checklist.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/book" size="lg" icon={<ArrowRight size={18} />}>
                Request Care
              </Button>
              <Button to="/services" size="lg" variant="secondary">
                Explore Our Care
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-ink-soft">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-cream bg-blush" />
                <span className="h-8 w-8 rounded-full border-2 border-cream bg-sage-soft" />
                <span className="h-8 w-8 rounded-full border-2 border-cream bg-blossom-soft" />
              </div>
              <span>Care built around real people and real families.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative aspect-[.9/1] overflow-hidden rounded-[32px] bg-rose-deep p-5 shadow-soft sm:p-7">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-blossom-soft/30" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-gold/30" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-[#80506a] p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="serene-eyebrow text-white/60">Serene Hands</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                    <HeartHandshake size={19} />
                  </span>
                </div>
                <div className="relative mt-10">
                  <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-gold/25 blur-2xl" />
                  <div className="absolute -left-5 bottom-0 h-32 w-32 rounded-full bg-blossom/30 blur-2xl" />
                  <p className="relative font-display text-5xl font-semibold leading-[.95] text-white sm:text-6xl">
                    Every person deserves to feel cared for.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <UsersRound size={18} className="text-blossom-soft" />
                    <p className="mt-5 text-sm font-semibold text-white">Children &amp; young people</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <Sparkles size={18} className="text-gold" />
                    <p className="mt-5 text-sm font-semibold text-white">Adults &amp; families</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[.16em] text-ink-soft">Kumasi &amp; Accra</p>
          </motion.div>
        </div>
        <a href="#story" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-ink-soft lg:flex">
          Scroll to discover <ArrowDown size={15} />
        </a>
      </section>

      <section id="story" className="bg-cloud py-20 sm:py-28">
        <div className="serene-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <p className="serene-eyebrow text-blossom">Our Story</p>
            <p className="mt-4 font-display text-4xl font-semibold leading-tight text-rose sm:text-5xl">
              Care starts with seeing the person first.
            </p>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-8 text-ink">
              Serene Hands is being built around a simple belief: good care should feel personal, respectful, and full of humanity.
            </p>
            <p className="mt-6 text-base leading-7 text-ink-soft">
              We support children and adults with care that fits real life at home. That means listening to families, respecting routines, celebrating small wins, and giving every person the dignity and patience they deserve.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-blush p-6">
                <p className="serene-eyebrow text-rose">For children</p>
                <p className="mt-3 font-display text-2xl font-semibold text-ink">Room to learn, grow and be themselves.</p>
              </div>
              <div className="rounded-2xl bg-sage-soft p-6">
                <p className="serene-eyebrow text-sage">For adults</p>
                <p className="mt-3 font-display text-2xl font-semibold text-ink">Care, companionship and comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="serene-container">
          <SectionHeading
            eyebrow="Who We Care For"
            title="Different lives. The same human warmth."
            description="Serene Hands is growing to support people at different stages of life, while keeping the same promise of thoughtful, respectful care."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] bg-rose p-8 text-white sm:p-10">
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />
              <p className="serene-eyebrow text-blossom-soft">Current care</p>
              <h3 className="mt-4 text-4xl font-semibold">Children &amp; young people</h3>
              <p className="mt-4 max-w-lg leading-7 text-white/75">
                Personalized support for children with different needs, from daily living and companionship to developmental and educational support.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Personalized care", "Development", "Companionship", "Learning support"].map((x) => (
                  <span key={x} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/85">
                    {x}
                  </span>
                ))}
              </div>
              <Button to="/services" variant="secondary" className="mt-8">Explore current services</Button>
            </div>

            <div className="rounded-[28px] border border-blush-deep bg-cloud p-8 sm:p-10">
              <p className="serene-eyebrow text-sage">Coming soon</p>
              <h3 className="mt-4 text-4xl font-semibold">Older adult care</h3>
              <p className="mt-4 max-w-lg leading-7 text-ink-soft">
                We’re expanding Serene Hands to support older adults and the families who care for them. The service offering is currently being developed, and more details will be shared soon.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-sage-soft p-4 text-sm font-semibold text-sage">
                <Heart size={17} fill="currentColor" /> More care is on the way.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blush/50 py-20 sm:py-28">
        <div className="serene-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our Care"
              title="Support that adapts to the person."
              description="Our current services are designed around children and young people, with each one shaped around their needs, routines, abilities and goals."
            />
            <Button to="/services" variant="ghost">
              See all services <ArrowRight size={17} />
            </Button>
          </div>
          <div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rose-deep py-20 text-white sm:py-28">
        <div className="serene-container">
          <SectionHeading
            eyebrow="Why Serene Hands"
            title="Warmth is not an extra. It is the way we care."
            description="Professional care and human connection should live in the same place. That is the standard we are building toward."
            light
          />
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-white/15 pt-5"
              >
                <p className="font-display text-2xl font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="serene-container">
          <SectionHeading eyebrow="The Care Journey" title="A softer way to get started." align="center" />
          <div className="mt-12 grid gap-0 border-y border-blush-deep lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.number} className={`relative p-7 ${index < 3 ? "lg:border-r lg:border-blush-deep" : ""}`}>
                <span className="serene-eyebrow text-blossom">{step.number}</span>
                <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Button to="/how-it-works" variant="ghost">See the full journey</Button>
          </div>
        </div>
      </section>

      <section className="bg-sage-soft py-20 sm:py-28">
        <div className="serene-container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="serene-eyebrow text-sage">For families</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">You do not have to figure everything out alone.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-ink-soft">Start with a conversation. Tell us what life looks like right now, and we’ll take it from there.</p>
          </div>
          <Button to="/book" size="lg" variant="sage" icon={<ArrowRight size={18} />}>Talk to Serene Hands</Button>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="serene-container grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading eyebrow="Questions" title="If you’re wondering, ask." description="A few of the questions families ask before taking the first step." />
          <div>
            <FAQAccordion items={faqs.slice(0, 5)} />
            <div className="mt-7">
              <Button to="/faq" variant="ghost">View all questions</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-blush-deep bg-cloud py-16">
        <div className="serene-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="serene-eyebrow text-blossom">Join our team</p>
            <h2 className="mt-3 text-3xl font-semibold">Great care starts with great people.</h2>
          </div>
          <Button to="/careers" variant="secondary">Explore careers</Button>
        </div>
      </section>
    </Layout>
  );
}
