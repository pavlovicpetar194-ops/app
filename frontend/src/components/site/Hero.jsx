import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HERO_IMAGE } from "../../lib/site-data";

export default function Hero({ onScrollTo }) {
  return (
    <section
      id="pocetna"
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full flex items-end overflow-hidden grain"
    >
      <img
        src={HERO_IMAGE}
        alt="Med koji se sliva sa saća"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-24 sm:pb-32 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm tracking-[0.18em] uppercase font-medium"
          data-testid="hero-tagline"
        >
          Porodično pčelarstvo · Srbija
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-serif-display text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight mt-6 max-w-4xl"
          data-testid="hero-title"
        >
          Prirodni med <br />
          <span className="italic text-[#F5C97A]">direktno iz košnice</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/85 text-base sm:text-lg max-w-xl mt-6 leading-relaxed"
          data-testid="hero-subtitle"
        >
          Kvalitetan domaći med i pčelinji proizvodi iz porodičnog pčelarstva.
          Brano sa ljubavlju, čuvano sa pažnjom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-cta-buy"
            onClick={() => onScrollTo("proizvodi")}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#E5A93D] text-[#2C1E16] font-semibold tracking-wide hover:bg-[#D48B1B] transition-all duration-300 shadow-[0_12px_40px_-12px_rgba(229,169,61,0.7)]"
          >
            Kupi med
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button
            data-testid="hero-cta-learn"
            onClick={() => onScrollTo("o-nama")}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/40 text-white font-medium tracking-wide hover:bg-white/10 transition-all duration-300"
          >
            Saznaj više
          </button>
        </motion.div>
      </div>

      <motion.button
        aria-label="Skroluj dole"
        data-testid="hero-scroll-indicator"
        onClick={() => onScrollTo("o-nama")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 1.8, repeat: Infinity }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Otkrij</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
