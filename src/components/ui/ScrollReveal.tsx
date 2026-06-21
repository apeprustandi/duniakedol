"use client";
import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }

    // Also trigger hero elements immediately
    const heroElements = document.querySelectorAll(".reveal-hero");
    setTimeout(() => {
      for (const el of heroElements) {
        el.classList.add("visible");
      }
    }, 100);

    return () => observer.disconnect();
  }, []);

  return null;
}
