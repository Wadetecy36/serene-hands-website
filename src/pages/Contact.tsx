import { Phone, Mail, MessageCircle } from "lucide-react";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import { business } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";

export default function Contact() {
  useSeo({
    title: "Contact — Request Care",
    description: "Get in touch with Serene Hands to request home care for your child, or ask any questions.",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's talk about the care you need."
          description="Tell us about your child and what kind of support you're looking for. There's no wrong way to start this conversation."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <a
              href={business.phoneHref}
              className="flex items-center gap-4 rounded-2xl border border-mist-deep bg-cloud p-5 hover:border-coral/30"
            >
              <span className="rounded-full bg-teal/10 p-3 text-teal"><Phone size={20} /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Call</p>
                <p className="font-medium text-ink">{business.phone}</p>
              </div>
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-mist-deep bg-cloud p-5 hover:border-coral/30"
            >
              <span className="rounded-full bg-teal/10 p-3 text-teal"><MessageCircle size={20} /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">WhatsApp</p>
                <p className="font-medium text-ink">{business.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-4 rounded-2xl border border-mist-deep bg-cloud p-5 hover:border-coral/30"
            >
              <span className="rounded-full bg-teal/10 p-3 text-teal"><Mail size={20} /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Email</p>
                <p className="break-all font-medium text-ink">{business.email}</p>
              </div>
            </a>
            <p className="px-1 text-sm text-ink-soft">{business.serviceAreaLabel}</p>
          </div>

          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
