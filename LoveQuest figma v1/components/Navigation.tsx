'use client'

import { useState } from 'react'
import { Home, TreePine, Target, Camera, Gift } from 'lucide-react'
import { motion } from 'motion/react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'timeline', icon: TreePine, label: 'Timeline' },
  { id: 'quests', icon: Target, label: 'Quests' },
  { id: 'memories', icon: Camera, label: 'Memories' },
  { id: 'keepsakes', icon: Gift, label: 'Keepsakes' },
]

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-rose-gold/30 px-4 py-2 md:py-3"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(251, 207, 205, 0.3) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blush-pink/30 text-blush-pink shadow-heart-glow' 
                  : 'text-gray-500 hover:text-blush-pink'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-romance rounded-xl opacity-20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.div
                animate={isActive ? { y: -2 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-10"
              >
                <Icon 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-blush-pink' : 'text-gray-500'
                  }`}
                />
                
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs font-caveat mt-1 text-blush-pink"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
              
              {/* Floating heart on active */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-2 -right-1 text-blush-pink text-xs animate-heart-beat"
                >
                  💕
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}