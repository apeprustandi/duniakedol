import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border border-border p-6 shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};