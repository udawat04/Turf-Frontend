import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
    setShowDropdown(false);
    navigate("/login");
    window.location.reload();
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          // User is logged in - show profile dropdown
          <div className="relative profile-dropdown">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={user.image || "https://via.placeholder.com/32x32?text=U"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
              <ChevronDown 
                size={16} 
                className={`text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              />
            </div>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
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
