import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/user/login?emailId=${formData.emailId}&password=${formData.password}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.result === "0") {
        toast.success("✅ Login successful");
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("isGoogleUser", false);
        navigate("/mainhome", { replace: true });
        setLoading(false);
      } else if (data.result === "1") {
        toast.info("⚠️ Invalid password");
        setLoading(false);
      } else if (data.result === "2") {
        toast.info("⚠️ User not found");
        setLoading(false);
      } else {
        toast.info("⚠️ something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("❌ An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/google`;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 dark:from-gray-900 dark:to-gray-950 from-white to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Securely log in to your DeepThreat dashboard
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-full shadow hover:bg-gray-150 transition mb-6 dark:bg-gray-100"
        >
          <FcGoogle className="mr-3 text-xl" /> Sign in with Google
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="emailId"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-gray-400 dark:hover:border-gray-50"
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
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-gray-400 dark:hover:border-gray-50"
              placeholder="••••••••"
              required
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 cursor-pointer mt-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-progress"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:from-cyan-700 hover:to-cyan-800"
                }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
