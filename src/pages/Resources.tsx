import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import { resourceArticles } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";

export default function Resources() {
  useSeo({
    title: "Resources",
    description: "Guidance and answers for families navigating home care for a child with special needs.",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Resources"
          title="For families navigating this journey."
          description="Practical guidance for parents thinking through home care, therapy support, and what to ask along the way."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/resources/${article.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-mist-deep bg-cloud p-6 shadow-card transition-all hover:-translate-y-1 hover:border-coral/30"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">{article.readingTime}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-coral">
                Read
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
