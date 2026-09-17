
export default function ProductsSection() {
  const products = [
    { name: "Dashboard Polish", img: "https://www.speedcarwash.com/images/web-product/1.JPG" },
    { name: "Tyre Tonic", img: "https://www.speedcarwash.com/images/web-product/2.JPG" },
    { name: "Glass Gloss", img: "https://www.speedcarwash.com/images/web-product/3.JPG" },
    { name: "Car Shampoo", img: "https://www.speedcarwash.com/images/web-product/4.JPG" },
    { name: "Microfiber Cloth", img: "https://www.speedcarwash.com/images/web-product/5.JPG" },
    { name: "Micro Fiber Glove", img: "https://www.speedcarwash.com/images/web-product/6.JPG" },
    { name: "Micro Fiber Towel", img: "https://www.speedcarwash.com/images/web-product/7.JPG" },
    { name: "Green Apple Form", img: "https://www.speedcarwash.com/images/web-product/8.JPG" },
  ];

  return (
    <section className="py-16 bg-white border-t overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Speed Car Wash Products</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex space-x-6 animate-marquee whitespace-nowrap py-4">
          {[...products, ...products, ...products].map((product, idx) => (
            <div
              key={idx}
              className="group relative min-w-[220px] bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-between shrink-0 overflow-hidden transition-all duration-300"
            >
              <div className="h-40 w-full bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden p-2 relative cursor-pointer">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="h-full w-auto object-contain transition duration-300" 
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black text-white text-xs font-bold px-4 py-2 rounded shadow-lg tracking-wide uppercase">
                    View Details
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-gray-800">
                {product.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}