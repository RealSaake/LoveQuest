import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import FloatingElements from '@/components/FloatingElements';
import { Heart, Calendar, Music } from 'lucide-react';

interface Memory {
  id: string;
  image: string;
  title: string;
  date: string;
  note: string;
  favorites: number;
  isFavorited: boolean;
  hasMusic?: boolean;
  category: 'date' | 'adventure' | 'everyday' | 'special';
}

const memories: Memory[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
    title: 'Morning Coffee Ritual',
    date: 'March 15, 2024',
    note: 'Your sleepy smile before the first sip ☕',
    favorites: 12,
    isFavorited: true,
    category: 'everyday'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
    title: 'Picnic in the Park',
    date: 'April 2, 2024',
    note: 'Strawberries and stolen kisses 🍓',
    favorites: 8,
    isFavorited: false,
    hasMusic: true,
    category: 'date'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    title: 'Sunset on the Beach',
    date: 'May 20, 2024',
    note: 'The sky was jealous of your beauty that night',
    favorites: 15,
    isFavorited: true,
    category: 'special'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=550&fit=crop',
    title: 'Bookstore Adventures',
    date: 'June 8, 2024',
    note: 'Getting lost in stories and each other 📚',
    favorites: 6,
    isFavorited: false,
    category: 'adventure'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&h=450&fit=crop',
    title: 'Dancing in the Rain',
    date: 'July 14, 2024',
    note: 'Puddles make the best dance floors 💃',
    favorites: 20,
    isFavorited: true,
    hasMusic: true,
    category: 'special'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=350&fit=crop',
    title: 'Cooking Disaster',
    date: 'August 3, 2024',
    note: 'Burned dinner, perfect night anyway 👨‍🍳',
    favorites: 11,
    isFavorited: false,
    category: 'everyday'
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
    title: 'Under the Stars',
    date: 'August 15, 2024',
    note: 'Making wishes on satellites ⭐',
    favorites: 18,
    isFavorited: true,
    category: 'date'
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    title: 'Sunday Market',
    date: 'September 1, 2024',
    note: 'Fresh flowers for my favorite person 🌻',
    favorites: 9,
    isFavorited: false,
    category: 'adventure'
  }
];

const categoryColors = {
  date: 'from-primary to-secondary',
  adventure: 'from-muted to-secondary',
  everyday: 'from-secondary to-accent',
  special: 'from-primary to-accent'
};

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onToggleFavorite: (id: string) => void;
}

function MemoryCard({ memory, index, onToggleFavorite }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="break-inside-avoid mb-6"
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-primary/20 cursor-pointer group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02, 
          y: -5,
          rotate: Math.random() > 0.5 ? 0.5 : -0.5
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={memory.image}
            alt={memory.title}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          <motion.div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[memory.category]} text-white text-xs font-caveat opacity-0 group-hover:opacity-100`}
            initial={{ x: -20, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {memory.category}
          </motion.div>

          {/* Music indicator */}
          {memory.hasMusic && (
            <motion.div
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, rotate: -180 }}
              animate={isHovered ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Music size={14} className="text-primary" />
            </motion.div>
          )}

          {/* Hover overlay with note */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100"
            initial={{ y: 20 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-caveat text-lg mb-1">
              {memory.note}
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <Calendar size={12} />
              <span>{memory.date}</span>
            </div>
          </motion.div>
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="font-playfair text-lg font-medium text-primary mb-2">
            {memory.title}
          </h3>
          
          <div className="flex items-center justify-between">
            {/* Favorites */}
            <motion.button
              className="flex items-center space-x-2 group/heart"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(memory.id);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={memory.isFavorited ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  size={16} 
                  className={`transition-colors duration-200 ${
                    memory.isFavorited 
                      ? 'text-primary fill-primary' 
                      : 'text-gray-400 group-hover/heart:text-primary'
                  }`}
                />
              </motion.div>
              <span className="text-sm text-gray-600 font-caveat">
                {memory.favorites}
              </span>
            </motion.button>

            {/* Date */}
            <span className="text-xs text-gray-500 font-inter">
              {memory.date}
            </span>
          </div>
        </div>

        {/* Sparkle on favorite */}
        {memory.isFavorited && (
          <motion.div
            className="absolute -top-1 -right-1 text-primary text-sm"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export const Memories = () => {
  const [memoryList, setMemoryList] = useState(memories);
  const [filter, setFilter] = useState<string>('all');

  const handleToggleFavorite = (id: string) => {
    setMemoryList(prev => prev.map(memory => 
      memory.id === id 
        ? { 
            ...memory, 
            isFavorited: !memory.isFavorited,
            favorites: memory.isFavorited ? memory.favorites - 1 : memory.favorites + 1
          }
        : memory
    ));
  };

  const filteredMemories = filter === 'all' 
    ? memoryList 
    : memoryList.filter(memory => memory.category === filter);

  const favoriteCount = memoryList.filter(m => m.isFavorited).length;

  return (
    <div className="min-h-screen pt-8 pb-24 px-4 relative overflow-hidden">
      <FloatingElements />
      
      {/* Floating decorations */}
      <motion.div
        className="absolute top-20 right-12 text-2xl opacity-40 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
      >
        📸
      </motion.div>

      <motion.div
        className="absolute top-40 left-8 text-xl opacity-30 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        style={{ animationDelay: '2s' }}
      >
        💝
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-playfair text-5xl md:text-6xl text-primary mb-4">
          Memory Vault
        </h1>
        <p className="font-caveat text-2xl text-secondary max-w-md mx-auto mb-6">
          Every snapshot of our love story 📷✨
        </p>

        {/* Stats */}
        <motion.div
          className="flex justify-center space-x-6 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="text-center">
            <div className="font-playfair text-2xl text-primary">{memoryList.length}</div>
            <div className="font-caveat text-sm text-secondary">Memories</div>
          </div>
          <div className="text-center">
            <div className="font-playfair text-2xl text-secondary">{favoriteCount}</div>
            <div className="font-caveat text-sm text-secondary">Favorites</div>
          </div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {['all', 'date', 'adventure', 'everyday', 'special'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full font-caveat text-sm transition-all duration-200 ${
                filter === category
                  ? 'bg-gradient-romance text-white shadow-lg'
                  : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-primary/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Masonry Gallery */}
      <div className="max-w-6xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {filteredMemories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={index}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filteredMemories.length === 0 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl mb-4 opacity-50">📷</div>
          <p className="font-caveat text-2xl text-secondary">
            No memories in this category yet...
          </p>
        </motion.div>
      )}

      {/* Call to action */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-gradient-enchanted rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-muted/30">
          <p className="font-caveat text-xl text-primary mb-2">
            Keep capturing moments...
          </p>
          <p className="font-inter text-sm text-gray-700">
            Every photo tells our story. Every memory is a treasure worth keeping. 💕
          </p>
        </div>
      </motion.div>
    </div>
  );
};