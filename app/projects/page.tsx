import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS, ProjectData } from './data';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-surface">
            <Navbar />
            
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">
                        Engineering Showcase
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-container rounded-full mb-6" />
                    <p className="font-manrope text-lg text-on-surface-variant max-w-2xl">
                        A curated selection of mission-critical systems and interfaces designed with "The Weightless Core" philosophy.
                    </p>
                </div>

                {/* Grid Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                     {PROJECTS.map(project => (
                         <ProjectCard key={project.id} data={project} />
                     ))}
                </div>
            </section>
        </main>
    );
}
