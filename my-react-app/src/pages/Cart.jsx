import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { removeFromCart } from "../redux/cartSlice"; // <-- removeFromCart import kar liya gaya hai

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // Subtotal aur Tax calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST estimation
  const grandTotal = subtotal + (cartItems.length > 0 ? tax : 0);

  const handleRemove = (index) => {
    // Redux action dispatch karke item remove kiya ja raha hai
    dispatch(removeFromCart(index));
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
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">
              <Link to="/" className="hover:text-blue-600">Home</Link> / Cart
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🛒
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Your cart is currently empty</h2>
              <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
                Looks like you haven't added any professional car cleaning or detailing services to your cart yet.
              </p>
              <Link
                to="/services/washing"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm"
              >
                Explore Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Side: Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          CarWash
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          {item.time && (
                            <span className="text-[10px] text-gray-400 font-medium">
                              ⏱ {item.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-2">
                      <span className="text-base font-extrabold text-green-600">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Price Details & Checkout Button */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    Price Details
                  </h3>

                  <div className="space-y-3 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold text-gray-800">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax & GST (18%)</span>
                      <span className="font-semibold text-gray-800">₹{tax}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span>→</span>
                  </button>

                  <div className="mt-4 text-center">
                    <Link
                      to="/services/washing"
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      ← Add more services
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </motion.div>
      <Footer />
    </>
  );
}