import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import FloatingElements from '@/components/FloatingElements';

interface TimelineMemory {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  isSpecial?: boolean;
  emotion: string;
}

const memories: TimelineMemory[] = [
  {
    id: '1',
    title: 'First Coffee Together',
    date: 'March 15, 2024',
    description: 'The morning you said you loved my sleepy hair and terrible jokes. That little café with the crooked tables became our place.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    isSpecial: true,
    emotion: '☕'
  },
  {
    id: '2',
    title: 'Rainy Day Adventures',
    date: 'April 2, 2024',
    description: 'Dancing in puddles like kids. You said rain was just the sky being romantic, and I believed you.',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&h=300&fit=crop',
    emotion: '🌧️'
  },
  {
    id: '3',
    title: 'Sunset Picnic',
    date: 'May 20, 2024',
    description: 'Strawberries, terrible sandwiches, and your laugh that made the sunset jealous.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    isSpecial: true,
    emotion: '🌅'
  },
  {
    id: '4',
    title: 'Bookstore Wandering',
    date: 'June 8, 2024',
    description: 'Getting lost in stories and stolen glances between the shelves. You picked the perfect book for me.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    emotion: '📚'
  },
  {
    id: '5',
    title: 'Star Gazing Night',
    date: 'July 14, 2024',
    description: 'Making wishes on satellites and falling stars. Mostly just falling for you over and over again.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
    isSpecial: true,
    emotion: '⭐'
  }
];

interface MemoryCardProps {
  memory: TimelineMemory;
  index: number;
  isLeft: boolean;
}

function MemoryCard({ memory, index, isLeft }: MemoryCardProps) {
  const rotationClass = isLeft ? 'rotate-1' : '-rotate-1';
  const hoverRotation = isLeft ? '-rotate-1' : 'rotate-1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      className={`relative ${isLeft ? 'mr-8 md:mr-16 lg:mr-24' : 'ml-8 md:ml-16 lg:ml-24'} mb-16`}
    >
      {/* Connection line to vine */}
      <div
        className={`absolute top-1/2 w-8 md:w-16 lg:w-24 h-0.5 bg-gradient-to-r from-muted to-primary ${
          isLeft ? '-right-8 md:-right-16 lg:-right-24' : '-left-8 md:-left-16 lg:-left-24'
        }`}
      />
      
      {/* Memory Card */}
      <motion.div
        className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/20 max-w-sm ${rotationClass} transition-all duration-300 hover:shadow-lg hover:${hoverRotation} hover:scale-105 cursor-pointer`}
        whileHover={{ 
          rotate: isLeft ? -1 : 1,
          scale: 1.05,
          y: -5
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: memory.isSpecial 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, hsl(345, 65%, 86%, 0.3) 100%)'
            : 'rgba(255,255,255,0.8)'
        }}
      >
        {/* Special badge */}
        {memory.isSpecial && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-romance rounded-full flex items-center justify-center text-white text-xs animate-sparkle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            ✨
          </motion.div>
        )}

        {/* Image */}
        <div className="relative mb-4 rounded-xl overflow-hidden">
          <ImageWithFallback
            src={memory.image}
            alt={memory.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Emotion overlay */}
          <div className="absolute top-3 left-3 text-2xl bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
            {memory.emotion}
          </div>
        </div>

        {/* Content */}
        <div>
          <motion.h3
            className="font-playfair text-lg font-medium text-primary mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {memory.title}
          </motion.h3>
          
          <motion.p
            className="font-caveat text-xl text-secondary mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {memory.date}
          </motion.p>
          
          <motion.p
            className="font-inter text-sm text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {memory.description}
          </motion.p>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 text-primary opacity-30 text-sm">
          💕
        </div>
      </motion.div>
    </motion.div>
  );
}

export const Timeline = () => {
  return (
    <div className="min-h-screen pt-8 pb-24 px-4 relative overflow-hidden">
      <FloatingElements />
      
      {/* Floating butterflies */}
      <motion.div
        className="absolute top-20 right-16 text-2xl opacity-60 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        🦋
      </motion.div>
      
      <motion.div
        className="absolute top-40 left-20 text-xl opacity-40 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        style={{ animationDelay: '2s' }}
      >
        🌸
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-playfair text-5xl md:text-6xl text-primary mb-4">
          Our Timeline
        </h1>
        <p className="font-caveat text-2xl text-secondary max-w-md mx-auto">
          Every moment captured, every memory treasured ✨
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vine */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-muted via-primary to-accent transform -translate-x-1/2"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Vine decorations */}
        <motion.div
          className="absolute left-1/2 top-20 text-2xl text-muted transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          🌿
        </motion.div>

        <motion.div
          className="absolute left-1/2 bottom-32 text-xl text-accent transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          🌺
        </motion.div>

        {/* Memory Cards */}
        <div className="relative">
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Timeline ending decoration */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: memories.length * 0.2 + 1 }}
        >
          <div className="font-caveat text-2xl text-primary">
            To be continued... 💕
          </div>
          <motion.div 
            className="mt-2 text-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ∞
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};