// src/components/Footer.jsx
import React from "react";

const MainFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div>
            <h2 className="text-xl font-bold text-indigo-400">DeepThreat</h2>
            <p className="text-sm mt-2">Smart security made simple.</p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#tools" className="hover:text-white transition">
              Tools
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-6"></div>

        {/* Bottom Line */}
        <div className="text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} DeepThreat. All rights reserved.
          </p>
          <p className="mt-1">
            Made with <span className="text-red-500">❤</span> by{" "}
            <a
              href="https://github.com/raj" // replace with actual GitHub or portfolio link
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
