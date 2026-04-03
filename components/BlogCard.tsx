"use client";
import React, { useState } from "react";
import { m } from 'framer-motion';
import { MouseGlowBorder } from "./MouseGlowBorder";
import { GlassmorphismPanel } from "./GlassmorphismPanel";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export interface BlogData {
   id: string;
   title: string;
   excerpt: string;
   category: string;
   date: string;
   readTime: string;
}

export function BlogCard({ data, index = 0 }: { data: BlogData; index?: number }) {
   const [isHovered, setIsHovered] = useState(false);

   return (
     <Link href={`#`} className="block h-full cursor-pointer group">
       <m.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
           onHoverStart={() => setIsHovered(true)}
           onHoverEnd={() => setIsHovered(false)}
           whileHover={{ y: -5 }}
           className="w-full relative rounded-2xl h-full line-clamp-none overflow-hidden"
       >
           <MouseGlowBorder className="h-full">
               <GlassmorphismPanel className="flex flex-col h-full bg-white/40 border-white/50 dark:bg-[#1a1a1a]/80 dark:border-white/5 backdrop-blur-xl p-8 relative overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:bg-white/60 dark:group-hover:bg-[#222]/90">
                   
                   {/* Background Decorative */}
                   <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                   {/* Header Data */}
                   <div className="flex items-center justify-between mb-4 relative z-10">
                       <span className="px-3 py-1 rounded-md bg-slate-100/80 dark:bg-slate-800/80 text-primary dark:text-[#4da6ff] text-[11px] font-bold uppercase tracking-widest font-manrope border border-slate-200/50 dark:border-slate-700/50">
                           {data.category}
                       </span>
                       <span className="text-xs font-manrope font-semibold text-slate-400 dark:text-slate-500">
                           {data.date} • {data.readTime}
                       </span>
                   </div>
                   
                   {/* Content Section */}
                   <div className="flex flex-col flex-grow relative z-10">
                       <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight group-hover:text-primary dark:group-hover:text-[#4da6ff] transition-colors">
                           {data.title}
                       </h3>
                       <p className="font-manrope text-sm text-slate-500 dark:text-gray-400 flex-grow mb-8 line-clamp-3 leading-relaxed">
                           {data.excerpt}
                       </p>
                       
                       {/* Interactive Footer */}
                       <div className="mt-auto flex items-center text-sm font-bold font-manrope text-slate-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                           Read Research
                           <m.div
                               initial={{ x: 0, opacity: 0.5 }}
                               animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
                           >
                               <ArrowRight size={16} className="ml-2" />
                           </m.div>
                       </div>
                   </div>
               </GlassmorphismPanel>
           </MouseGlowBorder>
       </m.div>
     </Link>
   );
}
