import Navbar from "./components/Navbar";
import BookingForm from "./components/Form";
import ProductsSection from "./components/Products";
import Footer from "./components/Footer";
import EnquiryWidget from "./components/EnquiryWidget";
import HeroSlider from "./components/HeroSlider";
import { ServicesLayout } from "./pages/About";

export default function SpeedCarWashLanding() {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 antialiased">
      <Navbar />
      <EnquiryWidget />
      <section className="relative text-white overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <HeroSlider />
        </div>
        <div className="bg-blue-600 mt-12 py-3 text-center text-sm font-medium tracking-wide">
          Rome wasn't built in a day. But your car will be washed in{" "}
          <span className="text-yellow-400 font-bold">20 minutes!!</span>{" "}
          &nbsp;|&nbsp;
          <span className="underline cursor-pointer">
            Check out our packages and addons included.
          </span>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Grid Layout: Left Cards (2) | Center Text | Right Cards (2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 2 Cards */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  title: "Best Experience",
                  image: "https://www.speedcarwash.com/img/f2.png",
                },
                {
                  title: "Shiny Cars",
                  image: "https://www.speedcarwash.com/img/f5.png",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
                >
                  <div className="w-20 h-20 bg-blue-50/80 rounded-2xl mb-3 flex items-center justify-center overflow-hidden border border-blue-100 group-hover:bg-blue-100/50 transition-colors duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xs md:text-sm text-center group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Center Text Area */}
            <div className="lg:col-span-6 text-center px-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
                Speed Car Wash for{" "}
                <span className="text-blue-600">Sparkling</span> Cars in a
                Hassle-Free Way...
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Speed Car Wash is a brand which is literally going to change the
                way people think about car cleaning. It is a unique mechanized
                car cleaning concept where cars are getting pampered by the
                latest equipments including high pressure cleaning machines,
                spray injection and extraction machines, high powered vacuum
                cleaners, steam cleaners and so on.
              </p>
            </div>

            {/* Right 2 Cards */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  title: "Clean Cars",
                  image: "https://www.speedcarwash.com/img/f1.png",
                },
                {
                  title: "Affordable Prices",
                  image: "https://www.speedcarwash.com/img/f3.png",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
                >
                  <div className="w-20 h-20 bg-blue-50/80 rounded-2xl mb-3 flex items-center justify-center overflow-hidden border border-blue-100 group-hover:bg-blue-100/50 transition-colors duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xs md:text-sm text-center group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Speed Car Wash Services</h2>
          <p className="text-sm text-red-600 font-semibold mb-10 tracking-widest">
            LOVE YOUR CAR. WE MAKE IT MORE ADORABLE.
          </p>

          <ServicesLayout/>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-2 mb-6 md:mb-0">
            <span className="bg-red-600 text-xs px-2 py-1 font-bold rounded uppercase">
              Limited Period Offer
            </span>
            <h3 className="text-2xl font-extrabold">
              IT'S A LOOT, GRAB A BOOKLET TODAY
            </h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>✔ Transferable to any one</li>
              <li>✔ Valid For 2 year</li>
              <li>✔ Cashless and Online Payment Options</li>
            </ul>
          </div>
          <button className="bg-blue-600 px-6 py-3 font-bold rounded text-sm hover:bg-blue-500 shadow">
            Grab Booklet
          </button>
        </div>
      </section>

      <ProductsSection />

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase font-bold text-red-600 mb-1">
            you're not the only one excited about your clean car...
          </p>
          <h2 className="text-2xl font-bold mb-8">
            What Customer's & Client's Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded shadow-xs border">
              <p className="text-xs italic text-gray-600 mb-4">
                "I am impressed with the way of cleaning particularly under body
                wash without lifting. I am Amazed.."
              </p>
              <span className="font-bold text-xs text-blue-900">
                - Rajesh Garg
              </span>
            </div>
            <div className="bg-white p-6 rounded shadow-xs border">
              <p className="text-xs italic text-gray-600 mb-4">
                "We are very happy with installation and training team. They
                have provided good hands on experience..."
              </p>
              <span className="font-bold text-xs text-blue-900">
                - SCW Client Support
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-5" id="booking-form"></div>
      <BookingForm />

      <Footer />
    </div>
  );
}
