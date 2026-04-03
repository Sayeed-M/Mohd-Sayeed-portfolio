"use client";
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import { TimelineItem } from '@/components/TimelineItem';
import { m } from 'framer-motion';

export default function ExperiencePage() {
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetch("/api/content")
        .then(res => res.json())
        .then(d => {
           setExperience(d.experience || []);
           setIsLoading(false);
        })
        .catch(e => {
           console.error(e);
           setIsLoading(false);
        });
  }, []);

  return (
    <main className="min-h-screen bg-surface relative">
      <Navbar />
      
       {/* Background ambient lighting */}
       <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-tertiary/5 mix-blend-multiply dark:mix-blend-lighten pointer-events-none -z-10" />

      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <m.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center max-w-2xl mx-auto mb-20"
        >
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-on-surface mb-6">Career Trajectory.</h1>
          <p className="font-manrope text-lg text-on-surface-variant leading-relaxed">
            A chronological mapping of my professional internships, full-stack deployments, and engineering milestones.
          </p>
        </m.div>

        {/* Timeline Component wrapper */}
        <div className="max-w-4xl mx-auto pl-4 md:pl-0">
           {isLoading ? (
                <div className="flex justify-center items-center py-20 min-h-[200px]">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
            ) : experience.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-outline-variant/30 rounded-2xl">
                    <p className="font-manrope text-on-surface-variant">No experience records available. Add them through the Admin Dashboard.</p>
                </div>
            ) : (
              <Timeline>
                {experience.map((exp: any, i: number) => (
                  <TimelineItem 
                    key={exp.id || i}
                    title={exp.title} 
                    date={exp.date || exp.role} 
                    company={exp.company || exp.subtitle} 
                    index={i} 
                    isLeft={i % 2 === 0}
                  >
                    <div className="text-on-surface-variant font-manrope leading-relaxed whitespace-pre-line">
                      {exp.description || exp.content}
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
        </div>
      </section>
    </main>
  );
}
