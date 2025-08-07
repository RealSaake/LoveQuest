/**
 * useMouseParallax Hook
 * Tracks mouse movement for parallax effects in the aesthetic revolution
 */

import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMouseParallax = (enabled: boolean = true) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -50 to 50 range for parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      
      setMousePosition({ x, y });
    };

    // Throttle mouse events for performance
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [enabled]);

  return mousePosition;
};