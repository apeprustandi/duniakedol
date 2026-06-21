import React from 'react';

export const TerminalBlock = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="rounded-xl border border-border bg-[#0d1117] overflow-hidden shadow-2xl">
      <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground font-mono">{title}</div>
      </div>
      <div className="p-6 font-mono text-sm md:text-base text-gray-300 whitespace-pre-wrap leading-relaxed">
        {children}
      </div>
    </div>
  );
};