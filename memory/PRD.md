# Pčelarstvo — PRD

## Original Problem Statement
Create a modern, premium Serbian honey business website in Serbian language only.
Brand: Local beekeeping business producing natural homemade honey & bee products.
Style: warm, premium, natural, elegant; soft beige / honey gold / dark brown / white; cinematic visuals; smooth animations; high-end typography; mobile-first responsive.
Sections: Hero, About, Products (5 items), Benefits, Gallery, Testimonials, Contact, Footer. Subtle honey gradients + glassmorphism.

## User Choices (gathered)
- Order flow: "Poruči" button → opens contact form (no Stripe).
- Imagery: stock photos for now; user will replace later.
- Contact form: store in MongoDB now; add Resend email integration later.
- No admin panel (static products served from API).

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Endpoints under `/api`:
  - `GET /api/` health
  - `GET /api/products` static product list (5)
  - `POST /api/contact` validates with Pydantic (EmailStr) + persists to `contact_messages`
  - `GET /api/contact` list (no `_id`)
- **Frontend**: React (CRA + craco) + Tailwind + framer-motion + lucide-react + sonner.
  - Single page composition in `App.js`
  - Components in `/app/frontend/src/components/site/`: Navbar, Hero, About, Products, Benefits, Gallery, Testimonials, Contact, Footer
  - Static content in `/app/frontend/src/lib/site-data.js`
  - Design tokens via CSS variables in `index.css` (Cormorant Garamond + Manrope)

## Personas
- **Visitor / kupac** — browses, learns story, orders honey via contact form.
- **Beekeeper / vlasnik** — receives orders by reading `contact_messages` (admin panel to be added later).

## Implemented (Dec 2025)
- All 8 sections built per spec, fully in Serbian.
- Premium UI: cinematic hero, asymmetric About bento, 5 product cards with prefill-to-contact flow, icon benefits, bento gallery, dark testimonials section, two-column contact, elegant footer.
- Smooth scroll navigation, glass navbar, scroll-triggered framer-motion animations.
- Mobile-first responsive with hamburger menu.
- Backend tested 100%; Playwright smoke tested 100%.

## Prioritized Backlog
- **P1** Resend email integration so contact form notifies beekeeper.
- **P1** Replace stock images with user-supplied photography.
- **P1** Real contact details (phone, email, Instagram, address).
- **P2** Lightweight admin route to view/manage contact messages.
- **P2** Lightbox/zoom on gallery images.
- **P2** SEO meta + OpenGraph + Serbian locale; structured data for LocalBusiness.
- **P3** Stripe / online ordering with cart (deferred per user choice).
- **P3** Blog / "Saveti" content section about honey benefits.

## Next Tasks
1. Collect Resend API key and recipient email → wire `/api/contact` to send notification.
2. Upload real photography to replace stock URLs in `site-data.js` and `server.py` products.
3. Add SEO/meta tags + favicon refresh.
