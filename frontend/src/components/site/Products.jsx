import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const resolveImage = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${BACKEND_URL}${src}`;
};

const positionClass = (pos) => {
  switch (pos) {
    case "left":
      return "object-left";
    case "right":
      return "object-right";
    default:
      return "object-center";
  }
};

export default function Products({ products, onOrder }) {
  return (
    <section
      id="proizvodi"
      data-testid="products-section"
      className="relative py-24 sm:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs tracking-[0.28em] uppercase text-[#D48B1B] font-semibold">
              Naši proizvodi
            </span>
            <h2
              data-testid="products-title"
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C1E16] leading-[1.05] mt-4 max-w-2xl"
            >
              Med i pčelinji proizvodi <br />
              <span className="italic text-[#5A4232]">iz srca prirode.</span>
            </h2>
          </div>
          <p className="text-[#5A4232] text-base max-w-sm">
            Svaki proizvod je ručno punjen i pažljivo pakovan. Bez veštačkih
            dodataka, bez industrijske obrade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              data-testid={`product-card-${p.id}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="card-hover group bg-white border border-[#E5DCC5] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EAE0]">
                <img
                  src={resolveImage(p.image)}
                  alt={p.name}
                  className={`absolute inset-0 w-full h-full object-cover ${positionClass(p.imagePosition)} group-hover:scale-105 transition-transform duration-[1200ms]`}
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase bg-white/90 text-[#2C1E16] font-semibold backdrop-blur">
                  {p.weight}
                </span>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-serif-display text-2xl text-[#2C1E16] tracking-tight">
                  {p.name}
                </h3>
                <p className="text-[#5A4232] text-sm leading-relaxed mt-3 flex-1">
                  {p.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#5A4232]">
                      Cena
                    </div>
                    <div className="font-serif-display text-2xl text-[#2C1E16] mt-0.5">
                      {p.price}
                    </div>
                  </div>
                  <button
                    data-testid={`product-order-${p.id}`}
                    onClick={() => onOrder(p)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2C1E16] text-[#FDFBF7] text-sm font-semibold hover:bg-[#3a2820] transition-colors"
                  >
                    Poruči
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
