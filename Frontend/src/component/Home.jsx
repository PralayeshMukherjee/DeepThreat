import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <FaShieldAlt size={40} className="text-cyan-400 mx-auto mb-3" />,
      title: "Real-Time Threat Detection",
      description:
        "Detect malware, phishing links, and suspicious activity instantly.",
    },
    {
      icon: <FaLock size={40} className="text-cyan-400 mx-auto mb-3" />,
      title: "Data Encryption",
      description:
        "Protect your sensitive data with military-grade encryption algorithms.",
    },
    {
      icon: <FaUpload size={40} className="text-cyan-400 mx-auto mb-3" />,
      title: "Secure File Upload",
      description:
        "Scan and sanitize uploaded files in real-time to block harmful content.",
    },
  ];
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/api/token-validation?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.isExpired === "true") {
          console.log(data.isExpired);
          navigate("/mainlayout");
        } else {
          sessionStorage.removeItem("token");
          console.log(data.isExpired);
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        toast.error("❌ An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="text-center px-6 py-32 bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 text-cyan-600 dark:text-cyan-400"
        >
          Stay Safe in the Digital World
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Shield your data, block threats, and protect your digital identity
          with our AI-powered cybersecurity platform.
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-500 hover:bg-cyan-600 px-10 py-3 rounded-full font-semibold text-lg shadow-lg transition text-white"
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gray-100 dark:bg-gray-950 transition-colors"
      >
        <h3 className="text-3xl font-bold text-center text-cyan-600 dark:text-cyan-400 mb-14">
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
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition-shadow"
            >
              {f.icon}
              <h4 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-300">
                {f.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-6"
          >
            About SecureNet
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            SecureNet is an open-source cybersecurity platform focused on
            protecting users from digital threats using real-time monitoring,
            AI-powered threat analysis, and secure encryption protocols. Our
            mission is to make the internet a safer place for everyone.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Home;
