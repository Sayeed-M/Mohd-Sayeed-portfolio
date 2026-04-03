"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center relative overflow-hidden px-6">
      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/6 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-tertiary/6 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Glass card */}
        <div className="bg-white/60 backdrop-blur-2xl border border-outline-variant/20 rounded-3xl p-10 shadow-[0_30px_80px_rgba(20,27,43,0.1)]">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-on-surface mb-3">
            System Anomaly Detected
          </h1>
          <p className="font-manrope text-sm text-on-surface-variant mb-2 leading-relaxed">
            An unexpected error occurred in the flight control system.
          </p>
          {error?.message && (
            <code className="block text-xs bg-surface-container-low rounded-lg px-3 py-2 text-red-600 font-mono mb-6 break-all">
              {error.message}
            </code>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={reset}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold font-manrope text-sm shadow-atmospheric hover:scale-105 transition-all"
            >
              Re-initialize System
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-outline-variant/40 text-on-surface font-bold font-manrope text-sm hover:bg-surface-container-low transition-all"
            >
              Return to Base
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
