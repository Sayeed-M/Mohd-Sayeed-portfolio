"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

// Dynamic import for heavy 3D — no SSR
const DroneAnimation = dynamic(
  () => import("@/components/DroneAnimation").then((m) => m.DroneAnimation),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

// Dynamic import for canvas-heavy frame player — no SSR
const FrameSequencePlayer = dynamic(
  () => import("@/components/FrameSequencePlayer"),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <main className="min-h-[300vh] bg-surface relative">
      <Navbar />

      {/* ─── HERO — STICKY VIEWPORT ─── */}
      <section className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background Frame Sequence (scroll-driven) */}
        <motion.div
          className="absolute inset-0 opacity-35 mix-blend-multiply"
          style={{ scale: heroScale }}
        >
          <FrameSequencePlayer
            folderPath="/assets/frames/drone-hover"
            frameCount={240}
            playbackType="scroll"
          />
        </motion.div>

        {/* Atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/80 pointer-events-none z-5" />

        {/* 3D WebGL Drone */}
        <div className="absolute inset-0 z-10 pointer-events-auto cursor-grab active:cursor-grabbing">
          <Suspense fallback={null}>
            <DroneAnimation />
          </Suspense>
        </div>

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 z-20 pointer-events-none">
          <motion.div
            style={{ y: contentY, opacity: heroOpacity }}
            className="flex flex-col items-center max-w-4xl text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
              <span className="text-sm font-semibold tracking-wide text-on-surface uppercase">
                System Online
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-on-surface tracking-tight leading-[0.9] mb-6 drop-shadow-sm"
            >
              MOHD SAYEED<br />
              S MULLA.
            </motion.h1>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="font-manrope text-lg md:text-2xl text-primary font-bold tracking-tight mb-6"
            >
              AI & Robotics Developer | Flutter & Application Developer
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="font-manrope text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10"
            >
              Bridging precise aerospace hardware with intelligent, cross-platform software. I build systems that process the world in real-time, from deep embedded flight controllers to production-grade mobile applications.
            </motion.p>
            <div className="flex items-center justify-center gap-4 pointer-events-auto">
              <Link
                href="/projects"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold font-manrope text-sm shadow-[0_8px_30px_rgba(0,88,188,0.35)] hover:shadow-[0_12px_40px_rgba(0,88,188,0.5)] hover:scale-105 transition-all"
              >
                View Engineering Work
              </Link>
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full border border-outline-variant/40 bg-white/30 backdrop-blur-sm text-on-surface font-bold font-manrope text-sm hover:bg-white/60 transition-all"
              >
                About Me
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-manrope text-xs text-on-surface-variant uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* ─── SECTION 2 — PHILOSOPHY ─── */}
      <section className="relative z-30 h-screen flex flex-col items-center justify-center bg-surface-container-low/60 backdrop-blur-xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-6 leading-tight">
            Design that breathes.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
              Interfaces that float.
            </span>
          </h2>
          <p className="font-manrope text-lg text-on-surface-variant leading-relaxed mb-10 max-w-2xl mx-auto">
            The layout rejects heavy, boxed-in constraints. Structure is carved
            from light — tonal shifts replace borders, and depth emerges from
            layered frosted glass — not ink.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { num: "4+", label: "Mission-Critical Systems" },
              { num: "240", label: "Cinematic Frames" },
              { num: "3D", label: "WebGL Interactive Core" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-primary mb-1">{stat.num}</div>
                <div className="font-manrope text-sm text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 3 — CLOSING ─── */}
      <section className="relative z-30 h-screen bg-surface-container-lowest flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface mb-6 tracking-tight">
            Ready to connect?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-tertiary mx-auto rounded-full mb-8" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold font-manrope shadow-[0_8px_30px_rgba(0,88,188,0.35)] hover:scale-105 transition-all"
          >
            Initialize Contact
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
