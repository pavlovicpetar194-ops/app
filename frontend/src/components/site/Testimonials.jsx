import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/site-data";

export default function Testimonials() {
  return (
    <section
      id="utisci"
      data-testid="testimonials-section"
      className="relative py-24 sm:py-32 bg-[#2C1E16] text-[#FDFBF7] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none honey-radial" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.28em] uppercase text-[#E5A93D] font-semibold">
            Utisci kupaca
          </span>
          <h2
            data-testid="testimonials-title"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] leading-[1.05] mt-4"
          >
            Reči onih koji su <br />
            <span className="italic text-[#E5A93D]">probali naš med.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="relative bg-[#3a2820]/60 border border-[#FDFBF7]/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <Quote
                size={32}
                className="text-[#E5A93D]/60 absolute top-6 right-6"
                strokeWidth={1.5}
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} className="text-[#E5A93D] fill-[#E5A93D]" />
                ))}
              </div>
              <blockquote className="font-serif-display italic text-lg sm:text-xl text-[#FDFBF7]/90 leading-relaxed">
                „{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5A93D] text-[#2C1E16] grid place-items-center font-serif-display text-lg font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#FDFBF7]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#FDFBF7]/60 tracking-wide">
                    {t.location}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
