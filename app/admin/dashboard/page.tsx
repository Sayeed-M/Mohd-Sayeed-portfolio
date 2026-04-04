"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { Blocks, FolderGit2, GitBranch } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { DashboardCMS } from "@/components/DashboardCMS";
import type { ContentData, SkillGroup } from "@/types/content";

const AnalyticsChart = dynamic(() => import("@/components/AnalyticsChart"), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Loading telemetry...</div>,
});

interface DashboardData {
  githubStats: { repos: number; followers: number; username: string };
  portfolioStats: { projects: number; skills: number; experience: number };
  cmsRaw: ContentData | null;
  isLoading: boolean;
}

const mockChartData = [
  { name: "Jan", visitors: 400, views: 2400 },
  { name: "Feb", visitors: 300, views: 1398 },
  { name: "Mar", visitors: 600, views: 4800 },
  { name: "Apr", visitors: 800, views: 3908 },
  { name: "May", visitors: 1200, views: 4800 },
  { name: "Jun", visitors: 1254, views: 4580 },
];

function countSkills(groups: SkillGroup[] = []): number {
  return groups.reduce((total, group) => total + (group.items?.length || 0), 0);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthorized] = useState(() => typeof window !== "undefined" && localStorage.getItem("isAdmin") === "true");
  const [data, setData] = useState<DashboardData>({
    githubStats: { repos: 0, followers: 0, username: "Mohd Sayeed" },
    portfolioStats: { projects: 0, skills: 0, experience: 0 },
    cmsRaw: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/admin/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const cmsRes = await fetch("/api/content");
        const cmsData = (await cmsRes.json()) as ContentData;

        const githubUsername = "sayeed-mulla";
        const ghRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const ghData = ghRes.ok
          ? ((await ghRes.json()) as { public_repos?: number; followers?: number; login?: string })
          : { public_repos: 0, followers: 0, login: githubUsername };

        setData({
          githubStats: {
            repos: ghData.public_repos || 0,
            followers: ghData.followers || 0,
            username: ghData.login || githubUsername,
          },
          portfolioStats: {
            projects: cmsData.projects?.length || 0,
            skills: countSkills(cmsData.skills),
            experience: cmsData.experience?.length || 0,
          },
          cmsRaw: cmsData,
          isLoading: false,
        });
      } catch {
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    void fetchDashboardData();
  }, [isAuthorized, router]);

  const handleCmsDataChange = (nextData: ContentData) => {
    setData((prev) => ({
      ...prev,
      cmsRaw: nextData,
      portfolioStats: {
        projects: nextData.projects?.length || 0,
        skills: countSkills(nextData.skills),
        experience: nextData.experience?.length || 0,
      },
    }));
  };

  if (isAuthorized !== true || data.isLoading || !data.cmsRaw) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-container-low/50">
      <Navbar />
      <div className="pointer-events-none fixed -right-60 -top-60 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-on-surface">Command Dashboard</h1>
            <p className="font-manrope text-on-surface-variant">Centralized mission control for portfolio content and analytics.</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/admin/login");
            }}
            className="rounded-lg border border-red-100 bg-red-50 px-4 py-2 font-manrope text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
          >
            End Session
          </button>
        </m.div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard label="Total CMS Projects" value={data.portfolioStats.projects} icon={FolderGit2} idx={0} subValue="Live from local database" />
          <StatsCard label="Monitored Skills" value={data.portfolioStats.skills} icon={Blocks} idx={1} highlight />
          <StatsCard label="GitHub Repositories" value={data.githubStats.repos} icon={GitBranch} idx={2} subValue={`@${data.githubStats.username}`} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-2xl font-bold text-on-surface">Database Editor</h2>
            <DashboardCMS initialData={data.cmsRaw} onDataChange={handleCmsDataChange} />
          </div>

          <div className="lg:col-span-1">
            <h2 className="mb-6 font-display text-2xl font-bold text-on-surface">Analytics</h2>
            <div className="h-[400px] rounded-2xl border border-outline-variant/20 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:bg-surface-container/60">
              <div className="mb-6">
                <p className="font-manrope text-sm font-bold text-on-surface-variant">Unique Visitors</p>
                <h3 className="font-display text-3xl font-black text-on-surface">{data.cmsRaw.analytics?.visitors || 1254}</h3>
              </div>
              <div className="h-48 w-full">
                <AnalyticsChart data={mockChartData} />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-outline-variant/10 pt-4 font-manrope text-xs font-semibold text-on-surface-variant">
                <span className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Active Monitoring
                </span>
                <span className="tracking-wide text-secondary">6 MONTH TRAILING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
