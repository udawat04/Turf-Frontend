import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendurl = "https://turf-backend-avi5.onrender.com";

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get(`${backendurl}/admin/turf`);
        console.log("ShowTurf API response:", res.data);
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-green-50 px-4 py-8">
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">All Turfs</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading turfs...</div>
      ) : turfs.length === 0 ? (
        <div className="text-center text-gray-400 py-20">No turfs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {turfs.map((turf, idx) => (
            <div
              key={turf._id || idx}
              className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden flex flex-col hover:shadow-xl transition"
            >
              <img
                src={turf.image || "https://groundbox.in/assets/images/logo.png"}
                alt={turf.turfName}
                className="w-full h-40 object-cover bg-gray-100"
              />
              <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-orange-500 truncate">{turf.turfName}</h3>
                <div className="text-sm text-gray-600">{turf.location}, {turf.city}</div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-green-600 font-semibold">₹{turf.price}</span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Onwards</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowTurf; 