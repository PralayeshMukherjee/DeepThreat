// src/components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const MainHome = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-gray-200 flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
      >
        Cybersecurity Intelligence Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-md md:text-lg text-gray-600 mb-10 max-w-2xl"
      >
        Scan suspicious URLs and documents in real-time using our secure,
        AI-powered tools.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col md:flex-row gap-5"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-7 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Check Malicious URL
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-7 py-3 bg-green-600 text-white text-base font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Scan Uploaded Document
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12"
      >
        <p className="text-xs text-gray-400">
          We respect your privacy. No data is stored or shared.
        </p>
      </motion.div>
    </section>
  );
};

export default MainHome;
