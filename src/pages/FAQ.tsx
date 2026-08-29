import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import FAQAccordion from "../components/FAQAccordion";
import Button from "../components/Button";
import { faqs } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";
import { faqJsonLd } from "../lib/structuredData";

export default function FAQ() {
  useSeo({
    title: "FAQ",
    description: "Answers to common questions about home care for children with special needs at Serene Hands.",
    jsonLd: faqJsonLd(faqs),
  });

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-ink-soft">Still have a question?</p>
          <div className="mt-4">
            <Button to="/contact">Get In Touch</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
