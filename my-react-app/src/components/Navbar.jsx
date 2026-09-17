import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  // Redux store se cart items nikalna
  const cartItems = useSelector((state) => state.cart.items);

  // Dynamic total price calculation taaki price hamesha accurately show ho
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  const [servicesOpen, setServicesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white shadow-sm py-0"
      }`}
    >
      {/* Top Utility Bar */}
      <div
        className={`bg-gray-900 text-gray-300 text-xs transition-all duration-300 overflow-hidden ${
          isScrolled
            ? "max-h-0 py-0 opacity-0 border-none"
            : "max-h-12 py-2 opacity-100 px-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4 text-[11px]">
            <a
              href="tel:+919716412345"
              className="flex items-center space-x-1.5 hover:text-white transition"
            >
              <span className="text-blue-400">📞</span>
              <span className="font-medium">+91-9716412345</span>
            </a>
            <a
              href="mailto:info@speedcarwash.com"
              className="hidden sm:flex items-center space-x-1.5 hover:text-white transition"
            >
              <span className="text-blue-400">✉️</span>
              <span>info@speedcarwash.com</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-[11px] font-medium">
            <NavLink to="/book-wash" className="hover:text-blue-400 transition">
              Book a Wash
            </NavLink>
            <span className="text-gray-600">/</span>
            <NavLink to="/book-detailing" className="hover:text-blue-400 transition">
              Book a Detailing
            </NavLink>
            <span className="text-gray-600">/</span>
            <NavLink to="/outlets" className="hover:text-blue-400 transition">
              Our Outlets
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Navbar Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-20">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center py-2 focus:outline-none"
          onClick={closeMobileMenu}
        >
          <img
            src="https://www.speedcarwash.com/images/logo.png"
            alt="Speed Car Wash"
            className={`transition-all duration-300 object-contain ${
              isScrolled ? "h-8" : "h-11"
            }`}
            onError={(e) => {
              e.target.src =
                "https://www.speedcarwash.com/images/web-product/logo.png";
            }}
          />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8.59208 13.808L7.60099 14.3802L8.6017 16.1133L9.5943 15.5402C9.98756 15.9116 10.467 16.193 10.9994 16.3512V17.4956H13.0007V16.3512C13.5331 16.1929 14.0125 15.9115 14.4057 15.5401L15.3984 16.1132L16.399 14.3801L15.4079 13.8078C15.4696 13.5478 15.5022 13.2766 15.5022 12.9978C15.5022 12.7189 15.4696 12.4477 15.4078 12.1877L16.399 11.6154L15.3983 9.88225L14.4056 10.4554C14.0124 10.084 13.533 9.80264 13.0006 9.64436V8.49998H10.9993V9.64436C10.4669 9.80265 9.98747 10.084 9.59421 10.4554L8.60164 9.88234L7.60099 11.6155L8.59205 12.1877C8.53034 12.4477 8.49768 12.7189 8.49768 12.9978C8.49768 13.2767 8.53035 13.5479 8.59208 13.808ZM12 14.4971C11.171 14.4971 10.499 13.8258 10.499 12.9978C10.499 12.1698 11.171 11.4985 12 11.4985C12.8289 11.4985 13.5009 12.1698 13.5009 12.9978C13.5009 13.8258 12.8289 14.4971 12 14.4971Z"></path>
            </svg>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            ABOUT US
          </NavLink>

          {/* Speed Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition">
              <span>SPEED SERVICES</span>
              <span className={`text-[10px] transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl rounded-xl py-2 space-y-1 z-50">
                <NavLink
                  to="/services/washing"
                  className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition"
                >
                  SCW Washing
                </NavLink>
                <NavLink
                  to="/services/detailing"
                  className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition"
                >
                  SCW Detailing
                </NavLink>
                <NavLink
                  to="/services/wrapping"
                  className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition"
                >
                  SCW Wrapping
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            BLOGS
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            CONTACT US
          </NavLink>
        </nav>

        {/* Right Utility: Cart Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          {/* Cart Section */}
          <div
            className="relative"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <NavLink
              to="/cart"
              className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm transition"
              onClick={closeMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
              </svg>
              <span className="hidden sm:inline">
                CART ({cartItems.length}) - RS {totalPrice}
              </span>
              <span className="sm:hidden">{cartItems.length}</span>
              <span className="text-[10px] hidden sm:inline">▼</span>
            </NavLink>

            {/* Cart Dropdown Card */}
            {cartOpen && (
              <div className="hidden lg:block absolute right-0 top-full w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl p-5 z-50">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Shopping Cart
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {cartItems.length} Items
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm font-semibold text-gray-600">
                      Cart Is Empty!!!
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add services to your cart to checkout.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-3 mb-3 pr-1">
                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-xs border-b border-gray-50 pb-2.5"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {item.category} • ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-400 hover:text-red-600 font-bold p-1 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between font-bold text-xs text-gray-900 border-t">
                      <span>Total:</span>
                      <span className="text-green-600 font-extrabold text-sm">₹{totalPrice}</span>
                    </div>
                  </div>
                )}

                <div className="border-t pt-3 mt-2 flex justify-end">
                  <NavLink
                    to="/checkout"
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition"
                  >
                    Proceed to Checkout 🛒
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 transition"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop - Fixed with higher z-index */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] lg:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-in Menu Drawer - Fixed with full screen height and highest z-index */}
      <div
        className={`fixed inset-y-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white z-[999] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <img
              src="https://www.speedcarwash.com/images/logo.png"
              alt="Speed Car Wash"
              className="h-8 object-contain"
              onError={(e) => {
                e.target.src =
                  "https://www.speedcarwash.com/images/web-product/logo.png";
              }}
            />
            <button
              onClick={closeMobileMenu}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Drawer Nav Items */}
          <nav className="p-4 space-y-1 text-sm font-semibold text-gray-700">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-blue-600 transition"
            >
              <span>HOME</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              ABOUT US
            </NavLink>

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                <span>SPEED SERVICES</span>
                <span className={`text-[10px] transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 py-1 space-y-1 text-gray-600 font-medium">
                  <NavLink
                    to="/services/washing"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    SCW Washing
                  </NavLink>
                  <NavLink
                    to="/services/detailing"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    SCW Detailing
                  </NavLink>
                  <NavLink
                    to="/services/wrapping"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    SCW Wrapping
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/blog"
              onClick={closeMobileMenu}
              className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              BLOGS
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              CONTACT US
            </NavLink>
          </nav>
        </div>

        {/* Drawer Footer Utility Links */}
        <div className="border-t border-gray-100 p-5 space-y-2.5 text-xs text-gray-600 bg-gray-50 mt-auto">
          <NavLink
            to="/book-wash"
            onClick={closeMobileMenu}
            className="block hover:text-blue-600 font-medium transition"
          >
            › Book a Wash
          </NavLink>
          <NavLink
            to="/book-detailing"
            onClick={closeMobileMenu}
            className="block hover:text-blue-600 font-medium transition"
          >
            › Book a Detailing
          </NavLink>
          <NavLink
            to="/outlets"
            onClick={closeMobileMenu}
            className="block hover:text-blue-600 font-medium transition"
          >
            › Our Outlets
          </NavLink>
          <div className="pt-2 border-t border-gray-200 space-y-1.5">
            <a
              href="tel:+919716412345"
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-semibold transition"
            >
              <span>📞</span>
              <span>+91-9716412345</span>
            </a>
            <a
              href="mailto:info@speedcarwash.com"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
            >
              <span>✉️</span>
              <span>info@speedcarwash.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}