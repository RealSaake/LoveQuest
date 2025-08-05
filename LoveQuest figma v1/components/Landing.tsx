'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface FloatingElementProps {
  emoji: string
  delay: number
  duration: number
  startX: number
  endX: number
}

function FloatingElement({ emoji, delay, duration, startX, endX }: FloatingElementProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: window.innerHeight + 50,
        x: startX,
        rotate: 0,
        scale: 0.5
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -100,
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
      className="fixed pointer-events-none z-10 text-2xl"
      style={{ left: startX }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const floatingElements = [
    { emoji: '💕', delay: 0, duration: 8, startX: '10%', endX: '15%' },
    { emoji: '✨', delay: 1, duration: 6, startX: '20%', endX: '25%' },
    { emoji: '🌸', delay: 2, duration: 7, startX: '80%', endX: '85%' },
    { emoji: '🦋', delay: 0.5, duration: 9, startX: '70%', endX: '75%' },
    { emoji: '💖', delay: 2.5, duration: 8, startX: '40%', endX: '45%' },
    { emoji: '✨', delay: 3, duration: 6, startX: '90%', endX: '95%' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          emoji={element.emoji}
          delay={element.delay}
          duration={element.duration}
          startX={parseFloat(element.startX) * window.innerWidth / 100}
          endX={parseFloat(element.endX) * window.innerWidth / 100}
        />
      ))}

      {/* Growing Vine Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-8 top-0 w-1 bg-gradient-to-b from-mint-mist to-rose-gold animate-grow-vine"
        style={{
          background: 'linear-gradient(to bottom, hsl(155, 35%, 85%) 0%, hsl(15, 50%, 82%) 100%)',
          width: '3px',
        }}
      />
      
      {/* Decorative vine leaves */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute right-4 top-20 text-mint-mist text-3xl transform rotate-12"
      >
        🌿
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute right-6 top-40 text-mint-mist text-2xl transform -rotate-12"
      >
        🍃
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center z-20 max-w-2xl"
      >
        {/* Main Title */}
        <motion.h1
          className="font-dancing text-decorative text-blush-pink mb-4 drop-shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Welcome to Our LoveQuest, Kat
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-caveat text-signature text-peach-puff mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          A handcrafted digital scrapbook filled with our memories, adventures, and all the little moments that make us smile 💕
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center items-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.span
            className="text-2xl animate-heart-beat"
            style={{ animationDelay: '0s' }}
          >
            💖
          </motion.span>
          <motion.div
            className="w-16 h-0.5 bg-gradient-romance"
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 2.2, duration: 0.8 }}
          />
          <motion.span
            className="text-2xl animate-heart-beat"
            style={{ animationDelay: '0.5s' }}
          >
            ✨
          </motion.span>
          <motion.div
            className="w-16 h-0.5 bg-gradient-romance"
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 2.4, duration: 0.8 }}
          />
          <motion.span
            className="text-2xl animate-heart-beat"
            style={{ animationDelay: '1s' }}
          >
            🌸
          </motion.span>
        </motion.div>

        {/* Personal Message */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-dreamy border border-rose-gold/20"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <p className="font-caveat text-signature text-blush-pink mb-2">
            Just for you 💕
          </p>
          <p className="font-inter text-gray-700">
            Every page, every memory, every quest has been crafted with love. 
            This is our story, beautifully preserved in pixels and passion.
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          className="mt-8 bg-gradient-romance hover:shadow-heart-glow px-8 py-3 rounded-full font-caveat text-signature text-white shadow-lg transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Our Journey ✨
        </motion.button>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 text-4xl opacity-20"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        🌹
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-8 text-3xl opacity-20"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        🦋
      </motion.div>
    </div>
  )
}