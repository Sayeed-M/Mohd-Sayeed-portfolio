"use client";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { GlassForm } from "@/components/GlassForm";
import { motion } from "framer-motion";

const SKILLS = [
  "React Three Fiber", "Flight Dynamics", "Machine Learning", 
  "Next.js App Router", "TensorFlow", "C++ System Level", 
  "Framer Motion", "WebGL Performance"
];

export default function ContactPage() {
   return (
       <main className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
           <Navbar />
           
           {/* Abstract Background Decoration */}
           <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-tertiary/10 blur-[120px] rounded-full pointer-events-none" />

           <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 gap-12 pt-32 pb-12 z-10">
               
               {/* Left side: Skills Visualization */}
               <div className="w-full lg:w-1/2 flex flex-col justify-center">
                   <motion.h1 
                       initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                       className="font-display text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 leading-tight"
                   >
                       Tech Stack & <br /> Data Relay.
                   </motion.h1>
                   <motion.p 
                       initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                       className="font-manrope text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed"
                   >
                       A visualized matrix of active competencies fueling continuous architecture optimization. Reach out to sync nodes.
                   </motion.p>
                   
                   <div className="flex flex-wrap gap-3">
                       {SKILLS.map((skill, i) => (
                           <motion.div
                               key={skill}
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.3 + (i * 0.05), type: "spring", stiffness: 200, damping: 20 }}
                               className="px-5 py-2.5 rounded-full border border-primary/20 bg-surface-container-lowest text-primary font-bold font-manrope text-sm shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:scale-105 transition-transform cursor-default"
                           >
                               {skill}
                           </motion.div>
                       ))}
                   </div>
               </div>

               {/* Right side: Contact Form */}
               <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   className="w-full lg:w-1/2"
               >
                   <GlassForm />
               </motion.div>

           </div>
       </main>
   );
}
