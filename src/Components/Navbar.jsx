import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const Navbar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data && data.display_name) {
              setLocation(data.display_name);
            } else {
              setLocation("Location not found");
            }
          } catch {
            setLocation("Unable to fetch address");
          }
        },
        () => {
          setLocation("Location permission denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-30 flex justify-between items-center px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <img
          src="https://groundbox.in/assets/images/logo.png"
          alt="GroundBox Logo"
          className="w-16"
        />
        <h1 className="text-2xl font-semibold text-orange-500">
          Ground<span className="text-green-500">Box</span>
        </h1>
      </div>
      <ul className="flex gap-10 text-green-500 font-medium">
        <li className="cursor-pointer hover:underline">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:underline">
          <Link to={"/grounds"}>Find Ground</Link>
        </li>
        <li className="cursor-pointer hover:underline">
          <Link to={"/about"}>About Us</Link>
        </li>
        <li className="cursor-pointer hover:underline">
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="bg-green-50 rounded-full px-4 py-2 flex items-center gap-2 text-green-600 text-sm max-w-xs">
          <MdLocationOn size={22} className="text-green-600" />
          <span className="truncate block max-w-[250px]">{location}</span>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
