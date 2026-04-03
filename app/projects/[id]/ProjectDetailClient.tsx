"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { ProjectData } from '../data';
import { GlassmorphismPanel } from '@/components/GlassmorphismPanel';
import { MouseGlowBorder } from '@/components/MouseGlowBorder';
import { ExternalLink, Code, GitBranch } from 'lucide-react';
import dynamic from 'next/dynamic';

const FrameSequencePlayer = dynamic(() => import('@/components/FrameSequencePlayer'), { ssr: false });

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
    // 3D Parallax tilt logic for the data card
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <main className="min-h-screen bg-[#ffffff]">
            <Navbar />
            
            <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                {/* 1. Animation Viewport (Left) */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-3/5 h-[400px] md:h-[500px] lg:h-[600px] relative group"
                >
                    <MouseGlowBorder className="h-full rounded-3xl">
                        <GlassmorphismPanel containerType="low" className="p-3 w-full h-full relative rounded-3xl bg-white/40 border-white/50 backdrop-blur-2xl shadow-xl overflow-hidden">
                            {/* Inner Screen rendering conditional media */}
                            <div className="absolute inset-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 shadow-inner overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-out flex items-center justify-center">
                                {project.mediaFolder && project.mediaFrames ? (
                                    <FrameSequencePlayer folderPath={project.mediaFolder} frameCount={project.mediaFrames} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-primary/40 dark:text-primary/60">
                                        <Code size={80} strokeWidth={1} />
                                        <span className="font-display font-semibold tracking-widest mt-4 uppercase text-xs">Runtime Engine</span>
                                    </div>
                                )}
                            </div>
                            {/* Decorative badge overlay */}
                            <div className="absolute top-8 left-8 z-10 px-4 py-2 bg-surface backdrop-blur-md rounded-full border border-outline-variant/30 flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="font-manrope text-[10px] font-bold text-white uppercase tracking-widest">Active Render Thread</span>
                            </div>
                        </GlassmorphismPanel>
                    </MouseGlowBorder>
                </motion.div>

                {/* 2. Content Info Panel (Right) */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { x.set(0); y.set(0); }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
                    className="w-full lg:w-2/5 z-10"
                >
                    <div style={{ transform: "translateZ(40px)" }} className="relative h-full w-full">
                        <MouseGlowBorder className="rounded-3xl w-full">
                            <GlassmorphismPanel containerType="highest" className="p-8 md:p-10 rounded-3xl bg-white/60 border border-white/60 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] flex flex-col items-start min-h-[450px]">
                                <h1 className="font-display font-bold text-4xl text-slate-800 tracking-tight mb-2 drop-shadow-sm">{project.title}</h1>
                                
                                <div className="w-16 h-1 bg-gradient-to-r from-[#0058bc] to-[#00c6ff] rounded-full mb-8 shadow-[0_0_10px_#00c6ff]" />

                                <p className="font-manrope text-slate-600 leading-relaxed mb-6">
                                    {project.fullDetails || project.description}
                                </p>

                                <div className="space-y-4 mb-10 w-full relative">
                                    <h4 className="font-manrope font-bold text-[11px] uppercase tracking-widest text-[#0058bc]">Core Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-white border border-white/80 shadow-sm rounded-lg text-[13px] font-semibold text-slate-700 flex items-center gap-1.5 hover:shadow-md hover:scale-105 transition-all">
                                                <Code size={12} className="text-[#0058bc]" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-auto w-full">
                                    {project.githubUrl && (
                                       <a 
                                           href={project.githubUrl} 
                                           target="_blank" 
                                           rel="noreferrer"
                                           className="flex flex-1 items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-800 text-white font-manrope font-semibold text-sm hover:bg-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all"
                                       >
                                           <GitBranch size={16} /> Repository
                                       </a>
                                    )}
                                    {project.liveUrl && (
                                       <a 
                                           href={project.liveUrl} 
                                           target="_blank" 
                                           rel="noreferrer"
                                           className="flex flex-1 items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0058bc] to-[#0070eb] text-white font-manrope font-semibold text-sm hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,88,188,0.3)] transition-all"
                                       >
                                           <ExternalLink size={16} /> Live Data
                                       </a>
                                    )}
                                </div>
                            </GlassmorphismPanel>
                        </MouseGlowBorder>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
