// src/components/Header.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-slate-900 bg-opacity-90 sticky top-0 z-50 border-b border-slate-700">
      <h1 className="text-xl md:text-2xl font-bold text-indigo-400 tracking-tight">
        DeepThreat
      </h1>

      {/* Desktop Nav */}
      <nav className="space-x-4 hidden md:flex">
        <a
          href="#features"
          className="text-gray-300 hover:text-indigo-400 transition"
        >
          Features
        </a>
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
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-300"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-800 px-6 py-4 flex flex-col gap-3 md:hidden z-40 shadow-md">
          <a
            href="#features"
            className="text-gray-300 hover:text-indigo-400 transition"
          >
            Features
          </a>
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
    </header>
  );
};

export default MainHeader;
