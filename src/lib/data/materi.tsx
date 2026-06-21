import { FiGlobe, FiSearch, FiShield } from "react-icons/fi";
import { SiNodedotjs, SiGit } from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import type { MateriCard } from "@/lib/types";

export const MATERI_LIST: MateriCard[] = [
  {
    icon: <SiNodedotjs />,
    badge: "Fundamentals",
    badgeColor: "text-green-400 border-green-400/30",
    title: "Node.js Development",
    desc: "Foundation backend dan bot creation dengan JavaScript — dari instalasi sampai penggunaan modules.",
    tags: ["Instalasi NodeJS", "Modules", "FS", "JSON"],
    delay: 0,
  },
  {
    icon: <FiGlobe />,
    badge: "Automasi",
    badgeColor: "text-[#00ff88] border-[#00ff88]/30",
    title: "Web Scraping",
    desc: "Extract data dari website dengan Puppeteer dan Cheerio. Core skill buat data gathering.",
    tags: ["Puppeteer", "Cheerio", "DOM", "Data Extraction"],
    delay: 100,
  },
  {
    icon: <SiGit />,
    badge: "Tools",
    badgeColor: "text-blue-400 border-blue-400/30",
    title: "Git & Version Control",
    desc: "Source code management dan kolaborasi tim — skill wajib di setiap project development.",
    tags: ["Git Basics", "Branching", "Merging", "Collab"],
    delay: 200,
  },
  {
    icon: <FaRobot />,
    badge: "Automasi",
    badgeColor: "text-[#00ff88] border-[#00ff88]/30",
    title: "Web Automation",
    desc: "Otomasi browser dengan Puppeteer untuk repetitive task, form filling, dan navigasi.",
    tags: ["Browser Control", "Form Filling", "Navigation", "Screenshot"],
    delay: 300,
  },
  {
    icon: <FiSearch />,
    badge: "Advanced",
    badgeColor: "text-red-400 border-red-400/30",
    title: "Sniffing App & Website",
    desc: "Network analysis dan reverse engineering buat paham gimana aplikasi berkomunikasi.",
    tags: ["Network Sniffing", "API Analysis", "Traffic Monitoring"],
    delay: 400,
  },
  {
    icon: <FiShield />,
    badge: "Advanced",
    badgeColor: "text-red-400 border-red-400/30",
    title: "Bypass SSL & reCAPTCHA",
    desc: "Teknik advanced bypass SSL pinning dengan Frida dan reCAPTCHA v2 buat security research.",
    tags: ["Frida", "SSL Pinning", "reCAPTCHA v2", "Bot Detection"],
    delay: 500,
  },
];
