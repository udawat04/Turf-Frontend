import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const backendurl = "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      let response;
      let data;

      // ✅ Frontend Field Validation
      if (state === "Login") {
        if (!formData.email || !formData.password || !formData.otp) {
          toast.error("All fields (Email, Password, OTP) are required");
          return;
        }

        response = await axios.post(`${backendurl}/user/login`, {
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
        });
      } else if (state === "Reset") {
        if (!formData.email || !formData.oldPassword || !formData.newPassword) {
          toast.error(
            "All fields (Email, Old Password, New Password) are required"
          );
          return;
        }

        response = await axios.put(`${backendurl}/user/reset`, {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      } else if (state === "Forget") {
        if (!formData.email || !formData.newPassword) {
          toast.error("Both Email and New Password are required");
          return;
        }

        response = await axios.put(`${backendurl}/user/forget`, {
          email: formData.email,
          newPassword: formData.newPassword,
        });
      }

      data = response.data;
      console.log("[✅ Response Data]:", data);

      if (response.status === 200) {
        toast.success(data.message || "Success");

        if (state === "Login") {
          if (data.data.role === "user") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        } else {
          setState("Login");
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      // ✅ Detailed Axios/Backend Error Logging
      console.error("❌ Error occurred in API call");
      console.log("[Error Object]:", error);

      if (error.response) {
        console.log("[Backend Error Response]:", error.response);
        console.log("[Status Code]:", error.response.status);
        console.log("[Response Data]:", error.response.data);
      } else if (error.request) {
        console.log("[No Response Received]:", error.request);
      } else {
        console.log("[Axios Config Error]:", error.message);
      }

      // ✅ Friendly error toast for UI
      const message =
        error?.response?.data?.message ||
        "Server error, please try again later";
      toast.error(message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Login"
            ? "Login"
            : state === "Reset"
            ? "Reset Password"
            : "Forget Password"}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {/* Email (all forms) */}
          {(state === "Login" || state === "Reset" || state === "Forget") && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
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
          )}

          {/* Login-specific fields */}
          {state === "Login" && (
            <>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="bg-transparent outline-none w-full"
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  required
                />
              </div>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input
                  name="otp"
                  onChange={handleChange}
                  value={formData.otp}
                  className="bg-transparent outline-none w-full"
                  type="text"
                  placeholder="OTP"
                  required
                />
              </div>
            </>
          )}

          {/* Reset Password fields */}
          {state === "Reset" && (
            <>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input
                  name="oldPassword"
                  onChange={handleChange}
                  value={formData.oldPassword}
                  className="bg-transparent outline-none w-full"
                  type="password"
                  placeholder="Old Password"
                  autoComplete="old-password"
                  required
                />
              </div>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input
                  name="newPassword"
                  onChange={handleChange}
                  value={formData.newPassword}
                  className="bg-transparent outline-none w-full"
                  type="password"
                  placeholder="New Password"
                  autocomplete="new-password"
                  required
                />
              </div>
            </>
          )}

          {/* Forget Password field */}
          {state === "Forget" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                name="newPassword"
                onChange={handleChange}
                value={formData.newPassword}
                className="bg-transparent outline-none w-full"
                type="password"
                placeholder="New Password"
                required
              />
            </div>
          )}

          {/* Forgot Password Link */}
          {state === "Login" && (
            <p
              onClick={() => setState("Forget")}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            {state}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-xs">
          {state === "Login" ? (
            <>
              <div>
                Want to reset password?{" "}
                <span
                  onClick={() => setState("Reset")}
                  className="text-blue-400 cursor-pointer underline"
                >
                  Reset
                </span>
              </div>
              <div className="text-lg mt-5">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-blue-400 font-bold text-lg cursor-pointer underline"
                >
                  Signup
                </Link>
              </div>
            </>
          ) : (
            <>
              Go back to{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
