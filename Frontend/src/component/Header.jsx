import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

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

  const navItems = ["home", "features", "about", "contact"];

  return (
    <>
      <nav className="flex justify-between items-center p-6 bg-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80 transition-all duration-300">
        <h1 className="text-2xl font-bold text-cyan-400">SecureNet</h1>
        <div className="md:hidden" onClick={toggleMenu}>
          <FaBars size={24} className="text-cyan-400 cursor-pointer" />
        </div>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:text-cyan-400 transition">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-2">
          {navItems.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-cyan-300 hover:underline"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
