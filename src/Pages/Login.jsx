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
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    oldPassword: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (type) => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }

    if (type === "reset" && !formData.oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    try {
      const endpoint = type === "reset" ? "/user/verifyCredentialsAndSendOTP" : "/user/sendForgetOTP";
      const payload = type === "reset" 
        ? { email: formData.email, oldPassword: formData.oldPassword }
        : { email: formData.email };

      const response = await axios.post(`${backendurl}${endpoint}`, payload);

      toast.success(response.data.msg || "OTP sent successfully!");
      setEmailVerified(true);
      setVerifiedEmail(formData.email);
      startResendTimer();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      const endpoint = state === "ResetOTP" ? "/user/verifyResetOTP" : "/user/verifyForgetOTP";
      await axios.post(`${backendurl}${endpoint}`, {
        email: verifiedEmail,
        otp: formData.otp,
      });

      toast.success("OTP verified successfully! Now enter your new password.");
      setOtpVerified(true);
      setFormData(prev => ({ ...prev, otp: "" }));
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid OTP");
    }
  };

  const handleChangePassword = async () => {
    if (!formData.newPassword) {
      toast.error("New password is required");
      return;
    }

    try {
      const endpoint = state === "ResetOTP" ? "/user/changeResetPassword" : "/user/changeForgetPassword";
      const response = await axios.post(`${backendurl}${endpoint}`, {
        email: verifiedEmail,
        newPassword: formData.newPassword,
      });

      toast.success(response.data.msg || "Password changed successfully!");
      setState("Login");
      setEmailVerified(false);
      setOtpVerified(false);
      setVerifiedEmail("");
      setFormData({
        email: "",
        password: "",
        oldPassword: "",
        otp: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to change password");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setIsLoading(true);

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
      } else if (state === "ResetOTP" || state === "ForgetOTP") {
        if (!emailVerified) {
          // Step 1: Send OTP
          await handleSendOTP(state === "ResetOTP" ? "reset" : "forget");
          setIsLoading(false);
          return;
        } else if (!otpVerified) {
          // Step 2: Verify OTP
          await handleVerifyOTP();
          setIsLoading(false);
          return;
        } else {
          // Step 3: Change Password
          await handleChangePassword();
          setIsLoading(false);
          return;
        }
      }

      data = response.data;
      console.log(data,"jjjjj")
      if (response.status === 200) {
        if (state === "Login") {
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("token", data.token);
          toast.success(data.msg || "Login Successful");
          
          if (data.data.role === "user") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        } else {
          toast.success(data.msg || "Success");
          setState("Login");
          setFormData({
            email: "",
            password: "",
            oldPassword: "",
            otp: "",
            newPassword: "",
          });
        }
      } else {
        toast.error(data.msg || "Something went wrong");
      }
    } catch (error) {
      const message =
        error?.response?.data?.msg || "Server error, please try again";
        console.log(error,"error")
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (state === "Login") return "Login";
    if (state === "ResetOTP" || state === "ForgetOTP") {
      if (!emailVerified) {
        return "Send OTP";
      } else if (!otpVerified) {
        return "Verify OTP";
      } else {
        return "Change Password";
      }
    }
    return state;
  };

  const getStepIndicator = () => {
    if (state === "ResetOTP" || state === "ForgetOTP") {
      if (!emailVerified) return "Step 1: Verify Email";
      if (!otpVerified) return "Step 2: Enter OTP";
      return "Step 3: Change Password";
    }
    return "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Login"
            ? "Login"
            : state === "ResetOTP"
            ? "Reset Password"
            : "Forget Password"}
        </h2>

        {(state === "ResetOTP" || state === "ForgetOTP") && (
          <div className="text-center mb-4 text-blue-400 text-sm">
            {getStepIndicator()}
          </div>
        )}

        <form onSubmit={onSubmitHandler}>
          {/* Email field - always shown */}
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
              disabled={emailVerified}
            />
          </div>

          {/* Old Password field - only for reset */}
          {state === "ResetOTP" && !emailVerified && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                name="oldPassword"
                onChange={handleChange}
                value={formData.oldPassword}
                className="bg-transparent outline-none w-full"
                type="password"
                placeholder="Old Password"
                autoComplete="current-password"
                required
              />
            </div>
          )}

          {/* Login password field */}
          {state === "Login" && (
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
          )}

          {/* OTP field - shown after email verification */}
          {(state === "ResetOTP" || state === "ForgetOTP") && emailVerified && !otpVerified && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                name="otp"
                onChange={handleChange}
                value={formData.otp}
                className="bg-transparent outline-none w-full"
                type="text"
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          {/* New Password field - shown after OTP verification */}
          {(state === "ResetOTP" || state === "ForgetOTP") && otpVerified && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                name="newPassword"
                onChange={handleChange}
                value={formData.newPassword}
                className="bg-transparent outline-none w-full"
                type="password"
                placeholder="Enter New Password"
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {/* Login options */}
          {state === "Login" && (
            <div className="mb-4 space-y-2">
              <p
                onClick={() => setState("ForgetOTP")}
                className="text-indigo-500 cursor-pointer"
              >
                Forgot Password?
              </p>
              <p
                onClick={() => setState("ResetOTP")}
                className="text-indigo-500 cursor-pointer"
              >
                Reset Password?
              </p>
            </div>
          )}

          {/* Resend OTP button */}
          {(state === "ResetOTP" || state === "ForgetOTP") && emailVerified && !otpVerified && (
            <div className="mb-4 text-center">
              <button
                type="button"
                onClick={() => handleSendOTP(state === "ResetOTP" ? "reset" : "forget")}
                disabled={resendDisabled}
                className={`text-indigo-500 cursor-pointer ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {resendDisabled 
                  ? `Resend OTP in ${resendTimer}s` 
                  : "Resend OTP"
                }
              </button>
            </div>
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
              getButtonText()
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-xs">
          {state === "Login" ? (
            <>
              <div className="space-y-2">
                <div>
                  Want to reset password?{" "}
                  <span
                    onClick={() => setState("ResetOTP")}
                    className="text-blue-400 cursor-pointer underline"
                  >
                    Reset Password
                  </span>
                </div>
                <div>
                  Forgot password?{" "}
                  <span
                    onClick={() => setState("ForgetOTP")}
                    className="text-blue-400 cursor-pointer underline"
                  >
                    Forgot Password
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
              </div>
            </>
          ) : (
            <>
              Go back to{" "}
              <span
                onClick={() => {
                  setState("Login");
                  setEmailVerified(false);
                  setOtpVerified(false);
                  setVerifiedEmail("");
                  setFormData({
                    email: "",
                    password: "",
                    oldPassword: "",
                    otp: "",
                    newPassword: "",
                  });
                }}
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
