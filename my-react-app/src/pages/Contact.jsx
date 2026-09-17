import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryWidget from "../components/EnquiryWidget";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { submitEnquiry } from "../lib/supabase";

export default function ContactUs() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = {
      name: `${form.fname.value} ${form.lname.value}`.trim(),
      email: form.email.value,
      phone: form.phone.value,
      city: form.city.value,
      state: form.state.value,
      service: "CONTACT US",
      message: form.message.value,
      source: "contact-us",
    };

    try {
      await submitEnquiry(data);
      alert("Thank you! Your enquiry has been submitted successfully.");
      form.reset();
    } catch (error) {
      console.error("Supabase contact error:", error);
      alert("Unable to submit your request right now. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />

      {/* Modern Blue Gradient Header Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 overflow-hidden shadow-md">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs text-blue-200 mb-2 font-medium">
            <Link to={"/"}>
              <span className="hover:underline text-white">Home</span>
            </Link>{" "}
            / Contact Us
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Get in Touch
          </h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xl">
            Have questions about our car care services or looking for a
            franchise opportunity? Reach out to us today.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="offset-anchor" id="contact-sent"></div>

            <h2 className="text-2xl font-black mb-6 text-blue-900 tracking-tight">
              Send Us a <span className="text-blue-600">Message</span>
            </h2>

            <form
              id="contactFormAdvanced"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="hidden"
                value="true"
                name="emailSent"
                id="emailSent"
              />

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your First Name *
                  </label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="fname"
                    id="fname"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Last Name *
                  </label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="lname"
                    id="lname"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your email address *
                  </label>
                  <input
                    type="email"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact no. *
                  </label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="phone"
                    id="phone"
                    required
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="city"
                    id="city"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition"
                    name="state"
                    id="state"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      --Select State--
                    </option>
                    <option value="Andaman & Nicobar">
                      Andaman & Nicobar
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">
                      Arunachal Pradesh
                    </option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chattisgarh">Chattisgarh</option>
                    <option value="Delhi & NCR">Delhi & NCR</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  maxLength="5000"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50 text-sm transition resize-none"
                  name="message"
                  id="message"
                  required
                ></textarea>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Submit Button */}
              <div className="flex justify-end">
                <input
                  type="submit"
                  id="contactFormSubmit"
                  value="Send Message →"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl cursor-pointer transition shadow-lg shadow-blue-600/20 text-xs uppercase tracking-wider"
                />
              </div>
            </form>
          </div>

          {/* Right Side: Contact & Office Details */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div>
              <h3 className="text-xl font-black text-blue-900 tracking-tight">
                Get in <span className="text-blue-600">Touch</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                We are always ready to help and answer any questions you might
                have.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 space-y-4">
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                  Corporate Office
                </h4>
                <ul className="space-y-3.5 text-gray-600 text-xs leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FaMapMarkerAlt />
                    </div>
                    <span>
                      <strong>Address:</strong> A-13, Mayapuri Industrial Area
                      Phase-1, New Delhi - 110064
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FaPhone className="rotate-90" />
                    </div>
                    <span>
                      <strong>Phone:</strong> +91-9716412345
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FaEnvelope />
                    </div>
                    <span>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:info@speedcarwash.com"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        info@speedcarwash.com
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 space-y-4">
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                  For Franchise Enquiries
                </h4>
                <ul className="space-y-3.5 text-gray-600 text-xs leading-relaxed">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FaPhone className="rotate-90" />
                    </div>
                    <span>
                      <strong>Franchise Contact:</strong> +91-9716412345
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FaEnvelope />
                    </div>
                    <span>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:contact@speedcarwash.com"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        contact@speedcarwash.com
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Image Link */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
          <a
            href="https://www.speedcarwash.com/franchise/outlets"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.speedcarwash.com/images/explore.png"
              alt="Explore Networks"
              className="w-full object-cover group-hover:scale-105 transition duration-500"
            />
          </a>
        </div>
      </section>

      <Footer />
      <EnquiryWidget />
    </div>
  );
}