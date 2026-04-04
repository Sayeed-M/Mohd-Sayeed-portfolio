import React from 'react';
import { notFound } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';
import ProjectDetailClient from './ProjectDetailClient';
import type { ContentData, ProjectEntry } from '@/types/content';

async function getProjectById(id: string): Promise<ProjectEntry | null> {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as ContentData;
    return (data.projects || []).find((project) => project.id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
