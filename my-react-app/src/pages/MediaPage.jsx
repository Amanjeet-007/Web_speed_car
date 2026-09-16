import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryWidget from "../components/EnquiryWidget";

export default function MediaPage() {
  const mediaData = {
    press: [
      {
        thumb: "https://www.speedcarwash.com/images/gallery/15 March_Dainik Jagran_Pg6-1-200x200.PNG",
        large: "https://www.speedcarwash.com/images/gallery/15 March_Dainik Jagran_Pg6-1.PNG",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/Avenue Mail-1-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/Avenue Mail-1.jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/15 March_Prabhat Khabar_Pg11-1-200x200.PNG",
        large: "https://www.speedcarwash.com/images/gallery/15 March_Prabhat Khabar_Pg11-1.PNG",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/Dainik Bhaskar-1-200x200.jpeg",
        large: "https://www.speedcarwash.com/images/gallery/Dainik Bhaskar-1.jpeg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/SPEED CAR - KESARI -PG- 03 - NOV- 23-200x200.png",
        large: "https://www.speedcarwash.com/images/gallery/SPEED CAR - KESARI -PG- 03 - NOV- 23.png",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/CAR WASH - LOKPATRA - PG- 08 - NOV-  25-1-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/CAR WASH - LOKPATRA - PG- 08 - NOV-  25-1.jpg",
      },
    ],
    glimpses: [
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (3)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (3).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (4)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (4).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (5)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (5).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (6)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (6).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (7)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (7).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (9)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (9).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (11)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (11).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (10)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (10).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (14)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (14).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (15)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (15).jpg",
      },
      {
        thumb: "https://www.speedcarwash.com/images/gallery/diqali-1 (16)-200x200.jpg",
        large: "https://www.speedcarwash.com/images/gallery/diqali-1 (16).jpg",
      },
    ],
    videos: [
      {
        thumb: "https://i.ytimg.com/vi/nf5psdvfJOA/default.jpg",
        videoUrl: "https://www.youtube.com/embed/nf5psdvfJOA",
        isVideo: true,
      },
      {
        thumb: "https://i.ytimg.com/vi/SrwsReoVZ3s/default.jpg",
        videoUrl: "https://www.youtube.com/embed/SrwsReoVZ3s",
        isVideo: true,
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("press");
  const [selectedItem, setSelectedItem] = useState(mediaData.press[0]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    const list = mediaData[tabName];
    if (list && list.length > 0) {
      setSelectedItem(list[0]);
    } else {
      setSelectedItem(null);
    }
  };

  const currentItems = mediaData[activeTab] || [];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        {/* Header Section */}
        <div className="bg-black text-white py-8 px-6 shadow-md">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-gray-400 mb-1">
              <Link to={"/"}>
                <span className="hover:underline cursor-pointer">Home</span>
              </Link>{" "}
              / Media
            </p>
            <h1 className="text-3xl font-extrabold tracking-wide">Media</h1>
          </div>
        </div>

        {/* Main Content Layout (Grid 9:3) */}
        <div className="max-w-7xl mx-auto px-4 pb-16 pt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Section: Gallery View (9 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-3/4 flex flex-col items-center"
            >
              {/* Filter Buttons */}
              <div className="flex space-x-3 mb-8">
                <button
                  onClick={() => handleTabChange("press")}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer ${
                    activeTab === "press"
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Press
                </button>
                <button
                  onClick={() => handleTabChange("glimpses")}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer ${
                    activeTab === "glimpses"
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Glimpses
                </button>
                <button
                  onClick={() => handleTabChange("videos")}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer ${
                    activeTab === "videos"
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Videos
                </button>
              </div>

              {/* Gallery Display Box */}
              <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-xl bg-black flex flex-col md:flex-row h-auto lg:h-[480px]">
                
                {/* Main Large Preview (Left Side) */}
                <div className="w-full md:w-3/5 h-[300px] md:h-full bg-black flex items-center justify-center relative overflow-hidden p-3">
                  {selectedItem ? (
                    selectedItem.isVideo ? (
                      <iframe
                        src={selectedItem.videoUrl}
                        title="YouTube video player"
                        className="w-full h-full rounded"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <motion.img
                        key={selectedItem.large}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={selectedItem.large}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    )
                  ) : (
                    <p className="text-gray-400 text-xs">No media available in this section</p>
                  )}
                </div>

                {/* Thumbnails Scrollable Grid (Right Side) */}
                <div className="w-full md:w-2/5 bg-white border-t md:border-t-0 md:border-l border-gray-200 p-4 overflow-y-auto max-h-[350px] md:max-h-full">
                  {currentItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {currentItems.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedItem(item)}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all relative ${
                            selectedItem?.thumb === item.thumb
                              ? "border-blue-600 shadow-md scale-95 ring-2 ring-blue-400/20"
                              : "border-transparent hover:opacity-80"
                          }`}
                        >
                          <img
                            src={item.thumb}
                            alt="thumb"
                            className="w-full h-20 object-cover bg-gray-100"
                          />
                          {item.isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <span className="text-white text-[10px] font-bold bg-red-600 px-1.5 py-0.5 rounded shadow">
                                ▶ Video
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs text-center mt-20">No thumbnails found</p>
                  )}
                </div>

              </div>
            </motion.div>

            {/* Right Sidebar (3 Columns) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full lg:w-1/4"
            >
              <aside className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <h4 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">
                  Categories
                </h4>
                <ul className="space-y-3 text-xs font-medium text-gray-600">
                  <li>
                    <a href="/speedexclusive/refer-to-friend" className="hover:text-blue-600 transition block">
                      › Refer Your Friend
                    </a>
                  </li>
                  <li>
                    <a href="/speedexclusive/scheme-offers" className="hover:text-blue-600 transition block">
                      › Schemes & Offers
                    </a>
                  </li>
                  <li>
                    <a href="/speedexclusive/latest-news" className="hover:text-blue-600 transition block">
                      › Latest News
                    </a>
                  </li>
                  <li className="text-blue-600 font-bold bg-blue-50 p-2 rounded-lg shadow-sm">
                    <a href="/speedexclusive/media" className="block">
                      › Media
                    </a>
                  </li>
                  <li>
                    <a href="/speedexclusive/membership" className="hover:text-blue-600 transition block">
                      › Membership (Join Our Club)
                    </a>
                  </li>
                  <li>
                    <a href="/speedexclusive/car-care-tips" className="hover:text-blue-600 transition block">
                      › Car Care Tips
                    </a>
                  </li>
                </ul>

                <hr className="my-5 border-gray-100" />

                {/* Sidebar Banners */}
                <div className="space-y-4">
                  <a href="/scw-washing" className="block overflow-hidden rounded-xl shadow hover:scale-105 transition duration-300">
                    <img src="https://www.speedcarwash.com/images/book-a-wash.png" alt="Book a Wash" className="w-full object-cover" />
                  </a>
                  <a href="/franchise/apply-for-franchise" className="block overflow-hidden rounded-xl shadow hover:scale-105 transition duration-300">
                    <img src="https://www.speedcarwash.com/images/franchising.png" alt="Franchising" className="w-full object-cover" />
                  </a>
                  <a href="/scw-detailing" className="block overflow-hidden rounded-xl shadow hover:scale-105 transition duration-300">
                    <img src="https://www.speedcarwash.com/images/car-detailing.jpg" alt="Car Detailing" className="w-full object-cover" />
                  </a>
                  <a href="/speedexclusive/refer-to-friend" className="block overflow-hidden rounded-xl shadow hover:scale-105 transition duration-300">
                    <img src="https://www.speedcarwash.com/img/refer-a-friends.jpg" alt="Refer a Friend" className="w-full object-cover" />
                  </a>
                </div>
              </aside>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
      <EnquiryWidget />
    </>
  );
}