"use client";
import React, { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';

export function Timeline({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });
    
    // Smooth the scrolling line
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={ref} className="relative w-full max-w-5xl mx-auto py-10 my-10">
            {/* Static background dashed line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/30 md:-translate-x-1/2 border-l-2 border-dashed border-outline-variant/30" />
            
            {/* Active animated solid gradient progress line */}
            <m.div 
                className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-[#0070eb] to-tertiary md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_10px_rgba(0,88,188,0.5)]"
                style={{ scaleY }}
            />
            
            {/* Node children container */}
            <div className="relative flex flex-col gap-12 md:gap-8 w-full z-10">
                {children}
            </div>
        </div>
    );
}
