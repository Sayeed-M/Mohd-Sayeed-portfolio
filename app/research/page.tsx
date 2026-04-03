import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BlogCard, BlogData } from '@/components/BlogCard';

const RESEARCH_DATA: BlogData[] = [
    {
       id: "1",
       title: "Deep Reinforcement Learning in VTOL Quadplanes",
       excerpt: "Exploring the transition gap between horizontal flight constraints and vertical lift dependencies. Analyzing reward-based learning in adverse weather conditions.",
       category: "Drone Systems",
       date: "Mar 12, 2026",
       readTime: "8 min read"
    },
    {
       id: "2",
       title: "Edge Computed Computer Vision on Nano Hardware",
       excerpt: "How to compile stripped-down YOLO models capable of retaining 60FPS lock-on tracking locally on Jetson Orin Nano hardware structures.",
       category: "AI Models",
       date: "Feb 24, 2026",
       readTime: "12 min read"
    },
    {
       id: "3",
       title: "Bridging the Gap: C++ Hardware over WebSockets",
       excerpt: "Architecting a seamless, zero-latency pipeline translating binary telemetry states directly into 3D React-Fiber Canvas interfaces natively in the browser.",
       category: "Projects",
       date: "Jan 18, 2026",
       readTime: "6 min read"
    },
    {
        id: "4",
        title: "The Weightless Core: Apple-Style Frontend Design",
        excerpt: "An investigation on achieving 'hyper-tangible' software. Integrating Framer Motion springs and heavy drop shadows atop pure white backgrounds to eliminate generic flatness.",
        category: "UI Architecture",
        date: "Dec 05, 2025",
        readTime: "5 min read"
     }
];

export const metadata = {
  title: "Research & Analytics - MOHD SAYEED S MULLA Portfolio",
};

export default function ResearchPage() {
    return (
        <main className="min-h-screen bg-[#ffffff] dark:bg-[#0a0a0a] transition-colors duration-300">
            <Navbar />
            
            <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-16 md:mb-20">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 dark:text-white mb-6 drop-shadow-sm">
                        Research & Analytics
                    </h1>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-[#0058bc] to-[#00c6ff] rounded-full mb-6" />
                    <p className="font-manrope text-lg text-slate-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                        Deep-dive articles spanning custom autonomous drone behaviors, heavy edge-computed AI frameworks, and front-end interface philosophy.
                    </p>
                </div>

                {/* Grid Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {RESEARCH_DATA.map((article, index) => (
                         <BlogCard key={article.id} data={article} index={index} />
                     ))}
                </div>
            </section>
        </main>
    );
}
