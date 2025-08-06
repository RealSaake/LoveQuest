import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface FloatingElementProps {
  emoji: string
  delay: number
  duration: number
  startX: string
  endX: string
  className?: string
}

function FloatingElement({ emoji, delay, duration, startX, endX, className = "" }: FloatingElementProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: '100vh',
        x: startX,
        rotate: 0,
        scale: 0.5
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: '-100px',
        x: endX,
        rotate: 360,
        scale: [0.5, 1, 1, 0.5]
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2
      }}
      className={`fixed pointer-events-none z-10 ${className}`}
      style={{ left: startX }}
    >
      {emoji}
    </motion.div>
  )
}

export default function FloatingElements() {
  const floatingElements = [
    { emoji: '💕', delay: 0, duration: 8, startX: '10%', endX: '15%', className: 'text-3xl' },
    { emoji: '✨', delay: 1, duration: 6, startX: '20%', endX: '25%', className: 'text-2xl' },
    { emoji: '🌸', delay: 2, duration: 7, startX: '80%', endX: '85%', className: 'text-3xl' },
    { emoji: '🦋', delay: 0.5, duration: 9, startX: '70%', endX: '75%', className: 'text-4xl' },
    { emoji: '💖', delay: 2.5, duration: 8, startX: '40%', endX: '45%', className: 'text-3xl' },
    { emoji: '✨', delay: 3, duration: 6, startX: '90%', endX: '95%', className: 'text-2xl' },
    { emoji: '🌹', delay: 1.5, duration: 10, startX: '5%', endX: '10%', className: 'text-3xl' },
    { emoji: '💐', delay: 4, duration: 7, startX: '85%', endX: '90%', className: 'text-2xl' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          emoji={element.emoji}
          delay={element.delay}
          duration={element.duration}
          startX={element.startX}
          endX={element.endX}
          className={element.className}
        />
      ))}
      
      {/* Gentle sparkles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-30"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full opacity-40"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-secondary rounded-full opacity-25"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      {/* Floating hearts */}
      <motion.div
        className="absolute top-1/3 right-1/5 text-primary text-sm opacity-20"
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
        className="absolute bottom-1/3 left-1/5 text-secondary text-xs opacity-15"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
          rotate: [5, -5, 5],
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
    </div>
  )
}