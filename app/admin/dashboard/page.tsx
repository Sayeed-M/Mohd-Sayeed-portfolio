"use client";
import React, { useEffect, useState } from "react";
import { m } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { FolderGit2, Blocks, GitBranch, ShieldAlert, GitPullRequest } from "lucide-react";
import { useRouter } from "next/navigation";

import { DashboardCMS } from "@/components/DashboardCMS";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardData {
  githubStats: { repos: number; followers: number; username: string; };
  portfolioStats: { projects: number; skills: number; experience: number; };
  cmsRaw: any;
  isLoading: boolean;
}

const mockChartData = [
  { name: 'Jan', visitors: 400, views: 2400 },
  { name: 'Feb', visitors: 300, views: 1398 },
  { name: 'Mar', visitors: 600, views: 4800 },
  { name: 'Apr', visitors: 800, views: 3908 },
  { name: 'May', visitors: 1200, views: 4800 },
  { name: 'Jun', visitors: 1254, views: 4580 },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>({
    githubStats: { repos: 0, followers: 0, username: "Mohd Sayeed" },
    portfolioStats: { projects: 0, skills: 0, experience: 0 },
    cmsRaw: null,
    isLoading: true,
  });

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("isAdmin");
    if (token !== "true") {
      router.push("/admin/login");
      return;
    }
    setAuthChecked(true);

    const fetchDashboardData = async () => {
      try {
        const cmsRes = await fetch("/api/content");
        const cmsData = await cmsRes.json();
        
        let totalSkills = 0;
        if (cmsData.skills) {
           cmsData.skills.forEach((group: any) => totalSkills += group.items?.length || 0);
        }

        const githubUsername = "sayeed-mulla";
        const ghRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const ghData = ghRes.ok ? await ghRes.json() : { public_repos: 0, followers: 0, login: githubUsername };

        setData({
          githubStats: { repos: ghData.public_repos || 0, followers: ghData.followers || 0, username: ghData.login || githubUsername },
          portfolioStats: { projects: cmsData.projects?.length || 0, skills: totalSkills || 0, experience: cmsData.experience?.length || 0 },
          cmsRaw: cmsData,
          isLoading: false
        });

      } catch (err) {
        setData(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchDashboardData();
  }, [router]);

  if (!authChecked || data.isLoading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-container-low/50 relative overflow-hidden">
      <Navbar />
      <div className="fixed -top-60 -right-60 w-[600px] h-[600px] bg-primary/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-on-surface tracking-tight mb-2">Command Dashboard</h1>
            <p className="font-manrope text-on-surface-variant">Centralized mission control for portfolio content and analytics.</p>
          </div>
          <button 
             onClick={() => { localStorage.removeItem("isAdmin"); router.push("/admin/login"); }}
             className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-manrope font-bold text-sm border border-red-100 hover:bg-red-100 transition-colors"
          >
            End Session
          </button>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatsCard label="Total CMS Projects" value={data.portfolioStats.projects} icon={FolderGit2} idx={0} subValue="Live from local database" />
          <StatsCard label="Monitored Skills" value={data.portfolioStats.skills} icon={Blocks} idx={1} highlight />
          <StatsCard label="GitHub Repositories" value={data.githubStats.repos} icon={GitBranch} idx={2} subValue={`@${data.githubStats.username}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* CMS Main Area */}
           <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-on-surface mb-6">Database Editor</h2>
              <DashboardCMS initialData={data.cmsRaw} />
           </div>

           {/* Analytics Sidebar */}
           <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold text-on-surface mb-6">Analytics</h2>
              <div className="bg-white/60 dark:bg-surface-container/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 shadow-lg h-[400px]">
                 <div className="mb-6">
                    <p className="font-manrope text-sm font-bold text-on-surface-variant">Unique Visitors</p>
                    <h3 className="font-display text-3xl font-black text-on-surface">{data.cmsRaw?.analytics?.visitors || 1254}</h3>
                 </div>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                        <XAxis dataKey="name" strokeOpacity={0.5} fontSize={12} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="visitors" stroke="#0058bc" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-6 flex justify-between items-center text-xs font-manrope font-semibold text-on-surface-variant pt-4 border-t border-outline-variant/10">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Active Monitoring</span>
                    <span className="text-secondary tracking-wide">6 MONTH TRAILING</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}
