import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import AddTurf from "./AddTurf";
import ShowTurf from "./ShowTurf";

const MainScreen = ({ selectedView }) => {
  const [city, setCity] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://turf-backend-avi5.onrender.com/admin/addcity",
      {
        city: city,
      }
    );
    console.log("Turf added:", res.data);
    alert("City successfully added!");
    setCity("");
  };

  return (
    <div className="w-full">
      <AdminNavbar />
      {selectedView === "/admin" ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-green-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-md flex flex-col gap-6 border border-orange-100"
          >
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-2">Add City</h2>
            <input
              type="text"
              placeholder="Enter City Name"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-lg"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition text-lg"
            >
              Add City
            </button>
          </form>
        </div>
      ) : selectedView === "/admin/addground" ? (
        <AddTurf />
      ) : selectedView === "/admin/showturfs" ? (
        <ShowTurf />
      ) : (
        <MainScreen />
      )}
    </div>
  );
};

export default MainScreen;
