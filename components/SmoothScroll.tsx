"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    function onAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        lenis.scrollTo(element as HTMLElement, { offset: -130 });
      }
    }

    document.addEventListener('click', onAnchorClick);
    
    return () => {
      lenis.destroy();
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  return null;
}
