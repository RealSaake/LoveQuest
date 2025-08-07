import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { performanceOptimizer } from '@/utils/performanceOptimizer'

export default function FloatingElements() {
  const [settings] = useState(() => performanceOptimizer.getSettings())
  
  // Disable floating elements on low performance
  if (settings.animationQuality === 'low') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Static decorative elements only */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-20" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full opacity-15" />
        <div className="absolute top-1/3 right-1/5 text-primary text-sm opacity-10">💕</div>
      </div>
    )
  }

  // Minimal animations for medium performance
  if (settings.animationQuality === 'medium') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Only 2 simple floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-primary text-2xl opacity-20"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          💕
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/5 text-secondary text-xl opacity-15"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          ✨
        </motion.div>
      </div>
    )
  }

  // Full animations only for high performance
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Reduced to only 3 floating elements instead of 8 */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-primary text-2xl opacity-20"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💕
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 right-1/5 text-secondary text-xl opacity-15"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 text-accent text-lg opacity-10"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        🌸
      </motion.div>
    </div>
  )
}