import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FloatingElements from '@/components/FloatingElements';
import { Star, Sparkles, Heart, Crown, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Keepsake {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  questSource?: string;
}

const keepsakes: Keepsake[] = [
  {
    id: '1',
    name: 'Vintage Photo Frame',
    description: 'A delicate frame that holds our most precious moments, adorned with tiny hearts.',
    rarity: 'common',
    icon: '🖼️',
    isUnlocked: true,
    unlockedDate: 'March 15, 2024',
    questSource: 'First Date Recreation'
  },
  {
    id: '2',
    name: 'Golden Pen Keepsake',
    description: 'The pen that wrote a thousand love notes, now permanently inked with our story.',
    rarity: 'rare',
    icon: '🖋️',
    isUnlocked: true,
    unlockedDate: 'April 10, 2024',
    questSource: 'Love Letter Collection'
  },
  {
    id: '3',
    name: 'Moonbeam Jar',
    description: 'Captured light from our first stargazing night, glowing with endless possibilities.',
    rarity: 'epic',
    icon: '🌙',
    isUnlocked: false
  },
  {
    id: '4',
    name: 'Enchanted Map Fragment',
    description: 'A piece of the magical map showing all the places where love bloomed.',
    rarity: 'rare',
    icon: '🗺️',
    isUnlocked: false
  },
  {
    id: '5',
    name: 'Crystal Heart',
    description: 'A translucent heart that reflects all the colors of our love.',
    rarity: 'epic',
    icon: '💎',
    isUnlocked: false
  },
  {
    id: '6',
    name: 'Legendary Music Box',
    description: 'Plays our song on repeat, each note containing a memory of dancing together.',
    rarity: 'legendary',
    icon: '🎵',
    isUnlocked: false
  },
  {
    id: '7',
    name: 'Love Compass',
    description: 'No matter where we go, it always points to each other.',
    rarity: 'epic',
    icon: '🧭',
    isUnlocked: false
  },
  {
    id: '8',
    name: 'Infinity Rose',
    description: 'A rose that never wilts, just like our love.',
    rarity: 'legendary',
    icon: '🌹',
    isUnlocked: false
  }
];

const rarityConfig = {
  common: {
    color: 'from-gray-300 to-gray-400',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-600',
    glow: 'shadow-gray-300/50',
    badge: '🥉'
  },
  rare: {
    color: 'from-blue-300 to-blue-500',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-600',
    glow: 'shadow-blue-400/50',
    badge: '💙'
  },
  epic: {
    color: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-700',
    glow: 'shadow-purple-500/50',
    badge: '💜'
  },
  legendary: {
    color: 'from-yellow-400 via-yellow-500 to-orange-500',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
    glow: 'shadow-yellow-500/50',
    badge: '👑'
  }
};

interface KeepsakeCardProps {
  keepsake: Keepsake;
  index: number;
  onReveal: (id: string) => void;
}

function KeepsakeCard({ keepsake, index, onReveal }: KeepsakeCardProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const config = rarityConfig[keepsake.rarity];
  const { toast } = useToast();

  const handleReveal = () => {
    if (!keepsake.isUnlocked && !isRevealing) {
      setIsRevealing(true);
      setTimeout(() => {
        onReveal(keepsake.id);
        setIsRevealing(false);
        toast({
          title: "Keepsake Unlocked! 🎁",
          description: `You've discovered the ${keepsake.name}!`
        });
      }, 2000);
    }
  };

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
      className="relative"
    >
      <motion.div
        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
          keepsake.isUnlocked
            ? `bg-gradient-to-br ${config.color} ${config.borderColor} ${config.glow} shadow-lg`
            : 'bg-white/60 border-gray-300 opacity-75 hover:opacity-90'
        }`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={keepsake.isUnlocked ? { 
          scale: 1.05, 
          y: -5,
          rotate: Math.random() > 0.5 ? 1 : -1
        } : { scale: 1.02 }}
        onClick={handleReveal}
        animate={keepsake.isUnlocked ? {
          boxShadow: [
            `0 0 20px ${config.glow}`,
            `0 0 40px ${config.glow}`,
            `0 0 20px ${config.glow}`
          ]
        } : {}}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Rarity badge */}
        <motion.div
          className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        >
          <span className="text-sm">{config.badge}</span>
        </motion.div>

        {/* Locked overlay */}
        {!keepsake.isUnlocked && !isRevealing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="font-caveat text-sm text-gray-500">Locked</p>
            </motion.div>
          </motion.div>
        )}

        {/* Reveal animation overlay */}
        {isRevealing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400/90 to-orange-500/90 rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <motion.div
              className="text-center text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 1, repeat: 2 }}
              >
                🎁
              </motion.div>
              <p className="font-dancing text-xl">Keepsake Unlocked!</p>
              <div className="mt-2">
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-yellow-200 text-lg"
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: -20, 
                      rotate: 360 * Math.random(),
                      x: (Math.random() - 0.5) * 40
                    }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Keepsake content */}
        <div className={keepsake.isUnlocked ? '' : 'blur-sm'}>
          {/* Icon */}
          <motion.div
            className="text-4xl mb-4 text-center"
            animate={isHovered && keepsake.isUnlocked ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {keepsake.icon}
          </motion.div>

          {/* Content */}
          <div>
            <h3 className={`font-playfair text-lg font-medium mb-2 ${
              keepsake.isUnlocked ? config.textColor : 'text-gray-600'
            }`}>
              {keepsake.name}
            </h3>
            
            <p className="font-inter text-sm text-gray-700 mb-4 line-clamp-3">
              {keepsake.description}
            </p>

            {/* Metadata */}
            {keepsake.isUnlocked && (
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {keepsake.unlockedDate && (
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Star size={12} />
                    <span>Unlocked {keepsake.unlockedDate}</span>
                  </div>
                )}
                {keepsake.questSource && (
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Crown size={12} />
                    <span>From: {keepsake.questSource}</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Sparkle effects for unlocked items */}
        {keepsake.isUnlocked && (
          <>
            <motion.div
              className="absolute top-2 left-2 text-yellow-300 text-xs"
              animate={{ 
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute bottom-2 right-2 text-yellow-300 text-xs"
              animate={{ 
                scale: [0, 1, 0],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2 + 1
              }}
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export const Keepsakes = () => {
  const [keepsakeList, setKeepsakeList] = useState(keepsakes);

  const handleReveal = (id: string) => {
    setKeepsakeList(prev => prev.map(keepsake => 
      keepsake.id === id 
        ? { 
            ...keepsake, 
            isUnlocked: true,
            unlockedDate: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        : keepsake
    ));
  };

  const unlockedCount = keepsakeList.filter(k => k.isUnlocked).length;
  const totalCount = keepsakeList.length;
  const rarityCount = keepsakeList.reduce((acc, keepsake) => {
    if (keepsake.isUnlocked) {
      acc[keepsake.rarity] = (acc[keepsake.rarity] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen pt-8 pb-24 px-4 relative overflow-hidden">
      <FloatingElements />
      
      {/* Floating treasures */}
      <motion.div
        className="absolute top-16 right-8 text-3xl opacity-30 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
      >
        💎
      </motion.div>

      <motion.div
        className="absolute top-32 left-12 text-2xl opacity-40 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        style={{ animationDelay: '2s' }}
      >
        👑
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-playfair text-5xl md:text-6xl text-primary mb-4">
          Keepsake Chest
        </h1>
        <p className="font-caveat text-2xl text-secondary max-w-md mx-auto mb-6">
          Treasures from our adventures in love 💎✨
        </p>

        {/* Progress and stats */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-lg border border-primary/20 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="font-playfair text-2xl text-primary">{unlockedCount}/{totalCount}</div>
              <div className="font-caveat text-sm text-secondary">Unlocked</div>
            </div>
            <div>
              <div className="font-playfair text-xl text-gray-600">{rarityCount.common || 0}</div>
              <div className="font-caveat text-xs text-gray-500">🥉 Common</div>
            </div>
            <div>
              <div className="font-playfair text-xl text-blue-600">{rarityCount.rare || 0}</div>
              <div className="font-caveat text-xs text-blue-500">💙 Rare</div>
            </div>
            <div>
              <div className="font-playfair text-xl text-purple-600">{rarityCount.epic || 0}</div>
              <div className="font-caveat text-xs text-purple-500">💜 Epic</div>
            </div>
            <div>
              <div className="font-playfair text-xl text-yellow-600">{rarityCount.legendary || 0}</div>
              <div className="font-caveat text-xs text-yellow-500">👑 Legendary</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caveat text-sm text-primary">Collection Progress</span>
              <span className="font-inter text-xs text-gray-600">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="bg-background rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-romance"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Keepsakes Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {keepsakeList.map((keepsake, index) => (
            <KeepsakeCard
              key={keepsake.id}
              keepsake={keepsake}
              index={index}
              onReveal={handleReveal}
            />
          ))}
        </div>
      </div>

      {/* Collection milestone */}
      {unlockedCount === totalCount && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md mx-auto shadow-lg text-white">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <h3 className="font-dancing text-2xl mb-2">Master Collector!</h3>
            <p className="font-caveat text-lg">
              You've unlocked every treasure in our love story! 💕
            </p>
          </div>
        </motion.div>
      )}

      {/* Encouragement message */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="bg-gradient-enchanted rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-muted/30">
          <p className="font-caveat text-xl text-primary mb-2">
            Keep adventuring, my love...
          </p>
          <p className="font-inter text-sm text-gray-700">
            Every quest completed unlocks new treasures. Each keepsake holds a piece of our story. 💖
          </p>
        </div>
      </motion.div>
    </div>
  );
};