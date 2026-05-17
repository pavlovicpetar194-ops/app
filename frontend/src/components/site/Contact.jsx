import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Phone, Mail, Instagram, MapPin, Loader2, Send } from "lucide-react";
import { CONTACT_INFO } from "../../lib/site-data";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact({ prefillProduct, onClearPrefill }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    product: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillProduct) {
      setForm((f) => ({
        ...f,
        subject: `Porudžbina: ${prefillProduct.name}`,
        product: prefillProduct.name,
        message: `Poštovani, želeo/la bih da poručim ${prefillProduct.name} (${prefillProduct.weight}). Molim Vas kontaktirajte me radi dogovora.`,
      }));
      // smooth scroll handled by parent
    }
  }, [prefillProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Molimo popunite obavezna polja.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Hvala! Vaša poruka je poslata. Javljamo se uskoro.");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        product: "",
      });
      onClearPrefill && onClearPrefill();
    } catch (err) {
      console.error(err);
      toast.error("Greška prilikom slanja. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { icon: Phone, label: "Telefon", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
    { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: Instagram, label: "Instagram", value: CONTACT_INFO.instagram, href: "#" },
    { icon: MapPin, label: "Lokacija", value: CONTACT_INFO.location, href: "#" },
  ];

  return (
    <section
      id="kontakt"
      data-testid="contact-section"
      className="relative py-24 sm:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.28em] uppercase text-[#D48B1B] font-semibold">
            Kontakt
          </span>
          <h2
            data-testid="contact-title"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C1E16] leading-[1.05] mt-4"
          >
            Recite nam <span className="italic text-[#5A4232]">zdravo.</span>
          </h2>
          <p className="text-[#5A4232] text-base sm:text-lg leading-relaxed mt-5">
            Za porudžbine, pitanja ili saradnju — slobodno nas kontaktirajte.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-5"
          >
            {infoItems.map((it, i) => {
              const Icon = it.icon;
              return (
                <a
                  key={it.label}
                  href={it.href}
                  data-testid={`contact-info-${it.label.toLowerCase()}`}
                  className="card-hover flex items-center gap-5 p-6 bg-white border border-[#E5DCC5] rounded-2xl group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF5E0] grid place-items-center text-[#D48B1B] border border-[#E5DCC5] shrink-0">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#5A4232]">
                      {it.label}
                    </div>
                    <div className="font-serif-display text-lg text-[#2C1E16] mt-0.5">
                      {it.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </motion.aside>

          <motion.form
            data-testid="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 bg-white border border-[#E5DCC5] rounded-2xl p-7 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#5A4232] mb-2">
                  Ime i prezime *
                </label>
                <input
                  data-testid="contact-input-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#FDFBF7] border border-[#E5DCC5] focus:outline-none focus:ring-2 focus:ring-[#E5A93D] focus:border-[#E5A93D] text-[#2C1E16] placeholder-[#5A4232]/50 transition"
                  placeholder="Vaše ime"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#5A4232] mb-2">
                  Email *
                </label>
                <input
                  data-testid="contact-input-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#FDFBF7] border border-[#E5DCC5] focus:outline-none focus:ring-2 focus:ring-[#E5A93D] focus:border-[#E5A93D] text-[#2C1E16] placeholder-[#5A4232]/50 transition"
                  placeholder="vasa@adresa.rs"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#5A4232] mb-2">
                  Telefon
                </label>
                <input
                  data-testid="contact-input-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#FDFBF7] border border-[#E5DCC5] focus:outline-none focus:ring-2 focus:ring-[#E5A93D] focus:border-[#E5A93D] text-[#2C1E16] placeholder-[#5A4232]/50 transition"
                  placeholder="+381 6X XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#5A4232] mb-2">
                  Naslov
                </label>
                <input
                  data-testid="contact-input-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#FDFBF7] border border-[#E5DCC5] focus:outline-none focus:ring-2 focus:ring-[#E5A93D] focus:border-[#E5A93D] text-[#2C1E16] placeholder-[#5A4232]/50 transition"
                  placeholder="Tema poruke"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-xs tracking-[0.2em] uppercase text-[#5A4232] mb-2">
                Poruka *
              </label>
              <textarea
                data-testid="contact-input-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-[#FDFBF7] border border-[#E5DCC5] focus:outline-none focus:ring-2 focus:ring-[#E5A93D] focus:border-[#E5A93D] text-[#2C1E16] placeholder-[#5A4232]/50 transition resize-none"
                placeholder="Vaša poruka..."
              />
            </div>
            <button
              type="submit"
              data-testid="contact-submit"
              disabled={loading}
              className="mt-7 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E5A93D] text-[#2C1E16] font-semibold tracking-wide hover:bg-[#D48B1B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Slanje...
                </>
              ) : (
                <>
                  Pošalji poruku
                  <Send size={16} />
                </>
              )}
            </button>
            <p className="text-xs text-[#5A4232]/70 mt-4">
              * Polja označena zvezdicom su obavezna.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
