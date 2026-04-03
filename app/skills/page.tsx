"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SkillRing } from '@/components/SkillRing';
import { SkillCard } from '@/components/SkillCard';
import { m, useScroll, useTransform } from 'framer-motion';

export default function SkillsPage() {
    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <main className="min-h-screen bg-surface relative overflow-hidden pb-32">
            <Navbar />
            
            {/* Dark mode abstract radial glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tertiary/5 dark:bg-tertiary/20 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10 -translate-x-1/3" />

            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10 text-center">
                <m.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="font-display text-5xl md:text-7xl font-black tracking-tight text-on-surface mb-6 drop-shadow-sm"
                >
                    Technical Arsenal.
                </m.h1>
                <m.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    className="font-manrope text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    A comprehensive breakdown of my capabilities ranging from low-level aerospace systems to high-performance frontend interfaces.
                </m.p>
            </section>

            <section className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Drone & Aerospace */}
                    <SkillCard 
                        category="Drone Systems" 
                        index={0}
                        skills={[
                            { name: "PX4 / ArduPilot", level: 90 },
                            { name: "ROS / ROS2", level: 85 },
                            { name: "MAVLink", level: 80 }
                        ]}
                    />

                    {/* App Development */}
                    <SkillCard 
                        category="Application Development" 
                        index={1}
                        skills={[
                            { name: "Flutter", level: 95 },
                            { name: "Android", level: 85 },
                            { name: "iOS / Swift", level: 75 }
                        ]}
                    />

                    {/* AI & Computer Vision */}
                    <SkillCard 
                        category="AI & Computer Vision" 
                        index={2}
                        skills={[
                            { name: "Machine Learning", level: 85 },
                            { name: "Python", level: 90 },
                            { name: "OpenAI API", level: 80 }
                        ]}
                    />

                    {/* Web Development */}
                    <SkillCard 
                        category="Web Development" 
                        index={3}
                        skills={[
                            { name: "React / Next.js", level: 90 },
                            { name: "TypeScript", level: 85 },
                            { name: "HTML / CSS", level: 80 }
                        ]}
                    />

                </div>

                {/* Additional Grids for lists without Rings */}
                <m.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Languages */}
                    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-atmospheric hover:border-primary/50 transition-colors">
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-6">Programming</h3>
                        <div className="flex flex-wrap gap-3">
                            {['C', 'C#', 'Java', 'Swift', 'Python', 'Dart'].map(lang => (
                                <span key={lang} className="px-4 py-2 bg-surface/50 rounded-full font-manrope text-sm font-semibold text-on-surface border border-outline-variant/30">{lang}</span>
                            ))}
                        </div>
                    </div>

                     {/* Tools */}
                    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-atmospheric hover:border-primary/50 transition-colors">
                         <h3 className="font-display text-2xl font-bold text-on-surface mb-6">Tools & Tech</h3>
                         <div className="flex flex-wrap gap-3">
                            {['Oracle DBMS', 'VS Code', 'Visual Studio', 'Xcode', 'Android Studio'].map(tool => (
                                <span key={tool} className="px-4 py-2 bg-surface/50 rounded-full font-manrope text-sm font-semibold text-on-surface border border-outline-variant/30">{tool}</span>
                            ))}
                        </div>
                    </div>

                    {/* Core Skills */}
                    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-atmospheric hover:border-primary/50 transition-colors">
                         <h3 className="font-display text-2xl font-bold text-on-surface mb-6">Core Skills</h3>
                         <div className="flex flex-col gap-3 font-manrope text-on-surface-variant font-medium">
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Problem Solving</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Communication</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Team Collaboration</div>
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Debugging & Testing</div>
                        </div>
                    </div>
                </m.div>

            </section>
        </main>
    )
}
