import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            / Terms & Conditions
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold">Terms & Conditions</h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Services</h2>
            <p>
              Speed Car Wash provides doorstep car washing, cleaning, detailing and related vehicle
              care services. Services are subject to availability and the selected package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Booking & Enquiry</h2>
            <p>
              Submitting a booking or enquiry form does not automatically guarantee an appointment.
              Our team may contact you to confirm the service, date, time and other details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Pricing</h2>
            <p>
              Prices displayed on the website may vary depending on the vehicle type, selected
              service and actual service requirements. Any applicable additional charges will be
              communicated before the service is carried out.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Customer Responsibility</h2>
            <p>
              Customers are responsible for providing accurate contact, vehicle and location details
              while submitting an enquiry or booking request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Service Availability</h2>
            <p>
              Service availability may depend on location, operating hours, weather conditions,
              staff availability and other operational factors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Changes & Cancellation</h2>
            <p>
              Appointment changes or cancellations should be communicated to our team as early as
              possible. Cancellation and rescheduling terms may depend on the service and
              appointment status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Website Information</h2>
            <p>
              We aim to keep website information accurate and up to date. Service descriptions,
              pricing, availability and other details may be updated from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Contact</h2>
            <p>
              For questions regarding these terms or our services, please use the Contact Us section
              of the website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
