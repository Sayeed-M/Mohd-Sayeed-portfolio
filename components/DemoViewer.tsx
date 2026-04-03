"use client";
import React from 'react';
import { GlassmorphismPanel } from './GlassmorphismPanel';
import { MouseGlowBorder } from './MouseGlowBorder';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Code, Database, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';

const FrameSequencePlayer = dynamic(() => import('./FrameSequencePlayer'), { ssr: false });

export interface DemoViewerProps {
    title: string;
    description: string;
    techStack: string[];
    folder: string;
    frameCount: number;
    delay?: number;
}

export function DemoViewer({ title, description, techStack, folder, frameCount, delay = 0 }: DemoViewerProps) {
    // Parallax logic for side panel
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <m.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay }}
            className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto h-auto lg:h-[500px]"
        >
            {/* Viewer Panel */}
            <div className="w-full lg:w-2/3 h-[400px] lg:h-full group">
                <MouseGlowBorder className="h-full rounded-3xl">
                    <GlassmorphismPanel containerType="low" className="p-2 h-full flex items-center justify-center relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-lg">
                        
                        {/* Simulation / Visual Embed */}
                        <div className="absolute inset-4 rounded-2xl overflow-hidden bg-slate-900 shadow-inner group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            <FrameSequencePlayer folderPath={folder} frameCount={frameCount} />
                        </div>
                        
                        {/* Overlay Tag */}
                        <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-white text-xs font-bold font-manrope tracking-wider uppercase">Live Feed</span>
                        </div>
                    </GlassmorphismPanel>
                </MouseGlowBorder>
            </div>

            {/* Details Panel */}
            <m.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
                className="w-full lg:w-1/3 h-full z-10"
            >
                <div style={{ transform: "translateZ(30px)" }} className="h-full">
                    <MouseGlowBorder className="h-full rounded-3xl">
                        <GlassmorphismPanel containerType="low" className="p-8 md:p-10 h-full flex flex-col justify-center rounded-3xl bg-white/50 backdrop-blur-lg border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0058bc]/20 to-[#0058bc]/5 flex items-center justify-center mb-6 text-[#0058bc]">
                                <Eye size={24} />
                            </div>
                            <h3 className="font-display font-bold text-3xl text-slate-800 mb-4 tracking-tight drop-shadow-sm">{title}</h3>
                            <p className="font-manrope text-slate-600 mb-8 leading-relaxed">
                                {description}
                            </p>
                            
                            <div className="space-y-4 mt-auto">
                                <h4 className="font-manrope font-bold text-xs uppercase tracking-widest text-[#0058bc]">Tech Stack Matrix</h4>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-white/80 border border-white shadow-sm rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                            <Code size={12} />
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </GlassmorphismPanel>
                    </MouseGlowBorder>
                </div>
            </m.div>
        </m.div>
    );
}
