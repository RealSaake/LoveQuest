/**
 * CinematicTransition Component
 * Orchestrates the 1.5-second transition between Prologue and Main Application
 */

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { easingCurves } from '@/utils/animations';
import { performanceOptimizer } from '@/utils/performanceOptimizer';

interface CinematicTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  direction: 'prologue-to-main' | 'main-to-prologue';
}

export const CinematicTransition: React.FC<CinematicTransitionProps> = ({
  isActive,
  onComplete,
  direction
}) => {
  const controls = useAnimation();
  const settings = performanceOptimizer.getSettings();

  useEffect(() => {
    if (isActive) {
      performTransition();
    }
  }, [isActive]);

  const performTransition = async () => {
    try {
      // Phase 1: Memory Motes swirl and converge (0-0.5s)
      await controls.start({
        scale: [1, 1.05, 0.95],
        rotate: [0, 2, -2],
        opacity: [0, 0.4, 0.7],
        transition: {
          duration: 0.5,
          ease: easingCurves.magical
        }
      });

      // Phase 2: Sparkling nebula formation (0.5-1.0s)
      await controls.start({
        scale: [0.95, 1.3, 0.7],
        rotate: [-2, 8, 0],
        opacity: [0.7, 1, 0.3],
        transition: {
          duration: 0.5,
          ease: easingCurves.magical
        }
      });

      // Phase 3: Fade to warm white and completion (1.0-1.5s)
      await controls.start({
        scale: [0.7, 2, 1],
        opacity: [0.3, 0.05, 0],
        transition: {
          duration: 0.5,
          ease: easingCurves.gentle
        }
      });

      // Transition complete
      onComplete();
    } catch (error) {
      console.warn('Cinematic transition error:', error);
      onComplete(); // Ensure completion even if animation fails
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      animate={controls}
      initial={{
        scale: 1,
        rotate: 0,
        opacity: 0
      }}
    >
      {/* Warm white overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'hsl(45, 35%, 96%)' }}
      />

      {/* Magical Memory Motes Acceleration */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: settings.particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-70 will-change-transform"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${25 + (i * 8)}%`,
              background: `hsl(${345 + i * 30}, 65%, 86%)`,
              boxShadow: `0 0 8px hsl(${345 + i * 30}, 65%, 86%)`,
            }}
            animate={{
              scale: [0, 1.5, 0.5, 0],
              opacity: [0, 0.8, 0.4, 0],
              y: [0, -80, -160, -240],
              x: [0, Math.sin(i) * 60, Math.cos(i) * 80, Math.sin(i + 1) * 40],
              rotate: [0, 180, 360, 540]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              ease: easingCurves.magical
            }}
          />
        ))}
      </div>

      {/* Sparkling Nebula Formation */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0, 3, 5, 8, 0],
          opacity: [0, 0.3, 0.6, 0.8, 0],
          rotate: [0, 120, 240, 360, 480]
        }}
        transition={{
          duration: 1.5,
          ease: easingCurves.magical
        }}
      >
        <div 
          className="w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(345, 65%, 86%) 0%, hsl(285, 45%, 87%) 50%, transparent 100%)',
            filter: settings.enableBlur ? 'blur(2px)' : 'blur(1px)'
          }}
        />
      </motion.div>

      {/* Converging Light Rays */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '2px',
            height: '100px',
            background: `linear-gradient(to top, hsl(${345 + i * 20}, 65%, 86%), transparent)`,
            transform: `rotate(${i * 60}deg) translateX(-1px)`
          }}
          animate={{
            scaleY: [0, 1, 0.5, 0],
            opacity: [0, 0.6, 0.3, 0],
            rotate: [i * 60, i * 60 + 180]
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + i * 0.05,
            ease: easingCurves.magical
          }}
        />
      ))}

      {/* Final Warm White Fade */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: 'hsl(45, 35%, 96%)' }}
        animate={{
          opacity: [0, 0, 0.3, 0.8, 1, 0]
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.6, 0.7, 0.85, 0.95, 1],
          ease: easingCurves.gentle
        }}
      />
    </motion.div>
  );
};