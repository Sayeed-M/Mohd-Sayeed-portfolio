"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Download } from 'lucide-react';
import { m } from 'framer-motion';

export default function ResumePage() {
    const triggerPrint = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-surface dark:bg-[#000000]">
            {/* Exclude standard Navbar from print output */}
            <div className="print:hidden">
                <Navbar />
            </div>
            
            {/* Header / Actions - Hidden during print */}
            <section className="pt-32 pb-10 px-6 max-w-4xl mx-auto print:hidden flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800 dark:text-gray-100">Professional Record</h1>
                    <p className="font-manrope text-slate-500 dark:text-gray-400 mt-2">Verified document layout optimized for direct PDF parsing.</p>
                </div>
                
                <m.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerPrint}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-manrope font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                    <Download size={18} />
                    Download PDF
                </m.button>
            </section>

            {/* Resume Document Wrapper */}
            <section className="px-6 pb-24 md:px-12 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-[#0f0f13] p-8 md:p-14 lg:p-20 rounded-3xl md:border md:border-outline-variant/30 dark:border-white/10 md:shadow-2xl print:shadow-none print:border-none print:p-0 print:m-0 w-full min-h-[1056px] text-slate-800 dark:text-gray-200 print:bg-white print:text-black">
                    
                    {/* Header */}
                    <header className="border-b-2 border-slate-900 dark:border-white/20 pb-8 mb-10 text-center md:text-left print:border-black">
                        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-black dark:text-white print:text-black">MOHD SAYEED S MULLA</h1>
                        <h2 className="font-manrope text-xl md:text-2xl font-semibold text-primary dark:text-primary-container print:text-primary tracking-wide uppercase mb-4">Application / Flutter Developer</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-manrope text-sm font-medium text-slate-700 dark:text-gray-400 print:text-black">
                            <span>mohdsayeed1092@gmail.com</span>
                            <span>+91 7880661203</span>
                            <span>github.com/Sayeed-M</span>
                            <span>Belagavi, India</span>
                        </div>
                    </header>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        
                        {/* LEFT COLUMN: Experience */}
                        <div className="md:col-span-2 space-y-12">
                            
                            {/* Experience Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 print:bg-slate-200 flex items-center justify-center text-slate-800 dark:text-white print:text-black font-bold font-display">01</div>
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800 dark:text-gray-100 print:text-black">Experience</h3>
                                </div>
                                <div className="space-y-8">
                                    {/* Job 1 */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-baseline mb-2">
                                            <h4 className="font-manrope text-lg font-bold text-slate-900 dark:text-white print:text-black">Software Developer Intern</h4>
                                        </div>
                                        <div className="font-manrope text-sm font-semibold text-primary dark:text-primary-container print:text-primary mb-4">Sarus Aerospace • Belagavi • Feb 2026 - Present</div>
                                        <ul className="list-disc list-outside ml-4 space-y-2 font-manrope text-sm text-slate-700 dark:text-gray-300 print:text-black leading-relaxed marker:text-primary">
                                            <li>Developing AI-driven aerospace software systems targeting autonomous operations.</li>
                                            <li>Applying highly specialized Computer Vision & Automation techniques directly inside hardware integration layers.</li>
                                            <li>Assisting in holistic system testing, debugging, and edge performance optimization.</li>
                                        </ul>
                                    </div>
                                    
                                    {/* Job 2 */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-baseline mb-2">
                                            <h4 className="font-manrope text-lg font-bold text-slate-900 dark:text-white print:text-black">Senior Customer Support Engineer</h4>
                                        </div>
                                        <div className="font-manrope text-sm font-semibold text-primary dark:text-primary-container print:text-primary mb-4">Verdeus Naturals • Belagavi • Sep 2024 - Jan 2025</div>
                                        <ul className="list-disc list-outside ml-4 space-y-2 font-manrope text-sm text-slate-700 dark:text-gray-300 print:text-black leading-relaxed marker:text-primary">
                                            <li>Handled product deployment, system installation, and customer configurations providing on-site support across India.</li>
                                            <li>Ensured pristine product launches and resolved high-priority crisis communications efficiently.</li>
                                        </ul>
                                    </div>

                                    {/* Job 3 */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-baseline mb-2">
                                            <h4 className="font-manrope text-lg font-bold text-slate-900 dark:text-white print:text-black">Full Stack Web Developer Intern</h4>
                                        </div>
                                        <div className="font-manrope text-sm font-semibold text-primary dark:text-primary-container print:text-primary mb-4">Edureka Learning Center • Apr 2024 - May 2024</div>
                                        <ul className="list-disc list-outside ml-4 space-y-2 font-manrope text-sm text-slate-700 dark:text-gray-300 print:text-black leading-relaxed marker:text-primary">
                                            <li>Built high-performance dynamic web applications executing robust frontend logic alongside complex underlying databases.</li>
                                            <li>Mastered continuous delivery timelines across HTML, CSS, JavaScript, and internal backend technologies.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN: Skills & Education */}
                        <div className="md:col-span-1 space-y-12">
                            
                            {/* Education Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800 dark:text-gray-100 print:text-black">Education</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-manrope text-sm font-bold text-slate-900 dark:text-white print:text-black leading-tight">Master of Computer Applications (MCA)</h4>
                                        <div className="font-manrope text-xs font-semibold text-primary dark:text-primary-container print:text-primary mt-1 mb-2">Visvesvaraya Technological University (VTU)</div>
                                        <p className="font-manrope text-xs text-slate-600 dark:text-gray-400 print:text-slate-800 font-medium">Dec 2024 – Present</p>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-sm font-bold text-slate-900 dark:text-white print:text-black leading-tight">Bachelor of Computer Applications (BCA)</h4>
                                        <div className="font-manrope text-xs font-semibold text-primary dark:text-primary-container print:text-primary mt-1 mb-2">Rani Channamma University</div>
                                        <p className="font-manrope text-xs text-slate-600 dark:text-gray-400 print:text-slate-800 font-medium">Sep 2021 – Sep 2024</p>
                                    </div>
                                </div>
                            </section>

                            {/* Skills Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-slate-800 dark:text-gray-100 print:text-black">Skills</h3>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-500 dark:text-gray-500 print:text-slate-700 mb-2 tracking-widest">Languages</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-800 dark:text-gray-300 print:text-black font-semibold">
                                            <span>Python & C++</span>
                                            <span>Dart / Swift</span>
                                            <span>Java / C#</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-500 dark:text-gray-500 print:text-slate-700 mb-2 tracking-widest">Technologies</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-800 dark:text-gray-300 print:text-black font-semibold">
                                            <span>Flutter App Dev</span>
                                            <span>Next.js / React</span>
                                            <span>Android & iOS Native</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-manrope text-xs font-bold uppercase text-slate-500 dark:text-gray-500 print:text-slate-700 mb-2 tracking-widest">Databases & IDEs</h4>
                                        <div className="flex flex-col gap-1.5 font-manrope text-sm text-slate-800 dark:text-gray-300 print:text-black font-semibold">
                                            <span>Oracle DBMS</span>
                                            <span>VS Code / Visual Studio</span>
                                            <span>Xcode / Android Studio</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
