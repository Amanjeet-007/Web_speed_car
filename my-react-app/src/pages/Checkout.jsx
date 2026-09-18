import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { clearCart } from "../redux/cartSlice";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function callFunction(functionName, body) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/${functionName}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong.");
  }

  return result;
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getWhatsAppNumber(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

function buildWhatsAppMessage(data) {
  const itemLines = data.items
    .map(
      (item) =>
        `• ${item.title} (${item.category}) - ₹${item.price}`
    )
    .join("\n");

  return `🚗 *SPEED CAR WASH*

*Payment Successful* ✅

Booking ID: ${data.bookingReference}

Customer: ${data.customer.fullName}
Service Location: ${data.customer.address}

*Services:*
${itemLines}

Appointment: ${formatDate(data.date)}
Time: ${data.timeSlot}

Subtotal: ₹${data.subtotal}
GST (18%): ₹${data.tax}
*Amount Paid: ₹${data.total}*

Payment ID: ${data.paymentId}
Payment Status: PAID ✅

Thank you for choosing Speed Car Wash! 🚗✨`;
}

function printReceipt() {
  window.print();
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    timeSlot: "Morning (9 AM - 12 PM)",
  });

  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    setPaymentError("");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + (cartItems.length > 0 ? tax : 0);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setPaymentError("");

    if (cartItems.length === 0) {
      setPaymentError("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.date
    ) {
      setPaymentError("Please fill in all required fields.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setPaymentError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay. Please check your internet connection and try again.");
      }

      const orderData = await callFunction("create-razorpay-order", {
        customer: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
        },
        date: formData.date,
        timeSlot: formData.timeSlot,
        items: cartItems.map((item) => ({
          title: item.title,
          category: item.category,
          time: item.time,
        })),
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency || "INR",
        name: "Speed Car Wash",
        description: `Car Wash Booking - ${orderData.bookingReference}`,
        order_id: orderData.order.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          booking_reference: orderData.bookingReference,
        },
        theme: {
          color: "#0077b6",
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
        handler: async (response) => {
          try {
            const verification = await callFunction("verify-razorpay-payment", {
              bookingId: orderData.bookingId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            setSuccessData({
              bookingReference:
                verification.bookingReference || orderData.bookingReference,
              paymentId: response.razorpay_payment_id,
              customer: { ...formData },
              items: cartItems.map((item) => ({ ...item })),
              date: formData.date,
              timeSlot: formData.timeSlot,
              subtotal: orderData.pricing?.subtotal ?? subtotal,
              tax: orderData.pricing?.tax ?? tax,
              total: orderData.pricing?.total ?? grandTotal,
            });

            dispatch(clearCart());
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentError(
              `Payment was received by Razorpay, but booking confirmation needs attention. Payment ID: ${response.razorpay_payment_id}`
            );
          } finally {
            setProcessing(false);
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response.error);
        setPaymentError(
          response.error?.description || "Payment failed. Please try again."
        );
        setProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentError(
        error.message || "Unable to start payment. Please try again."
      );
      setProcessing(false);
    }
  };

  if (successData) {
    const whatsappNumber = getWhatsAppNumber(successData.customer.phone);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      buildWhatsAppMessage(successData)
    )}`;

    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] bg-gray-50 px-4 py-12 sm:py-16 print:bg-white print:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="receipt-card w-full max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="bg-[#071018] text-white px-6 sm:px-10 py-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-400 flex items-center justify-center text-3xl mb-4">
                ✓
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-emerald-400">
                Payment Successful
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
                Booking Confirmed
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Your car wash appointment has been successfully booked.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-gray-100">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Booking Reference
                  </p>
                  <p className="text-lg font-extrabold text-gray-900 mt-1">
                    {successData.bookingReference}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Payment ID
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-1 break-all">
                    {successData.paymentId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 border-b border-gray-100">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">Customer</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{successData.customer.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">{successData.customer.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">Appointment</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{formatDate(successData.date)}</p>
                  <p className="text-xs text-gray-500 mt-1">{successData.timeSlot}</p>
                </div>
              </div>

              <div className="py-6 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">Services</p>
                <div className="space-y-3">
                  {successData.items.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="flex justify-between gap-4 text-sm">
                      <div>
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-[11px] text-blue-600 mt-1">{item.category}</p>
                      </div>
                      <span className="font-bold text-gray-900">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{successData.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (18%)</span>
                  <span>₹{successData.tax}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-extrabold text-gray-900">
                  <span>Amount Paid</span>
                  <span className="text-emerald-600">₹{successData.total}</span>
                </div>
              </div>

              <div className="print:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={printReceipt}
                  className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm py-3.5 rounded-xl transition"
                >
                  📄 Save / Print Receipt
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  📱 Send Details on WhatsApp
                </a>
              </div>

              <p className="print:hidden text-[11px] text-gray-400 text-center mt-4 leading-5">
                WhatsApp will open with your receipt details pre-filled. Just tap Send.
              </p>
            </div>
          </motion.div>
        </main>
        <div className="print:hidden">
          <Footer />
        </div>

        <style>{`
          @media print {
            @page { margin: 14mm; }
            body { background: #fff !important; }
            header, footer { display: none !important; }
            .receipt-card {
              box-shadow: none !important;
              border: 1px solid #e5e7eb !important;
              max-width: 100% !important;
            }
          }
        `}</style>
      </>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-50 text-gray-800 font-sans min-h-screen py-10"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">
              <Link to="/" className="hover:text-blue-600">Home</Link> / Checkout
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-sm text-gray-500 mt-1">
              Secure online payment via UPI, Credit/Debit Card or NetBanking.
            </p>
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
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    1. Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your name" className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="98765 43210" inputMode="numeric" className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Service Location / Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="Enter complete address where service is required" className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    2. Appointment Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Select Date *</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required min={today} className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Time Slot *</label>
                      <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12 PM - 3 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="Evening (3 PM - 6 PM)">Evening (3:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    3. Payment Method
                  </h3>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Online Payment</p>
                      <p className="text-[11px] text-gray-500 mt-1">UPI, Credit/Debit Card & NetBanking</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-gray-400">
                    Razorpay secure checkout will open after you click “Confirm & Pay Now”.
                  </p>
                </div>

                {paymentError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs leading-5">
                    {paymentError}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 uppercase tracking-wide">
                    Order Summary ({cartItems.length})
                  </h3>

                  <div className="space-y-4 max-h-64 overflow-y-auto pr-1 mb-4">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id || item.title}-${index}`} className="flex justify-between items-start text-xs pb-3 border-b border-gray-50">
                        <div>
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">{item.category}</span>
                        </div>
                        <span className="font-extrabold text-gray-800">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-gray-800">₹{subtotal}</span></div>
                    <div className="flex justify-between"><span>Estimated GST (18%)</span><span className="font-semibold text-gray-800">₹{tax}</span></div>
                    <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-bold text-gray-900"><span>Grand Total</span><span className="text-green-600">₹{grandTotal}</span></div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    {processing ? "PROCESSING PAYMENT..." : "CONFIRM & PAY NOW"}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center mt-3 leading-4">
                    Secure payment powered by Razorpay.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
