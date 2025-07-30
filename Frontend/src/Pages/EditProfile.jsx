import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserIcon, MailIcon, PhoneIcon, KeyRoundIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const handleDataFetching = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/userDetails/getUser?email=${email}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          email: data.emailId,
          name: data.name,
          phone: data.phone,
        }));
      } else {
        toast.error("Something went wrong while fetching user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      const email = decode.email?.email || decode.email;
      console.log(email);
      handleDataFetching(email);
    }
  }, []);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpRequest = async () => {
    try {
      setResending(true);
      setLoadingOTP(true);
      const response = await fetch(
        `http://localhost:8080/userDetails/sendOTPtoForgot?email=${formData.email}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoadingOTP(false);
        setOtpSent(true);
        setTimer(120);
        setCanResend(false);
        setResending(false);
        toast.success(`OTP sent successfully to ${formData.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoadingForgot(true);
      const response = await fetch(
        `http://localhost:8080/userDetails/verifyotp?email=${formData.email}&otp=${otp}&newPassword=${newPassword}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const result = data.isUpdate;
        if (result === "true") {
          toast.success("Update Password Successfullly!");
        } else if (response === "wrongotp") {
          toast.error("Invalid OTP!");
        } else if (response === "wrongemail") {
          toast.error("Wrong Email Given, Please Try Again Later...");
        } else if (response === "wrong") {
          toast.error("Password Not Updated, Please Try Again Later...");
        }
        setShowForgotPassword(false);
        setOtpSent(false);
        setOtp("");
        setNewPassword("");
        setLoadingForgot(false);
      }
    } catch (error) {
      console.error(error);
      setShowForgotPassword(false);
      setOtpSent(false);
      setOtp("");
      setNewPassword("");
      toast.error("Something Went Wrong, Please Try Again Later...");
    }
  };
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/userDetails/updateData`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setFormData({ ...formData, name: data.name, phone: data.phone });
        console.log("ok");
        setLoading(false);
        toast.success("Profile updated successfully!");
      } else {
        setLoading(false);
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 py-10 transition-colors duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-[#0b1623] dark:to-[#121d2e]`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl shadow-2xl rounded-3xl p-10 bg-white dark:bg-[#1e2c3a] text-gray-900 dark:text-white"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Edit Profile
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your personal information
            </p>
          </div>
        </div>

        {!showForgotPassword ? (
          <>
            <form className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <div className="relative">
                  <UserIcon
                    className="absolute top-3 left-3 text-blue-500"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="relative group">
                  <MailIcon
                    className="absolute top-3 left-3 text-blue-500"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={formData.email}
                    readOnly
                    className="pl-10 pr-4 py-2 w-full rounded-xl hover: bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                  />
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    This field is read-only
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>
                <div className="relative">
                  <PhoneIcon
                    className="absolute top-3 left-3 text-blue-500"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={formData.phone}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                  />
                </div>
              </div>
            </form>
            <motion.button
              onClick={handleSaveChanges}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-10 w-full py-3 font-semibold rounded-xl shadow-md transition-transform duration-300
                  ${
                    loading
                      ? "bg-gray-400 cursor-progress"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>

            <div className="text-center mt-6">
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative group">
                <MailIcon
                  className="absolute top-3 left-3 text-blue-500"
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                  readOnly
                />
                <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  This field is read-only
                </span>
              </div>
            </div>

            {!otpSent ? (
              <motion.button
                disabled={loadingOTP}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOtpRequest}
                className={`w-full py-3 font-semibold rounded-xl cursor-pointer
                  ${
                    loadingOTP
                      ? "bg-gray-400 cursor-progress"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {loadingOTP ? "Sending..." : "Send OTP"}
              </motion.button>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-2 px-4 rounded-xl bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    OTP expires in: {formatTime(timer)}
                  </span>
                  <motion.button
                    whileHover={{ scale: canResend && !resending ? 1.05 : 1 }}
                    whileTap={{ scale: canResend && !resending ? 0.95 : 1 }}
                    onClick={handleOtpRequest}
                    disabled={!canResend || resending}
                    className={`flex items-center gap-1 text-blue-600 font-medium ${
                      !canResend || resending
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:underline"
                    }`}
                  >
                    {resending && (
                      <svg
                        className="animate-spin h-4 w-4 text-blue-600"
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
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    )}
                    Resend OTP
                  </motion.button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <KeyRoundIcon
                      className="absolute top-3 left-3 text-blue-500"
                      size={20}
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-[#27394c] outline-none focus:ring-2 ring-blue-400 dark:ring-blue-500"
                    />
                  </div>
                </div>
                <motion.button
                  disabled={loadingForgot}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOtpVerification}
                  className={`w-full py-3 font-semibold rounded-xl cursor-pointer
                    ${
                      loadingForgot
                        ? "bg-gray-400 cursor-progress"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                >
                  {loadingForgot
                    ? "Verifying..&Reseting.."
                    : "Verify & Reset Password"}
                </motion.button>
              </>
            )}

            <div className="text-center mt-6">
              <button
                className="text-sm text-red-500 hover:underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Edit Profile
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
