import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryWidget from "../components/EnquiryWidget";

// Saare blogs yahan ek array mein store hain
const ALL_BLOGS = [
  {
    id: 816,
    title: "How Profitable is a Car Wash Business in India",
    slug: "how-profitable-is-a-car-wash-in-india",
    dateDay: "15",
    dateMonth: "Mar",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2022/03/car-wash-franchise.jpg",
    excerpt: "How Profitable is a Car Wash in India? Well, Car Wash has always been profitable since decades. But with rising volume of car lovers and technology enhancement it has become more lucrative...",
    author: "Speed Car Wash",
    categories: ["best business", "Franchise", "trends"],
  },
  {
    id: 810,
    title: "COMMON QUERIES RELATED TO CAR SPA THAT CERTAINLY NEED A SOLUTION",
    slug: "common-queries-related-car-spa-certainly-need-solution",
    dateDay: "08",
    dateMonth: "Jan",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2021/01/First-service-car-1-720x445.jpg",
    excerpt: "Regular automobile service and maintenance are important to make positive that your automobile is in the best condition...",
    author: "Speed Car Wash",
    categories: ["best business", "Car Care Tips", "Franchise"],
  },
  {
    id: 115,
    title: "6 Keys To Unlock Your Future Business",
    slug: "best-business-plan-concluded-by-speed-car-wash",
    dateDay: "18",
    dateMonth: "Dec",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2016/11/6-keys-success-speed-car-wash-1140x445.png",
    excerpt: "Entrepreneurship is not for everyone. If you are interested and have a rough idea in place, here is how you can add perspective to your scheme...",
    author: "Speed Car Wash",
    categories: ["Franchise"],
  },
  {
    id: 801,
    title: "What new about High Security Number Plates? Does your vehicle really need It?",
    slug: "new-high-security-number-plates-vehicle-really-need",
    dateDay: "15",
    dateMonth: "Dec",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2020/12/What-new-about-High-Security-Number-Plates-1140x445.png",
    excerpt: "The Delhi transport department's order to drivers and riders to affix their vehicles with high-security registration plate has created a stir...",
    author: "Speed Car Wash",
    categories: ["Entrepreneur", "NEWZ"],
  },
  {
    id: 130,
    title: "5 Ways To Make Your Carwash Or Detailing Franchise Business A Success",
    slug: "make-your-car-detailing-business-a-success",
    dateDay: "12",
    dateMonth: "Dec",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2016/12/success-franchise-1140x445.gif",
    excerpt: "Look Bigger Than You Really Are. When I thought of the idea to start my auto detailing business, I knew that since I was just a one man operation...",
    author: "Speed Car Wash",
    categories: ["Franchise"],
  },
];

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const currentPage = parseInt(pageNumber) || 1;
  const totalPages = Math.ceil(ALL_BLOGS.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = ALL_BLOGS.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        
        {/* Modern Blue Gradient Header Banner */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 overflow-hidden shadow-md">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-xs text-blue-200 mb-2 font-medium">
              <Link to={"/"}><span className="hover:underline text-white">Home</span></Link> / Blog {currentPage > 1 && `/ Page ${currentPage}`}
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">Our Blogs & Insights</h1>
            <p className="text-blue-100/80 text-sm mt-2 max-w-xl">
              Stay updated with the latest car care trends, business tips, and detailing guides.
            </p>
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Main Content (Blog Cards Grid / List) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-3/4"
            >
              <div className="space-y-8">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((post) => (
                    <article 
                      key={post.id} 
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
                    >
                      {/* Image & Date Badge Container */}
                      <div className="w-full md:w-5/12 relative bg-gray-100 overflow-hidden min-h-[220px]">
                        {/* Date Badge */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-center px-3 py-1.5 rounded-xl z-10 shadow-md">
                          <span className="block text-base font-black leading-none">{post.dateDay}</span>
                          <span className="block text-[10px] uppercase font-bold tracking-wider">{post.dateMonth}</span>
                        </div>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.categories.map((cat, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {cat}
                              </span>
                            ))}
                          </div>

                          <h2 className="text-lg md:text-xl font-black text-blue-900 mb-3 group-hover:text-blue-600 transition leading-snug">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs">
                          <span className="text-gray-500 font-medium">By <strong className="text-gray-800">{post.author}</strong></span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md shadow-blue-600/20 transition flex items-center space-x-1"
                          >
                            <span>Read More</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-semibold text-sm">No blogs found at the moment.</p>
                  </div>
                )}
              </div>

              {/* Dynamic Pagination Component */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => navigate(pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition shadow-sm ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-blue-600/30"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {currentPage < totalPages && (
                    <button
                      onClick={() => navigate(`/blog/page/${currentPage + 1}`)}
                      className="px-4 h-10 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs hover:bg-gray-50 font-bold shadow-sm transition"
                    >
                      Next →
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Sidebar (3 Columns) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full lg:w-1/4 space-y-8"
            >
              {/* Recent Posts Widget */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-blue-900 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">Recent Posts</h3>
                <ul className="space-y-3.5 text-xs">
                  {ALL_BLOGS.slice(0, 5).map((post) => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="text-gray-600 hover:text-blue-600 font-semibold transition block leading-snug">
                        › {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Franchise Menu & Banners */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-blue-900 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">Franchise Menu</h3>
                <ul className="space-y-3 text-xs font-bold text-gray-600">
                  <li className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                    <Link to="/franchise/">› Franchisee Business</Link>
                  </li>
                  <li>
                    <Link to="/franchise/why-speed-car-wash" className="hover:text-blue-600 transition block px-2 py-1">› Why Speed Car Wash ?</Link>
                  </li>
                  <li>
                    <Link to="/franchise/our-support-system" className="hover:text-blue-600 transition block px-2 py-1">› Our Support System</Link>
                  </li>
                  <li>
                    <Link to="/franchise/apply-for-franchise" className="hover:text-blue-600 transition block px-2 py-1">› Apply Online</Link>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
      <EnquiryWidget />
    </>
  );
}