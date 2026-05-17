import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Products from "@/components/site/Products";
import Benefits from "@/components/site/Benefits";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function HomePage() {
  const [products, setProducts] = useState([]);
  const [prefillProduct, setPrefillProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API}/products`);
        if (!cancelled) setProducts(res.data || []);
      } catch (e) {
        console.error("Failed to load products", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
        <Products products={products} onOrder={handleOrder} />
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
