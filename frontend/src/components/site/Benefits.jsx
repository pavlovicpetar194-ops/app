import React from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Home, Sparkles, Handshake } from "lucide-react";
import { BENEFITS } from "../../lib/site-data";

const ICONS = { Leaf, ShieldCheck, Home, Sparkles, Handshake };

export default function Benefits() {
  return (
    <section
      id="benefiti"
      data-testid="benefits-section"
      className="relative py-24 sm:py-32 bg-[#F2EAE0]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.28em] uppercase text-[#D48B1B] font-semibold">
            Zašto baš mi
          </span>
          <h2
            data-testid="benefits-title"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C1E16] leading-[1.05] mt-4"
          >
            Zašto naš med?
          </h2>
          <p className="text-[#5A4232] text-base sm:text-lg leading-relaxed mt-5">
            Pet jednostavnih razloga zbog kojih su naše tegle godinama omiljene
            na trpezama širom Srbije.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon] || Leaf;
            return (
              <motion.div
                key={b.title}
                data-testid={`benefit-card-${i}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="card-hover bg-white border border-[#E5DCC5] rounded-2xl p-7 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF5E0] grid place-items-center text-[#D48B1B] border border-[#E5DCC5]">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-serif-display text-xl text-[#2C1E16] mt-5 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-[#5A4232] text-sm leading-relaxed mt-2">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
