// src/components/Header.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import User from "../assets/user.png";
import Profile from "../assets/profile.png";
import Setting from "../assets/setting.png";
import Logout from "../assets/logout.png";
import Help from "../assets/help.png";
import ThemeBtn from "../contexts/ThemeBtn.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import deepthreatlogo from "../assets/deepthreatlogo.png";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const MainHeader = () => {
  const [isMenuOpenMobile, setIsMenuOpenMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const underDev = () => {
    toast.info("This feature is under development.");
  };
  const LogoutUser = () => {
    sessionStorage.removeItem("token");
    toast.success("You have been logged out successfully.");
    window.location.href = "/";
  };

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-slate-900 bg-opacity-90 sticky top-0 z-50 border-b border-slate-700">
      <Link to="/" className="flex items-center">
        <img
          src={deepthreatlogo}
          className="w-16 h-16 rounded-md"
          alt="DeepThreat Logo"
        />
        <h1 className="text-xl md:text-2xl font-bold text-indigo-400 tracking-tight">
          DeepThreat
        </h1>
      </Link>

      {/* Desktop Nav */}
      <nav className="space-x-4 hidden md:flex">
        <Link
          to="/mainlayout/mainhome"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Home
        </Link>
        <Link
          to="/mainlayout/history"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          History
        </Link>
        <a
          href="#tools"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Tools
        </a>
        <Link
          to="/mainlayout/contact"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpenMobile(!isMenuOpenMobile)}
        className="md:hidden text-gray-300"
      >
        {isMenuOpenMobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Dropdown */}
      {isMenuOpenMobile && (
        <div className="absolute top-16 left-0 w-full bg-slate-800 px-6 py-4 flex flex-col gap-3 md:hidden z-40 shadow-md">
          <Link
            to="/mainlayout/history"
            className="text-gray-300 hover:text-indigo-400 transition"
          >
            History
          </Link>
          <a
            href="#tools"
            className="text-gray-300 hover:text-indigo-400 transition"
          >
            Tools
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-indigo-400 transition"
          >
            Contact
          </a>
        </div>
      )}
      <div className="flex gap-4 space-x-4 mx-4">
        <ThemeBtn />
        <div className="relative">
          <img
            src={User}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
          />

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg dark:bg-gray-800 dark:text-white origin-top-right"
              >
                <div className="p-4 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                  <img
                    src={User}
                    alt="User"
                    className="w-12 h-12 rounded-full dark:brightness-90"
                  />
                  <h3>
                    <Link to="/Profile/Me" className="hover:underline">
                      Me
                    </Link>
                  </h3>
                </div>
                <div className="p-2">
                  <Link
                    onClick={underDev}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center rounded-md"
                  >
                    <img
                      src={Profile}
                      alt="Edit"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />
                    Edit Profile
                  </Link>
                  <Link
                    onClick={underDev}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center rounded-md"
                  >
                    <img
                      src={Setting}
                      alt="Settings"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />
                    Settings & Privacy
                  </Link>
                  <Link
                    onClick={underDev}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center rounded-md"
                  >
                    <img
                      src={Help}
                      alt="Help"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />
                    Help & Support
                  </Link>
                  <Link
                    onClick={LogoutUser}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center rounded-md"
                  >
                    <img
                      src={Logout}
                      alt="Logout"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />
                    Logout
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
