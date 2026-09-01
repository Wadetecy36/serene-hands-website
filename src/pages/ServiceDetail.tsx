import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";
import { serviceJsonLd } from "../lib/structuredData";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);

  useSeo({
    title: service ? service.title : "Service",
    description: service?.overview ?? "Home-care service from Serene Hands.",
    jsonLd: service ? serviceJsonLd(service) : undefined,
  });

  if (!service) return <Navigate to="/services" replace />;

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <Link to="/services" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-blossom">
          <ArrowLeft size={15} /> All services
        </Link>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blossom">Service</p>
        <h1 className="text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
          {service.title}
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-ink-soft">
          {service.overview}
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Who it's for</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.whoItsFor}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">What it involves</h2>
            <ul className="mt-3 space-y-2.5">
              {service.whatItInvolves.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sage" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button to="/book" size="lg">Request Care</Button>
          <Button to="/contact" variant="ghost" size="lg">Ask a Question</Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink">Related services</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
