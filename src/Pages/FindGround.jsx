import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";

const FindGround = () => {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    // Fetch turfs from backend
    axios.get("http://localhost:5000/admin/getturf").then((res) => {
      setTurfs(res.data.response);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Available Grounds</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {turfs.map((turf, index) => (
            <Card
              key={turf._id || index}
              turfName={turf.newTurf}
              location={turf.location}
              city={turf.city}
              price={turf.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FindGround;
