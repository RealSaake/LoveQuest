/**
 * LivingBackground Component
 * Multi-layered SVG background system replacing raster images
 * Creates a watercolor dreamscape with three distinct layers
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { performanceOptimizer } from '@/utils/performanceOptimizer';

interface LivingBackgroundProps {
  mousePosition?: { x: number; y: number };
  animationIntensity?: 'subtle' | 'normal' | 'enhanced';
}

export const LivingBackground: React.FC<LivingBackgroundProps> = ({
  mousePosition = { x: 0, y: 0 },
  animationIntensity = 'normal'
}) => {
  const [settings] = useState(() => performanceOptimizer.getSettings());
  const [gradientPhase, setGradientPhase] = useState(0);

  // 30-second gradient animation loop
  useEffect(() => {
    if (!settings.enableBlur) return; // Skip complex animations on low-end devices

    const interval = setInterval(() => {
      setGradientPhase(prev => (prev + 1) % 360);
    }, 83); // ~30 second loop (360 steps)

    return () => clearInterval(interval);
  }, [settings.enableBlur]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Simplified CSS-based background for better performance */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, hsl(345, 65%, 86%, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, hsl(25, 85%, 88%, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, hsl(285, 45%, 87%, 0.1) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Optional subtle texture overlay - only if performance allows */}
      {settings.animationQuality === 'high' && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(345, 65%, 86%, 0.02) 35px, hsl(345, 65%, 86%, 0.02) 37px)
            `
          }}
        />
      )}
    </div>
  );
};

/**
 * Layer 1: Paper Texture Base
 * Subtle off-white paper texture using SVG filters
 */
const PaperTextureLayer: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              baseFrequency="0.9" 
              numOctaves="4" 
              result="noise"
            />
            <feColorMatrix 
              in="noise" 
              type="saturate" 
              values="0"
            />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.05 0.1 0.15 0.2"/>
            </feComponentTransfer>
            <feComposite 
              operator="over" 
              in2="SourceGraphic"
            />
          </filter>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="hsl(45, 35%, 96%)" 
          filter="url(#paper-texture)"
        />
      </svg>
    </div>
  );
};

/**
 * Layer 2: Watercolor Gradient
 * Animated amorphous gradients with bleeding effect
 */
interface WatercolorGradientLayerProps {
  phase: number;
  intensity: 'subtle' | 'normal' | 'enhanced';
  enableAnimation: boolean;
}

const WatercolorGradientLayer: React.FC<WatercolorGradientLayerProps> = ({
  phase,
  intensity,
  enableAnimation
}) => {
  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'subtle': return 0.5;
      case 'enhanced': return 1.5;
      default: return 1;
    }
  };

  const multiplier = getIntensityMultiplier();
  const blurAmount = enableAnimation ? 40 * multiplier : 20;

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Blush Pink Gradient */}
          <radialGradient id="blush-gradient" cx="30%" cy="20%">
            <stop offset="0%" stopColor="hsl(345, 65%, 86%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(345, 65%, 86%)" stopOpacity="0" />
          </radialGradient>
          
          {/* Peach Puff Gradient */}
          <radialGradient id="peach-gradient" cx="70%" cy="60%">
            <stop offset="0%" stopColor="hsl(25, 85%, 88%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(25, 85%, 88%)" stopOpacity="0" />
          </radialGradient>
          
          {/* Lavender Haze Gradient */}
          <radialGradient id="lavender-gradient" cx="50%" cy="80%">
            <stop offset="0%" stopColor="hsl(285, 45%, 87%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(285, 45%, 87%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Static gradient circles - simpler and more reliable */}
        <circle
          cx="30%"
          cy="20%"
          r="40%"
          fill="url(#blush-gradient)"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
        
        <circle
          cx="70%"
          cy="60%"
          r="35%"
          fill="url(#peach-gradient)"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
        
        <circle
          cx="50%"
          cy="80%"
          r="30%"
          fill="url(#lavender-gradient)"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
      </svg>
    </div>
  );
};

/**
 * Layer 3: Botanical Elements
 * Semi-transparent SVG botanical elements with parallax
 */
interface BotanicalElementsLayerProps {
  mousePosition: { x: number; y: number };
  enableParallax: boolean;
}

const BotanicalElementsLayer: React.FC<BotanicalElementsLayerProps> = ({
  mousePosition,
  enableParallax
}) => {
  const parallaxStrength = enableParallax ? 0.02 : 0;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Vine Element */}
        <motion.path
          d="M100,500 Q200,400 300,450 T500,400 T700,450"
          stroke="hsl(155, 25%, 75%)"
          strokeWidth="2"
          fill="none"
          opacity="0.1"
          animate={enableParallax ? {
            x: mousePosition.x * parallaxStrength,
            y: mousePosition.y * parallaxStrength
          } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
        
        {/* Flower Petals */}
        <motion.g
          opacity="0.08"
          animate={enableParallax ? {
            x: mousePosition.x * parallaxStrength * 0.5,
            y: mousePosition.y * parallaxStrength * 0.5
          } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 40 }}
        >
          <circle cx="150" cy="200" r="8" fill="hsl(345, 65%, 86%)" />
          <circle cx="160" cy="190" r="6" fill="hsl(345, 65%, 86%)" />
          <circle cx="140" cy="190" r="6" fill="hsl(345, 65%, 86%)" />
        </motion.g>
        
        {/* Leaves */}
        <motion.g
          opacity="0.06"
          animate={enableParallax ? {
            x: mousePosition.x * parallaxStrength * 1.5,
            y: mousePosition.y * parallaxStrength * 1.5
          } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
        >
          <ellipse cx="600" cy="300" rx="15" ry="8" fill="hsl(155, 25%, 75%)" transform="rotate(45 600 300)" />
          <ellipse cx="620" cy="320" rx="12" ry="6" fill="hsl(155, 25%, 75%)" transform="rotate(30 620 320)" />
        </motion.g>
        
        {/* Additional decorative elements */}
        <motion.circle
          cx="80%"
          cy="20%"
          r="4"
          fill="hsl(285, 45%, 87%)"
          opacity="0.05"
          animate={enableParallax ? {
            x: mousePosition.x * parallaxStrength * 0.8,
            y: mousePosition.y * parallaxStrength * 0.8
          } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 35 }}
        />
      </svg>
    </div>
  );
};