import React from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../data';
import ProjectDetailClient from './ProjectDetailClient';

export function generateStaticParams() {
   return PROJECTS.map((project) => ({
      id: project.id,
   }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const project = PROJECTS.find(p => p.id === id);
   if (!project) return { title: "Not Found" };
   return {
       title: `${project.title} - AeroGlass`,
       description: project.description
   };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const project = PROJECTS.find(p => p.id === id);

   if (!project) {
       notFound();
   }

   return <ProjectDetailClient project={project} />;
}
