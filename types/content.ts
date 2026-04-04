export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: SkillItem[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  fullDetails?: string;
  tags?: string[];
  features?: string[];
  media?: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  date?: string;
  description?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenericEntry {
  id: string;
  title?: string;
  name?: string;
  subtitle?: string;
  role?: string;
  date?: string;
  description?: string;
  content?: string;
  fullDetails?: string;
  tags?: string[];
  features?: string[];
  media?: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentData {
  skills: SkillGroup[];
  programming: string[];
  tools: string[];
  coreSkills: string[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  research: GenericEntry[];
  demos: GenericEntry[];
  resume: GenericEntry[];
  analytics?: {
    visitors: number;
    pageViews: number;
  };
}
