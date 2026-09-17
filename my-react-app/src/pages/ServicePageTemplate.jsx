import { useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, } from "../redux/cartSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsSection from "../components/Products";
import { servicesData } from "../components/servicesData"; 
import { getPriceBreakdown } from "../assets/pricing";

export default function ServicePageTemplate() {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state se cart items aur popup message nikalna
  const cartItems = useSelector((state) => state.cart.items);
  const popupMessage = useSelector((state) => state.cart.popupMessage);

  const currentServiceData = servicesData[type] || servicesData.washing;

  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Sedan");

  const categories = ["Hatchback", "Sedan", "Compact SUV", "Full SUV", "Luxury"];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Popup ko automatic hide karne wala useEffect hata diya gaya hai taaki cart hamesha rahe jab items ho

  const handleAddToCart = (service, pricing) => {
    const cartItem = {
      title: service.title,
      category: selectedCategory,
      price: pricing ? pricing.categoryPrice : 0,
      time: service.time,
      image: service.image,
    };
    dispatch(addToCart(cartItem));
  };

  if (type === "wrapping") {
    // Wrapping ke liye pricing ki zaroorat nahi hai (yeh as it is rahega)
    return (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white text-gray-800 font-sans min-h-screen py-8"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-xs text-gray-400 mb-2">
              Home / Speed Car Wash Wrapping
            </motion.div>
            <motion.h1 className="text-2xl font-bold mb-8 text-gray-900">
              {currentServiceData.title}
            </motion.h1>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-3/4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-8">
                  {currentServiceData.description}
                </p>

                <div className="space-y-4">
                  {currentServiceData.servicesList.map((item, index) => {
                    const isOpen = openAccordion === index;
                    return (
                      <div
                        key={index}
                        className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                          isOpen ? "shadow-md bg-white ring-1 ring-blue-100" : "shadow-sm hover:shadow-md bg-white"
                        }`}
                      >
                        <button
                          onClick={() => toggleAccordion(index)}
                          className="w-full flex justify-between items-center px-6 py-5 text-left group cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isOpen ? "bg-blue-600" : "bg-gray-300 group-hover:bg-blue-400"}`} />
                            <span className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-blue-900" : "text-gray-800 group-hover:text-blue-700"}`}>
                              {item.title}
                            </span>
                          </div>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-blue-600 shrink-0">
                            ▼
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white"
                            >
                              <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-loose">
                                {item.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="rounded-2xl p-5 bg-gray-50 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-800 pb-3 mb-3 border-b border-gray-200">
                    Categories
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="hover:text-blue-600 transition cursor-pointer">› Paint Protection Film</li>
                    <li className="hover:text-blue-600 transition cursor-pointer">› Ceramic Coating</li>
                  </ul>
                </div>
              </div>
            </div>

            <ProductsSection />
          </div>
        </motion.div>
        
        {/* Permanent Bottom Cart Bar for Wrapping if cart has items */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-6 border border-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <p className="text-xs sm:text-sm font-medium">
                {popupMessage || `${cartItems[cartItems.length - 1]?.title} added to cart!`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Cart ({cartItems.length})</span>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Checkout Cart
              </button>
            </div>
          </div>
        )}

        <Footer />
      </>
    );
  }

  // Default Layout (Washing & Detailing) with Dynamic Pricing Integration
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white text-gray-800 font-sans min-h-screen relative pb-24"
      >
        <div className="max-w-6xl mx-auto px-4 py-10">
          
          {/* Header Title & Quick Booking Banner */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 mb-6 gap-6 border-b border-gray-100"
          >
            <div>
              <h1 className="text-2xl font-bold mb-3">{currentServiceData.title}</h1>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                {currentServiceData.description}
              </p>
            </div>
            <div className="rounded-2xl p-4 text-center bg-red-50 shadow-sm shrink-0">
              <span className="text-xs font-bold text-red-600 block uppercase tracking-wide mb-1">
                For Quick Booking
              </span>
              <span className="text-lg font-extrabold text-red-600">
                +91 97164 12345
              </span>
            </div>
          </motion.div>

          {/* Car Category Selector Bar */}
          <div className="mb-8 bg-gray-50 p-4 rounded-xl flex flex-wrap items-center gap-3 border border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              Select Your Car Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Services List with Prices */}
          <div className="space-y-6">
            {currentServiceData.servicesList.map((service, index) => {
              const pricing = getPriceBreakdown(service.title, selectedCategory);
              const shareUrl = window.location.href;
              const shareText = `Check out ${service.title} at Speed Car Wash!`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border border-gray-100"
                >
                  <div className="w-full md:w-1/3 bg-gray-100 rounded-xl overflow-hidden shrink-0 group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                        
                        {/* Dynamic Price Tag Display */}
                        {pricing ? (
                          <div className="text-right">
                            <span className="text-xl font-extrabold text-green-600">
                              ₹{pricing.categoryPrice}
                            </span>
                            <span className="block text-[10px] text-gray-400">
                              {pricing.surchargeLabel}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Price on request</span>
                        )}
                      </div>

                      <p className="text-xs text-red-500 font-semibold mt-1.5">{service.time}</p>
                      <p className="text-sm text-gray-500 mt-3 leading-relaxed">{service.description}</p>
                    </div>

                    <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-50 gap-4">
                      {/* Social Share Icons */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 font-medium mr-1">Share:</span>
                        
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-blue-50 text-blue-600 transition"
                          title="Share on Facebook"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>

                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-sky-50 text-sky-500 transition"
                          title="Share on Twitter"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>

                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-green-50 text-green-600 transition"
                          title="Share on WhatsApp"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.198-.198.347-.764.966-.937 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        </a>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(service, pricing)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
                      >
                        BOOK THAT SERVICE
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <ProductsSection />
        </div>

        {/* Permanent Bottom Cart Bar - Jab tak cart me items hain tab tak ye hamesha dikhega */}
        <AnimatePresence>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-6 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <p className="text-xs sm:text-sm font-medium">
                  {popupMessage || `${cartItems[cartItems.length - 1]?.title} added to cart!`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Cart ({cartItems.length})</span>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-blue-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Checkout Cart
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Footer />
    </>
  );
}