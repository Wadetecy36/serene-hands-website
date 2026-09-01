import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { business, navLinks } from "../data/siteConfig";
import Button from "./Button";
import logo from "../assets/logo-lockup.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 shadow-[0_1px_0_0_rgba(34,31,55,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Serene Hands Home Care Services"
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-blossom ${
                  isActive ? "text-blossom" : "text-ink-soft"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-rose"
          >
            <Phone size={16} /> {business.phone}
          </a>
          <Button to="/book" size="md">
            Request Care
          </Button>
        </div>

        <button
          className="rounded-full p-2 text-rose lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-blush-deep bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base font-medium ${
                      isActive ? "bg-blush text-blossom" : "text-ink-soft"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button to="/book" size="md" className="mt-3 w-full">
                Request Care
              </Button>
              <a
                href={business.phoneHref}
                className="mt-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-ink-soft"
              >
                <Phone size={16} /> Call {business.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
