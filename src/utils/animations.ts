/**
 * Enhanced Animation System
 * Inspired by katbday's magical animation choreography
 */

import { Variants } from 'motion/react';

// Timing functions from katbday design bible - Motion compatible
export const easingCurves = {
  gentle: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  magical: [0.175, 0.885, 0.32, 1.275],
  whimsical: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.4, 0, 0.2, 1]
} as const;

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  breathe: 3,
  extra: 1
} as const;

// Standard animation variants
export const standardAnimations: Record<string, Variants> = {
  // Gentle fade in from bottom
  fadeInUp: {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easingCurves.gentle
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.98,
      transition: {
        duration: durations.fast,
        ease: easingCurves.gentle
      }
    }
  },

  // Magical scale in with bounce
  magicalAppear: {
    initial: { 
      opacity: 0, 
      scale: 0, 
      rotate: -180 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: durations.slow,
        ease: easingCurves.magical
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      rotate: 180,
      transition: {
        duration: durations.normal,
        ease: easingCurves.gentle
      }
    }
  },

  // Gentle hover effect
  gentleHover: {
    hover: { 
      y: -4, 
      scale: 1.02,
      transition: { 
        duration: durations.fast, 
        ease: easingCurves.gentle 
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: durations.instant,
        ease: easingCurves.gentle
      }
    }
  },

  // Whimsical hover with rotation
  whimsicalHover: {
    hover: { 
      y: -6, 
      scale: 1.05,
      rotate: 1,
      transition: { 
        duration: durations.normal, 
        ease: easingCurves.whimsical 
      }
    },
    tap: {
      scale: 0.95,
      rotate: -1,
      transition: {
        duration: durations.instant,
        ease: easingCurves.gentle
      }
    }
  },

  // Staggered children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerChild: {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easingCurves.gentle
      }
    }
  },

  // Page transition
  pageTransition: {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: durations.slow,
        ease: easingCurves.gentle
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: durations.fast,
        ease: easingCurves.gentle
      }
    }
  },

  // Breathing animation for cards
  breathe: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: durations.breathe,
        repeat: Infinity,
        ease: easingCurves.gentle
      }
    }
  },

  // Heart beat animation
  heartBeat: {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 1,
        ease: easingCurves.gentle
      }
    }
  },

  // Sparkle twinkle
  sparkle: {
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easingCurves.gentle
      }
    }
  },

  // Floating animation
  float: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easingCurves.gentle
      }
    }
  }
};

// Quest completion celebration sequence
export const celebrationSequence = {
  // Phase 1: Anticipation
  anticipation: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: durations.normal,
        ease: easingCurves.gentle
      }
    }
  },

  // Phase 2: Explosion
  explosion: {
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: easingCurves.bounce
      }
    }
  },

  // Phase 3: Hearts floating
  heartsFloat: {
    animate: {
      y: [0, -100],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      rotate: [0, 15, -15, 25],
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: easingCurves.whimsical
      }
    }
  },

  // Phase 4: Success message
  successMessage: {
    initial: {
      opacity: 0,
      scale: 0.5,
      y: 20
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.7,
        delay: 0.8,
        ease: easingCurves.magical
      }
    }
  }
};

// Navigation animations
export const navigationAnimations = {
  bottomNav: {
    initial: { y: 100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: durations.slow,
        delay: 0.5,
        ease: easingCurves.gentle
      }
    }
  },

  navItem: {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: durations.fast,
        ease: easingCurves.gentle
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: durations.instant,
        ease: easingCurves.gentle
      }
    }
  },

  activeTab: {
    animate: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },

  floatingHeart: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easingCurves.bounce
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0,
      transition: {
        duration: durations.fast,
        ease: easingCurves.gentle
      }
    }
  }
};

// Timeline specific animations
export const timelineAnimations = {
  vineGrowth: {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: {
        duration: 2,
        ease: easingCurves.gentle
      }
    }
  },

  eventReveal: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      rotate: 0
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: (index: number) => index % 2 === 0 ? 1 : -1,
      transition: {
        duration: durations.slow,
        delay: (index: number) => index * 0.2,
        ease: easingCurves.gentle
      }
    }
  },

  eventHover: {
    hover: {
      scale: 1.05,
      y: -5,
      rotate: 0,
      transition: {
        duration: durations.normal,
        ease: easingCurves.whimsical
      }
    }
  }
};

