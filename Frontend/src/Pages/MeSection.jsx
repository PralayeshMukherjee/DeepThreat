import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, FileSearch, Link2, Trash2, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function MeSection() {
  const [stats, setStats] = useState({
    urlSearches: 120,
    documentSearches: 45,
    malicious: 10,
    suspicious: 8,
    safe: 147,
  });

  const [user, setUser] = useState({
    name: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91 9876543210",
  });

  const handleDeleteProfile = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      // API call to delete profile
      alert("Profile deleted successfully!");
    }
  };
  useEffect(()=>{
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      const email = decode.email?.email || decode.email;
      console.log(email); // support both structures
      if (email) getUserAllDetails(email);
    } 
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] text-gray-900 dark:from-[#0F172A] dark:to-[#1E293B] dark:text-white flex flex-col items-center py-12 px-4">
      <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-12 tracking-wide text-center">
        My Profile
      </h2>

      {/* Section 1: Personal Details */}
      <div className="w-full max-w-3xl mb-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-blue-500 dark:text-blue-300">
          Personal Details
        </h3>
        <div className="bg-white dark:bg-[#1E293B]/80 rounded-2xl p-8 shadow-lg flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <User className="text-blue-500 dark:text-blue-400" size={22} />
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <User className="text-green-500 dark:text-green-400" size={22} />
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <User className="text-yellow-500 dark:text-yellow-400" size={22} />
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Search Stats */}
      <div className="w-full max-w-6xl mb-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-blue-500 dark:text-blue-300">
          Search Overview
        </h3>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              title: "Total URL Searches",
              value: stats.urlSearches,
              icon: Link2,
              color: "from-blue-400 to-indigo-400",
            },
            {
              title: "Total Document Searches",
              value: stats.documentSearches,
              icon: FileSearch,
              color: "from-green-400 to-emerald-400",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`bg-gradient-to-r ${item.color} rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md`}
              >
                <item.icon size={40} className="mb-2 text-white" />
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
              <p className="mt-3 text-lg font-semibold text-center w-40">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: URL Classification */}
      <div className="w-full max-w-6xl mb-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-blue-500 dark:text-blue-300">
          URL Classification
        </h3>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              title: "Malicious URLs",
              value: stats.malicious,
              icon: ShieldCheck,
              color: "from-red-400 to-pink-400",
            },
            {
              title: "Suspicious URLs",
              value: stats.suspicious,
              icon: ShieldCheck,
              color: "from-yellow-400 to-orange-400",
            },
            {
              title: "Safe URLs",
              value: stats.safe,
              icon: ShieldCheck,
              color: "from-emerald-400 to-teal-400",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`bg-gradient-to-r ${item.color} rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md`}
              >
                <item.icon size={40} className="mb-2 text-white" />
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
              <p className="mt-3 text-lg font-semibold text-center w-40">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 4: Profile Actions */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-center mb-6 text-blue-500 dark:text-blue-300">
          Profile Settings
        </h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleDeleteProfile}
            variant="destructive"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg shadow-md text-white"
          >
            <Trash2 size={22} /> Delete Profile
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
