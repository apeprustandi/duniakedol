import { FiGlobe } from "react-icons/fi";
import type { ChallengeInfo, ChallengeCard } from "@/lib/types";

/* ── SVG icons for challenge info cards ──────────────────── */
const LevelIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 640 512"
    width="1em"
    height="1em"
  >
    <path d="M216 288h-48c-8.84 0-16 7.16-16 16v192c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V304c0-8.84-7.16-16-16-16zM88 384H40c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16zm256-192h-48c-8.84 0-16 7.16-16 16v288c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V208c0-8.84-7.16-16-16-16zm128-96h-48c-8.84 0-16 7.16-16 16v384c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V112c0-8.84-7.16-16-16-16zM600 0h-48c-8.84 0-16 7.16-16 16v480c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16z" />
  </svg>
);

const TrophyIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 576 512"
    width="1em"
    height="1em"
  >
    <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" />
  </svg>
);

/* ── Challenge info cards ─────────────────────────────────── */
export const CHALLENGE_INFO_CARDS: ChallengeInfo[] = [
  {
    icon: <FiGlobe className="text-lg" />,
    title: "Skenario Real-World",
    desc: "Tiap challenge meniru kasus automasi yang beneran kamu temui: isi form, login, scraping, sampai bypass proteksi. Bukan soal teori, tapi praktik langsung.",
    delay: 0,
  },
  {
    icon: <LevelIcon />,
    title: "Bertingkat: Mudah → Sulit",
    desc: "Mulai dari yang ringan buat pemanasan, naik perlahan ke yang bikin mikir. Tiap level ngasih konsep baru yang nambah skill automasi kamu.",
    delay: 100,
  },
  {
    icon: <TrophyIcon />,
    title: "Poin & Leaderboard",
    desc: "Setiap challenge punya poin reward. Kumpulin semuanya, lihat posisi kamu di leaderboard, dan tunjukin siapa yang paling jago di komunitas.",
    delay: 200,
  },
];

/* ── Challenge preview cards ──────────────────────────────── */
export const CHALLENGE_CARDS: ChallengeCard[] = [
  {
    difficulty: "Mudah",
    diffColor: "text-green-400 border-green-400/30",
    title: "Auto Registration Bot",
    desc: "Buat bot yang bisa mengisi form registrasi secara otomatis. Latihan dasar web automation.",
    points: 50,
    delay: 0,
  },
  {
    difficulty: "Sedang",
    diffColor: "text-yellow-400 border-yellow-400/30",
    title: "Multi-Step Form Automation",
    desc: "Navigasi dan isi form multi-langkah secara otomatis. Termasuk validasi tiap step.",
    points: 100,
    delay: 100,
  },
  {
    difficulty: "Sulit",
    diffColor: "text-red-400 border-red-400/30",
    title: "Math CAPTCHA Solver",
    desc: "Pecahkan captcha matematika secara otomatis. Kombinasi OCR dan kalkulasi.",
    points: 200,
    delay: 200,
  },
];
