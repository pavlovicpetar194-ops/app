import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Products from "@/components/site/Products";
import Benefits from "@/components/site/Benefits";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

const PRODUCTS = [
  {
    id: "bagremov-med",
    name: "Bagremov med",
    description: "Svetli, bistro zlatni med sa cvetova bagrema. Nežnog ukusa i dugotrajne tečnosti — savršen za čaj, doručak i svakodnevnu upotrebu.",
    price: "1.200 RSD",
    weight: "1kg",
    image: "/bagremov.png",
    imagePosition: "center",
  },
  {
    id: "suncokretov-med",
    name: "Suncokretov med",
    description: "Bogat, žarko žuti med sa polja suncokreta. Karakterističnog, punog ukusa — brzo kristališe, što je znak prirodnosti.",
    price: "1.000 RSD",
    weight: "1kg",
    image: "/suncokretov.png",
    imagePosition: "center",
  },
  {
    id: "cvetni-med",
    name: "Cvetni med",
    description: "Cvetni (vrcani) med sa raznovrsnih livadskih cvetova okoline Lazarevca. Topla zlatna boja, balansiran i mirisan ukus.",
    price: "1.000 RSD",
    weight: "1kg",
    image: "https://customer-assets.emergentagent.com/job_pcelji-zaklon/artifacts/9stvciqb_df09757a-d054-49be-9e57-96123b165df2.png",
    imagePosition: "center",
  },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function HomePage() {
  const [prefillProduct, setPrefillProduct] = useState(null);

  const handleOrder = (product) => {
    setPrefillProduct({ ...product, _ts: Date.now() });
    setTimeout(() => scrollTo("kontakt"), 50);
  };

  return (
    <div data-testid="home-page" className="App">
      <Navbar />
      <main>
        <Hero onScrollTo={scrollTo} />
        <About />
        <Products products={PRODUCTS} onOrder={handleOrder} />
        <Benefits />
        <Testimonials />
        <Contact
          prefillProduct={prefillProduct}
          onClearPrefill={() => setPrefillProduct(null)}
        />
      </main>
      <Footer onNav={scrollTo} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FDFBF7",
            color: "#2C1E16",
            border: "1px solid #E5DCC5",
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
