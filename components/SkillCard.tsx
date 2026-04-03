"use client";
import React, { useRef } from "react";
import { SkillRing } from "./SkillRing";
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SkillItem {
  name: string;
  level: number;
}

export function SkillCard({
  category,
  skills,
  index,
}: {
  category: string;
  skills: SkillItem[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map to rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.15,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="relative h-full w-full z-10 will-change-transform"
    >
      <m.div
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        className="h-full rounded-2xl shadow-lg border border-white/30 bg-white/40 backdrop-blur-lg"
        transition={{ type: "spring", stiffness: 400, damping: 30 } as any}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
           className="p-8 md:p-10 h-full flex flex-col relative overflow-hidden rounded-2xl"
           style={{ transform: "translateZ(40px)" }} // 3D Pop Out Effect
        >
          {/* Subtle noise or gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
          
          <h3 className="font-display font-bold text-2xl text-slate-800 mb-8 tracking-tight border-b border-black/5 pb-4 relative z-10 drop-shadow-sm">
            {category}
          </h3>
          <m.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 mt-auto place-items-center relative z-10"
          >
            {skills.map((skill) => (
              <SkillRing
                key={skill.name}
                percentage={skill.level}
                label={skill.name}
              />
            ))}
          </m.div>
        </div>
      </m.div>
    </m.div>
  );
}
