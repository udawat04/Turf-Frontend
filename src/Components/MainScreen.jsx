import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar"
import axios from "axios";
import AddTurf from "./AddTurf";
import AdminManagement from "./AdminManagement";
import ShowTurf from "./ShowTurf";

const MainScreen = ({ selectedView }) => {
  const [city, setCity] = useState("");
  const backendurl = "https://turf-backend-avi5.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendurl}/admin/city`, {
        city: city,
      });
      console.log("City added:", res.data);
      alert("City successfully added!");
      setCity("");
    } catch (error) {
      console.error("Error adding city:", error);
      alert("Failed to add city. Please try again.");
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case "/admin":
        return (
          <div className="h-screen flex justify-center text-center p-10 bg-gray-100">
            <form onSubmit={handleSubmit}
              className="space-y-4 h-min bg-white p-6 rounded shadow-md max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add City</h2>
              <input
                type="text"
                placeholder="City Name"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        );
      
      case "/admin/addground":
        return <AddTurf />;
      
      case "/admin/management":
        return <AdminManagement />;
      
      case "/admin/showturfs":
        return <ShowTurf />;
      
      default:
        return (
          <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600">Select an option from the sidebar to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full items-center">
      <AdminNavbar />
      {renderContent()}
    </div>
  );
};

export default MainScreen;
