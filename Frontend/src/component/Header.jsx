import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ThemeBtn } from "../ie.js"; // Confirm this exists
import deepthreatlogo from "../assets/deepthreatlogo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 10) nav.classList.add("shadow-lg");
      else nav.classList.remove("shadow-lg");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80 transition-all duration-300 px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
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

        {/* Right: Nav + ThemeBtn + Mobile Icon */}
        <div className="flex items-center space-x-8">
          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-6 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-white hover:text-cyan-400  ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Theme Button */}
          <ThemeBtn />

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden" onClick={toggleMenu}>
            <FaBars size={24} className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 px-4 py-3 bg-gray-900 rounded-md space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-cyan-400 "
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
