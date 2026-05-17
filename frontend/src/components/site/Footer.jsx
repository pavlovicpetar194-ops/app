import React from "react";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { CONTACT_INFO } from "../../lib/site-data";

const links = [
  { id: "pocetna", label: "Početna" },
  { id: "o-nama", label: "O nama" },
  { id: "proizvodi", label: "Proizvodi" },
  { id: "galerija", label: "Galerija" },
  { id: "kontakt", label: "Kontakt" },
];

export default function Footer({ onNav }) {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1d1410] text-[#FDFBF7]/80 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-[#FDFBF7]/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full grid place-items-center bg-[#E5A93D] text-[#2C1E16] font-serif-display text-xl font-semibold">
                P
              </span>
              <span className="font-serif-display text-2xl text-[#FDFBF7] tracking-tight">
                Pčelarstvo
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-md text-[#FDFBF7]/65">
              Porodično pčelarstvo iz Srbije. Prirodan med i pčelinji proizvodi
              brani sa pažnjom i ljubavlju, direktno iz naših košnica.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                data-testid="footer-social-instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full grid place-items-center border border-[#FDFBF7]/15 hover:bg-[#E5A93D] hover:text-[#2C1E16] hover:border-[#E5A93D] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                data-testid="footer-social-facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full grid place-items-center border border-[#FDFBF7]/15 hover:bg-[#E5A93D] hover:text-[#2C1E16] hover:border-[#E5A93D] transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                data-testid="footer-social-email"
                aria-label="Email"
                className="w-10 h-10 rounded-full grid place-items-center border border-[#FDFBF7]/15 hover:bg-[#E5A93D] hover:text-[#2C1E16] hover:border-[#E5A93D] transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#E5A93D] font-semibold mb-5">
              Navigacija
            </div>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    data-testid={`footer-nav-${l.id}`}
                    onClick={() => onNav(l.id)}
                    className="text-sm text-[#FDFBF7]/75 hover:text-[#E5A93D] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#E5A93D] font-semibold mb-5">
              Kontakt
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#E5A93D]" />
                <span className="text-[#FDFBF7]/80">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#E5A93D]" />
                <span className="text-[#FDFBF7]/80">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={14} className="text-[#E5A93D]" />
                <span className="text-[#FDFBF7]/80">
                  {CONTACT_INFO.instagram}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-[#FDFBF7]/50 tracking-wide">
            © {new Date().getFullYear()} Pčelarstvo. Sva prava zadržana.
          </p>
          <p className="text-xs text-[#FDFBF7]/40 tracking-wide italic font-serif-display">
            Med iz srca prirode.
          </p>
        </div>
      </div>
    </footer>
  );
}
