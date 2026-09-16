import { useState, useEffect } from 'react';

export default function HeroRotatingText() {
  const words = ["Clean", "Shinny", "Sparkling"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true); 
      }, 300); 
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="py-4"> {/* Yaha vertical padding add kar di hai */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug flex flex-wrap items-center">
        <span>Speed Car Wash for&nbsp;</span>
        
        {/* Fixed minimum width container taaki width jump na ho */}
        <span className="inline-block overflow-hidden align-bottom h-[1.3em] min-w-[100px] text-center px-1">
          <span 
            className={`inline-block text-red-600 transition-all duration-300 transform ${
              fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {words[currentIndex]}
          </span>
        </span>
        
        <span className="ml-1">Cars in hassle free way...</span>
      </h2>
    </div>
  );
}