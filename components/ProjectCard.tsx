"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { Code, ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import { MouseGlowBorder } from "./MouseGlowBorder";
import { GlassmorphismPanel } from "./GlassmorphismPanel";
import type { ProjectEntry } from "@/types/content";
import { isGoogleDriveUrl, isVideoUrl, toDriveDirectUrl } from "@/utils/media";

export function ProjectCard({ data, index = 0 }: { data: ProjectEntry; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const rawMedia: string[] = data.media || (data.imageUrl ? [data.imageUrl] : []);
  const rawUrl = rawMedia[0] || "";
  const isDrive = isGoogleDriveUrl(rawUrl);
  const imageUrl = isDrive ? toDriveDirectUrl(rawUrl) : rawUrl;
  const isVideo = rawUrl !== "" && isVideoUrl(rawUrl);
  const tags: string[] = data.tags || [];

  return (
    <Link href={`/projects/${data.id}`} className="block h-full cursor-pointer">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02, y: -4 }}
        className="relative h-full w-full rounded-2xl group"
      >
        <MouseGlowBorder className="h-full">
          <GlassmorphismPanel className="flex h-full flex-col border-[color-mix(in_srgb,var(--surface)_55%,var(--outline-variant))] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] shadow-[0_8px_40px_color-mix(in_srgb,var(--on-surface)_10%,transparent)]">
            <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-surface-container-low">
              {imageUrl && !imgError ? (
                isVideo ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-container-high">
                    <Play size={36} className="text-primary opacity-70" />
                    <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Video Preview
                    </span>
                  </div>
                ) : (
                  <img
                    src={imageUrl}
                    alt={data.title}
                    onError={() => setImgError(true)}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-110" : "scale-100"}`}
                  />
                )
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Code size={26} className="text-primary/70" />
                  </div>
                  <span className="font-manrope text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
                    Project Preview
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[color-mix(in_srgb,var(--surface)_94%,transparent)] to-transparent" />

              {tags.length > 0 && (
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/10 bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-2.5 py-1 font-manrope text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-grow flex-col p-6">
              <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-on-surface transition-colors duration-200 group-hover:text-primary">
                {data.title}
              </h3>
              <p className="mb-5 flex-grow font-manrope text-sm leading-relaxed text-on-surface-variant line-clamp-2">
                {data.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span className="font-manrope text-xs font-medium text-on-surface-variant/40">
                  {data.createdAt
                    ? new Date(data.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : ""}
                </span>
                <div className="flex items-center gap-2">
                  {data.githubUrl && (
                    <div className="rounded-xl bg-surface-container-high p-2 text-on-surface-variant transition-all group-hover:bg-primary/10 group-hover:text-primary hover:scale-110">
                      <Code size={15} />
                    </div>
                  )}
                  {data.liveUrl && (
                    <div className="rounded-xl bg-surface-container-high p-2 text-on-surface-variant transition-all group-hover:bg-primary/10 group-hover:text-primary hover:scale-110">
                      <ExternalLink size={15} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassmorphismPanel>
        </MouseGlowBorder>
      </m.div>
    </Link>
  );
}
