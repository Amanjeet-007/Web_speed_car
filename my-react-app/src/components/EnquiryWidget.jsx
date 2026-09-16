import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnquiryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Enquiry Sent Successfully!");
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. Fixed Right Side Enquire Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-2 rounded-l-md shadow-lg flex flex-col items-center tracking-wider text-xs transition cursor-pointer"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="mb-1">CLICK TO</span>
          <span className="text-sm">ENQUIRE</span>
        </button>
      </div>

      {/* 2. Center Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600 text-xl font-bold shadow-inner">
                  💬
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Enquire</h2>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:border-red-500 transition">
                  <span className="bg-gray-100 px-3 py-2 text-sm text-gray-600 border-r border-gray-300 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength="10"
                    placeholder="10 Digit Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Enter Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md shadow transition duration-200 text-sm tracking-wide"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}