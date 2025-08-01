import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const turfData = [
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/06-05-2025/060525095055am-truf-zone.webp",
    title: "Truf Zone Arena",
    price: 500,
    reviews: 12,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/28-04-2025/280425094746am-logo.jpg",
    title: "PlayUp Jaipur",
    price: 400,
    reviews: 8,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/06-06-2025/060625054948am-WhatsApp-Image-2025-05-29-at-10.40.34_462f4747.jpg",
    title: "One Life Arena",
    price: 750,
    reviews: 6,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/06-05-2025/060525101251am-speed-truf.webp",
    title: "Googly Box",
    price: 1100,
    reviews: 20,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/09-06-2025/090625061039am-1111.jpg",
    title: "Champion Turf",
    price: 680,
    reviews: 9,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/07-05-2025/070525075832am-ddddddddddddddddd.jpg",
    title: "Green Field",
    price: 550,
    reviews: 15,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/06-06-2025/060625111610am-11.jpg",
    title: "Urban Arena",
    price: 620,
    reviews: 18,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/14-05-2025/140525104401am-sc.jpg",
    title: "Ground Master",
    price: 900,
    reviews: 22,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/24-05-2025/240525065923am-fds.jpg",
    title: "Sportzy Turf",
    price: 480,
    reviews: 10,
  },
  {
    image:
      "https://admin.groundbox.in/vendor_img/images/23-04-2025/230425061157am-IMG_1156.PNG",
    title: "Elite Sports",
    price: 790,
    reviews: 11,
  },
];

const TurfCard = () => {
  const scrollRef = useRef(null);
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get("https://turf-backend-avi5.onrender.com/admin/turf");
        console.log("Turf API response:", res.data);
        setTurfs(res.data.result || []);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        setTurfs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading turfs...</p>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-x-auto px-4 py-8 scrollbar-hide"
      ref={scrollRef}
    >
      <div className="flex gap-6 min-w-max">
      {turfs.length > 0 ? turfs.map((turf, index) => (
          <div
            key={turf._id || index}
            className="min-w-[260px] bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={turf.image || turfData[index % turfData.length]?.image || "https://groundbox.in/assets/images/logo.png"}
              alt="turf image"
              className="w-full h-48 object-cover rounded-t-3xl"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 truncate">
                {turf.turfName}
              </h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Rating</span>
                <span className="text-green-600 font-semibold">₹{turf.price}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="text-yellow-400">★★★★★</div>
                <span>Nice Turf</span>
                <span className="text-blue-600 ml-auto">Onwards</span>
              </div>
            </div>
          </div>
      )) : (
        <div className="w-full text-center py-8">
          <p className="text-gray-500">No turfs available</p>
        </div>
      )}
        </div>
    </div>
  );
};

export default TurfCard;
