"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  GitBranch,
  Play,
  Tag,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import type { ProjectEntry } from "@/types/content";
import { isGoogleDriveUrl, isVideoUrl, toDriveDirectUrl, toDriveEmbedUrl } from "@/utils/media";

function MediaViewer({ media }: { media: string[] }) {
  const [current, setCurrent] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-surface-container-high/60">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Play size={36} className="ml-1 text-primary" />
        </div>
        <span className="font-manrope text-sm font-medium text-on-surface-variant">No media uploaded</span>
        <span className="mt-1 font-manrope text-xs text-on-surface-variant/50">
          Add media via Admin {"->"} Database Editor
        </span>
      </div>
    );
  }

  const currentUrl = media[current];
  const isDrive = isGoogleDriveUrl(currentUrl);
  const isVid = isVideoUrl(currentUrl);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface-container-high/60">
      <AnimatePresence mode="wait">
        <m.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {isVid && isDrive ? (
            <iframe
              src={toDriveEmbedUrl(currentUrl)}
              className="h-full w-full"
              allow="autoplay"
              allowFullScreen
              title="Project Video"
            />
          ) : isVid ? (
            <video src={currentUrl} controls className="h-full w-full object-contain" />
          ) : (
            <img
              src={isDrive ? toDriveDirectUrl(currentUrl) : currentUrl}
              alt="Project media"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          )}
        </m.div>
      </AnimatePresence>

      {media.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + media.length) % media.length)}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/20 bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-surface"
          >
            <ChevronLeft size={20} className="text-on-surface" />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % media.length)}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/20 bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-surface"
          >
            <ChevronRight size={20} className="text-on-surface" />
          </button>
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={i === current ? "h-2 w-6 rounded-full bg-primary transition-all" : "h-2 w-2 rounded-full bg-surface/60 transition-all hover:bg-surface/80"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CopyButton({ text, label = "Copy Link" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-high px-4 py-2 font-manrope text-sm font-semibold text-on-surface transition-all hover:scale-105 hover:border-primary/40 active:scale-95"
    >
      {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

function FadeSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-outline-variant/20 bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] shadow-[0_4px_24px_color-mix(in_srgb,var(--on-surface)_10%,transparent)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function ProjectDetailClient({ project }: { project: ProjectEntry }) {
  const tags: string[] = project.tags || [];
  const features: string[] = project.features || [];
  const media: string[] = project.media || (project.imageUrl ? [project.imageUrl] : []);
  const hasGithub = !!project.githubUrl;
  const hasLive = !!project.liveUrl;

  return (
    <main className="min-h-screen bg-surface-container-low transition-colors">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-12 pt-28 md:px-12">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 font-manrope text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              <ChevronLeft size={16} /> Back to Projects
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {tags.length > 0 && (
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                <Tag size={10} /> {tags[0]}
              </span>
            )}

            <h1 className="mb-4 max-w-4xl font-display text-4xl font-black leading-[1.1] tracking-tight text-on-surface md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mb-6 max-w-2xl font-manrope text-lg leading-relaxed text-on-surface-variant md:text-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {project.createdAt && (
                <span className="flex items-center gap-1.5 font-manrope text-xs text-on-surface-variant/60">
                  <Calendar size={12} />
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {hasGithub && <CopyButton text={project.githubUrl!} label="Copy GitHub Link" />}
            </div>
          </m.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <FadeSection delay={0.1} className="lg:col-span-3">
            <div className="h-[320px] w-full overflow-hidden rounded-2xl border border-outline-variant/20 shadow-[0_20px_60px_color-mix(in_srgb,var(--on-surface)_16%,transparent)] md:h-[440px]">
              <MediaViewer media={media} />
            </div>

            {media.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {media.map((url, i) => {
                  const isVid = isVideoUrl(url);
                  const displayUrl = isGoogleDriveUrl(url) ? toDriveDirectUrl(url) : url;

                  return (
                    <div
                      key={i}
                      className="h-14 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 border-outline-variant/20 shadow transition-all hover:scale-105 hover:border-primary/50"
                    >
                      {isVid ? (
                        <div className="flex h-full w-full items-center justify-center bg-surface-container-high">
                          <Play size={18} className="text-on-surface-variant" />
                        </div>
                      ) : (
                        <img src={displayUrl} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </FadeSection>

          <FadeSection delay={0.2} className="lg:col-span-2">
            <div className="space-y-5">
              <GlassCard className="p-6">
                <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-on-surface">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Zap size={11} className="text-white" />
                  </span>
                  Project Overview
                </h2>
                <p className="font-manrope text-sm leading-relaxed text-on-surface-variant">
                  {project.fullDetails || project.description}
                </p>
              </GlassCard>

              <div className="flex flex-col gap-3">
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-2xl border border-outline-variant/20 bg-on-surface px-6 py-3.5 font-manrope text-sm font-semibold text-surface transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <GitBranch size={16} /> View Source Code
                  </a>
                )}
                {hasLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-container px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {!hasGithub && !hasLive && (
                  <div className="rounded-xl border border-dashed border-outline-variant/30 bg-surface-container-high/50 px-4 py-3 text-center">
                    <p className="font-manrope text-xs text-on-surface-variant/50">Links not added yet. Edit in Admin Dashboard.</p>
                  </div>
                )}
              </div>

              {tags.length > 0 && (
                <GlassCard className="p-5">
                  <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="cursor-default rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 font-manrope text-xs font-bold tracking-wide text-primary transition-all hover:scale-105 hover:shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          </FadeSection>
        </div>
      </section>

      {features.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
          <FadeSection>
            <GlassCard className="p-8 md:p-10">
              <h2 className="mb-2 font-display text-2xl font-bold text-on-surface md:text-3xl">Key Features</h2>
              <div className="mb-8 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary-container" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {features.map((feat, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container shadow-sm transition-transform group-hover:scale-110">
                      <Check size={11} className="text-white" />
                    </span>
                    <span className="font-manrope text-sm leading-relaxed text-on-surface-variant transition-colors group-hover:text-on-surface">
                      {feat}
                    </span>
                  </m.div>
                ))}
              </div>
            </GlassCard>
          </FadeSection>
        </section>
      )}

      {hasGithub && (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
          <FadeSection>
            <div className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-on-surface p-8 shadow-[0_20px_60px_color-mix(in_srgb,var(--on-surface)_16%,transparent)] md:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-60 w-60 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-2xl" />

              <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h2 className="mb-2 font-display text-2xl font-bold text-surface md:text-3xl">
                    Explore the Source Code
                  </h2>
                  <p className="max-w-md font-manrope text-sm text-surface/70">
                    The full project is open on GitHub. Star it, fork it, or contribute.
                  </p>
                  <code className="mt-3 inline-block max-w-xs truncate rounded-lg bg-white/10 px-3 py-1.5 font-mono text-[11px] text-primary md:max-w-sm">
                    {project.githubUrl}
                  </code>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-manrope text-sm font-bold text-white transition-all hover:scale-105 hover:opacity-90 hover:shadow-xl"
                  >
                    <GitBranch size={16} /> View on GitHub
                  </a>
                  <CopyButton text={project.githubUrl!} label="Copy URL" />
                </div>
              </div>
            </div>
          </FadeSection>
        </section>
      )}
    </main>
  );
}
