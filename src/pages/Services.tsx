import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";
import { services } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";

export default function Services() {
  useSeo({
    title: "Services",
    description:
      "Explore Serene Hands' home-care services for children with special needs — from personalized care plans to developmental activities.",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Our Services"
          title="Support shaped around your child."
          description="Every service starts with understanding your child specifically — not a fixed package. Explore what care with Serene Hands can look like."
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-plum py-16 text-cloud sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">
            Not sure which support fits your child?
          </h2>
          <p className="mt-3 text-cloud/75">
            Tell us about your child and we'll help you figure out the right kind of support.
          </p>
          <div className="mt-7">
            <Button to="/contact" size="lg" variant="secondary">
              Request Care
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
