import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { business, navLinks } from "../data/siteConfig";
import RingMotif from "./RingMotif";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 3v10.5a3.5 3.5 0 1 1-3-3.46" strokeLinecap="round" />
      <path d="M15 3c.5 2.5 2.2 4.2 4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-deep text-cloud">
      <RingMotif
        variant="corner"
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-xl font-semibold">
              Serene <span className="text-coral-soft">hands</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cloud/70">
              {business.tagline} Compassionate, professional home care for
              children with special needs.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cloud/50">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-cloud/80 hover:text-coral-soft">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/resources" className="text-sm text-cloud/80 hover:text-coral-soft">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cloud/50">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-cloud/80">
              <li className="flex items-center gap-2">
                <Phone size={15} />
                <a href={business.phoneHref} className="hover:text-coral-soft">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} />
                <a href={`mailto:${business.email}`} className="hover:text-coral-soft break-all">
                  {business.email}
                </a>
              </li>
              <li className="pt-1 text-cloud/50">{business.serviceAreaLabel}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cloud/50">
              Follow Along
            </h3>
            <div className="flex gap-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-cloud/20 p-2.5 hover:border-coral-soft hover:text-coral-soft"
              >
                <InstagramIcon />
              </a>
              <a
                href={business.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-cloud/20 p-2.5 hover:border-coral-soft hover:text-coral-soft"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cloud/10 pt-6 text-xs text-cloud/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-cloud/80">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cloud/80">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
