import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import call_icon from "../assets/call_icon.svg";

const backendurl = "https://turf-backend-avi5.onrender.com";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.defaults.withCredentials = true;

    const { name, email, phone, password } = formData;
    if (!name || !email || !phone || !password) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("phone", phone);
      formDataToSend.append("password", password);
      
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await axios.post(`${backendurl}/user/createUser`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("[✅ Signup Response]:", response.data);

      if (response.status === 200) {
        toast.success(response.data.msg || "Signup Successful");
        navigate("/login");
      } else {
        toast.error(response.data.msg || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Error occurred in Signup API call");
      toast.error(
        error?.response?.data?.msg || "Signup error, try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Signup
        </h2>

        <form onSubmit={onSubmitHandler}>
          {/* Profile Image Upload */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={imagePreview || assets.person_icon}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                📷
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">Click to upload profile picture</p>
          </div>

          {/* Name */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="user icon" />
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail icon" />
            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="bg-transparent outline-none w-full"
              type="email"
              placeholder="Email Id"
              autoComplete="email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={call_icon} alt="phone icon" />
            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              className="bg-transparent outline-none w-full"
              type="tel"
              placeholder="Phone Number"
              autoComplete="tel"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock icon" />
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Button with spinner */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-full font-medium text-white transition-all duration-300 flex justify-center items-center
              ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-900 hover:opacity-90"
              }
            `}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Signing Up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <div className="text-center mt-5 text-gray-400 text-xs">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-bold text-sm cursor-pointer underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
