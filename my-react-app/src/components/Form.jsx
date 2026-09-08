import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "SCW WASHING",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Database me data successfully save hone ke baad hi yeh true hoga
        setSubmitted(true); 
        // Form ko clear karne ke liye
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "SCW WASHING",
          message: "",
        });
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Network error. Please make sure your Express backend is running.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold text-red-600 tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold text-blue-900 mt-1">
            Book A Wash Or Enquire Now
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center shadow-sm">
            <h3 className="font-bold text-lg">Thank You! 🎉</h3>
            <p className="text-sm mt-1">
              Your request has been submitted successfully and saved to the database. We will contact you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Another Enquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 border p-8 rounded-xl shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full text-xs p-3 border rounded focus:outline-none focus:border-blue-600 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full text-xs p-3 border rounded focus:outline-none focus:border-blue-600 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full text-xs p-3 border rounded focus:outline-none focus:border-blue-600 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Select Service / Enquiry Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border rounded focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="SCW WASHING">SCW Washing</option>
                  <option value="SCW QUICK SERVICE">SCW Quick Service</option>
                  <option value="SCW DETAILING">SCW Detailing</option>
                  <option value="SCW WRAPPING">SCW Wrapping</option>
                  <option value="FRANCHISE">Become Our Franchise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Message / Car Details
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or car model details here..."
                className="w-full text-xs p-3 border rounded focus:outline-none focus:border-blue-600 bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold text-sm py-3 rounded shadow hover:bg-red-700 transition"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}