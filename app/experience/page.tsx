import React from "react";
import { Timeline } from "@/components/Timeline";
import { TimelineItem } from "@/components/TimelineItem";

export const metadata = {
  title: "Experience - AeroGlass Portfolio",
  description: "Career trajectory, aerospace internships, and flight testing.",
};

const EXPERIENCE_DATA = [
  {
    title: "Aerospace Engineering Intern",
    company: "Sarus Aerospace (Belagavi)",
    date: "2023 - Present",
    description:
      "Assisted in the design and structural analysis of high-endurance UAV frames utilizing modern CAD tools. Orchestrated field testing paradigms for VTOL transitional flight stability, and evaluated telemetry transmission hardware.",
    isLeft: true,
  },
  {
    title: "Heavy Lift System Architecture",
    company: "Academic Project Core",
    date: "Late 2023",
    description:
      "Drafted composite aerodynamics profiles and assembled conceptual payload carriage mounts for an autonomous hexacopter setup optimized for agricultural and industrial survey applications.",
    isLeft: false,
  },
  {
    title: "Flight Dynamics R&D",
    company: "Independent Research",
    date: "Early 2023",
    description:
      "Contributed configuration logic to open-source PX4 Autopilot parameter files enabling refined PID tuning across non-standard quadplane frames during hovering transition states.",
    isLeft: true,
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-on-surface mb-6">
            Flight Trajectory
          </h1>
          <p className="font-manrope text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            A chronological timeline of my internships, milestones, and
            projects executed within structured aerospace and tech environments.
          </p>
        </div>

        <Timeline>
          {EXPERIENCE_DATA.map((item, index) => (
            <TimelineItem
              key={index}
              index={index}
              title={item.title}
              company={item.company}
              date={item.date}
              description={item.description}
              isLeft={item.isLeft}
            />
          ))}
        </Timeline>
      </div>
    </main>
  );
}
