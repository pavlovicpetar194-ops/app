import React from "react";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../../lib/site-data";

// Bento layout: 6 images with mixed aspect ratios
const LAYOUT = [
  "col-span-2 row-span-2 aspect-square", // 0 large
  "col-span-1 row-span-1 aspect-square", // 1
  "col-span-1 row-span-1 aspect-square", // 2
  "col-span-2 row-span-1 aspect-[2/1]",  // 3 wide
  "col-span-1 row-span-1 aspect-square", // 4
  "col-span-1 row-span-1 aspect-square", // 5
];

export default function Gallery() {
  return (
    <section
      id="galerija"
      data-testid="gallery-section"
      className="relative py-24 sm:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs tracking-[0.28em] uppercase text-[#D48B1B] font-semibold">
              Galerija
            </span>
            <h2
              data-testid="gallery-title"
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C1E16] leading-[1.05] mt-4"
            >
              Trenuci iz <span className="italic text-[#5A4232]">košnice.</span>
            </h2>
          </div>
          <p className="text-[#5A4232] max-w-sm">
            Pogled u svakodnevicu naših pčela, košnica i porodičnog pčelinjaka.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={src + i}
              data-testid={`gallery-item-${i}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl border border-[#E5DCC5] group ${LAYOUT[i] || ""}`}
            >
              <img
                src={src}
                alt={`Pčelarstvo galerija ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
