/**
 * MemoryMotesSystem Component
 * Ethereal floating particles representing memories and feelings
 * Uses lucide-react icons with natural meandering animation paths
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Music, Sparkles, Flower2, Feather } from 'lucide-react';
import { performanceOptimizer } from '@/utils/performanceOptimizer';

interface MemoryMote {
  id: string;
  icon: React.ComponentType<any>;
  startPosition: { x: number; y: number };
  opacity: number;
  scale: number;
  duration: number;
  delay: number;
  blendMode: 'screen' | 'soft-light';
  color: string;
}

interface MemoryMotesSystemProps {
  density?: number;
  colorPalette?: string[];
}

export const MemoryMotesSystem: React.FC<MemoryMotesSystemProps> = ({
  density,
  colorPalette = [
    'hsl(345, 65%, 86%)', // Blush Pink
    'hsl(25, 85%, 88%)',  // Peach Puff
    'hsl(285, 45%, 87%)', // Lavender Haze
    'hsl(155, 25%, 75%)', // Sage Green
    'hsl(15, 50%, 82%)'   // Rose Gold
  ]
}) => {
  const [settings] = useState(() => performanceOptimizer.getSettings());
  const [activeMotes, setActiveMotes] = useState<MemoryMote[]>([]);

  // Adjust density based on performance settings - more aggressive reduction
  const effectiveDensity = density || Math.max(0, Math.min(settings.particleCount, settings.animationQuality === 'low' ? 1 : settings.animationQuality === 'medium' ? 2 : 4));

  // Available icons for memory motes
  const availableIcons = [Heart, Star, Music, Sparkles, Flower2, Feather];

  // Generate memory motes
  const generateMote = (index: number): MemoryMote => {
    return {
      id: `mote-${Date.now()}-${index}`,
      icon: availableIcons[Math.floor(Math.random() * availableIcons.length)],
      startPosition: {
        x: Math.random() * 100, // Percentage across screen
        y: 110 // Start below viewport
      },
      opacity: 0.1 + Math.random() * 0.5, // 0.1 to 0.6
      scale: 0.5 + Math.random() * 0.7,   // 0.5 to 1.2
      duration: 8 + Math.random() * 7,    // 8s to 15s
      delay: Math.random() * 5,           // 0 to 5s delay
      blendMode: Math.random() > 0.5 ? 'screen' : 'soft-light',
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)]
    };
  };

  // Initialize motes
  useEffect(() => {
    const initialMotes = Array.from({ length: effectiveDensity }, (_, i) => 
      generateMote(i)
    );
    setActiveMotes(initialMotes);
  }, [effectiveDensity]);

  // Regenerate motes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMotes(prev => {
        // Replace one random mote
        const newMotes = [...prev];
        const replaceIndex = Math.floor(Math.random() * newMotes.length);
        newMotes[replaceIndex] = generateMote(replaceIndex);
        return newMotes;
      });
    }, 3000); // Replace one mote every 3 seconds

    return () => clearInterval(interval);
  }, [effectiveDensity]);

  // Don't render anything if no particles allowed
  if (effectiveDensity === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {activeMotes.map((mote) => (
        <MemoryMote
          key={mote.id}
          mote={mote}
          enableAnimation={settings.animationQuality !== 'low'}
        />
      ))}
    </div>
  );
};

/**
 * Individual Memory Mote Component
 */
interface MemoryMoteProps {
  mote: MemoryMote;
  enableAnimation: boolean;
}

const MemoryMote: React.FC<MemoryMoteProps> = ({ mote, enableAnimation }) => {
  const Icon = mote.icon;

  // Generate natural meandering path using sine wave
  const generatePath = useMemo(() => {
    const amplitude = 50 + Math.random() * 100; // Horizontal sway amplitude
    const frequency = 0.01 + Math.random() * 0.02; // Wave frequency
    const phase = Math.random() * Math.PI * 2; // Random phase offset

    return {
      amplitude,
      frequency,
      phase
    };
  }, [mote.id]);

  const motionVariants = {
    initial: {
      x: `${mote.startPosition.x}%`,
      y: `${mote.startPosition.y}%`,
      opacity: 0,
      scale: mote.scale * 0.5,
      rotate: 0
    },
    animate: enableAnimation ? {
      // Simplified animation for better performance
      x: `${mote.startPosition.x + Math.sin(generatePath.phase) * 8}%`,
      y: '-10%',
      opacity: mote.opacity,
      scale: mote.scale,
      rotate: 180
    } : {
      y: '-10%',
      opacity: mote.opacity,
      scale: mote.scale
    },
    exit: {
      opacity: 0,
      scale: 0
    }
  };

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        mixBlendMode: mote.blendMode,
        filter: 'blur(1.5px)',
        color: mote.color
      }}
      variants={motionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: mote.duration,
        delay: mote.delay,
        ease: "linear", // Linear is more performant than easeInOut
        repeat: Infinity,
        repeatDelay: 3
      }}
    >
      <div
        className="relative"
        style={{
          boxShadow: `0 0 12px ${mote.color}40, 0 0 24px ${mote.color}20`,
          borderRadius: '50%',
          padding: '4px'
        }}
      >
        <Icon 
          size={16 + Math.random() * 8} 
          className="drop-shadow-sm"
        />
      </div>
    </motion.div>
  );
};

export default MemoryMotesSystem;