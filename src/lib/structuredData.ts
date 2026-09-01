import { business } from "../data/siteConfig";

// PLACEHOLDER-DOMAIN — replace with the confirmed production domain before launch
const SITE_URL = "https://PLACEHOLDER-DOMAIN.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.fullName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    telephone: business.phone,
    email: business.email,
    sameAs: [business.instagram, business.tiktok],
    description:
      "Warm, personalized home care for children, young people, and adults, with care shaped around every person and family.",
    // No fixed premises — Serene Hands is a mobile, in-home care service
    // with no public storefront/office, so we mark it as a service-area
    // business rather than omit location entirely or invent an address.
    areaServed: [
      { "@type": "City", name: "Kumasi" },
      { "@type": "City", name: "Accra" },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.fullName,
    url: SITE_URL,
  };
}

export function serviceJsonLd(service: { title: string; overview: string; id: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview,
    url: `${SITE_URL}/services/${service.id}`,
    areaServed: [
      { "@type": "City", name: "Kumasi" },
      { "@type": "City", name: "Accra" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: business.fullName,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
