"use client";
import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { GlassmorphismPanel } from './GlassmorphismPanel';
import { MouseGlowBorder } from './MouseGlowBorder';

export interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  children?: React.ReactNode;
  index: number;
  isLeft?: boolean;
}

export function TimelineItem({ title, company, date, children, index, isLeft }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative flex w-full flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''} group`}>
        
        {/* Central timeline marker dot */}
        <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 mt-8 md:mt-0 md:top-1/2 md:-translate-y-1/2 z-20 flex justify-center items-center pointer-events-none">
            <m.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_#0058bc] border-[3px] border-surface" 
            />
        </div>

        {/* Empty layout spacer for alternating pattern on desktop */}
        <div className="hidden md:block md:w-1/2" />
        
        {/* Glassmorphism content block */}
        <m.div 
            initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 40 : -40 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 z-10 flex ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
        >
            <div className="w-full">
                <MouseGlowBorder className="h-full rounded-2xl">
                    <GlassmorphismPanel containerType="low" className="p-8 h-full relative overflow-visible rounded-2xl group cursor-default">
                        {/* 3D Orbit element */}
                        <m.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute -top-[5px] left-[15%] w-1.5 h-1.5 bg-[#8a2bb9] rounded-full shadow-[0_0_10px_#8a2bb9]" />
                        </m.div>
                        
                        <div className="md:hidden flex h-full absolute -left-12 sm:-left-16 top-0 bottom-0 w-8" />
                        
                        <span className="inline-block text-primary font-bold text-sm mb-3 tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">{date}</span>
                        <h3 className="font-display font-bold text-2xl text-on-surface tracking-tight mb-2">{title}</h3>
                        <h4 className="font-manrope font-bold text-on-surface-variant mb-4">{company}</h4>
                        <div className="font-manrope text-sm opacity-90 max-w-[90%]">
                            {children}
                        </div>
                    </GlassmorphismPanel>
                </MouseGlowBorder>
            </div>
        </m.div>
    </div>
  );
}
