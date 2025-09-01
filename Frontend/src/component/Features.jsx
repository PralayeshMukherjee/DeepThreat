// Features.jsx
import React from "react";
import { ShieldCheck, Activity, BarChart, PlugZap } from "lucide-react"; 

// You can install lucide-react with: npm install lucide-react

const features = [
  {
    title: "Real-Time Threat Detection",
    description:
      "Monitor and detect malicious activities instantly with AI-driven detection engines that adapt to evolving threats.",
    icon: <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Threat Intelligence Feeds",
    description:
      "Access curated and enriched intelligence feeds to stay ahead of zero-day vulnerabilities and emerging attacks.",
    icon: <Activity className="w-10 h-10 text-green-600 dark:text-green-400" />,
  },
  {
    title: "Interactive Dashboards",
    description:
      "Visualize attack patterns, anomalies, and risk levels with easy-to-use dashboards that provide actionable insights.",
    icon: <BarChart className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Seamless Integrations",
    description:
      "Easily integrate with SIEMs, firewalls, and third-party security tools for a unified defense strategy.",
    icon: <PlugZap className="w-10 h-10 text-pink-600 dark:text-pink-400" />,
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Features
        </h1>
        <p className="text-lg leading-relaxed">
          Discover how DeepThreat empowers you to stay secure with cutting-edge 
          <span className="font-semibold text-blue-600 dark:text-blue-400"> cybersecurity tools</span> 
          and <span className="font-semibold text-purple-600 dark:text-purple-400">intelligent monitoring</span>.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-center leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
