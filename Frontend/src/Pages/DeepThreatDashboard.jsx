import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";

const threatTrends = [
  { name: "Day 1", threats: 120 },
  { name: "Day 2", threats: 220 },
  { name: "Day 3", threats: 300 },
  { name: "Day 4", threats: 425 },
  { name: "Day 5", threats: 275 },
];

export default function DeepThreatDashboard() {
  const [trafficData, setTrafficData] = useState([]);
  const [malicious, setMalicious] = useState(0);
  const [suspicious, setSuspicious] = useState(0);
  const [safe, setSafe] = useState(0);
  const [finalStatus,setFinalStatus] = useState(0);
  const [threat, setThreat] = useState(0); // if you need this
  const getTraficData = async (email) => {
    const response = await fetch(
      `http://localhost:8080/lastData/getDatas?email=${email}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const formatted = data.map((item) => ({
        name: item.url.length > 10 ? item.url.slice(0, 10) + "..." : item.url,
        fullUrl: item.url, // store full version for tooltip
        safe: item.safe,
        suspicious: item.suspicious,
        malicious: item.malicious,
      }));

      setTrafficData(formatted);
    }
  };

  useEffect(() => {
    const maliciousVal = parseInt(sessionStorage.getItem("malicious")) || 0;
    const suspiciousVal = parseInt(sessionStorage.getItem("suspicious")) || 0;
    const safeVal = parseInt(sessionStorage.getItem("safe")) || 0;
    const threatVal = parseInt(sessionStorage.getItem("threat"));

    setMalicious(maliciousVal);
    setSuspicious(suspiciousVal);
    setSafe(safeVal);
    setThreat(threatVal);
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      const email = decode.email?.email || decode.email;
      console.log(email); // support both structures
      if (email) getTraficData(email);
    }
  }, []);

  const pieData = [
    { name: "Safe", value: safe, color: "#00bcd4" },
    { name: "Suspicious", value: suspicious, color: "#ff9800" },
    { name: "Malicious", value: malicious, color: "#f44336" },
  ];
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center">
        DeepThreat Dashboard
      </h1>

      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-100 text-black dark:bg-slate-800 dark:text-white shadow-xl transition-colors">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Threats by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trafficData}>
                <XAxis dataKey="name" stroke="#999" />
                <YAxis />
                <Tooltip
                  labelFormatter={(label, payload) =>
                    payload[0]?.payload.fullUrl
                  }
                />

                <Bar dataKey="safe" fill="#00bcd4" name="Safe" />
                <Bar dataKey="suspicious" fill="#ff9800" name="Suspicious" />
                <Bar dataKey="malicious" fill="#f44336" name="Malicious" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 text-black dark:bg-slate-800 dark:text-white shadow-xl transition-colors">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Daily Threat Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={threatTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="threats"
                  stroke="#e91e63"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-100 text-black dark:bg-slate-800 dark:text-white shadow-xl flex items-center justify-center transition-colors">
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-pink-500">{threat}</p>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
              Total Detected Threats Today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 text-black dark:bg-slate-800 dark:text-white shadow-xl transition-colors">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Threat Type Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
