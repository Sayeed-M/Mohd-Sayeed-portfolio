"use client";
import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import {
  BarChart3,
  Layers,
  Cpu,
  Radio,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";

const STATS = [
  { label: "Active Projects", value: "04", change: "+1", up: true, icon: Layers },
  { label: "System Uptime", value: "99.8%", change: "+0.2%", up: true, icon: Activity },
  { label: "API Requests", value: "12.4K", change: "+4.1K", up: true, icon: Radio },
  { label: "Frame Rate", value: "118fps", change: "+12", up: true, icon: Cpu },
];

const PIPELINE_ITEMS = [
  { name: "VTOL Core v2.1 — Firmware Push", status: "Deploy", color: "text-green-500 bg-green-50" },
  { name: "Neural Vision Module — Testing", status: "In Progress", color: "text-primary bg-primary/5" },
  { name: "Fleet API Docs — Review", status: "Pending", color: "text-yellow-600 bg-yellow-50" },
  { name: "Telemetry Dashboard — Staging", status: "Review", color: "text-tertiary bg-tertiary/5" },
];

function StatCard({ stat, idx }: { stat: typeof STATS[0]; idx: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className="bg-white/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 shadow-[0_8px_30px_rgba(20,27,43,0.05)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
          <Icon size={18} className="text-primary" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold font-manrope px-2 py-1 rounded-full ${
            stat.up
              ? "text-green-700 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {stat.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
          {stat.change}
        </div>
      </div>
      <div className="font-display text-3xl font-bold text-on-surface mb-1">
        {stat.value}
      </div>
      <div className="font-manrope text-sm text-on-surface-variant">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-surface-container-low/50 relative overflow-hidden">
      <Navbar />

      {/* Background Glows */}
      <div className="fixed -top-60 -right-60 w-[600px] h-[600px] bg-primary/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl font-bold text-on-surface tracking-tight mb-2">
            Command Dashboard
          </h1>
          <p className="font-manrope text-on-surface-variant">
            Mission control for all active engineering systems.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} idx={i} />
          ))}
        </div>

        {/* Pipeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline list */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 shadow-[0_8px_30px_rgba(20,27,43,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 size={20} className="text-primary" />
              <h2 className="font-display font-bold text-lg text-on-surface">
                Project Pipeline
              </h2>
            </div>
            <div className="space-y-4">
              {PIPELINE_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0"
                >
                  <p className="font-manrope text-sm text-on-surface font-medium">
                    {item.name}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold font-manrope uppercase tracking-wide ${item.color}`}
                  >
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 shadow-[0_8px_30px_rgba(20,27,43,0.05)]">
            <h2 className="font-display font-bold text-lg text-on-surface mb-6">
              System Health
            </h2>
            {[
              { label: "API Gateway", pct: 98 },
              { label: "Database", pct: 92 },
              { label: "Frame Renderer", pct: 100 },
              { label: "AI Concierge", pct: 87 },
            ].map((sys, i) => (
              <motion.div
                key={sys.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="mb-5 last:mb-0"
              >
                <div className="flex justify-between text-xs font-manrope font-semibold text-on-surface-variant mb-1.5">
                  <span>{sys.label}</span>
                  <span className="text-primary">{sys.pct}%</span>
                </div>
                <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sys.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
