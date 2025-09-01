// About.jsx
import React from "react";

const About = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About DeepThreat
        </h1>
        <p className="text-lg leading-relaxed mb-12">
          DeepThreat is a next-generation cybersecurity platform dedicated to
          safeguarding digital ecosystems. By combining <span className="font-semibold text-blue-600 dark:text-blue-400">real-time monitoring</span>, 
          <span className="font-semibold text-purple-600 dark:text-purple-400"> advanced analytics</span>, and 
          <span className="font-semibold text-green-600 dark:text-green-400"> intelligent automation</span>, 
          we help individuals and organizations stay one step ahead of cyber threats.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        <div className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transform transition duration-300">
          <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            Our Vision
          </h2>
          <p className="leading-relaxed">
            To build a safer internet by empowering everyone with tools that
            detect, analyze, and neutralize threats with clarity and precision.
          </p>
        </div>
        <div className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transform transition duration-300">
          <h2 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-400">
            Our Mission
          </h2>
          <p className="leading-relaxed">
            To simplify cybersecurity with innovative solutions that make
            protection accessible, transparent, and reliable for all.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600 dark:text-green-400">
          What We Offer
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            "Real-time threat detection & alerts",
            "Threat intelligence feeds, curated & enriched",
            "Interactive analytics & dashboards",
            "Seamless integration with existing systems",
          ].map((offer, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transform transition duration-300"
            >
              <p className="font-medium">{offer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">
          Contact Us
        </h2>
        <p className="leading-relaxed mb-4">
          Have questions, feedback, or want to collaborate?  
          We’d love to hear from you.
        </p>
        <a
          href="mailto:rajmukherjeegcp@gmail.com"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
        >
          rajmukherjeegcp@gmail.com
        </a>
      </div>
    </section>
  );
};

export default About;
