// src/pages/SearchHistory.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  Moon,
  Sun,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

const mockHistory = [
  {
    url: "https://example.com/malware",
    date: "2025-07-21",
    status: "Malicious",
    malicious: 80,
    suspicious: 10,
    safe: 10,
  },
  {
    url: "https://trustedsite.org",
    date: "2025-07-20",
    status: "Safe",
    malicious: 0,
    suspicious: 5,
    safe: 95,
  },
  {
    url: "https://suspiciousdomain.net",
    date: "2025-07-18",
    status: "Suspicious",
    malicious: 20,
    suspicious: 60,
    safe: 20,
  },
];

const sortByMalicious = (data) => {
  return [...data].sort((a, b) => b.malicious - a.malicious);
};

const filterByDateAndStatus = (data, status, date) => {
  return data.filter(
    (item) =>
      (status === "All" || item.status === status) &&
      (date === "" || item.date === date)
  );
};

function HistoryEntry({ entry }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  const colorMap = {
    Malicious: "red",
    Suspicious: "yellow",
    Safe: "green",
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      }}
      className="rounded-xl px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm w-full sm:max-w-2xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
        <div className="mb-1 sm:mb-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {entry.date}
          </p>
          <a
            href={entry.url}
            target="_blank"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all"
          >
            {entry.url}
          </a>
        </div>
        <div className="flex items-center text-sm font-semibold">
          {entry.status === "Malicious" && (
            <ShieldAlert className="w-4 h-4 text-red-500 mr-1" />
          )}
          {entry.status === "Suspicious" && (
            <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
          )}
          {entry.status === "Safe" && (
            <ShieldCheck className="w-4 h-4 text-green-500 mr-1" />
          )}
          <span className={`text-${colorMap[entry.status]}-500`}>
            {entry.status}
          </span>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 sm:overflow-x-hidden">
        {["Malicious", "Suspicious", "Safe"].map((type) => {
          const value = entry[type.toLowerCase()];

          return (
            <div key={type} className="min-w-[100px]">
              <p
                className={`text-xs font-semibold text-${colorMap[type]}-500 mb-1`}
              >
                {type}
              </p>
              <div
                className={`w-full h-2.5 bg-${colorMap[type]}-100 dark:bg-${colorMap[type]}-900 rounded-full`}
              >
                <motion.div
                  className={`h-2.5 bg-${colorMap[type]}-500 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs mt-0.5">{value}%</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function History() {
  const [darkMode, setDarkMode] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = filterByDateAndStatus(mockHistory, statusFilter, dateFilter);
  const sorted = sortByMalicious(filtered);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200">
      <header className="flex justify-between items-center px-4 sm:px-8 py-4 shadow-md sticky top-0 z-50 bg-white dark:bg-gray-950">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500 dark:from-cyan-400 dark:to-purple-600">
          DeepThreat History
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border dark:border-gray-700 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 hover:scale-105 transition-all shadow-sm"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-500" />
          )}
          <span className="text-sm font-semibold">
            {darkMode ? "Light" : "Dark"} Mode
          </span>
        </button>
      </header>

      <section className="px-4 sm:px-6 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Malicious">Malicious</option>
            <option value="Suspicious">Suspicious</option>
            <option value="Safe">Safe</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-6">
          {sorted.map((entry, index) => (
            <HistoryEntry key={index} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
