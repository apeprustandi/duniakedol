import {
  FiPlay,
  FiZap,
  FiMessageSquare,
  FiStar,
  FiLink,
  FiSettings,
} from "react-icons/fi";
import type { Feature } from "@/lib/types";

export const FEATURES: Feature[] = [
  {
    icon: <FiPlay />,
    title: "Video Learning Path",
    description:
      "Materi video terstruktur dari dasar sampai advanced, langsung dari Google Drive. Belajar kapan aja, dimana aja.",
    delay: 0,
  },
  {
    icon: <FiZap />,
    title: "Automation Challenges",
    description:
      "Tantangan automasi dunia nyata — auto-register, captcha solving, form filling. Belajar sambil praktek langsung.",
    delay: 100,
  },
  {
    icon: <FiMessageSquare />,
    title: "Forum Diskusi",
    description:
      "Tempat tanya jawab, share ilmu, dan voting solusi terbaik. Belajar bareng lebih cepat dari belajar sendiri.",
    delay: 200,
  },
  {
    icon: <FiStar />,
    title: "Leaderboard & Points",
    description:
      "Selesaikan challenge, kumpulkan poin, dan naik peringkat. Buktikan skill kamu di leaderboard komunitas.",
    delay: 300,
  },
  {
    icon: <FiLink />,
    title: "Discord & GitHub",
    description:
      "Integrasi langsung ke Discord server dan GitHub organization. Kolaborasi real-time sama member lain.",
    delay: 400,
  },
  {
    icon: <FiSettings />,
    title: "Tools & Bot Request",
    description:
      "Akses tools automasi dan request fitur bot sesuai kebutuhan kamu. Komunitas yang mendengar member-nya.",
    delay: 500,
  },
];
