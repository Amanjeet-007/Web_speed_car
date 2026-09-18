import Navbar from "../components/Navbar";
import HeroRotatingText from "../components/RotatingText";
import Footer from "../components/Footer";
import { Link ,  useNavigate } from "react-router-dom";

export function ServicesLayout() {
  const navigate = useNavigate();

  const services = [
    {
      title: "SCW WASHING",
      desc: "Speed Car Wash is offering a wide range of washing services to car owners including top wash...",
      image: "https://www.speedcarwash.com/img/s1.png",
      path: "/services/washing",
    },
    {
      title: "SCW QUICK SERVICE",
      desc: "As a Speed Service Point (SSP), we pledge to provide high quality automotive maintenance services...",
      image: "https://www.speedcarwash.com/img/s2.png",
      // Quick service click par home page ke booking form par scroll karne ke liye
      isBooking: true, 
    },
    {
      title: "SCW DETAILING",
      desc: "Primary motive to serve our customers with professional car detailing service with internationally approved standards...",
      image: "https://www.speedcarwash.com/img/s3.png",
      path: "/services/detailing",
    },
    {
      title: "SCW WRAPPING",
      desc: "Our network of trained SCW Vehicle Wrappers can help you create impactful vehicle branding...",
      image: "https://www.speedcarwash.com/img/s4.png",
      path: "/services/wrapping",
    },
  ];

  const handleServiceClick = (service) => {
    if (service.isBooking) {
      navigate("/");
      setTimeout(() => {
        const bookingElement = document.getElementById("booking-form");
        if (bookingElement) {
          bookingElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(service.path);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      {services.map((service, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 flex flex-col justify-between bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-blue-50 group hover:-translate-y-1"
        >
          <div>
            <div className="h-40 mb-4 rounded-xl overflow-hidden flex items-center justify-center bg-blue-50/50">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-extrabold text-sm mb-2 text-blue-900 tracking-wide">
              {service.title}
            </h3>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              {service.desc}
            </p>
          </div>

          <button 
            onClick={() => handleServiceClick(service)}
            className="w-full bg-blue-600 text-white text-xs py-3 font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            Know More →
          </button>
        </div>
      ))}
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />

      {/* Modern Hero Banner with Blue Gradient */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 overflow-hidden shadow-lg">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs text-blue-200 mb-3 font-medium">
            <Link to={"/"}>
              <span className="hover:underline cursor-pointer text-white">
                Home
              </span>
            </Link>{" "}
            / About Us
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            About Our Brand
          </h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xl">
            Redefining car care and detailing standards across India with
            mechanized perfection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* Intro Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Welcome to Speed Car Wash
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-blue-900">
              <HeroRotatingText />
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              <strong className="text-blue-900 font-bold">
                Speed Car Wash
              </strong>{" "}
              is a brand which is literally going to change the way people think
              about car cleaning. It is a unique mechanized car cleaning concept
              where cars are getting pampered by the latest equipments including
              high pressure cleaning machines, spray injection and extraction
              machines, high powered vacuum cleaners, steam cleaners and so on.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-blue-50 group">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent z-10"></div>
            <img
              src="./car.webp"
              alt="car"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-4 left-4 z-20 text-white font-bold text-sm bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-lg">
              Next-Gen Care 🚗
            </span>
          </div>
        </div>

        {/* Who We Are - Grid Cards style */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-xl font-black text-white mb-8 uppercase tracking-wider flex items-center gap-3">
            <span className="w-3 h-3 bg-blue-400 rounded-full inline-block"></span>
            Who We Are
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-blue-100/90 leading-relaxed">
            <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p>
                Welcome to Speed Car Wash a concept developed by{" "}
                <strong className="text-white">LIV INDIA</strong> to organize
                the Car Cleaning segment to give the community a new definition
                of car care and detailing services which are not professionally
                followed in India. Based at Delhi our endeavour is to spread the
                awareness amongst car users about the Clean Car Culture & Car
                Hygiene.
              </p>
              <p>
                In this fast moving life today we tend to spend more time in
                travelling as a result spend hours in the car, navigating the
                traffic jams. Air Pollution, Dust, Rain, Sunlight and Adverse
                road conditions all keeps adding on woos of common car users.
              </p>
            </div>

            <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p>
                Speed Car Wash is here to stay and work dedicatedly towards
                spreading the awareness among car users about their car hygiene
                habits, cleanliness, durability of exterior look and other
                common cleaning tips.
              </p>
              <p>
                At Speed Car Wash we do a plethora of research on the car care
                and maintenance, the aim is to deliver best of service and bring
                in new concept to the car market. In the beginning we are
                focusing on educating our customers about the whole concept of
                Clean Car Culture.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section: Left (2) | Center (Text) | Right (2) */}
        <section className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 2 Cards */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  title: "Best Experience",
                  image: "https://www.speedcarwash.com/img/f2.png",
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

            {/* Center Text Area */}
            <div className="lg:col-span-6 text-center px-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
                Speed Car Wash for <span className="text-blue-600">Sparkling</span>{" "}
                Cars in a Hassle-Free Way...
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Speed Car Wash is a brand which is literally going to change the way
                people think about car cleaning. It is a unique mechanized car
                cleaning concept where cars are getting pampered by the latest
                equipments including high pressure cleaning machines, spray injection
                and extraction machines, high powered vacuum cleaners, steam cleaners
                and so on.
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

          </div>
        </section>

        {/* Services We Offer Section */}
        <div className="bg-blue-50/60 p-8 sm:p-12 rounded-3xl border border-blue-100">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
              Our Expertise
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-3">
              Services We Offer
            </h3>
          </div>

          <ServicesLayout />

          <p className="text-xs text-gray-500 mt-10 text-center italic font-medium">
            "Because your car deserves the absolute best care and pampering."
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}