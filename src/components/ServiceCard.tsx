import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Service } from "../data/siteConfig";

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <Link
        to={`/services/${service.id}`}
        className="group flex h-full flex-col justify-between rounded-2xl border border-mist-deep bg-cloud p-6 shadow-card transition-all hover:-translate-y-1 hover:border-coral/30"
      >
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.shortDescription}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-coral">
          Learn more
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
