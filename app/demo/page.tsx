import React from 'react';
import { DemoViewer } from '@/components/DemoViewer';

export const metadata = {
  title: "Live Demos - AeroGlass Portfolio",
  description: "Interactive visual pipelines and simulations.",
};

export default function DemoPage() {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-[#ffffff]">
         <div className="text-center mb-20">
             <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-800 tracking-tight">Interactive Sandboxes</h1>
             <p className="font-manrope text-slate-500 mt-5 max-w-2xl mx-auto leading-relaxed">
                 Real-time simulation layers executing frame-by-frame structural and navigational analysis directly within the browser runtime.
             </p>
         </div>
         
         <div className="space-y-32">
             <DemoViewer 
                 title="VTOL Navigation System"
                 description="A live feedback pipeline of quadplane transitional hovering states. The simulation renders hardware parameters against active aerodynamic telemetry clusters directly mapped over frame sequences."
                 techStack={['WebGL', 'Framer Motion', 'Canvas', 'TypeScript']}
                 folder="/assets/drone-rotate"
                 frameCount={240}
                 delay={0.1}
             />
             <DemoViewer 
                 title="Targeting Radar & Stabilization"
                 description="Secondary simulation view demonstrating lock-on stabilization vectors during turbulent hover profiles. Highly memory optimized native draw-calls bypass standard DOM structures."
                 techStack={['HTML5 Canvas', 'Next.js 16', 'Performance Metrics']}
                 folder="/assets/drone-hover"
                 frameCount={240}
                 delay={0.3}
             />
         </div>
      </main>
    )
}
