import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiLogOut, FiUser } from "react-icons/fi";
import axios from "axios";

const Navbar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  // Add your backend URL here
 const backendurl = "https://turf-backend-avi5.onrender.com"; // Replace with your actual backend URL

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      setProfileLoading(true);
      const response = await axios.get(`${backendurl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

   
        setUserProfile(response.data.user);
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setUserProfile(null);
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
      if (!event.target.closest(".profile-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  // Function to generate name-based avatar
  const generateNameAvatar = (name) => {
    if (!name) return "U";
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
    return initials;
  };

  // Function to get random background color for name avatar
  const getAvatarBgColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-teal-500",
    ];
    if (!name) return "bg-green-500";
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const currentUser = userProfile || user;
  const profileImage = userProfile?.image || user?.image;
  const userName = userProfile?.name || user?.name || "User";
  const userEmail = userProfile?.email || user?.email || "";

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
              {profileLoading ? (
                // Loading state
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : profileImage ? (
                // Show user image
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                  onError={(e) => {
                    // If image fails to load, hide it and show name avatar
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}

              {/* Name-based avatar (shown when no image or image fails to load) */}
              <div
                className={`w-10 h-10 rounded-full ${getAvatarBgColor(
                  userName
                )} ${
                  profileImage ? "hidden" : "flex"
                } items-center justify-center border-2 border-green-500`}
                style={{ display: profileImage ? "none" : "flex" }}
              >
                <span className="text-white font-semibold text-sm">
                  {generateNameAvatar(userName)}
                </span>
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}

                    {/* Name-based avatar for dropdown */}
                    <div
                      className={`w-12 h-12 rounded-full ${getAvatarBgColor(
                        userName
                      )} ${
                        profileImage ? "hidden" : "flex"
                      } items-center justify-center`}
                      style={{ display: profileImage ? "none" : "flex" }}
                    >
                      <span className="text-white font-semibold">
                        {generateNameAvatar(userName)}
                      </span>
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">{userName}</p>
                      <p className="text-sm text-gray-500">{userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                  >
                    <FiUser size={18} />
                    <span>My Profile</span>
                  </button>

                  {currentUser?.role === "admin" && (
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/admin");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                    >
                      <FiUser size={18} />
                      <span>Admin Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // User is not logged in - show login and signup
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm transition-colors"
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
