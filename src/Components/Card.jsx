import React from "react";
import { Star } from "lucide-react";

const Card = ({ turfName, price, city, location }) => {
  return (
    <div className="w-[220px] rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Static Image */}
      <img
        src="https://admin.groundbox.in/vendor_img/images/23-04-2025/230425061157am-IMG_1156.PNG"
        alt="Turf"
        className="w-full h-40 object-cover rounded-t-2xl"
      />

      {/* Content Section */}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-800">{turfName}</h3>
        <p className="text-sm text-gray-600">
          {location}, {city}
        </p>

        {/* Static Rating */}
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span>Rating</span>
          <div className="flex items-center ml-2 text-yellow-500">
            {Array(4)
              .fill()
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="currentColor"
                  className="mr-0.5"
                />
              ))}
            <span className="ml-1 text-gray-500">(15)</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-green-600 font-semibold">₹{price}</span>
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            Onwards
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
