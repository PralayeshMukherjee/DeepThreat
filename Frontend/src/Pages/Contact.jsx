// src/pages/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      const emailFound = decode.email?.email || decode.email;
      setEmail(emailFound);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        () => {
          setLoading(false);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b1623] dark:text-white px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-[#99aaff]">
            Let's Connect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            I'm currently looking for new opportunities in Full Stack
            Development. Whether you have a question or just want to say hi,
            feel free to reach out!
          </p>

          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-[#121e2d] rounded-lg">
              <Phone className="text-blue-500" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-800 dark:text-gray-300">
                  +91 9382XXXX77
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-[#121e2d] rounded-lg">
              <Mail className="text-green-500" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-800 dark:text-gray-300">
                  rajmukherjee2807@gmail.com
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-[#121e2d] rounded-lg">
              <MapPin className="text-purple-500" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-800 dark:text-gray-300">
                  Sector V, Kolkata, West Bengal
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-2 font-semibold">Connect with me</p>
            <div className="flex gap-4">
              {[Github, Linkedin, ExternalLink, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  className="bg-gray-200 dark:bg-[#1c2a3a] p-3 rounded-lg text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#263648]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-gray-100 dark:bg-[#121e2d] rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold dark:text-white text-black mb-6">
            Send me a message
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Your Name</label>
                <input
                  name="user_name"
                  type="text"
                  required
                  className="w-full p-3 bg-white dark:bg-[#1c2a3a] rounded-lg border border-gray-300 dark:border-[#263648] text-black dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Your Email</label>
                <input
                  name="user_email"
                  type="email"
                  defaultValue={email}
                  required
                  className="w-full p-3 bg-white dark:bg-[#1c2a3a] rounded-lg border border-gray-300 dark:border-[#263648] text-black dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Subject</label>
              <input
                name="subject"
                type="text"
                required
                className="w-full p-3 bg-white dark:bg-[#1c2a3a] rounded-lg border border-gray-300 dark:border-[#263648] text-black dark:text-white"
                placeholder="Let's work together!"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full p-3 bg-white dark:bg-[#1c2a3a] rounded-lg border border-gray-300 dark:border-[#263648] text-black dark:text-white"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 cursor-pointer mt-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
            ${
              loading
                ? "bg-gray-400 cursor-progress"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-bold text-white"
            }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
