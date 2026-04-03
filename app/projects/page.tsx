"use client";
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/content")
          .then(res => res.json())
          .then(d => {
             setProjects(d.projects || []);
             setIsLoading(false);
          })
          .catch(e => {
             console.error(e);
             setIsLoading(false);
          });
    }, []);

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

                {isLoading ? (
                    <div className="flex justify-center items-center py-20 min-h-[400px]">
                        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-outline-variant/30 rounded-2xl">
                        <p className="font-manrope text-on-surface-variant">No projects available. Add them through the Admin Dashboard.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {projects.map((project: any) => (
                            <ProjectCard key={project.id} data={project} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
