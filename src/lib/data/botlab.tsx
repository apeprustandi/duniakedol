import {
  FaMagic,
  FaFileCode,
  FaProjectDiagram,
  FaBolt,
  FaRobot,
  FaBriefcase,
} from "react-icons/fa";
import type { Feature } from "@/lib/types";

export const BOT_LAB_FEATURES: Feature[] = [
  {
    icon: <FaMagic />,
    title: "Template Bot Siap Pakai",
    description:
      "8+ boilerplate: HTTP/API, scraper, Puppeteer, Telegram, Discord, cron, AI agent, sampai Frida SSL-bypass. Isi variabel → copy / download .zip.",
    delay: 0,
  },
  {
    icon: <FaFileCode />,
    title: "cURL & HAR → Kode",
    description:
      "Tempel cURL atau HAR dari DevTools → langsung jadi kode bot (axios/got/fetch). AI bahkan bisa nyusun alur multi-step dari traffic.",
    delay: 100,
  },
  {
    icon: <FaProjectDiagram />,
    title: "Flow Mapper",
    description:
      "Kasih URL → AI petakan alur web jadi diagram interaktif + endpoint, payload, dan kode test siap pakai. Zoom & pan.",
    delay: 200,
  },
  {
    icon: <FaBolt />,
    title: "AI Agent Playground",
    description:
      "Generate kode AI agent, atau jalanin agent function-calling beneran (hitung, waktu, HTTP) langsung di browser.",
    delay: 300,
  },
  {
    icon: <FaRobot />,
    title: "etlAI — Asisten Grounded",
    description:
      "AI yang paham materi & tools di sini. Nempel di pojok, sadar konteks halaman yang lagi kamu buka. Tanya cara bikin bot kapan aja.",
    delay: 400,
  },
  {
    icon: <FaBriefcase />,
    title: "Project Board",
    description:
      "Cari & tawarin kerjaan bot antar member, chat langsung, kelola deal sampai selesai & dibayar, plus rating reputasi.",
    delay: 500,
  },
];
