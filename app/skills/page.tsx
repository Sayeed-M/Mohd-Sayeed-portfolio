import React from "react";
import { SkillCard } from "@/components/SkillCard";

export const metadata = {
  title: "Skills - AeroGlass Portfolio",
  description: "Technical proficiency across drone systems, AI, and software engineering.",
};

const CATEGORIES = [
  {
    title: "Drone Systems (PX4, ROS)",
    skills: [
      { name: "PX4 Autopilot", level: 90 },
      { name: "ROS/ROS2", level: 85 },
      { name: "MAVLink", level: 80 },
      { name: "Gazebo Sim", level: 75 },
    ],
  },
  {
    title: "AI / Computer Vision",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "OpenCV", level: 95 },
      { name: "YOLO Models", level: 90 },
      { name: "PyTorch", level: 80 },
    ],
  },
  {
    title: "Flutter / App Dev",
    skills: [
      { name: "Flutter", level: 95 },
      { name: "Dart", level: 95 },
      { name: "State Mgmt", level: 90 },
      { name: "App Animations", level: 85 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Three.js", level: 80 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-on-surface mb-6">
            Technical Arsenal
          </h1>
          <p className="font-manrope text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            A comprehensive breakdown of my capabilities ranging from low-level
            aerospace systems to high-performance frontend interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {CATEGORIES.map((category, idx) => (
            <SkillCard
              key={category.title}
              index={idx}
              category={category.title}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
