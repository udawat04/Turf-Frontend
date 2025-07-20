import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const backendurl = "https://turf-backend-avi5.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Start loading

    try {
      let response;
      let data;

      if (state === "Login") {
        if (!formData.email || !formData.password) {
          toast.error("Email and Password are required");
          setIsLoading(false);
          return;
        }

        response = await axios.post(`${backendurl}/user/login`, {
          email: formData.email,
          password: formData.password,
        });
      } else if (state === "Reset") {
        if (!formData.email || !formData.oldPassword || !formData.newPassword) {
          toast.error("All fields are required");
          setIsLoading(false);
          return;
        }

        response = await axios.put(`${backendurl}/user/reset`, {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      } else if (state === "Forget") {
        if (!formData.email || !formData.newPassword) {
          toast.error("Email and New Password are required");
          setIsLoading(false);
          return;
        }

        response = await axios.put(`${backendurl}/user/forget`, {
          email: formData.email,
          newPassword: formData.newPassword,
        });
      }

      data = response.data;
      console.log(data,"jjjjj")
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
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
      const message =
        error?.response?.data?.msg || "Server error, please try again";
        console.log(error,"error")
      toast.error(message);
    } finally {
      setIsLoading(false); // Stop loading
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
                  autoComplete="current-password"
                  required
                />
              </div>
            </>
          )}

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
                  autoComplete="new-password"
                  required
                />
              </div>
            </>
          )}

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
                autoComplete="new-password"
                required
              />
            </div>
          )}

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
                Please wait...
              </>
            ) : (
              state
            )}
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
                Don&apos;t have an account?{" "}
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
