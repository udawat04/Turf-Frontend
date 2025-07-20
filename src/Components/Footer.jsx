import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white py-10 relative">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 items-start">
        {/* Left - Logo & Store Buttons */}
        <div className="space-y-4">
          <img
            src="https://groundbox.in/assets/images/logo.png"
            alt="GroundBox Logo"
            className="h-12"
          />
          <p className="text-lg font-medium">Your Sports Community App</p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.groundbox.name"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-12"
              />
            </a>
            <a href="#">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Apple Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-400">
                Home
              </a>
            </li>
            <li>
              <a href="/find-ground" className="hover:text-green-400">
                Find Ground
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-green-400">
                Categories
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-green-400">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-green-400">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Privacy & Terms */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Privacy & Terms</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy-policy" className="hover:text-green-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-green-400">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/cancellation-policy" className="hover:text-green-400">
                Cancellation Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Add New Ground CTA */}
        <div className="flex justify-center items-start">
          <a
            href="https://groundbox.in/add-your-ground"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-md hover:scale-105 transition"
          >
            <img
              src="https://groundbox.in/assets/images/logo.png"
              alt="Add"
              className="h-6 w-6"
            />
            <span>Add New Ground</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 px-4 max-w-7xl mx-auto flex justify-between flex-wrap items-center text-sm">
        <p>©2025 by GroundBox</p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/profile.php?id=61570113381937"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF className="text-xl hover:text-blue-500" />
          </a>
          <a
            href="https://www.linkedin.com/company/groundbox/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn className="text-xl hover:text-blue-400" />
          </a>
          <a
            href="https://www.instagram.com/groundbox_play/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="text-xl hover:text-pink-500" />
          </a>
          <a
            href="https://www.youtube.com/@GroundBox-c7b"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube className="text-xl hover:text-red-600" />
          </a>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/your-whatsapp-number"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;
