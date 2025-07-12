import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/google`;
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    emailId: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/user/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataFetch = await response.json();

      if (data.isSend) {
        sessionStorage.setItem("isSend", true);
        sessionStorage.setItem("emailId", data.emailId);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("password", data.password);
        navigate("/OTPVerification");
      } else {
        sessionStorage.setItem("isSend", false);
        toast.info("⚠️ User already exists");
      }
    } catch (err) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 dark:from-gray-900 dark:to-gray-950 from-white to-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 text-center mb-4">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Join DeepThreat and secure your digital world today
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-full shadow hover:bg-gray-150 transition mb-6 dark:bg-gray-100"
        >
          <FcGoogle className="mr-3 text-xl" /> Sign up with Google
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
            or fill the form
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-gray-50"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="emailId"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-gray-50"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-gray-50"
              placeholder="Create a strong password"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handelSubmit}
            disabled={loading}
            //   className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-full transition shadow-md"
            // >
            //   Sign Up
            className={`w-full py-3 cursor-pointer mt-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-progress"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:from-cyan-700 hover:to-cyan-800"
                }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
