import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ turfId, turfName, price, city, location, image, rating = 4.5, reviews = 15 }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col">
      <img
        src={image || "https://admin.groundbox.in/vendor_img/images/23-04-2025/230425061157am-IMG_1156.PNG"}
        alt={turfName}
        className="w-full h-44 object-cover bg-gray-100 rounded-t-3xl"
      />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">{turfName}</h3>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span>{location}, {city}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center text-yellow-500">
            {Array(Math.floor(rating)).fill().map((_, i) => (
              <Star key={i} size={16} fill="currentColor" className="mr-0.5" />
            ))}
            {rating % 1 !== 0 && <Star size={16} fill="currentColor" className="mr-0.5 opacity-50" />}
          </span>
          <span className="text-xs text-gray-500">({reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-green-600 font-bold text-lg">₹{price}</span>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Onwards</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-gradient-to-r from-orange-400 to-green-500 hover:from-orange-500 hover:to-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition text-sm"
            onClick={() => navigate(`/grounds/${turfId}`)}
          >
            View Details
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-semibold py-2 rounded-lg shadow-md transition text-sm"
            onClick={() => alert('Booking functionality coming soon!')}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
