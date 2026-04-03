"use client";
import React, { useRef } from "react";
import { m, useInView } from 'framer-motion';

export function SkillRing({
  percentage,
  label,
  color = "#0058bc",
}: {
  percentage: number;
  label: string;
  color?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const radius = 45;
  const circumference = 2 * Math.PI * radius; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <m.div ref={ref} variants={itemVariants} className="relative flex flex-col items-center justify-center group w-full">
      <m.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative"
      >
        <svg width="110" height="110" viewBox="0 0 110 110" className="rotate-[-90deg] drop-shadow-md">
          <defs>
             <linearGradient id={`blueGlow-${label.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#0058bc" />
               <stop offset="100%" stopColor="#00c6ff" />
             </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke="rgba(0, 88, 188, 0.08)"
            strokeWidth="7"
          />
          {/* Animated Progress Ring */}
          <m.circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke={`url(#blueGlow-${label.replace(/\s+/g, '')})`}
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="group-hover:drop-shadow-[0_0_8px_rgba(0,88,188,0.6)] transition-all duration-300"
          />
        </svg>

        {/* Orbiting element for 3D feel on hover - Optional */}
        <m.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-[#00c6ff] rounded-full shadow-[0_0_10px_#00c6ff] -translate-x-1/2 -translate-y-1/2" />
        </m.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display font-bold text-lg text-slate-800">
            {isInView ? (
              <m.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {percentage}%
              </m.span>
            ) : null}
          </span>
        </div>
      </m.div>
      <div className="mt-5 font-manrope text-[13px] font-bold text-slate-600 text-center max-w-[100px] leading-snug group-hover:text-primary transition-colors duration-300">
        {label}
      </div>
    </m.div>
  );
}
