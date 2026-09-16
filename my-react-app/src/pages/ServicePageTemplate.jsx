import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "../components/servicesData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsSection from "../components/Products";

export default function ServicePageTemplate() {
  const { type } = useParams();
  const currentServiceData = servicesData[type] || servicesData.washing;

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (type === "wrapping") {
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
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-gray-400 mb-2"
            >
              Home / Speed Car Wash Wrapping
            </motion.div>

            <motion.h1
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl font-bold mb-8 text-gray-900"
            >
              {currentServiceData.title}
            </motion.h1>

            <div className="flex flex-col lg:flex-row gap-10">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-3/4"
              >
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-8">
                  {currentServiceData.description}
                </p>

                <div className="space-y-4">
                  {currentServiceData.servicesList.map((item, index) => {
                    const isOpen = openAccordion === index;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                          isOpen
                            ? "shadow-md bg-white ring-1 ring-blue-100"
                            : "shadow-sm hover:shadow-md bg-white"
                        }`}
                      >
                        <button
                          onClick={() => toggleAccordion(index)}
                          className="w-full flex justify-between items-center px-6 py-5 text-left group cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${isOpen ? "bg-blue-600" : "bg-gray-300 group-hover:bg-blue-400"}`}
                            />
                            <span
                              className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-blue-900" : "text-gray-800 group-hover:text-blue-700"}`}
                            >
                              {item.title}
                            </span>
                          </div>

                          <motion.div
                            animate={{
                              rotate: isOpen ? 180 : 0,
                              backgroundColor: isOpen
                                ? "rgba(239, 246, 255, 1)"
                                : "rgba(243, 244, 246, 1)",
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-blue-600 shrink-0"
                          >
                            ▼
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden bg-white"
                            >
                              <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-loose">
                                {item.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full lg:w-1/4 space-y-6"
              >
                <div className="rounded-2xl p-5 bg-gray-50 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-800 pb-3 mb-3 border-b border-gray-200">
                    Categories
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Paint Protection Film
                    </li>
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Ceramic Coating
                    </li>
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Latest News
                    </li>
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Blogs
                    </li>
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Membership (Join Our Club)
                    </li>
                    <li className="hover:text-blue-600 transition cursor-pointer">
                      › Car Care Tips
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative cursor-pointer group">
                  <img
                    src="https://www.speedcarwash.com/images/book-wash-banner.jpg"
                    alt="Book a Wash"
                    className="w-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400";
                    }}
                  />
                </div>

                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <img
                    src="https://www.speedcarwash.com/images/franchise-banner.jpg"
                    alt="Franchise with Us"
                    className="w-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400";
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <ProductsSection />
          </div>
        </motion.div>
        <Footer />
      </>
    );
  }

  // Default Layout (Washing & Detailing)
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white text-gray-800 font-sans min-h-screen"
      >
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header Title & Quick Booking Banner */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 mb-10 gap-6 border-b border-gray-100"
          >
            <div>
              <h1 className="text-2xl font-bold mb-3">
                {currentServiceData.title}
              </h1>
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

          {/* Dynamic Services List with Scroll Animation */}
          <div className="space-y-6">
            {currentServiceData.servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col md:flex-row gap-6 items-start p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
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
                    <h3 className="text-lg font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-xs text-red-500 font-semibold mt-1.5">
                      {service.time}
                    </p>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex space-x-2 text-xs">
                      <span className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(59,70,227,1)"><path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path></svg>
                      </span>
                      <span className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(73,167,176,1)"><path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path></svg>
                      </span>
                      <span className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(167,21,21,1)"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg>
                      </span>
                      <span className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(14,153,21,1)"><path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z"></path></svg>
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition"
                    >
                      BOOK THAT SERVICE
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <ProductsSection />
        </div>
      </motion.div>
      <Footer />
    </>
  );
}