/**
 * ProloguePage Component
 * Self-contained landing experience without navigation bar
 * Act I of the two-act structure
 */

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { standardAnimations } from '@/utils/animations';
import { LivingBackground } from './LivingBackground';
import { MemoryMotesSystem } from './MemoryMotesSystem';
import { useMouseParallax } from '@/hooks/useMouseParallax';

interface ProloguePageProps {
  onBeginJourney: () => void;
}

export const ProloguePage: React.FC<ProloguePageProps> = ({ onBeginJourney }) => {
  const mousePosition = useMouseParallax(true);

  return (
    <motion.div 
      className="min-h-screen w-full relative overflow-hidden"
      variants={standardAnimations.pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Living Watercolor Background */}
      <LivingBackground 
        mousePosition={mousePosition}
        animationIntensity="normal"
      />
      
      {/* Ethereal Memory Motes */}
      <MemoryMotesSystem density={4} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          variants={standardAnimations.staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          {/* Main Greeting */}
          <motion.h1 
            variants={standardAnimations.staggerChild}
            className="font-dancing text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight"
          >
            Welcome to
            <span className="block text-primary mt-2">LoveQuest</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={standardAnimations.staggerChild}
            className="font-caveat text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            A romantic digital experience showcasing modern web development 💕
          </motion.p>

          {/* Decorative Elements */}
          <motion.div 
            variants={standardAnimations.staggerChild}
            className="flex items-center justify-center gap-4 mb-12 text-2xl opacity-60"
          >
            <span className="text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🌿</span>
            <span className="text-2xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '1.5s' }}>🦋</span>
            <span className="text-2xl animate-sparkle" style={{ animationDelay: '2s' }}>💐</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '2.5s' }}>🌸</span>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={standardAnimations.staggerChild}
            className="space-y-4"
          >
            <motion.div
              variants={standardAnimations.gentleHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                onClick={onBeginJourney}
                size="lg"
                className="font-playfair text-lg px-8 py-6 bg-gradient-romance hover:scale-105 transition-transform duration-300 dreamy-shadow"
              >
                Begin Our Journey
              </Button>
            </motion.div>
            
            <motion.p 
              variants={standardAnimations.staggerChild}
              className="font-caveat text-lg text-muted-foreground"
            >
              Experience the magic 💕
            </motion.p>
          </motion.div>

          {/* Signature */}
          <motion.div 
            variants={standardAnimations.staggerChild}
            className="mt-16"
          >
            <p className="font-caveat text-xl text-dusty-lavender">
              Built with React, TypeScript, and performance optimization
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float opacity-40">
        <div className="text-3xl">🌹</div>
      </div>
    </motion.div>
  );
};