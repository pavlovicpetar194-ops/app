import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "pocetna", label: "Početna" },
  { id: "o-nama", label: "O nama" },
  { id: "proizvodi", label: "Proizvodi" },
  { id: "benefiti", label: "Zašto naš med" },
  { id: "galerija", label: "Galerija" },
  { id: "utisci", label: "Utisci" },
  { id: "kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => handleNav("pocetna")}
          className="flex items-center gap-2 group"
          aria-label="Pčelarstvo - Početna"
        >
          <span className="w-9 h-9 rounded-full grid place-items-center bg-[#E5A93D] text-[#2C1E16] font-serif-display text-xl font-semibold shadow-sm">
            P
          </span>
          <span
            className={`font-serif-display text-xl tracking-tight ${
              scrolled ? "text-[#2C1E16]" : "text-white"
            }`}
          >
            Pčelarstvo
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => handleNav(l.id)}
              className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                scrolled
                  ? "text-[#2C1E16] hover:text-[#D48B1B]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            data-testid="nav-cta-order"
            onClick={() => handleNav("proizvodi")}
            className="px-5 py-2.5 rounded-full bg-[#E5A93D] text-[#2C1E16] text-sm font-semibold tracking-wide hover:bg-[#D48B1B] transition-colors"
          >
            Poruči med
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          aria-label="Meni"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-md ${
            scrolled ? "text-[#2C1E16]" : "text-white"
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass border-t border-[#E5DCC5]/60 mt-3"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.id}
                  data-testid={`mobile-nav-${l.id}`}
                  onClick={() => handleNav(l.id)}
                  className="text-left text-[#2C1E16] font-medium tracking-wide py-1"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="mobile-cta-order"
                onClick={() => handleNav("proizvodi")}
                className="mt-2 px-5 py-3 rounded-full bg-[#E5A93D] text-[#2C1E16] text-sm font-semibold tracking-wide"
              >
                Poruči med
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
