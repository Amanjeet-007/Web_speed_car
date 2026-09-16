import Navbar from "../components/Navbar";
import HeroRotatingText from "../components/RotatingText";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export function ServicesLayout() {
  const services = [
    {
      title: "SCW WASHING",
      desc: "Speed Car Wash is offering a wide range of washing services to car owners including top wash...",
      image: "https://www.speedcarwash.com/img/s1.png",
    },
    {
      title: "SCW QUICK SERVICE",
      desc: "As a Speed Service Point (SSP), we pledge to provide high quality automotive maintenance services...",
      image: "https://www.speedcarwash.com/img/s2.png",
    },
    {
      title: "SCW DETAILING",
      desc: "Primary motive to serve our customers with professional car detailing service with internationally approved standards...",
      image: "https://www.speedcarwash.com/img/s3.png",
    },
    {
      title: "SCW WRAPPING",
      desc: "Our network of trained SCW Vehicle Wrappers can help you create impactful vehicle branding...",
      image: "https://www.speedcarwash.com/img/s4.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="h-36 mb-5 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm mb-2 text-blue-900 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white text-xs py-2.5 font-bold rounded-full hover:bg-blue-700 transition">
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 mb-2">
            <Link to={"/"}>
              <span className="hover:underline cursor-pointer">Home</span>
            </Link>{" "}
            / About Us
          </p>
          <h1 className="text-3xl font-extrabold tracking-wide">About Us</h1>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Intro + Franchise banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center mb-24">
            <div className="lg:col-span-2 space-y-5">
              <HeroRotatingText />

              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-blue-900 font-bold">
                  Speed Car Wash
                </strong>{" "}
                is a brand which is literally going to change the way people
                think about car cleaning. It is a unique mechanized car cleaning
                concept where cars are getting pampered by the latest equipments
                including high pressure cleaning machines, spray injection and
                extraction machines, high powered vacuum cleaners, steam
                cleaners and so on.
              </p>
            </div>

            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-red-600" />
              <img
                src="https://www.speedcarwash.com/images/franchising.png"
                alt="Franchise with us"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Who We Are */}
          <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl shadow-sm mb-24">
            <h3 className="text-lg font-extrabold text-blue-900 mb-6 uppercase tracking-wider">
              Who We Are
            </h3>
            <div className="space-y-5 text-sm text-gray-600 leading-loose">
              <p>
                Welcome to Speed Car Wash a concept developed by LIV INDIA to
                organize the Car Cleaning segment to give the community a new
                definition of car care and detailing services which are not
                professionally followed in India. Based at Delhi our endeavour
                is to spread the awareness amongst car users about the Clean Car
                Culture & Car Hygiene.
              </p>
              <p>
                Speed Car Wash is a brand which is literally going to change the
                way people think about car cleaning. It is a unique mechanized
                car cleaning concept where cars are getting pampered by the
                latest equipments including high pressure cleaning machines,
                spray injection and extraction machines, high powered vacuum
                cleaners, steam cleaners and so on.
              </p>
              <p>
                In this fast moving life today we tend to spend more time in
                travelling as a result spend hours in the car, navigating the
                traffic jams. Air Pollution, Dust, Rain, Sunlight and Adverse
                road conditions all keeps adding on woos of common car users.
                And as a result, there is a severe need of Professional Car
                Cleaning Organization to take care of all Car Cleaning jobs and
                give us the finest and ultimate car cleaning experience and
                satisfaction.
              </p>
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
                Clean Car Culture, we have strong belief that our efforts will
                not only please you but definitely surprise you.
              </p>
            </div>
          </div>

          {/* Sparkling section */}
          <section className="py-8 mb-24 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Speed Car Wash for{" "}
              <span className="text-blue-600">Sparkling</span> Cars in hassle
              free way...
            </h2>
            <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed mb-14">
              Speed Car Wash is a brand which is literally going to change the
              way people think about car cleaning. It is a unique mechanized
              car cleaning concept where cars are getting pampered by the
              latest equipments including high pressure cleaning machines,
              spray injection and extraction machines, high powered vacuum
              cleaners, steam cleaners and so on.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Best Experience",
                  image: "https://www.speedcarwash.com/img/f2.png",
                },
                {
                  title: "Affordable Prices",
                  image: "https://www.speedcarwash.com/img/f3.png",
                },
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
                  className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-700 text-sm">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Services We Offer */}
          <div className="text-center relative py-14 bg-red-50/50 rounded-3xl">
            <h3 className="text-2xl font-extrabold text-blue-900 mb-8">
              Services We Offer
            </h3>
            <ServicesLayout />
            <p className="text-xs text-gray-500 mt-6 italic">
              "Because your car deserves the absolute best care and pampering."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}