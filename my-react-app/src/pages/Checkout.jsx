/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // Check karein ki cart mein koi aisi service hai kya jiska price available nahi hai
  const hasCustomPriceItems = cartItems.some(
    (item) => !item.price || Number(item.price) === 0
  );

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    timeSlot: "Morning (9 AM - 12 PM)",
    paymentMethod: "online",
  });

  // React recommended approach: Render ke dauran hi state adjust karna (Bina useEffect ke)
  const [prevHasCustomPrice, setPrevHasCustomPrice] = useState(hasCustomPriceItems);
  if (hasCustomPriceItems !== prevHasCustomPrice) {
    setPrevHasCustomPrice(hasCustomPriceItems);
    if (hasCustomPriceItems && formData.paymentMethod === "online") {
      setFormData((prev) => ({ ...prev, paymentMethod: "cod" }));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Subtotal calculation (sirf valid prices ke liye)
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.price);
    return acc + (isNaN(itemPrice) ? 0 : itemPrice);
  }, 0);

  const tax = Math.round(subtotal * 0.18); // 18% GST estimation
  const grandTotal = subtotal + (cartItems.length > 0 ? tax : 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields!");
      return;
    }

    // Success booking logic / API call here
    alert("Booking confirmed successfully! Thank you for choosing Speed Car Wash.");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-50 text-gray-800 font-sans min-h-screen py-10"
      >
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">
              <Link to="/" className="hover:text-blue-600">Home</Link> / Checkout
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
              <p className="text-xs text-gray-500 mb-6">Looks like you haven't added any car services yet.</p>
              <Link
                to="/services/washing"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm"
              >
                Explore Services
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Side: Booking Details Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Personal Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    1. Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Service Location / Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Enter complete address where service is required"
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Slot & Time Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    2. Appointment Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Select Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Time Slot *</label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12 PM - 3 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="Evening (3 PM - 6 PM)">Evening (3:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    3. Payment Method
                  </h3>
                  
                  {hasCustomPriceItems && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                      ⚠️ Your cart contains custom/detailing services (Price on request). Online payment is only available for standard washing services. Please choose offline payment below.
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-3 rounded-xl border transition ${hasCustomPriceItems ? 'bg-gray-100 opacity-50 cursor-not-allowed border-gray-200' : 'bg-gray-50 cursor-pointer border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleChange}
                        disabled={hasCustomPriceItems}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-semibold text-gray-800">Online Payment (UPI, Credit/Debit Card, NetBanking)</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-semibold text-gray-800">Pay after Service / Cash at Workshop (Offline)</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Side: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    Order Summary ({cartItems.length})
                  </h3>

                  <div className="space-y-4 max-h-64 overflow-y-auto pr-1 mb-4">
                    {cartItems.map((item, index) => {
                      const hasValidPrice = item.price && item.price > 0;

                      return (
                        <div key={index} className="flex justify-between items-start text-xs pb-3 border-b border-gray-50">
                          <div>
                            <p className="font-bold text-gray-900">{item.title}</p>
                            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                              {item.category}
                            </span>
                          </div>
                          {hasValidPrice ? (
                            <span className="font-extrabold text-gray-800">₹{item.price}</span>
                          ) : (
                            <span className="font-bold text-gray-400 text-[10px] uppercase">
                              Price on request
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-800">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (18%)</span>
                      <span className="font-semibold text-gray-800">₹{tax}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-bold text-gray-900">
                      <span>Grand Total</span>
                      <span className="text-green-600">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition shadow-sm cursor-pointer"
                  >
                    CONFIRM & BOOK NOW
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>
      </motion.div>
      <Footer />
    </>
  );
}