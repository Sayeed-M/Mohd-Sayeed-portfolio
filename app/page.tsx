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
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity, y: contentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-manrope text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 pointer-events-auto">
              VTOL Engineering Portfolio
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-on-surface mb-6 max-w-4xl leading-none pointer-events-auto">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-[#3b82f6] to-tertiary">
                Weightless
              </span>
              <br />
              Core
            </h1>
            <p className="font-manrope text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-10 pointer-events-auto">
              Precision-engineered autonomous VTOL systems and premium WebGL
              interfaces — where hardware meets atmosphere.
            </p>
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
        </motion.div>

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
