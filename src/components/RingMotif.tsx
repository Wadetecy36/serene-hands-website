type RingMotifProps = {
  className?: string;
  variant?: "hero" | "corner" | "divider";
};

/**
 * The site's signature element: a cluster of soft, uneven concentric rings
 * of varying size and weight — each ring a different child's path, held
 * together in one loose orbit. Echoes the logo's circular hands-and-heart
 * mark and the flyer's "Every Child. Every Ability." line without being
 * literal about it.
 */
export default function RingMotif({ className = "", variant = "hero" }: RingMotifProps) {
  if (variant === "divider") {
    return (
      <svg
        viewBox="0 0 240 24"
        className={className}
        aria-hidden="true"
        fill="none"
      >
        <circle cx="12" cy="12" r="5" stroke="var(--color-coral)" strokeWidth="1.5" />
        <circle cx="30" cy="12" r="8" stroke="var(--color-teal)" strokeWidth="1.5" />
        <circle cx="54" cy="12" r="3" stroke="var(--color-gold)" strokeWidth="1.5" />
        <line x1="72" y1="12" x2="240" y2="12" stroke="var(--color-mist-deep)" strokeWidth="1.5" />
      </svg>
    );
  }

  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        aria-hidden="true"
        fill="none"
      >
        <circle cx="150" cy="50" r="46" stroke="var(--color-teal-soft)" strokeWidth="1.5" opacity="0.6" />
        <circle cx="130" cy="80" r="70" stroke="var(--color-coral-soft)" strokeWidth="1.5" opacity="0.55" />
        <circle cx="160" cy="30" r="16" stroke="var(--color-gold)" strokeWidth="2" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="300" cy="230" r="190" stroke="var(--color-plum)" strokeOpacity="0.12" strokeWidth="1.5" />
      <circle cx="230" cy="290" r="150" stroke="var(--color-teal)" strokeOpacity="0.28" strokeWidth="1.5" />
      <circle cx="340" cy="180" r="95" stroke="var(--color-coral)" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="270" cy="220" r="46" stroke="var(--color-gold)" strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="270" cy="220" r="6" fill="var(--color-coral)" />
    </svg>
  );
}
