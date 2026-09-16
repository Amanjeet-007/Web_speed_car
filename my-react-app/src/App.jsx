import Navbar from "./components/Navbar";
import BookingForm from "./components/Form";
import ProductsSection from "./components/Products";
import Footer from "./components/Footer";
import EnquiryWidget from "./components/EnquiryWidget";
import HeroRotatingText from "./components/RotatingText";
import HeroSlider from "./components/HeroSlider";

export default function SpeedCarWashLanding() {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 antialiased">
      <Navbar/>
      <EnquiryWidget />
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white overflow-hidden py-16">

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <HeroSlider />
        </div>
        <div className="bg-black/30 mt-12 py-3 text-center text-sm font-medium tracking-wide">
          Rome wasn't built in a day. But your car will be washed in{" "}
          <span className="text-yellow-400 font-bold">20 minutes!!</span>{" "}
          &nbsp;|&nbsp;
          <span className="underline cursor-pointer">
            Check out our packages and addons included.
          </span>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 text-center">
          

    <div className="max-w-3xl mx-auto flex items-center ">
    <HeroRotatingText/>

    </div>
        <p className="max-w-3xl mx-auto text-gray-600 text-start text-sm md:text-base leading-relaxed mb-12">
          Speed Car Wash is a brand which is literally going to change the way
          people think about car cleaning. It is a unique mechanized car
          cleaning concept where cars are getting pampered by the latest
          equipments including high pressure cleaning machines, spray injection
          and extraction machines, high powered vacuum cleaners, steam cleaners
          and so on.
        </p>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Best Experience",
              image: "https://www.speedcarwash.com/img/f2.png", // Yahan aap apni baaki images ke links bhi daal sakte hain
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
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-red-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-700">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Speed Car Wash Services</h2>
          <p className="text-sm text-red-600 font-semibold mb-10 tracking-widest">
            LOVE YOUR CAR. WE MAKE IT MORE ADORABLE.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
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
            ].map((service, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex flex-col justify-between shadow-xs bg-white"
              >
                <div>
                  <div className="h-36 mb-4 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <h3 className="font-bold text-sm mb-2 text-blue-900">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">{service.desc}</p>
                </div>
                <button className="w-full bg-blue-600 text-white text-xs py-2 font-bold rounded hover:bg-blue-700">
                  Know More
                </button>
              </div>
            ))}
          </div>
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

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Franchise With Us</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              When India is teaming with glowing and enthusiastic business
              opportunities, car washing business can bang the Indian market.
              The country where innumerable cars are catching sights of people,
              smart car wash can wrap up the opportunity. This venture is
              entirely dedicated towards spreading the awareness among car users
              about their car hygiene habits, cleanliness, durability of
              exterior look and other common cleaning tips. Although it is an
              unorganized sector till date, a new and organized way of car
              washing can create the difference.{" "}
              <span className="text-blue-600 font-semibold cursor-pointer">
                Know More
              </span>
            </p>
            <div className="h-64 bg-gray-100 rounded-lg overflow-hidden border shadow-sm flex items-center justify-center">
              <img
                src="https://www.speedcarwash.com/img/fr1.png"
                alt="Franchise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-bold border-b pb-2">and more...</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <h4 className="font-bold text-sm text-blue-900">
                  Become Our Franchise
                </h4>
                <p className="text-xs text-gray-500">
                  Speed Car Wash franchisees do not need any prior technical
                  experience to effectively operate a franchise.{" "}
                  <span className="text-blue-600 font-semibold">Apply Now</span>
                </p>
              </div>
              <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <h4 className="font-bold text-sm text-blue-900">
                  Rent your Property
                </h4>
                <p className="text-xs text-gray-500">
                  Having commercial space and planning to rent it to
                  professionals?
                </p>
              </div>
              <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <h4 className="font-bold text-sm text-blue-900">
                  Locate Our Outlets
                </h4>
                <p className="text-xs text-gray-500">
                  Speed Car Wash has a number of outlets across India.
                </p>
              </div>
            </div>
          </div>
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
      <BookingForm />

      <Footer/>
    </div>
  );
}
