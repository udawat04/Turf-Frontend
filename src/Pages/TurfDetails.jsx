import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const fallbackImages = [
  "https://admin.groundbox.in/vendor_img/images/23-04-2025/230425061157am-IMG_1156.PNG",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
];

const TurfDetails = () => {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://turf-backend-avi5.onrender.com/admin/getturf`)
      .then((res) => res.json())
      .then((data) => {
        const found = (data.response || []).find((t) => t._id === id);
        setTurf(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50">
        <div className="text-xl text-gray-500">Loading turf details...</div>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50">
        <div className="text-xl text-red-500">Turf not found.</div>
      </div>
    );
  }

  // Build images array dynamically
  let images = [];
  if (Array.isArray(turf.images) && turf.images.length > 0) {
    images = turf.images;
  } else if (turf.image) {
    images = [turf.image, ...fallbackImages.slice(1)];
  } else {
    images = [...fallbackImages];
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-green-50 pt-24 pb-10 px-3 md:px-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left Column: Gallery */}
          <div className="md:w-2/5 p-5 border-r border-gray-200 flex flex-col">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImg]}
                alt={turf.turfName || "Turf"}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImg === idx
                      ? "border-green-600 scale-105"
                      : "border-gray-200 hover:border-green-400"
                  }`}
                  onClick={() => setSelectedImg(idx)}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-3/5 p-8 flex flex-col gap-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-extrabold text-green-700">
                {turf.turfName || turf.newTurf}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-lg">
                <div className="flex items-center gap-1">
                  📍 {turf.location}, {turf.city}
                </div>
                <span className="hidden md:inline text-gray-400">|</span>
                <div className="flex items-center gap-1">
                  ⭐ {turf.rating || 4.5}
                  <span className="text-gray-500 text-base">
                    ({turf.reviews || 15} reviews)
                  </span>
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-green-700">
                ₹{turf.price}
                <span className="text-base font-normal text-gray-500 ml-1">
                  / per slot
                </span>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Facilities
              </h3>
              <div className="flex flex-wrap gap-3 text-gray-700">
                {[
                  "Floodlights",
                  "Parking",
                  "Washrooms",
                  "Drinking Water",
                  "Synthetic Grass",
                ].map((facility) => (
                  <span
                    key={facility}
                    className="bg-white border px-3 py-1 rounded-full shadow-sm text-sm"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Booking */}
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Pricing & Booking
              </h3>
              <p className="text-gray-700 mb-2">
                <b>Open Hours:</b> 6:00 AM - 11:00 PM
              </p>
              <p className="text-gray-700 mb-4">
                <b>Booking Policy:</b> 100% advance required. Free cancellation
                up to 24 hours before slot.
              </p>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg text-lg transition"
                onClick={() => alert("Booking functionality coming soon!")}
              >
                Book Now
              </button>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Contact & Info
              </h3>
              <p className="text-gray-700 mb-1">
                <b>Contact:</b> +91 9876543210
              </p>
              <p className="text-gray-700 mb-1">
                <b>Email:</b> info@turfsystem.com
              </p>
              <p className="text-gray-700">
                <b>Address:</b> {turf.location}, {turf.city}
              </p>
            </div>

            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl shadow text-lg transition"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TurfDetails;
