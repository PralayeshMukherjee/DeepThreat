// src/pages/SearchHistory.tsx
import React, { useEffect, useState, useRef } from "react";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const sortByMalicious = (data) => {
  return [...data].sort((a, b) => b.malicious - a.malicious);
};

const filterByDateAndStatus = (data, status, date) => {
  if (!Array.isArray(data)) return [];

  return data.filter((item) => {
    const statusMatch =
      status === "All" ||
      (item.status && item.status.toLowerCase() === status.toLowerCase());

    const dateMatch = !date || (item.date && item.date.trim() === date.trim());

    return statusMatch && dateMatch;
  });
};

const computeStatus = (entry) => {
  const { malicious = 0, suspicious = 0, safe = 0 } = entry;
  if (malicious >= 10) return "Malicious";
  if (suspicious >= 20) return "Suspicious";
  return "Safe";
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
  const getStatus = (entry) => {
    const { malicious = 0, suspicious = 0, safe = 0 } = entry;
    if (malicious >= 10) return "Malicious";
    if (suspicious >= 20) return "Suspicious";
    return "Safe";
  };

  const status = getStatus(entry);

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
          {status === "Malicious" && (
            <ShieldAlert className="w-4 h-4 text-red-500 mr-1" />
          )}
          {status === "Suspicious" && (
            <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
          )}
          {status === "Safe" && (
            <ShieldCheck className="w-4 h-4 text-green-500 mr-1" />
          )}
          <span className={`text-${colorMap[entry.status]}-500`}>{status}</span>
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
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [historyUrl, setHistoryUrl] = useState([]);

  const getHistory = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/userDetails/urlHistory?email=${email}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        const updatedData = data.map((entry) => ({
          ...entry,
          status: computeStatus(entry),
        }));
        setHistoryUrl(updatedData);
      } else {
        console.error("API returned non-array data:", data);
        setHistoryUrl([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      const email = decode.email?.email || decode.email;
      console.log(email); // support both structures
      if (email) getHistory(email);
    }
  }, []);

  const filtered = filterByDateAndStatus(historyUrl, statusFilter, dateFilter);
  const sorted = sortByMalicious(filtered);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200">
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
