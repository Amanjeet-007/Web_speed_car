import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Automatic Car Wash",
    subtitle: "Feel The Speedy Performance In Controlled Manpower!!",
    image: "https://www.speedcarwash.com/images/slider/new/automachine.png",
    tag: "Next-Gen Technology",
  },
  {
    title: "New Look, New Feel",
    subtitle: "Platinum Wash | Ceramic Coatings | Internal Dry Cleaning",
    image: "../../public/hero-car.png",
    tag: "Premium Detailing",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full min-h-[420px] md:min-h-[480px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border border-blue-700/50">
      {/* Background Decorative Glow Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-16 py-10 ${
            idx === current
              ? "opacity-100 translate-x-0 z-10"
              : "opacity-0 translate-x-8 z-0 pointer-events-none"
          }`}
        >
          {/* Left Side: Text Content */}
          <div className="w-full md:w-[55%] space-y-4 text-center md:text-left flex flex-col items-center md:items-start z-20">
            {slide.tag && (
              <span className="bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                ✨ {slide.tag}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="text-sm md:text-lg text-blue-100/90 font-medium max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <Link to={"services/washing"}>
              <div className="pt-3">
                <button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 font-extrabold rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center space-x-2">
                  <span>Book Wash Now</span>
                  <span>→</span>
                </button>
              </div>
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-[45%] flex items-center justify-center z-20">
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[80vw] md:w-[61vw] max-w-none"
              />
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-lg z-30 focus:outline-none"
        aria-label="Previous Slide"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-lg z-30 focus:outline-none"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-8 h-2.5 bg-blue-400"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
