import { useState, useEffect } from 'react';

export default function HeroRotatingText() {
  const words = ["Clean", "Shiny", "Sparkling"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true); 
      }, 300); 
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="w-full text-center">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug flex flex-wrap items-center justify-center">
        <span>Speed Car Wash for&nbsp;</span>
        
        {/* Adaptive container jo alag-alag word ki length ke mutabiq adjust ho jaye */}
        <span className="inline-block overflow-hidden align-middle h-[1.4em] min-w-[110px] text-center px-1">
          <span 
            className={`inline-block text-red-600 transition-all duration-300 transform ${
              fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {words[currentIndex]}
          </span>
        </span>
        
        <span className="w-full sm:w-auto mt-1 sm:mt-0 text-center">Cars in a hassle-free way...</span>
      </h2>
    </div>
  );
}