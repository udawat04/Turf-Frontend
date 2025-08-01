import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const Navbar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
    window.location.reload();
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
        
        {user ? (
          // User is logged in - show profile and logout
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={user.image || "https://via.placeholder.com/32x32?text=U"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
            <Link
              to="/profile"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
            >
              Profile
            </Link>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          // User is not logged in - show login and signup
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
