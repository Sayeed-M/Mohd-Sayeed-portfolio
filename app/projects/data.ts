export interface ProjectData {
   id: string;
   title: string;
   description: string;
   tags: string[];
   githubUrl?: string;
   liveUrl?: string;
   mediaFolder: string;
   mediaFrames: number;
   fullDetails?: string;
}

export const PROJECTS: ProjectData[] = [
   {
      id: "1",
      title: "Autonomous VTOL Core",
      description: "A state-of-the-art flight control algorithm that stabilizes custom drone hardware in extreme weather conditions using deep reinforcement learning.",
      tags: ["Python", "C++", "TensorFlow"],
      githubUrl: "#",
      mediaFolder: "/assets/drone-rotate",
      mediaFrames: 240,
      fullDetails: "This project explores the depths of structural aerodynamic balancing using deep reinforcement learning models on edge devices. By shifting from standard PID loops to adaptive matrices, the VTOL core self-corrects mid-air.",
   },
   {
      id: "2",
      title: "AeroGlass Telemetry UI",
      description: "High-fidelity real-time dashboard tracking altitude, velocity, and battery diagnostics translated directly from the hardware sensors.",
      tags: ["Next.js", "Three.js", "WebSockets"],
      githubUrl: "#",
      liveUrl: "#",
      mediaFolder: "/assets/drone-close",
      mediaFrames: 240,
      fullDetails: "To match the rigorous demands of real-time flight controllers, AeroGlass required a UI capable of rendering sub-50ms data payloads smoothly via WebGL without main-thread blocking."
   },
   {
      id: "3",
      title: "Neural Vision Targeting",
      description: "Edge-computed object tracking module enabling the drone to lock onto moving subjects for cinematic videography.",
      tags: ["OpenCV", "CUDA", "PyTorch"],
      githubUrl: "#",
      mediaFolder: "/assets/drone-hover",
      mediaFrames: 240,
      fullDetails: "Computer vision deployed natively onto embedded Nvidia Jetson chips allows this module to identify complex human subjects and calculate trajectory intercepts mathematically."
   },
   {
       id: "4",
       title: "Fleet Management API",
       description: "A centralized command server handling multi-drone swarms, mission planning, and collision avoidance mapping.",
       tags: ["Node.js", "GraphQL", "PostgreSQL"],
       githubUrl: "#",
       mediaFolder: "/assets/drone-rotate",
       mediaFrames: 240,
       fullDetails: "Synchronizing a fleet required complex graph traversal and spatial mapping algorithms served seamlessly over a distributed GraphQL mesh architecture."
   }
];
