export type ProjectData = {
    id: string;
    title: string;
    description: string;
    fullDetails: string;
    tags: string[];
    mediaFolder?: string; // Optional for projects without 3D assets
    mediaFrames?: number; 
    githubUrl?: string;
    liveUrl?: string;
};

export const PROJECTS: ProjectData[] = [
    {
        id: "openai-app",
        title: "OpenAI App",
        description: "A comprehensive AI assistant application utilizing OpenAI models natively on mobile platforms.",
        fullDetails: "Developed a cross-platform mobile application powered by Flutter and natively compiled for Android/iOS. It integrates seamlessly with OpenAI's API to deliver intelligent prompt processing, code generation, and ambient conversational capabilities directly natively.",
        tags: ["Flutter", "Android", "iOS", "API"],
    },
    {
        id: "to-do-task-app",
        title: "To-Do Task App",
        description: "A high-performance offline-first task management application wrapped in a native UI.",
        fullDetails: "Constructed a responsive task tracker utilizing robust state management and local storage to prevent data loss. The UI relies heavily on physical spring physics for drag-to-delete behaviors reflecting premium app interactions.",
        tags: ["App Development", "UI/UX", "State Management"],
    },
    {
        id: "rock-paper-scissors",
        title: "Rock Paper Scissors Game",
        description: "An interactive logic-driven implementation of the classic game with smooth state transitions.",
        fullDetails: "A lightweight mobile experience demonstrating fundamental state machines and stateless vs. stateful UI component separation. Includes haptic feedback hooks and randomized delay algorithms to simulate an opponent AI.",
        tags: ["Game Logic", "Mobile", "UI"],
    },
    {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        description: "A mobile matrix-based logic game testing core layout and array mapping capabilities.",
        fullDetails: "Implemented the classic 3x3 grid game relying on two-dimensional array mappings and continuous winner-evaluation loops mapped directly to reactive UI states.",
        tags: ["Game Dev", "Logic", "Arrays"],
    },
    {
        id: "flappy-bird",
        title: "Flappy Bird Game",
        description: "A physics-based clone of the popular arcade game employing raw velocity loops.",
        fullDetails: "A complete mobile clone integrating raw rendering loop velocities and collision-detection algorithms to emulate gravity, impulse tracking, and bounded box collisions in real-time.",
        tags: ["Physics", "Collision", "Mobile Game"],
    },
    {
        id: "mindful-meal-timer",
        title: "Mindful Meal Timer",
        description: "A health-oriented utility application managing timed intervals.",
        fullDetails: "An application designed to pace eating habits using background service timers, local notifications, and highly accessible contrasting UI rings tracking elapsed time.",
        tags: ["Health", "Utility", "Timers"],
    },
    {
        id: "gemini-ai-chat",
        title: "Gemini AI Chat App",
        description: "A real-time dialogue interface backed by Google's Gemini LLMs.",
        fullDetails: "A robust chat implementation utilizing advanced asynchronous stream handling. Built directly against the Gemini API to rapidly parse rich text, render code blocks, and maintain massive context windows securely on mobile.",
        tags: ["AI", "Gemini API", "Chat Stream"],
    },
    {
        id: "cloud-view-service",
        title: "Cloud View Service",
        description: "A distributed monitoring and data telemetry dashboard UI.",
        fullDetails: "Engineered to map incoming data sets from remote sensory systems into readable, responsive frontend blocks mimicking core enterprise dashboard structures.",
        tags: ["Data", "Networking", "Telemetry"],
    },
    {
        id: "dicee-app",
        title: "Dicee App",
        description: "A randomized probability mobile generator.",
        fullDetails: "Introduced native gesture shaking detection utilizing accelerometer APIs to trigger constrained random number generations dynamically refreshing the UI.",
        tags: ["Hardware API", "Generators"],
    },
    {
        id: "xylophone-app",
        title: "Xylophone App",
        description: "A low-latency audio application playing sequenced audio nodes.",
        fullDetails: "An interactive soundboard proving low-latency audio caching and playback abilities inside a compact, vibrant, touch-responsive grid.",
        tags: ["Audio", "Touch Events", "Latency"],
    },
    {
        id: "egg-timer",
        title: "Egg Timer",
        description: "A precise multi-stage background executing chronometer.",
        fullDetails: "Leveraged deeply nested background thread processes to prevent the OS from killing the timer when the app leaves the foreground.",
        tags: ["Background Services", "Timers"],
    }
];
