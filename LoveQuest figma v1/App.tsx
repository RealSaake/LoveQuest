'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Timeline from './components/Timeline'
import Quests from './components/Quests'
import Memories from './components/Memories'
import Keepsakes from './components/Keepsakes'

type Page = 'landing' | 'home' | 'timeline' | 'quests' | 'memories' | 'keepsakes'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    if (currentPage === 'landing') {
      // Show navigation after landing animations complete
      const timer = setTimeout(() => {
        setShowNav(true)
      }, 4000)
      return () => clearTimeout(timer)
    } else {
      setShowNav(true)
    }
  }, [currentPage])

  const handlePageChange = (page: string) => {
    if (page === 'home') {
      setCurrentPage('landing')
    } else {
      setCurrentPage(page as Page)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing />
      case 'timeline':
        return <Timeline />
      case 'quests':
        return <Quests />
      case 'memories':
        return <Memories />
      case 'keepsakes':
        return <Keepsakes />
      default:
        return <Landing />
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <AnimatePresence>
        {showNav && (
          <Navigation
            currentPage={currentPage === 'landing' ? 'home' : currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </AnimatePresence>

      {/* Click to continue from landing */}
      {currentPage === 'landing' && (
        <motion.button
          className="fixed inset-0 z-0 cursor-pointer bg-transparent"
          onClick={() => setCurrentPage('timeline')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
        />
      )}

      {/* Ambient floating elements throughout the app */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gentle sparkles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blush-pink rounded-full opacity-30"
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
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-lavender-haze rounded-full opacity-40"
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
          className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-peach-puff rounded-full opacity-25"
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
          className="absolute top-1/3 right-1/5 text-blush-pink text-sm opacity-20"
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
          className="absolute bottom-1/3 left-1/5 text-rose-gold text-xs opacity-15"
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
    </div>
  )
}