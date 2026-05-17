import React from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGES } from "../../lib/site-data";

export default function About() {
  return (
    <section
      id="o-nama"
      data-testid="about-section"
      className="relative py-24 sm:py-32 honey-radial"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left: images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(44,30,22,0.35)]">
              <img
                src={ABOUT_IMAGES[0]}
                alt="Pčelar u prirodi"
                className="w-full h-[440px] sm:h-[560px] object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute -bottom-10 -right-4 sm:right-[-40px] w-44 sm:w-64 rounded-2xl overflow-hidden border-8 border-[#FDFBF7] shadow-xl hidden md:block"
            >
              <img
                src={ABOUT_IMAGES[1]}
                alt="Saće sa medom"
                className="w-full h-44 sm:h-60 object-cover"
              />
            </motion.div>

            <div className="absolute -top-6 -left-4 sm:-left-8 hidden sm:flex flex-col items-center bg-[#FDFBF7] border border-[#E5DCC5] rounded-full px-6 py-5 shadow-md">
              <span className="font-serif-display text-3xl text-[#2C1E16] leading-none">
                20+
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#5A4232] mt-1">
                godina iskustva
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-6"
        >
          <span className="text-xs tracking-[0.28em] uppercase text-[#D48B1B] font-semibold">
            O nama
          </span>
          <h2
            data-testid="about-title"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C1E16] leading-[1.05] mt-4"
          >
            Tradicija, kvalitet i <br />
            <span className="italic text-[#5A4232]">ljubav prema prirodi.</span>
          </h2>

          <p
            data-testid="about-text"
            className="text-[#5A4232] text-base sm:text-lg leading-relaxed mt-6 max-w-xl"
          >
            Naše pčelarstvo se zasniva na tradiciji, kvalitetu i ljubavi prema
            prirodi. Svaka tegla meda dolazi direktno iz naših košnica i
            proizvodi se bez dodataka i industrijske obrade.
          </p>
          <p className="text-[#5A4232] text-base sm:text-lg leading-relaxed mt-4 max-w-xl">
            Pratimo svaku pčelu, svaki cvet i svaki ram saća — jer verujemo da
            se pravi ukus prirode oseti samo kada se proizvodnja vodi pažljivo i
            iskreno.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div data-testid="stat-1">
              <div className="font-serif-display text-3xl text-[#2C1E16]">
                40+
              </div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#5A4232] mt-1">
                košnica
              </div>
            </div>
            <div data-testid="stat-2">
              <div className="font-serif-display text-3xl text-[#2C1E16]">
                100%
              </div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#5A4232] mt-1">
                prirodno
              </div>
            </div>
            <div data-testid="stat-3">
              <div className="font-serif-display text-3xl text-[#2C1E16]">
                1.000+
              </div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#5A4232] mt-1">
                porodica
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
