import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar"
import axios from "axios";
import AddTurf from "./AddTurf";

const MainScreen = ({ selectedView }) => {
  const [city, setCity] = useState("");
  const handleSubmit = async () => {
    const res = axios.post("http://localhost:5000/admin/addcity", {
      city: city,
    });
    console.log("Turf added:", res.data);
    alert("City successfully added!");
    setCity("");
  };

  return (
    <div className="w-full  items-center">
      <AdminNavbar />

       {selectedView==="/admin"? 
      <div className=" h-screen flex justify-center text-center  p-10 bg-gray-100">
          <form onSubmit={handleSubmit}
          className="space-y-4 h-min  bg-white p-6 rounded shadow-md max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Add City</h2>
          <input
            type="text"
            placeholder="City Name"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      
      </div>
      :
      selectedView==="/admin/addground" ?<AddTurf/>: <MainScreen/>}
    </div>
  );
};

export default MainScreen;
