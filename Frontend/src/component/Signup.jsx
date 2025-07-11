import React from "react";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
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
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Create a strong password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-full transition shadow-md"
          >
            Sign Up
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
