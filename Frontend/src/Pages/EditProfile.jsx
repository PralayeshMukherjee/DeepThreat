import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserIcon, MailIcon, PhoneIcon, KeyRoundIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [loadingOTP,setLoadingOTP] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
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
    try{
      setLoadingOTP(true)
      const response = await fetch(`http://localhost:8080/userDetails/sendOTPtoForgot?email=${formData.email}`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      if(response.ok){
        setLoadingOTP(false);
        setOtpSent(true);
        toast.success(`OTP sent successfully to ${formData.email}`)
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong. Please try again later!")
    }
  };

  const handleOtpVerification = async () => {
    try{
      const response = await fetch(`http://localhost:8080/userDetails/verifyotp`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }catch(error){
    }
    if (otp === "123456") {
      alert("Password reset successful!");
      setShowForgotPassword(false);
      setOtpSent(false);
      setOtp("");
      setNewPassword("");
    } else {
      alert("Invalid OTP");
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
                  <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOtpVerification}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
                >
                  Verify & Reset Password
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
