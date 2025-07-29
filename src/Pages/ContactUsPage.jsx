import React from "react";
import Navbar from "../Components/Navbar";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-green-50 min-h-screen pt-24 pb-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
              Contact <span className="text-orange-500">Us</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Have questions or need help? We're here to assist you. Reach out
              to us through any of the methods below.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center border border-green-100">
              <Phone className="mx-auto text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-lg text-gray-800 mb-1">Phone</h3>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center border border-green-100">
              <Mail className="mx-auto text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-lg text-gray-800 mb-1">Email</h3>
              <p className="text-gray-600">info@groundbox.com</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center border border-green-100">
              <MapPin className="mx-auto text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-lg text-gray-800 mb-1">Location</h3>
              <p className="text-gray-600">Udaipur, Rajasthan, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Send us a Message
            </h2>
            <form className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg text-lg flex items-center gap-2 justify-center transition"
              >
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
