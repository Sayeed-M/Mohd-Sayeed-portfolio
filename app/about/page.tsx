"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import FrameSequencePlayer from "@/components/FrameSequencePlayer";
import { GlassmorphismPanel } from "@/components/GlassmorphismPanel";
import { m } from 'framer-motion';

const EXPERIENCES = [
  {
     year: "2026 - Present",
     role: "Lead VTOL Architect",
     company: "AeroGlass Aeronautics",
     desc: "Spearheaded the design of next-generation autonomous flight systems focusing on weightless core philosophy and neural object tracking."
  },
  {
     year: "2024 - 2026",
     role: "Senior Flight Dynamics Engineer",
     company: "Skyward Tech",
     desc: "Developed predictive motor adjustment models using C++ and WebGL visualization dashboards."
  },
  {
     year: "2022 - 2024",
     role: "Embedded Systems Developer",
     company: "DroneWorks Inc",
     desc: "Programmed core flight control stabilization mechanisms into custom flight controller boards."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-[200vh] bg-surface relative">
      <Navbar />

      {/* Background Frame Sequence */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <FrameSequencePlayer
          folderPath="/assets/frames/drone-close"
          frameCount={240}
          playbackType="scroll"
        />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <m.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-16 text-center"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">
            About & Expertise
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-container rounded-full mb-6 mx-auto" />
          <p className="font-manrope text-lg text-on-surface-variant max-w-2xl mx-auto">
             Engineering the invisible. I build mission-critical interfaces and robust flight systems where hardware and software merge effortlessly.
          </p>
        </m.div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 space-y-12 py-8">
           {EXPERIENCES.map((exp, idx) => (
             <m.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                className="relative"
             >
                {/* Timeline node */}
                <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-surface border-[3px] border-primary shadow-[0_0_15px_rgba(0,88,188,0.5)]" />
                
                <GlassmorphismPanel containerType="highest" className="p-6 md:p-8 hover:shadow-[0_20px_60px_rgba(0,88,188,0.1)] transition-shadow">
                    <div className="text-primary font-bold font-manrope text-sm uppercase tracking-widest mb-2">{exp.year}</div>
                    <h3 className="font-display text-2xl font-bold text-on-surface mb-1">{exp.role}</h3>
                    <div className="font-manrope text-md text-on-surface-variant font-medium mb-4">{exp.company}</div>
                    <p className="font-manrope text-on-surface-variant leading-relaxed">{exp.desc}</p>
                </GlassmorphismPanel>
             </m.div>
           ))}
        </div>
      </section>
    </main>
  );
}
