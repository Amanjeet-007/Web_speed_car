import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { servicesData, hindiDictionary } from "../components/servicesData";
import { getPriceBreakdown } from "../assets/pricing";

export default function Service() {
  const { type, name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("Sedan");
  const [lang, setLang] = useState("en");

  const categories = [
    "Hatchback",
    "Sedan",
    "Compact SUV",
    "Full SUV",
    "Luxury",
  ];

  const decodedName = decodeURIComponent(name || "").trim();
  const categoryData = servicesData[type] || servicesData.washing;

  const item_details = categoryData?.servicesList?.find(
    (item) => item.title.toUpperCase() === decodedName.toUpperCase(),
  );

  if (!item_details) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Service not found!
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const pricing = getPriceBreakdown
    ? getPriceBreakdown(item_details.title, selectedCategory)
    : null;

  // Check karein ki price valid hai ya nahi (> 0)
  const hasPrice = pricing && pricing.categoryPrice && pricing.categoryPrice > 0;

  const descriptionListEn = item_details.description
    ? item_details.description
        .split("+")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const descriptionListHi = descriptionListEn.map((item) => {
    return hindiDictionary[item] || item;
  });

  const activeDescriptionList =
    lang === "en" ? descriptionListEn : descriptionListHi;

  const displayTitle =
    lang === "en"
      ? item_details.title
      : hindiDictionary[item_details.title] || item_details.title;
  const displayTime =
    lang === "en"
      ? item_details.time
      : hindiDictionary[item_details.time] || item_details.time;

  const handleAddToCart = () => {
    const cartItem = {
      title: item_details.title,
      category: selectedCategory,
      price: hasPrice ? pricing.categoryPrice : 0,
      time: item_details.time,
      image: item_details.image,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 font-sans min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="text-xs text-gray-400 mb-6">
            Home / Services /{" "}
            {lang === "hi"
              ? hindiDictionary[categoryData.title] || categoryData.title
              : categoryData.title}{" "}
            / <span className="text-gray-700 font-medium">{displayTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <img
                src={item_details.image}
                alt={displayTitle}
                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-sm"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {displayTitle}
                </h1>
                <p className="text-xs md:text-sm font-semibold text-red-500 mt-1.5">
                  {displayTime}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {lang === "en"
                      ? "What's Included:"
                      : "इस सर्विस में क्या-क्या शामिल है:"}
                  </h3>

                  <div className="flex bg-gray-200 rounded-lg p-0.5 text-[10px] font-bold">
                    <button
                      onClick={() => setLang("en")}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                        lang === "en"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600"
                      }`}
                    >
                      ENG
                    </button>
                    <button
                      onClick={() => setLang("hi")}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                        lang === "hi"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600"
                      }`}
                    >
                      HINDI
                    </button>
                  </div>
                </div>

                <ul className="list-disc pl-5 space-y-2">
                  {activeDescriptionList.map((feature, index) => (
                    <li
                      key={index}
                      className="text-xs md:text-sm text-gray-600 leading-relaxed"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    {lang === "en"
                      ? "Select Car Type:"
                      : "अपनी कार का प्रकार चुनें:"}
                  </span>
                  
                  {/* Price display condition */}
                  {hasPrice ? (
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-green-600">
                        ₹{pricing.categoryPrice}
                      </span>
                      <span className="block text-[10px] text-gray-400">
                        {pricing.surchargeLabel}
                      </span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-gray-500 uppercase tracking-wide">
                        Price on request
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold py-3.5 rounded-xl transition cursor-pointer shadow-md uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>
                    {lang === "en" ? "Book That Service" : "यह सर्विस बुक करें"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}