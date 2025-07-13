// src/components/Footer.jsx
import React from "react";

const MainFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-indigo-400">
              DeepThreat
            </h2>
            <p className="text-sm mt-2">
              Your trusted partner in intelligent threat detection.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-6 text-sm">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#tools" className="hover:text-white transition">
              Tools
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-slate-700 my-6" />

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} DeepThreat. All rights reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <a
              href="https://github.com/raj"
              className="text-indigo-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Raj
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
