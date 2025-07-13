// src/components/LandingPage.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap } from "lucide-react";

const MainHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 mx-auto text-cyan-500 mb-4" />,
      title: "AI-Powered Analysis",
      description:
        "Real-time threat detection and classification using machine learning models.",
    },
    {
      icon: <Lock className="w-10 h-10 mx-auto text-cyan-500 mb-4" />,
      title: "Privacy First",
      description: "We don’t store data. All scans are private and secure.",
    },
    {
      icon: <Zap className="w-10 h-10 mx-auto text-cyan-500 mb-4" />,
      title: "Fast & Accurate",
      description:
        "Get confident results within seconds with minimal false positives.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="px-6 py-24 bg-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-xl blur-3xl opacity-50 pointer-events-none"></div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-white z-10 relative"
        >
          Smart Security Starts Here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-slate-300 z-10 relative"
        >
          Analyze URLs and documents for potential threats with real-time
          AI-driven security.
        </motion.p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 z-10 relative">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm md:text-base hover:bg-indigo-700 transition shadow-lg">
            Check URL
          </button>
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg text-sm md:text-base hover:bg-emerald-700 transition shadow-lg">
            Scan Document
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-slate-800 text-center">
        <h3 className="text-3xl font-semibold mb-12 text-indigo-300">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-700 p-6 rounded-xl shadow-lg hover:scale-105 transform transition"
            >
              {f.icon}
              <h4 className="text-lg font-bold mb-2 text-white">{f.title}</h4>
              <p className="text-sm text-slate-300">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="px-6 py-10 bg-slate-900 text-center text-sm text-slate-500 border-t border-slate-700"
      >
        <p>
          &copy; {new Date().getFullYear()} DeepThreat. All rights reserved.
        </p>
        <p className="mt-1">Built with ❤️ by Raj</p>
      </footer>
    </main>
  );
};

export default MainHome;
