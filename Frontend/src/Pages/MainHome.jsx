// src/components/LandingPage.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendHorizonal, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  //menu open for mobile
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //features data
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
  // under development function for Scan Document button
  const underDev = () => {
    toast.info("This feature is under development.");
  };
  // function to handle the URL check button
  const [showInput, setShowInput] = useState(false);
  const [url, setUrl] = useState("");
  const handleCheckURLClick = () => {
    setShowInput((prev) => !prev);
  };
  //for handle the waiting state for send url
  const [loading, setLoading] = useState(false);
  const handleSendClick = async () => {
    setLoading(true);
    if (!url.trim()) {
      toast.error("Please enter a valid URL.");
      setLoading(false);
      return;
    } else {
      setUrl(url.trim());
      try {
        const response = await fetch(`http://localhost:8080/urlChecker/check`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(url),
        });
        const data = await response.json();
        sessionStorage.setItem("malicious", data.mal);
        sessionStorage.setItem("suspicious", data.sus);
        sessionStorage.setItem("safe", data.safe);
        toast.success("URL sent for scanning!");
        navigate("/mainlayout/deepthreatdashboard");
      } catch (error) {
        console.error("Error sending URL:", error);
        toast.error(
          "❌ An error occurred while sending the URL. Please try again later."
        );
      } // Hide input after sending
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white text-black dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white">
      <section className="px-6 py-24 bg-gray-100 text-center relative overflow-hidden dark:bg-slate-800">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 rounded-xl blur-3xl opacity-50 pointer-events-none"></div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-black dark:text-white z-10 relative"
        >
          Smart Security Starts Here
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-gray-700 dark:text-slate-300 z-10 relative"
        >
          Analyze URLs and documents for potential threats with real-time
          AI-driven security.
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 z-10 relative">
          <button
            onClick={handleCheckURLClick}
            className="px-6 py-3 hover:scale-105 bg-indigo-600 text-white rounded-lg text-sm md:text-base hover:bg-indigo-700 transition shadow-lg"
          >
            Check URL
          </button>
          <button
            onClick={underDev}
            className="px-6 py-3 hover:scale-105 bg-emerald-600 text-white rounded-lg text-sm md:text-base hover:bg-emerald-700 transition shadow-lg"
          >
            Scan Document
          </button>
        </div>
        {showInput && (
          // Animated input section for URL scanning
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              showInput
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="overflow-hidden mt-6 flex justify-center px-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to scan..."
                className="w-full px-4 py-2 rounded-lg border bg-gray-200 hover:border-gray-500 hover:border-2 border-gray-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-900 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={handleSendClick}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-white text-sm md:text-base font-medium transition-all duration-300
    ${
      loading
        ? "bg-gray-400 cursor-progress"
        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
    }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                  </>
                ) : (
                  <>
                    <SendHorizonal className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 py-20 bg-gray-100 text-center dark:bg-slate-800"
      >
        <h3 className="text-3xl font-semibold mb-12 text-indigo-600 dark:text-indigo-300">
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
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition dark:bg-slate-700"
            >
              {f.icon}
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">
                {f.title}
              </h4>
              <p className="text-sm text-gray-700 dark:text-slate-300">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainHome;
