import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";
import { resourceArticles } from "../data/siteConfig";
import { useSeo } from "../lib/useSeo";

export default function ResourceArticle() {
  const { slug } = useParams();
  const article = resourceArticles.find((a) => a.slug === slug);

  useSeo({
    title: article ? article.title : "Resource",
    description: article?.excerpt ?? "A resource from Serene Hands.",
  });

  if (!article) return <Navigate to="/resources" replace />;

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <Link to="/resources" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-blossom">
          <ArrowLeft size={15} /> All resources
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">{article.readingTime}</p>
        <h1 className="mt-2 text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>

        <div className="mt-10 rounded-2xl border border-dashed border-blush-deep bg-blush/40 p-8 text-center text-sm text-ink-soft">
          Full article content is being written and reviewed before publishing —
          check back soon.
        </div>
      </section>
    </Layout>
  );
}
