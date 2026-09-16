import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUs() {
  const handleCaptchaChange = (value) => {
    console.log("Captcha token:", value);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 mb-1">
            <Link to={"/"}>
              <span className="hover:underline cursor-pointer">Home</span>
            </Link>{" "}
            / Contact Us
          </p>
          <h1 className="text-3xl font-extrabold tracking-wide">Contact Us</h1>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Contact Form */}
          <div className="bg-red-50 p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="offset-anchor" id="contact-sent"></div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              <strong>Contact</strong> Us
            </h2>

            <form
              id="contactFormAdvanced"
              action="contact-us.php#contact-sent"
              method="POST"
              encType="multipart/form-data"
              className="space-y-4"
            >
              <input type="hidden" value="true" name="emailSent" id="emailSent" />

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">Your First Name *</label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="fname"
                    id="fname"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">Your Last Name *</label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="lname"
                    id="lname"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your email address *</label>
                  <input
                    type="email"
                    maxLength="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Contact no. *</label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="phone"
                    id="phone"
                    required
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="city"
                    id="city"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    name="state"
                    id="state"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>--Select State--</option>
                    <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  maxLength="5000"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  name="message"
                  id="message"
                  required
                ></textarea>
              </div>

              {/* React Google reCAPTCHA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Human Verification *</label>
                <div className="mt-2">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleCaptchaChange}
                  />
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Submit Button */}
              <div className="flex justify-end">
                <input
                  type="submit"
                  id="contactFormSubmit"
                  value="Send Message"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 shadow-md"
                />
              </div>
            </form>
          </div>

          {/* Right Side: Contact & Office Details */}
          <div className="lg:max-h-[670px] lg:overflow-y-auto pr-2 space-y-6">
            <h4 className="text-xl font-bold text-gray-800">Get in <strong>touch</strong></h4>
            <hr className="border-gray-200" />

            <h4 className="text-lg font-bold text-gray-800">Corporate <strong>Office</strong></h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-blue-600 shrink-0" /> 
                <span><strong>Address:</strong> A-13, Mayapuri Industrial Area Phase-1, New Delhi -110064</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-600 shrink-0 rotate-90 " /> 
                <span><strong>Phone:</strong> +91-9716412345</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600 shrink-0" /> 
                <span><strong>Email:</strong> <a href="mailto:info@speedcarwash.com" className="text-blue-600 hover:underline">info@speedcarwash.com</a></span>
              </li>
            </ul>

            <hr className="border-gray-200" />

            <h4 className="text-lg font-bold text-gray-800">For <strong>Franchise</strong></h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-600 shrink-0 rotate-90" /> 
                <span><strong>For Franchise Enquiry:</strong> +91-9716412345</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600 shrink-0" /> 
                <span><strong>Email:</strong> <a href="mailto:contact@speedcarwash.com" className="text-blue-600 hover:underline">contact@speedcarwash.com</a></span>
              </li>
            </ul>

            <hr className="border-gray-200" />
          </div>

        </div>

        {/* Bottom Banner Image Link */}
        <div className="mt-12">
          <a href="https://www.speedcarwash.com/franchise/outlets" target="_blank" rel="noopener noreferrer">
            <img src="https://www.speedcarwash.com/images/explore.png" alt="Explore Networks" className="w-full rounded-lg shadow-md hover:opacity-95 transition" />
          </a>
        </div>
      </section>
    </div>
  );
}