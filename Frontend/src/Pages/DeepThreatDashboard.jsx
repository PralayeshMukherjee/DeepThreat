import React from "react";
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

const trafficData = [
  { name: "Google.com", safe: 55, suspicious: 25, malicious: 20 },
  { name: "Phishy.net", safe: 20, suspicious: 35, malicious: 45 },
  { name: "Secure.org", safe: 80, suspicious: 10, malicious: 10 },
];

const threatTrends = [
  { name: "Day 1", threats: 120 },
  { name: "Day 2", threats: 220 },
  { name: "Day 3", threats: 300 },
  { name: "Day 4", threats: 425 },
  { name: "Day 5", threats: 275 },
];

const pieData = [
  { name: "Safe", value: 55, color: "#00bcd4" },
  { name: "Suspicious", value: 30, color: "#ff9800" },
  { name: "Malicious", value: 15, color: "#f44336" },
];

export default function DeepThreatDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        DeepThreat Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 text-white shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Threats by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trafficData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="safe" fill="#00bcd4" name="Safe" />
                <Bar dataKey="suspicious" fill="#ff9800" name="Suspicious" />
                <Bar dataKey="malicious" fill="#f44336" name="Malicious" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Daily Threat Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={threatTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
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

        <Card className="bg-slate-800 text-white shadow-xl flex items-center justify-center">
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-pink-500">425</p>
            <p className="text-sm text-slate-400 mt-2">
              Total Detected Threats Today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white shadow-xl">
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
