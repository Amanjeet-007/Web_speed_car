import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/Contact.jsx";
import ServicePageTemplate from "./pages/ServicePageTemplate.jsx";
import MediaPage from "./pages/MediaPage.jsx";
import BlogPage from "./pages/Blog.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
         <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:type" element={<ServicePageTemplate />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/page/:pageNumber" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
