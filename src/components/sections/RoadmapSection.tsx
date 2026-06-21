"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ROADMAP_PHASES } from "@/lib/data/roadmap";

export function RoadmapSection() {
  const [activePhase, setActivePhase] = useState(0);
  const current = ROADMAP_PHASES[activePhase];

  return (
    <section id="roadmap" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// learning path"
          title="Roadmap Belajarmu"
          subtitle="Dari nol sampai jago, step by step. Setiap phase punya tujuan dan outcome yang jelas."
        />

        {/* ── Phase Selector ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          {ROADMAP_PHASES.map((phase, i) => {
            const isActive = i === activePhase;
            return (
              <button
                key={phase.phase}
                id={`roadmap-phase-${phase.phase}`}
                onClick={() => setActivePhase(i)}
                className={`relative group flex items-center gap-3 px-5 py-3 border text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-[#0a0f0a]"
                    : "border-[#27272a] text-[#a1a1aa] hover:text-[#f5f5f5] hover:border-[#3f3f46]"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: phase.color,
                        borderColor: phase.color,
                        boxShadow: `0 0 20px ${phase.color}40`,
                      }
                    : {}
                }
              >
                <span
                  className={`text-xs font-mono ${isActive ? "text-[#0a0f0a]/60" : "text-[#52525b]"}`}
                >
                  {phase.phase}
                </span>
                {phase.label}
                {phase.status === "coming-soon" && !isActive && (
                  <span className="ml-1 text-[9px] uppercase tracking-widest border border-[#fbbf24]/40 text-[#fbbf24] px-1.5 py-0.5">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Phase Detail Panel ── */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left — module list */}
          <div className="lg:col-span-3">
            <div
              className={`relative bg-[#1a1f1a] border transition-all duration-500 ${current.borderColor} shadow-xl ${current.glowColor}`}
            >
              {/* Top accent line */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${current.color}, transparent)`,
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a]">
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: current.color }}
                  >
                    {current.phase}
                  </span>
                  <div>
                    <h3 className="text-[#f5f5f5] font-semibold text-base leading-tight">
                      {current.label}
                    </h3>
                    <p className="text-[#52525b] text-xs font-mono">
                      {current.duration}
                    </p>
                  </div>
                </div>

                {current.status === "coming-soon" ? (
                  <span className="text-[10px] uppercase tracking-widest border border-[#fbbf24]/40 text-[#fbbf24] px-2 py-1">
                    Coming Soon
                  </span>
                ) : (
                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-1 border"
                    style={{
                      color: current.color,
                      borderColor: `${current.color}40`,
                    }}
                  >
                    Available
                  </span>
                )}
              </div>

              {/* Modules */}
              <ul className="divide-y divide-[#27272a]">
                {current.modules.map((mod, i) => (
                  <li
                    key={mod.title}
                    className="flex items-center gap-4 px-6 py-4 group/item hover:bg-[#0a0f0a]/40 transition-colors duration-200"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span
                      className="w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 text-[10px] transition-all duration-300"
                      style={
                        current.status === "available"
                          ? {
                              borderColor: current.color,
                              color: current.color,
                            }
                          : { borderColor: "#3f3f46", color: "#3f3f46" }
                      }
                    >
                      {current.status === "available" ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-sm flex-1 ${
                        current.status === "available"
                          ? "text-[#d4d4d8]"
                          : "text-[#52525b]"
                      }`}
                    >
                      {mod.title}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 border font-mono flex-shrink-0"
                      style={
                        current.status === "available"
                          ? {
                              color: current.color,
                              borderColor: `${current.color}30`,
                              backgroundColor: `${current.color}08`,
                            }
                          : {
                              color: "#3f3f46",
                              borderColor: "#3f3f46",
                            }
                      }
                    >
                      {mod.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — outcome + path viz */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Outcome card */}
            <div className="bg-[#1a1f1a] border border-[#27272a] p-6">
              <p className="text-[#52525b] text-[10px] uppercase tracking-widest mb-3 font-mono">
                // outcome
              </p>
              <p
                className="text-sm leading-relaxed font-semibold"
                style={{ color: current.color }}
              >
                {current.outcome}
              </p>
            </div>

            {/* Visual phase path */}
            <div className="bg-[#1a1f1a] border border-[#27272a] p-6 flex-1">
              <p className="text-[#52525b] text-[10px] uppercase tracking-widest mb-5 font-mono">
                // progress path
              </p>
              <div className="flex flex-col gap-0">
                {ROADMAP_PHASES.map((p, i) => {
                  const isDone = i < activePhase;
                  const isCurrentPhase = i === activePhase;
                  const isLast = i === ROADMAP_PHASES.length - 1;
                  return (
                    <div key={p.phase} className="flex items-stretch gap-4">
                      {/* Node + connector */}
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => setActivePhase(i)}
                          className="w-8 h-8 rounded-sm border-2 flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 flex-shrink-0"
                          style={
                            isCurrentPhase
                              ? {
                                  borderColor: p.color,
                                  backgroundColor: p.color,
                                  color: "#0a0f0a",
                                  boxShadow: `0 0 12px ${p.color}60`,
                                }
                              : isDone
                              ? {
                                  borderColor: p.color,
                                  color: p.color,
                                }
                              : {
                                  borderColor: "#27272a",
                                  color: "#3f3f46",
                                }
                          }
                        >
                          {isDone ? "✓" : p.phase}
                        </button>
                        {!isLast && (
                          <div
                            className="w-px flex-1 my-1 min-h-[28px]"
                            style={{
                              backgroundColor: isDone ? p.color : "#27272a",
                              opacity: isDone ? 0.5 : 1,
                            }}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="pb-7 flex items-start pt-1">
                        <button
                          onClick={() => setActivePhase(i)}
                          className="text-left"
                        >
                          <p
                            className="text-sm font-semibold leading-tight transition-colors"
                            style={
                              isCurrentPhase
                                ? { color: p.color }
                                : isDone
                                ? { color: "#71717a" }
                                : { color: "#3f3f46" }
                            }
                          >
                            {p.label}
                          </p>
                          <p className="text-[#3f3f46] text-xs font-mono mt-0.5">
                            {p.duration}
                          </p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
