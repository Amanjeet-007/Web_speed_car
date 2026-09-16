import { useState, useEffect } from "react";

const slides = [
  {
    title: "Automatic Car Wash",
    subtitle: "Feel The Speedy Performance In Controlled Manpower!!",
    image: "https://www.speedcarwash.com/images/slider/new/automachine.png", 
  },
  {
    title: "New Look, New Feel",
    subtitle: "Platinum Wash | Ceramic Coatings | Internal Dry Cleaning",
    image: "https://www.speedcarwash.com/images/slider/new/sl1.png",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full min-h-[380px] md:min-h-[440px] overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-8 md:px-14 py-6 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Left Side: Image - width thodi badi ki, gap se balance aaya */}
          <div className="w-full md:w-[50%] flex items-center justify-center md:justify-end">
            {slide.image && (
              <img 
                src={slide.image} 
                alt="Car Wash Slide" 
                className="max-h-[350px] md:max-h-[420px] w-auto object-contain drop-shadow-sm"
              />
            )}
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-[50%] space-y-4 text-center md:text-right flex flex-col items-center md:items-end">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm md:text-base font-semibold text-gray-700 max-w-md">
              {slide.subtitle}
            </p>
            <div className="pt-2">
              <button className="bg-red-600 text-white px-6 py-3 font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-0.5">
                Book Wash Now!
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Left Navigation Arrow - zyada contrast, white bg + border */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg z-30 focus:outline-none"
        aria-label="Previous Slide"
      >
        ❮
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg z-30 focus:outline-none"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
}