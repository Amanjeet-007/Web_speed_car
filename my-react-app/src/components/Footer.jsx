import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#07090d] text-gray-300">
      {/* Ambient Glow */}
      <div className="absolute -top-32 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ================= TOP CTA ================= */}
        <div className="py-10 border-b border-white/10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 py-7 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold mb-2">
                Your car deserves better
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready for a cleaner, shinier ride?
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Professional car washing & detailing, right at your doorstep.
              </p>
            </div>

            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
            >
              Book a Wash
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ================= MAIN FOOTER ================= */}
        <div className="py-12 grid grid-cols-1 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 gap-10 lg:gap-14">
          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <img
                  alt="Speed Car Wash"
                  className="transition-all duration-300 object-contain h-9"
                  src="https://www.speedcarwash.com/images/logo.png"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Clean • Care • Shine
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-400 max-w-sm">
              Premium doorstep car wash and auto detailing services designed to keep your vehicle
              looking its absolute best.
            </p>

            <div className="mt-5 flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Doorstep service available
            </div>
          </div>

          {/* SPEED SERVICES */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Speed Services
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/services/washing"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  SCW Washing
                </Link>
              </li>

              <li>
                <Link
                  to="/services/detailing"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  SCW Detailing
                </Link>
              </li>

              <li>
                <Link
                  to="/services/wrapping"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  SCW Wrapping
                </Link>
              </li>

              <li>
                <Link
                  to="/#packages"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  Packages & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  Why Choose Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL + PAYMENT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Information
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Payment */}
            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
                Secure Payments
              </p>

              <a
                href="https://www.speedcarwash.com/make-payment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:bg-white/[0.08] transition"
              >
                <img
                  src="https://www.speedcarwash.com/img/pay-now.png"
                  alt="Pay Online"
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-white/10 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center lg:text-left leading-6">
            <p>
              © 2026 <span className="text-gray-300">Speed Car Wash</span>. All Rights Reserved.
            </p>

            <p>A brand of Neaten Cleaning Technology Private Limited</p>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/speedcarwashindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
            >
              <span className="font-bold text-sm">f</span>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com/speedcarwashin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300"
            >
              <span className="font-bold text-sm">𝕏</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/speedcarwashin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300"
            >
              <span className="font-bold text-sm">in</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/speedcarwashindia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300"
            >
              <span className="font-bold text-sm">◎</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@speedcarwashindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
            >
              <span className="font-bold text-sm">▶</span>
            </a>

            {/* Pinterest */}
            <a
              href="https://in.pinterest.com/speedcarwashindia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300"
            >
              <span className="font-bold text-sm">P</span>
            </a>
          </div>
        </div>

        {/* Bottom micro line */}
        <div className="pb-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-700">
            Premium Car Care • Delivered To Your Doorstep
          </p>
        </div>
      </div>
    </footer>
  );
}
