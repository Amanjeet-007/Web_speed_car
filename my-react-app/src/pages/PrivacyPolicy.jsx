import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            / Privacy Policy
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>
              When you submit an enquiry or booking request, we may collect information such as your
              name, phone number, email address, city, state, selected service and message.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              The information you provide may be used to respond to your enquiry, confirm service
              requirements, arrange appointments and communicate with you regarding our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Storage</h2>
            <p>
              Information submitted through our website forms may be securely stored using our
              backend database and related service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
            <p>
              We do not intend to sell your personal information. Information may be shared with
              relevant service personnel or technology providers only when necessary to operate and
              provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Security</h2>
            <p>
              We take reasonable measures to protect information submitted through the website.
              However, no online system can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Cookies & Website Technologies
            </h2>
            <p>
              The website may use basic browser technologies and third-party services required for
              functionality, security and website operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Your Information</h2>
            <p>
              If you have questions about information submitted through the website or would like to
              request clarification regarding its use, please contact us through the Contact Us
              section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Policy Updates</h2>
            <p>
              This Privacy Policy may be updated from time to time to reflect changes in our
              services, website functionality or legal requirements.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
