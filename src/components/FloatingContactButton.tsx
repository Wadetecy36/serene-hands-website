import { MessageCircle } from "lucide-react";
import { business } from "../data/siteConfig";

export default function FloatingContactButton() {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Serene Hands on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-teal px-5 py-3.5 text-cloud shadow-soft transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <MessageCircle size={20} />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp Us</span>
    </a>
  );
}
