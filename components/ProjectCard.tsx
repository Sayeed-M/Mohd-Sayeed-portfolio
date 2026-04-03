"use client";
import React, { useState } from "react";
import { m } from 'framer-motion';
import FrameSequencePlayer from "./FrameSequencePlayer";
import { MouseGlowBorder } from "./MouseGlowBorder";
import { GlassmorphismPanel } from "./GlassmorphismPanel";
import { Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ProjectData } from '@/app/projects/data';

export function ProjectCard({ data, index = 0 }: { data: ProjectData; index?: number }) {
   const [isHovered, setIsHovered] = useState(false);

   return (
     <Link href={`/projects/${data.id}`} className="block h-full cursor-pointer">
       <m.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
           onHoverStart={() => setIsHovered(true)}
           onHoverEnd={() => setIsHovered(false)}
           whileHover={{ scale: 1.02 }}
           className="w-full relative rounded-2xl h-full group"
       >
           <MouseGlowBorder className="h-full">
               <GlassmorphismPanel className="flex flex-col h-full bg-surface-container-low/40">
                   {/* Top Media Section */}
                   <div className="relative h-64 w-full bg-[#f8f9fc] overflow-hidden">
                       {/* Placeholder cover or base frame */}
                       <FrameSequencePlayer 
                            folderPath={data.mediaFolder || "/assets/drone-rotate"} 
                            frameCount={data.mediaFrames || 240} 
                            playbackType="hover" 
                            isHovered={isHovered}
                            className="w-full h-full scale-125 origin-center"
                       />
                       <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(241,243,255,0.8)] to-transparent pointer-events-none" />
                   </div>
                   
                   {/* Content Section */}
                   <div className="p-6 flex flex-col flex-grow">
                       <h3 className="font-display text-2xl font-bold text-on-surface mb-2 tracking-tight">
                           {data.title}
                       </h3>
                       <p className="font-manrope text-sm text-on-surface-variant flex-grow mb-6 line-clamp-3 leading-relaxed">
                           {data.description}
                       </p>
                       
                       {/* Tags */}
                       <div className="flex flex-wrap gap-2 mb-6 pointer-events-none mt-auto">
                           {(data.tags || []).map((tag: string) => (
                               <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-wider font-manrope">
                                   {tag}
                               </span>
                           ))}
                       </div>

                       {/* Links */}
                       <div className="flex items-center gap-4">
                           {data.githubUrl && (
                               <div className="p-2 rounded-full bg-white shadow-sm border border-outline-variant/10 group-hover:bg-primary/5 text-on-surface group-hover:text-primary transition-colors">
                                   <Code size={18} />
                               </div>
                           )}
                           {data.liveUrl && (
                               <div className="p-2 rounded-full bg-white shadow-sm border border-outline-variant/10 group-hover:bg-primary/5 text-on-surface group-hover:text-primary transition-colors">
                                   <ExternalLink size={18} />
                               </div>
                           )}
                       </div>
                   </div>
               </GlassmorphismPanel>
           </MouseGlowBorder>
       </m.div>
     </Link>
   );
}
