import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [franchiseOpen, setFranchiseOpen] = useState(false);
  const [franchiseSupportOpen, setFranchiseSupportOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileFranchiseOpen, setMobileFranchiseOpen] = useState(false);
  const [mobileFranchiseSupportOpen, setMobileFranchiseSupportOpen] = useState(false);

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

  // Mobile menu khulne par background scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileFranchiseOpen(false);
    setMobileFranchiseSupportOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm ${
      isScrolled ? "py-1 shadow-md" : "py-0"
    }`}>
      
      {/* Top Utility Bar */}
      <div className={`bg-gray-50 border-b text-[11px] text-gray-600 transition-all duration-300 overflow-hidden ${
        isScrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-10 py-1.5 opacity-100 px-4"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end items-center space-y-1 sm:space-y-0 sm:space-x-6">
          <div className="hidden sm:flex items-center space-x-4">
            <NavLink to="/book-wash" className="hover:text-blue-600 transition">› Book a Wash</NavLink>
            <NavLink to="/book-detailing" className="hover:text-blue-600 transition">› Book a Detailing</NavLink>
            <NavLink to="/outlets" className="hover:text-blue-600 transition">› Our Outlets</NavLink>
          </div>
          <div className="flex items-center space-x-4 sm:border-l sm:pl-4 border-gray-300">
            <a href="tel:+919716412345" className="flex items-center space-x-1 hover:text-blue-600 transition">
              <span>📞</span>
              <span className="font-semibold">+91-9716412345</span>
            </a>
            <a href="mailto:info@speedcarwash.com" className="hidden sm:flex items-center space-x-1 hover:text-blue-600 transition">
              <span>✉️</span>
              <span>info@speedcarwash.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center transition-all duration-300" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
        
        {/* Official Logo */}
        <NavLink to="/" className="flex items-center py-2" onClick={closeMobileMenu}>
          <img 
            src="https://www.speedcarwash.com/images/logo.png" 
            alt="Speed Car Wash" 
            className={`transition-all duration-300 object-contain ${
              isScrolled ? "h-9" : "h-12"
            }`}
            onError={(e) => {
              e.target.src = "https://www.speedcarwash.com/images/web-product/logo.png";
            }}
          />
        </NavLink>

        {/* Desktop Navigation NavLinks */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-gray-700">
          <NavLink to="/" className="nav-item text-blue-600 p-2 hover:bg-gray-100 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width={22} viewBox="0 0 24 24" fill="currentColor"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8.59208 13.808L7.60099 14.3802L8.6017 16.1133L9.5943 15.5402C9.98756 15.9116 10.467 16.193 10.9994 16.3512V17.4956H13.0007V16.3512C13.5331 16.1929 14.0125 15.9115 14.4057 15.5401L15.3984 16.1132L16.399 14.3801L15.4079 13.8078C15.4696 13.5478 15.5022 13.2766 15.5022 12.9978C15.5022 12.7189 15.4696 12.4477 15.4078 12.1877L16.399 11.6154L15.3983 9.88225L14.4056 10.4554C14.0124 10.084 13.533 9.80264 13.0006 9.64436V8.49998H10.9993V9.64436C10.4669 9.80265 9.98747 10.084 9.59421 10.4554L8.60164 9.88234L7.60099 11.6155L8.59205 12.1877C8.53034 12.4477 8.49768 12.7189 8.49768 12.9978C8.49768 13.2767 8.53035 13.5479 8.59208 13.808ZM12 14.4971C11.171 14.4971 10.499 13.8258 10.499 12.9978C10.499 12.1698 11.171 11.4985 12 11.4985C12.8289 11.4985 13.5009 12.1698 13.5009 12.9978C13.5009 13.8258 12.8289 14.4971 12 14.4971Z"></path></svg>
          </NavLink>

          <NavLink to="/about" className="nav-item hover:bg-blue-600 hover:text-white px-3 py-2 rounded transition">
            ABOUT US
          </NavLink>

          {/* Speed Services Dropdown */}
          <div className="relative group">
            <button 
              className="nav-item flex items-center space-x-1 hover:text-blue-600 py-2 transition"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span>SPEED SERVICES</span>
              <span className="text-[10px]">▼</span>
            </button>
            {servicesOpen && (
              <div 
                className="absolute top-full left-0 w-48 bg-white border shadow-lg rounded py-2 space-y-1 z-50"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink to="/services/washing" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">SCW Washing</NavLink>
                <NavLink to="/services/detailing" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">SCW Detailing</NavLink>
                <NavLink to="/services/wrapping" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">SCW Wrapping</NavLink>
              </div>
            )}
          </div>

          {/* Franchise Dropdown with Nested Child Menu */}
          <div className="relative group">
            <button 
              className="flex items-center space-x-1 hover:text-blue-600 py-2 transition"
              onMouseEnter={() => setFranchiseOpen(true)}
              onMouseLeave={() => setFranchiseOpen(false)}
            >
              <span>FRANCHISE</span>
              <span className="text-[10px]">▼</span>
            </button>
            
            {franchiseOpen && (
              <div 
                className="absolute top-full left-0 w-56 bg-white border shadow-lg rounded py-2 space-y-1 z-50"
                onMouseEnter={() => setFranchiseOpen(true)}
                onMouseLeave={() => {
                  setFranchiseOpen(false);
                  setFranchiseSupportOpen(false);
                }}
              >
                <div 
                  className="relative"
                  onMouseEnter={() => setFranchiseSupportOpen(true)}
                  onMouseLeave={() => setFranchiseSupportOpen(false)}
                >
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer">
                    <span>Franchise Support</span>
                    <span className="text-[10px]">▶</span>
                  </div>

                  {franchiseSupportOpen && (
                    <div className="absolute top-0 left-full w-60 bg-white border shadow-lg rounded py-2 space-y-1 z-50">
                      <NavLink to="/franchise/success-team" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Franchise Success Team</NavLink>
                      <NavLink to="/franchise/sales-fusion" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Sales Fusion</NavLink>
                      <NavLink to="/franchise/hand-holding" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Hand Holding</NavLink>
                      <NavLink to="/franchise/decore-elements" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Decore Elements/Infrastructure</NavLink>
                      <NavLink to="/franchise/marketing-stuff" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Marketing Stuff</NavLink>
                      <NavLink to="/franchise/support-product" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Support Product</NavLink>
                    </div>
                  )}
                </div>

                <NavLink to="/franchise/outlets" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Locate Our Outlets</NavLink>
                <NavLink to="/franchise/business" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Franchise Business</NavLink>
                <NavLink to="/franchise/apply" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Apply For Franchise</NavLink>
                <NavLink to="/franchise/rent-property" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Rent Your Property</NavLink>
                <NavLink to="/franchise/doorstep-model" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Doorstep Model</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/media" className="nav-item hover:text-blue-600 py-2 transition">MEDIA</NavLink>
          <NavLink to="/blog" className="nav-item hover:text-blue-600 py-2 transition">BLOG</NavLink>
          <NavLink to="/contact" className="nav-item hover:text-blue-600 py-2 transition">CONTACT US</NavLink>
        </nav>

        {/* Right side: Cart + Mobile Hamburger */}
        <div className="flex items-center space-x-2">
          {/* Cart Button with Dropdown Card */}
          <div 
            className="relative"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <NavLink 
              to="/cart" 
              className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-2.5 sm:px-3.5 py-2 rounded text-[11px] sm:text-xs font-bold flex items-center space-x-1 sm:space-x-2 shadow transition"
              onClick={closeMobileMenu}
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
                </svg>
              </span>
              <span className="hidden sm:inline">CART (0) - RS 0</span>
              <span className="sm:hidden">0</span>
              <span className="text-[10px] hidden sm:inline">▼</span>
            </NavLink>

            {cartOpen && (
              <div className="hidden lg:block absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl p-4 z-50 animate-fadeIn">
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Shopping Cart</span>
                  <span className="text-xs text-gray-400">0 Items</span>
                </div>
                
                <div className="py-8 text-center">
                  <p className="text-sm font-semibold text-gray-600">Cart Is Empty!!!</p>
                  <p className="text-xs text-gray-400 mt-1">Add services to your cart to checkout.</p>
                </div>

                <div className="border-t pt-3 mt-2 flex justify-end">
                  <NavLink 
                    to="/cart" 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded shadow transition flex items-center space-x-1"
                  >
                    <span>Checkout</span>
                    <span>🛒</span>
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Button - mobile/tablet only */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition shrink-0"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <img 
            src="https://www.speedcarwash.com/images/logo.png" 
            alt="Speed Car Wash" 
            className="h-9 object-contain"
            onError={(e) => {
              e.target.src = "https://www.speedcarwash.com/images/web-product/logo.png";
            }}
          />
          <button
            onClick={closeMobileMenu}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu links */}
        <nav className="px-3 py-3 text-sm font-semibold text-gray-700">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" fill="currentColor"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8.59208 13.808L7.60099 14.3802L8.6017 16.1133L9.5943 15.5402C9.98756 15.9116 10.467 16.193 10.9994 16.3512V17.4956H13.0007V16.3512C13.5331 16.1929 14.0125 15.9115 14.4057 15.5401L15.3984 16.1132L16.399 14.3801L15.4079 13.8078C15.4696 13.5478 15.5022 13.2766 15.5022 12.9978C15.5022 12.7189 15.4696 12.4477 15.4078 12.1877L16.399 11.6154L15.3983 9.88225L14.4056 10.4554C14.0124 10.084 13.533 9.80264 13.0006 9.64436V8.49998H10.9993V9.64436C10.4669 9.80265 9.98747 10.084 9.59421 10.4554L8.60164 9.88234L7.60099 11.6155L8.59205 12.1877C8.53034 12.4477 8.49768 12.7189 8.49768 12.9978C8.49768 13.2767 8.53035 13.5479 8.59208 13.808ZM12 14.4971C11.171 14.4971 10.499 13.8258 10.499 12.9978C10.499 12.1698 11.171 11.4985 12 11.4985C12.8289 11.4985 13.5009 12.1698 13.5009 12.9978C13.5009 13.8258 12.8289 14.4971 12 14.4971Z"></path></svg>
            <span>HOME</span>
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className="block px-3 py-3 rounded-lg hover:bg-gray-50"
          >
            ABOUT US
          </NavLink>

          {/* Speed Services Accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex justify-between items-center px-3 py-3 rounded-lg hover:bg-gray-50"
            >
              <span>SPEED SERVICES</span>
              <span className={`text-[10px] transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pb-2 space-y-1 text-gray-600 font-medium">
                <NavLink to="/services/washing" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">SCW Washing</NavLink>
                <NavLink to="/services/detailing" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">SCW Detailing</NavLink>
                <NavLink to="/services/wrapping" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">SCW Wrapping</NavLink>
              </div>
            )}
          </div>

          {/* Franchise Accordion */}
          <div>
            <button
              onClick={() => setMobileFranchiseOpen(!mobileFranchiseOpen)}
              className="w-full flex justify-between items-center px-3 py-3 rounded-lg hover:bg-gray-50"
            >
              <span>FRANCHISE</span>
              <span className={`text-[10px] transition-transform duration-200 ${mobileFranchiseOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            {mobileFranchiseOpen && (
              <div className="pl-4 pb-2 space-y-1 text-gray-600 font-medium">
                {/* Franchise Support nested accordion */}
                <div>
                  <button
                    onClick={() => setMobileFranchiseSupportOpen(!mobileFranchiseSupportOpen)}
                    className="w-full flex justify-between items-center px-3 py-2.5 rounded-lg hover:bg-gray-50"
                  >
                    <span>Franchise Support</span>
                    <span className={`text-[10px] transition-transform duration-200 ${mobileFranchiseSupportOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {mobileFranchiseSupportOpen && (
                    <div className="pl-4 pb-1 space-y-1 text-gray-500 font-normal text-xs">
                      <NavLink to="/franchise/success-team" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Franchise Success Team</NavLink>
                      <NavLink to="/franchise/sales-fusion" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Sales Fusion</NavLink>
                      <NavLink to="/franchise/hand-holding" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Hand Holding</NavLink>
                      <NavLink to="/franchise/decore-elements" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Decore Elements/Infrastructure</NavLink>
                      <NavLink to="/franchise/marketing-stuff" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Marketing Stuff</NavLink>
                      <NavLink to="/franchise/support-product" onClick={closeMobileMenu} className="block px-3 py-2 rounded-lg hover:bg-gray-50">Support Product</NavLink>
                    </div>
                  )}
                </div>

                <NavLink to="/franchise/outlets" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">Locate Our Outlets</NavLink>
                <NavLink to="/franchise/business" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">Franchise Business</NavLink>
                <NavLink to="/franchise/apply" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">Apply For Franchise</NavLink>
                <NavLink to="/franchise/rent-property" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">Rent Your Property</NavLink>
                <NavLink to="/franchise/doorstep-model" onClick={closeMobileMenu} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50">Doorstep Model</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/media" onClick={closeMobileMenu} className="block px-3 py-3 rounded-lg hover:bg-gray-50">MEDIA</NavLink>
          <NavLink to="/blog" onClick={closeMobileMenu} className="block px-3 py-3 rounded-lg hover:bg-gray-50">BLOG</NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu} className="block px-3 py-3 rounded-lg hover:bg-gray-50">CONTACT US</NavLink>
        </nav>

        {/* Mobile menu footer - contact + utility links */}
        <div className="border-t border-gray-100 px-5 py-4 space-y-3 text-xs text-gray-600 font-medium">
          <NavLink to="/book-wash" onClick={closeMobileMenu} className="block hover:text-blue-600">› Book a Wash</NavLink>
          <NavLink to="/book-detailing" onClick={closeMobileMenu} className="block hover:text-blue-600">› Book a Detailing</NavLink>
          <NavLink to="/outlets" onClick={closeMobileMenu} className="block hover:text-blue-600">› Our Outlets</NavLink>
          <a href="tel:+919716412345" className="flex items-center space-x-1 hover:text-blue-600 pt-2 border-t border-gray-100">
            <span>📞</span>
            <span className="font-semibold">+91-9716412345</span>
          </a>
          <a href="mailto:info@speedcarwash.com" className="flex items-center space-x-1 hover:text-blue-600">
            <span>✉️</span>
            <span>info@speedcarwash.com</span>
          </a>
        </div>
      </div>
    </header>
  );
}