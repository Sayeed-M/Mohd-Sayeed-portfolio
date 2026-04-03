"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumePage() {
    const triggerPrint = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-[#ffffff]">
            {/* Exclude standard Navbar from print output */}
            <div className="print:hidden">
                <Navbar />
            </div>
            
            {/* Header / Actions - Hidden during print */}
            <section className="pt-32 pb-10 px-6 max-w-4xl mx-auto print:hidden flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800">Professional Record</h1>
                    <p className="font-manrope text-slate-500 mt-2">Verified document layout optimized for direct PDF parsing.</p>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerPrint}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0058bc] to-[#0070eb] text-white rounded-xl font-manrope font-semibold shadow-lg shadow-[#0058bc]/20 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                    <Download size={18} />
                    Download PDF
                </motion.button>
            </section>

            {/* Resume Document Wrapper */}
            <section className="px-6 pb-24 md:px-12 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-14 lg:p-20 rounded-3xl md:border md:border-slate-200 md:shadow-2xl print:shadow-none print:border-none print:p-0 print:m-0 w-full min-h-[1056px] text-slate-800">
                    
                    {/* Header */}
                    <header className="border-b-2 border-slate-900 pb-8 mb-10 text-center md:text-left">
                        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-2">MOHD SAYEED S MULLA</h1>
                        <h2 className="font-manrope text-xl md:text-2xl font-semibold text-[#0058bc] tracking-wide uppercase mb-4">AI & Embedded Drone Systems Engineer</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-manrope text-sm font-medium text-slate-600">
                            <span>mohdsayeedmulla112@gmail.com</span>
                            <span>github.com/mhdsayeed</span>
                            <span>Belagavi, India</span>
                        </div>
                    </header>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        
                        {/* LEFT COLUMN: Experience & Education */}
                        <div className="md:col-span-2 space-y-12">
                            
                            {/* Experience Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-bold font-display">01</div>
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800">Experience</h3>
                                </div>
                                <div className="space-y-8">
                                    {/* Job 1 */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-baseline mb-2">
                                            <h4 className="font-manrope text-lg font-bold text-slate-900">Avionics & Embedded Intern</h4>
                                        </div>
                                        <div className="font-manrope text-sm font-semibold text-[#0058bc] mb-4">Sarus Aerospace • Belagavi • Aug 2023 - Present</div>
                                        <ul className="list-disc list-outside ml-4 space-y-2 font-manrope text-sm text-slate-600 leading-relaxed marker:text-[#0058bc]">
                                            <li>Orchestrated deeply embedded flight algorithms standardizing vertical lift states within heavy-load custom VTOL applications.</li>
                                            <li>Reverse-engineered hardware pin-layouts executing deep parameter tweaks directly onto open-flight controllers.</li>
                                            <li>Developed centralized dashboard pipelines mapping live hardware telemetry straight into Next.js React-Fiber interfaces.</li>
                                        </ul>
                                    </div>
                                    
                                    {/* Job 2 (Example extension) */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-baseline mb-2">
                                            <h4 className="font-manrope text-lg font-bold text-slate-900">AI Computer Vision Lead</h4>
                                        </div>
                                        <div className="font-manrope text-sm font-semibold text-[#0058bc] mb-4">AeroVision Systems • Academic Prototype • Jan 2023 - Aug 2023</div>
                                        <ul className="list-disc list-outside ml-4 space-y-2 font-manrope text-sm text-slate-600 leading-relaxed marker:text-[#0058bc]">
                                            <li>Deployed headless YOLO iterations atop Nvidia Jetson edge chips ensuring cinematic target lock profiles.</li>
                                            <li>Processed 60FPS feed logic natively resolving targeting discrepancies during atmospheric disturbances.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN: Skills & Education */}
                        <div className="md:col-span-1 space-y-12">
                            
                            {/* Skills Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800">Skills</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-400 mb-2 tracking-widest">Hardware / Embedded</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-700 font-semibold">
                                            <span>PX4 / ArduPilot</span>
                                            <span>ROS / ROS2</span>
                                            <span>MAVLink</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-400 mb-2 tracking-widest">Languages</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-700 font-semibold">
                                            <span>Python & C++</span>
                                            <span>TypeScript</span>
                                            <span>Dart</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-400 mb-2 tracking-widest">Frameworks</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-700 font-semibold">
                                            <span>Next.js & React</span>
                                            <span>Flutter</span>
                                            <span>Three.js / WebGL</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-400 mb-2 tracking-widest">Design</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-700 font-semibold">
                                            <span>Figma</span>
                                            <span>Tailwind CSS</span>
                                            <span>Framer Motion</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Education Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800">Education</h3>
                                </div>
                                <div>
                                    <h4 className="font-manrope text-sm font-bold text-slate-900 leading-tight">B.E in Computer Science</h4>
                                    <div className="font-manrope text-xs font-semibold text-[#0058bc] mt-1 mb-2">Visvesvaraya Technological University</div>
                                    <p className="font-manrope text-xs text-slate-600 font-medium">Graduating 2026</p>
                                </div>
                            </section>
                            
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