// Memory vault animations
export const memoryAnimations = {
  masonryItem: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easingCurves.gentle
      }
    }
  },

  memoryHover: {
    hover: {
      scale: 1.02,
      y: -5,
      rotate: (Math.random() - 0.5) * 2, // Random slight rotation
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },

  heartPop: {
    animate: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3,
        ease: easingCurves.bounce
      }
    }
  }
};

// Keepsake chest animations
export const keepsakeAnimations = {
  treasureReveal: {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -180
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 2,
        ease: easingCurves.magical
      }
    }
  },

  rarityGlow: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(248, 216, 231, 0.3)',
        '0 0 40px rgba(248, 216, 231, 0.6)',
        '0 0 20px rgba(248, 216, 231, 0.3)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easingCurves.gentle
      }
    }
  },

  unlockCelebration: {
    animate: {
      rotate: 360,
      scale: [1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: 2,
        ease: easingCurves.bounce
      }
    }
  }
};

// Cinematic transition animations for the aesthetic revolution
export const cinematicTransitions = {
  // Main cinematic transition sequence
  cinematicTransition: {
    initial: {
      scale: 1,
      rotate: 0,
      opacity: 1
    },
    swirl: {
      scale: [1, 1.1, 0.9],
      rotate: [0, 5, -5, 0],
      opacity: [1, 0.8, 0.6],
      transition: {
        duration: 0.5,
        ease: easingCurves.magical
      }
    },
    nebula: {
      scale: [0.9, 0.7, 0.5],
      opacity: [0.6, 0.3, 0.1],
      transition: {
        duration: 0.5,
        ease: easingCurves.magical
      }
    },
    complete: {
      scale: [0.5, 1.2, 1],
      opacity: [0.1, 1, 0],
      transition: {
        duration: 0.5,
        ease: easingCurves.gentle
      }
    }
  },

  // Memory Motes flow animation
  memoryMoteFlow: {
    initial: {
      opacity: 0,
      y: '100vh',
      scale: 0.5,
      rotate: 0
    },
    animate: {
      opacity: [0, 0.6, 0.6, 0],
      y: '-10vh',
      scale: [0.5, 1, 1, 0.5],
      rotate: 360,
      transition: {
        duration: 12, // Will be randomized per mote
        ease: easingCurves.gentle,
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  },

  // Watercolor breathing animation
  watercolorBreathing: {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 30, // 30-second loop
        repeat: Infinity,
        ease: easingCurves.gentle
      }
    }
  },

  // Botanical parallax animation
  botanicalParallax: {
    animate: (mouseX: number, mouseY: number) => ({
      x: mouseX * 0.02,
      y: mouseY * 0.02,
      rotate: mouseX * 0.01,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30
      }
    })
  }
};

// Utility functions for creating custom animations
export const createStaggerAnimation = (
  childVariant: Variants,
  staggerDelay: number = 0.1,
  delayChildren: number = 0.2
) => ({
  container: {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren
      }
    }
  },
  child: childVariant
});

export const createHoverAnimation = (
  scale: number = 1.05,
  y: number = -4,
  duration: number = durations.fast
) => ({
  hover: {
    scale,
    y,
    transition: {
      duration,
      ease: easingCurves.gentle
    }
  },
  tap: {
    scale: scale * 0.95,
    transition: {
      duration: durations.instant,
      ease: easingCurves.gentle
    }
  }
});

export const createFloatingAnimation = (
  yRange: number = 10,
  duration: number = 3
) => ({
  animate: {
    y: [-yRange/2, yRange/2, -yRange/2],
    transition: {
      duration,
      repeat: Infinity,
      ease: easingCurves.gentle
    }
  }
});

// Reduced motion variants
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }
};

// Hook to get appropriate animations based on user preferences
export const useAnimationVariants = (
  normalVariants: Variants,
  reducedVariants?: Variants
) => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return prefersReducedMotion && reducedVariants 
    ? reducedVariants 
    : normalVariants;
};