"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SkillRing } from '@/components/SkillRing';
import { SkillCard } from '@/components/SkillCard';
import { m, useScroll, useTransform } from 'framer-motion';
import { CMSPanel } from '@/components/CMSPanel';

export default function SkillsPage() {
    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/content")
          .then(res => res.json())
          .then(d => {
             setData(d);
             setIsLoading(false);
          })
          .catch(e => {
             console.error(e);
             setIsLoading(false);
          });
    }, []);

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
                {isLoading ? (
                    <div className="flex justify-center items-center py-20 min-h-[400px]">
                        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {data.skills?.map((cat: any, i: number) => (
                                <SkillCard 
                                    key={cat.id}
                                    category={cat.category} 
                                    index={i}
                                    skills={cat.items}
                                />
                            ))}
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
                                <h3 className="font-display text-2xl font-bold text-on-surface mb-6 dark:text-white">Programming</h3>
                                <div className="flex flex-wrap gap-3">
                                    {(data.programming || []).map((lang: string) => (
                                        <span key={lang} className="px-4 py-2 bg-surface/50 dark:bg-surface-container/50 rounded-full font-manrope text-sm font-semibold text-on-surface dark:text-slate-200 border border-outline-variant/30">{lang}</span>
                                    ))}
                                </div>
                            </div>

                             {/* Tools */}
                            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-atmospheric hover:border-primary/50 transition-colors">
                                 <h3 className="font-display text-2xl font-bold text-on-surface mb-6 dark:text-white">Tools & Tech</h3>
                                 <div className="flex flex-wrap gap-3">
                                    {(data.tools || []).map((tool: string) => (
                                        <span key={tool} className="px-4 py-2 bg-surface/50 dark:bg-surface-container/50 rounded-full font-manrope text-sm font-semibold text-on-surface dark:text-slate-200 border border-outline-variant/30">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Core Skills */}
                            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-atmospheric hover:border-primary/50 transition-colors">
                                 <h3 className="font-display text-2xl font-bold text-on-surface mb-6 dark:text-white">Core Skills</h3>
                                 <div className="flex flex-col gap-3 font-manrope text-on-surface-variant dark:text-slate-300 font-medium">
                                     {(data.coreSkills || []).map((skill: string) => (
                                        <div key={skill} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {skill}
                                        </div>
                                     ))}
                                </div>
                            </div>
                        </m.div>

                        <CMSPanel 
                            section="skills" 
                            data={data.skills} 
                            onSave={(newSkills) => setData((prev: any) => ({ ...prev, skills: newSkills }))} 
                        />
                    </>
                )}
            </section>
        </main>
    );
}
