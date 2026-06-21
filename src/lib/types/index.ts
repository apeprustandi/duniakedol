// Shared TypeScript interfaces for the DKL (Dunia Kedol) project

import type { ReactNode } from "react";

/* ── Feature Card ─────────────────────────────────────────── */
export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

/* ── Section Header ───────────────────────────────────────── */
export interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
}

/* ── How It Works Step ────────────────────────────────────── */
export interface Step {
  num: string;
  title: string;
  desc: string;
  delay?: number;
}

/* ── Materi / Learning Path Card ──────────────────────────── */
export interface MateriCard {
  icon: ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  tags: string[];
  delay?: number;
}

/* ── Challenge Info Card ──────────────────────────────────── */
export interface ChallengeInfo {
  icon: ReactNode;
  title: string;
  desc: string;
  delay?: number;
}

/* ── Challenge Preview Card ───────────────────────────────── */
export interface ChallengeCard {
  difficulty: "Mudah" | "Sedang" | "Sulit";
  diffColor: string;
  title: string;
  desc: string;
  points: number;
  delay?: number;
}

/* ── Pricing Tier ─────────────────────────────────────────── */
export interface PricingTier {
  name: string;
  duration: string;
  price: string;
  popular?: boolean;
  accentColor: string;
  hoverBorder: string;
  features: string[];
  ctaLabel: string;
  ctaClass: string;
}

/* ── Auth / User ───────────────────────────────────────────── */
export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user?: User;
  error?: string;
}
