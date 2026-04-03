"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import { TimelineItem } from '@/components/TimelineItem';
import { m } from 'framer-motion';

export default function ExperiencePage() {
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
          <Timeline>
            
            <TimelineItem title="Software Developer Intern" date="Feb 2026 – Present" company="Sarus Aerospace Pvt. Ltd. • Belagavi" index={0} isLeft={true}>
              <ul className="list-disc list-outside ml-5 space-y-2 text-on-surface-variant font-manrope leading-relaxed">
                <li>Developing AI-driven aerospace software systems targeting autonomous intelligence.</li>
                <li>Applying Computer Vision & Automation techniques directly inside hardware integration layers.</li>
                <li>Assisting in holistic system testing, debugging, and edge performance optimization.</li>
              </ul>
            </TimelineItem>

            <TimelineItem title="Senior Customer Support Engineer" date="Sep 2024 – Jan 2025" company="Verdeus Naturals Pvt. Ltd. • Belagavi" index={1} isLeft={false}>
               <ul className="list-disc list-outside ml-5 space-y-2 text-on-surface-variant font-manrope leading-relaxed">
                <li>Handled nationwide product deployment, system installation, and customer configuration on-site.</li>
                <li>Resolved edge-case hardware/software integration issues ensuring pristine product launches.</li>
                <li>Fostered strong crisis communication protocols and frontline problem-solving strategies.</li>
              </ul>
            </TimelineItem>

            <TimelineItem title="Full Stack Web Developer Intern" date="Apr 2024 – May 2024" company="Edureka Learning Center • Belagavi" index={2} isLeft={true}>
               <ul className="list-disc list-outside ml-5 space-y-2 text-on-surface-variant font-manrope leading-relaxed">
                <li>Built dynamic, high-performance web applications executing raw application logic over JavaScript.</li>
                <li>Mapped database schemas to complex frontend UI arrays ensuring timeline delivery targets.</li>
                <li>Simultaneously completed the highly rigorous <b>React.js Developer Training Program</b>, mastering components and state management.</li>
              </ul>
            </TimelineItem>

             <TimelineItem title="Android Developer Intern" date="Sep 2023 – Oct 2023" company="Topperworld • Remote" index={3} isLeft={false}>
               <ul className="list-disc list-outside ml-5 space-y-2 text-on-surface-variant font-manrope leading-relaxed">
                <li>Collaborated across agile sprints to develop native Android application UI designs and underlying logic workflows.</li>
                <li>Handled intensive testing cycles and debugging iterations to deliver reliable builds.</li>
              </ul>
            </TimelineItem>

          </Timeline>
        </div>
      </section>
    </main>
  );
}
