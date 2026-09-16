import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryWidget from "../components/EnquiryWidget";

// Saare blogs yahan ek array mein store kar do (Aap yahan kitne bhi naye blogs add kar sakte hain)
const ALL_BLOGS = [
  {
    id: 816,
    title: "How Profitable is a Car Wash Business in India",
    slug: "how-profitable-is-a-car-wash-in-india",
    dateDay: "15",
    dateMonth: "Mar",
    image: "https://www.speedcarwash.com/blog/wp-content/uploads/2022/03/car-wash-franchise.jpg",
    excerpt: "How Profitable is a Car Wash in India ? Well, Car Wash has always been profitable since decades. But with rising volume of car lovers and technology enhancement it has become more lucrative...",
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
    excerpt: "Regular automobile service and maintenance square measure important to form positive that your automobile is within the best condition...",
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
    excerpt: "The Delhi transport department's order to drivers and riders to affix their vehicles with high-security registration plate (HSRP) has created a stir...",
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
  // Aap yahan aur bhi naye blogs add kar sakte hain, pagination apne aap adjust ho jayegi!
];

const POSTS_PER_PAGE = 3; // Ek page par kitne blogs dikhane hain

export default function BlogPage() {
  const { pageNumber } = useParams(); // URL se page number pakdega (jaise /blog/page/2)
  const navigate = useNavigate();

  const currentPage = parseInt(pageNumber) || 1;
  const totalPages = Math.ceil(ALL_BLOGS.length / POSTS_PER_PAGE);

  // Current page ke hisaab se blogs slice karna
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = ALL_BLOGS.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 font-sans min-h-screen">
        {/* Page Header */}
        <div className="bg-black text-white py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-gray-400 mb-1">
              <Link to={"/"}><span className="hover:underline">Home</span></Link> / Blog {currentPage > 1 && `/ Page ${currentPage}`}
            </p>
            <h1 className="text-3xl font-extrabold tracking-wide">Blog</h1>
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Main Content (9 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-3/4"
            >
              <div className="space-y-12">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((post) => (
                    <article key={post.id} className="border-b pb-10 flex flex-col md:flex-row gap-6 relative">
                      {/* Date Badge */}
                      <div className="absolute top-0 left-0 bg-blue-600 text-white text-center px-3 py-1.5 rounded-br-lg z-10 shadow">
                        <span className="block text-lg font-bold leading-none">{post.dateDay}</span>
                        <span className="block text-[10px] uppercase tracking-wider">{post.dateMonth}</span>
                      </div>

                      {/* Image */}
                      <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md bg-gray-100 h-64 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-gray-600 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                        </div>

                        <div className="border-t pt-3 text-xs text-gray-500 space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <span>By <strong className="text-gray-700">{post.author}</strong></span>
                            <span>•</span>
                            <span>In <span className="text-blue-600">{post.categories.join(", ")}</span></span>
                          </div>
                          <div>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-700 transition"
                            >
                              Read more...
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10">No blogs found.</p>
                )}
              </div>

              {/* Dynamic Pagination Component */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-10">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => navigate(pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`)}
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {currentPage < totalPages && (
                    <button
                      onClick={() => navigate(`/blog/page/${currentPage + 1}`)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 font-semibold"
                    >
                      Next →
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Sidebar (3 Columns - Same as before) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full lg:w-1/4 space-y-8"
            >
              {/* Recent Posts Widget (Dynamic latest 5 posts) */}
              <div className="border rounded-xl p-5 bg-gray-50 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-3 mb-4">Recent Posts</h3>
                <ul className="space-y-3 text-xs">
                  {ALL_BLOGS.slice(0, 5).map((post) => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="text-gray-600 hover:text-blue-600 transition block leading-snug">
                        › {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Franchise Menu & Banners */}
              <div className="border rounded-xl p-5 bg-gray-50 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-3 mb-4">Franchise Menu</h3>
                <ul className="space-y-2.5 text-xs font-medium text-gray-600">
                  <li className="bg-blue-50 text-blue-600 p-2 rounded font-bold">
                    <Link to="/franchise/">› Franchisee Business</Link>
                  </li>
                  <li><Link to="/franchise/why-speed-car-wash" className="hover:text-blue-600 transition block">› Why Speed Car Wash ?</Link></li>
                  <li><Link to="/franchise/our-support-system" className="hover:text-blue-600 transition block">› Our Support System</Link></li>
                  <li><Link to="/franchise/apply-for-franchise" className="hover:text-blue-600 transition block">› Apply Online</Link></li>
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