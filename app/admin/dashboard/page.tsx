"use client";
import React, { useEffect, useState } from "react";
import { m } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { FolderGit2, Blocks, GitBranch, ShieldAlert, GitPullRequest } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardData {
  githubStats: {
    repos: number;
    followers: number;
    username: string;
  };
  portfolioStats: {
    projects: number;
    skills: number;
    experience: number;
  };
  isLoading: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>({
    githubStats: { repos: 0, followers: 0, username: "Mohd Sayeed" },
    portfolioStats: { projects: 0, skills: 0, experience: 0 },
    isLoading: true,
  });

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // 1. Auth Check
    const token = localStorage.getItem("isAdmin");
    if (token !== "true") {
      router.push("/admin/login");
      return;
    }
    setAuthChecked(true);

    // 2. Fetch Data
    const fetchDashboardData = async () => {
      try {
        // Fetch CMS Data
        const cmsRes = await fetch("/api/content");
        const cmsData = await cmsRes.json();
        
        let totalSkills = 0;
        if (cmsData.skills) {
           cmsData.skills.forEach((group: any) => totalSkills += group.items?.length || 0);
        }

        // Fetch Live Github Data
        const githubUsername = "sayeed-mulla"; // Default or dynamic if preferred
        const ghRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const ghData = ghRes.ok ? await ghRes.json() : { public_repos: 0, followers: 0, login: githubUsername };

        setData({
          githubStats: {
            repos: ghData.public_repos || 0,
            followers: ghData.followers || 0,
            username: ghData.login || githubUsername,
          },
          portfolioStats: {
            projects: cmsData.projects?.length || 0,
            skills: totalSkills || 0,
            experience: cmsData.experience?.length || 0,
          },
          isLoading: false
        });

      } catch (err) {
        console.error("Dashboard fetch error:", err);
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

      {/* Background Glows */}
      <div className="fixed -top-60 -right-60 w-[600px] h-[600px] bg-primary/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Page Header */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-4xl font-bold text-on-surface tracking-tight mb-2">
              Command Dashboard
            </h1>
            <p className="font-manrope text-on-surface-variant">
              Centralized mission control for portfolio content and analytics.
            </p>
          </div>
          <button 
             onClick={() => {
                localStorage.removeItem("isAdmin");
                router.push("/admin/login");
             }}
             className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-manrope font-bold text-sm border border-red-100 hover:bg-red-100 transition-colors"
          >
            End Session
          </button>
        </m.div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatsCard 
            label="Total CMS Projects" 
            value={data.portfolioStats.projects} 
            icon={FolderGit2} 
            idx={0}
            subValue="Live from local database"
          />
          <StatsCard 
            label="Monitored Skills" 
            value={data.portfolioStats.skills} 
            icon={Blocks} 
            idx={1}
            highlight
          />
          <StatsCard 
            label="GitHub Repositories" 
            value={data.githubStats.repos} 
            icon={GitBranch} 
            idx={2}
            subValue={`@${data.githubStats.username}`}
          />
        </div>

        {/* Global Security Notice */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4 items-start">
            <ShieldAlert className="text-primary mt-1" />
            <div>
              <h3 className="font-display font-bold text-lg text-on-surface mb-1">Global Edit Mode Active</h3>
              <p className="font-manrope text-on-surface-variant text-sm">
                Because you are authenticated, traveling to any portfolio page (Skills, Projects, Experience, etc.) will automatically expose the CMS modification overlay. You can visually add, delete, and update objects natively inside the UI, and they will persist securely.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
