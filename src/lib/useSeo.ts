import { useEffect } from "react";

type SeoInput = {
  title: string;
  description: string;
  /** Optional JSON-LD structured data object(s) for this page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  // PLACEHOLDER-DOMAIN — replace with the confirmed production domain before launch
  el.setAttribute("href", `https://PLACEHOLDER-DOMAIN.com${path}`);
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[] | undefined) {
  const existing = document.getElementById("page-jsonld");
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.id = "page-jsonld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useSeo({ title, description, jsonLd }: SeoInput) {
  useEffect(() => {
    const fullTitle = `${title} | Serene Hands`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setCanonical(window.location.pathname);
    setJsonLd(jsonLd);
  }, [title, description, jsonLd]);
}

