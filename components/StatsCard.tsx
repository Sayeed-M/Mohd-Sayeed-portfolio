"use client";
import React from 'react';
import { m } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: any;
  idx?: number;
  subValue?: string;
  highlight?: boolean;
}

export function StatsCard({ label, value, icon: Icon, idx = 0, subValue, highlight }: StatsCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,88,188,0.15)" }}
      className={`relative overflow-hidden bg-white/60 dark:bg-black/60 backdrop-blur-xl border ${highlight ? 'border-primary/40 shadow-lg' : 'border-outline-variant/20 shadow-[0_8px_30px_rgba(20,27,43,0.05)]'} rounded-2xl p-6 transition-all duration-300`}
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent blur-[30px] rounded-full pointer-events-none" />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl ${highlight ? 'bg-primary/10' : 'bg-surface-container-low dark:bg-surface-container/50'} flex items-center justify-center`}>
          <Icon size={22} className={highlight ? 'text-primary' : 'text-on-surface-variant'} />
        </div>
      </div>
      <div className="relative z-10">
        <div className="font-display text-4xl font-black text-on-surface tracking-tight mb-1">
          {value}
        </div>
        <div className="font-manrope font-semibold text-sm text-on-surface-variant">
          {label}
        </div>
        {subValue && (
          <div className="mt-3 text-xs font-bold font-manrope text-primary bg-primary/5 dark:bg-primary/10 inline-block px-3 py-1 rounded-full">
            {subValue}
          </div>
        )}
      </div>
    </m.div>
  );
}
