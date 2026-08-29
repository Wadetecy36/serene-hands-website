const items = [
  "Pediatric-Focused Care",
  "Compassionate Support",
  "Reliable Communication",
  "Child-Centered Approach",
];

export default function TrustStrip() {
  return (
    <div className="border-y border-mist-deep bg-mist/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-6 text-center sm:grid-cols-4 sm:px-8">
        {items.map((item) => (
          <p key={item} className="text-xs font-semibold uppercase tracking-wide text-ink-soft sm:text-sm">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
