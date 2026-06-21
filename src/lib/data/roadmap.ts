export type RoadmapStatus = "available" | "coming-soon";

export interface RoadmapModule {
  title: string;
  tag: string;
}

export interface RoadmapPhase {
  phase: string;
  label: string;
  color: string;          // neon accent color
  borderColor: string;    // tailwind border class
  glowColor: string;      // shadow / glow class
  status: RoadmapStatus;
  duration: string;
  modules: RoadmapModule[];
  outcome: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "01",
    label: "Beginner",
    color: "#00ff88",
    borderColor: "border-[#00ff88]",
    glowColor: "shadow-[#00ff88]/20",
    status: "available",
    duration: "2–3 minggu",
    outcome: "Bisa nulis script Node.js dan manage file system",
    modules: [
      { title: "Instalasi & Setup Environment", tag: "Setup" },
      { title: "Node.js Core — Modules & FS", tag: "Fundamentals" },
      { title: "JSON & Data Handling", tag: "Fundamentals" },
      { title: "Git & Version Control Dasar", tag: "Tools" },
      { title: "HTTP Requests dengan Axios", tag: "Networking" },
    ],
  },
  {
    phase: "02",
    label: "Intermediate",
    color: "#60a5fa",
    borderColor: "border-[#60a5fa]",
    glowColor: "shadow-[#60a5fa]/20",
    status: "available",
    duration: "3–4 minggu",
    outcome: "Bisa scraping data dan automasi tugas berulang di browser",
    modules: [
      { title: "Web Scraping dengan Cheerio", tag: "Scraping" },
      { title: "Browser Automation — Puppeteer", tag: "Automation" },
      { title: "Form Filling & Navigation", tag: "Automation" },
      { title: "Screenshot & PDF Generation", tag: "Output" },
      { title: "Scheduling & Cron Jobs", tag: "Automation" },
    ],
  },
  {
    phase: "03",
    label: "Advanced",
    color: "#a78bfa",
    borderColor: "border-[#a78bfa]",
    glowColor: "shadow-[#a78bfa]/20",
    status: "available",
    duration: "4–5 minggu",
    outcome: "Bisa build bot production-ready dan bypass anti-bot protection",
    modules: [
      { title: "Playwright — Cross-browser Testing", tag: "E2E Testing" },
      { title: "Network Sniffing & API Analysis", tag: "Reverse Eng." },
      { title: "Bypass Bot Detection & Captcha", tag: "Advanced" },
      { title: "SSL Pinning bypass dengan Frida", tag: "Security" },
      { title: "Bot Architecture & Design Patterns", tag: "Architecture" },
    ],
  },
  {
    phase: "04",
    label: "Master",
    color: "#fbbf24",
    borderColor: "border-[#fbbf24]",
    glowColor: "shadow-[#fbbf24]/20",
    status: "coming-soon",
    duration: "Ongoing",
    outcome: "Deploy bot di production, monetisasi skill, dan kontribusi ke komunitas",
    modules: [
      { title: "Deploying Bots ke VPS / Cloud", tag: "DevOps" },
      { title: "Monetisasi — Freelance & Marketplace", tag: "Business" },
      { title: "Open Source Contribution", tag: "Community" },
      { title: "Mentoring & Teaching Back", tag: "Leadership" },
      { title: "Real Project Portfolio", tag: "Portfolio" },
    ],
  },
];
