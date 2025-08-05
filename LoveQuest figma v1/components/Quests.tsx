'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Lock, Star, Heart, Trophy, Sparkles } from 'lucide-react'

interface Quest {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  status: 'locked' | 'available' | 'completed'
  reward: string
  icon: string
  completedMessage?: string
}

const quests: Quest[] = [
  {
    id: '1',
    title: 'First Date Recreation',
    description: 'Recreate our magical first date, down to the last detail',
    difficulty: 'easy',
    status: 'completed',
    reward: 'Vintage Photo Frame',
    icon: '☕',
    completedMessage: 'You remembered everything perfectly! Even the weird music they were playing.'
  },
  {
    id: '2',
    title: 'Love Letter Collection',
    description: 'Write 30 tiny love notes and hide them in unexpected places',
    difficulty: 'medium',
    status: 'completed',
    reward: 'Golden Pen Keepsake',
    icon: '💌',
    completedMessage: 'Found in my coffee mug, book pages, jacket pockets... you\'re amazing!'
  },
  {
    id: '3',
    title: 'Memory Scavenger Hunt',
    description: 'Visit 10 places that hold special meaning for us',
    difficulty: 'medium',
    status: 'available',
    reward: 'Enchanted Map Fragment',
    icon: '🗺️'
  },
  {
    id: '4',
    title: 'Surprise Adventure',
    description: 'Plan a completely surprise day adventure',
    difficulty: 'hard',
    status: 'available',
    reward: 'Adventure Badge',
    icon: '🎒'
  },
  {
    id: '5',
    title: 'Time Capsule Creation',
    description: 'Create a physical time capsule with meaningful items',
    difficulty: 'hard',
    status: 'locked',
    reward: 'Crystal Heart',
    icon: '📦'
  },
  {
    id: '6',
    title: 'Love Song Composition',
    description: 'Write and record a song about our love story',
    difficulty: 'legendary',
    status: 'locked',
    reward: 'Legendary Music Box',
    icon: '🎵'
  }
]

const difficultyColors = {
  easy: 'from-mint-mist to-honey-amber',
  medium: 'from-peach-puff to-rose-gold',
  hard: 'from-lavender-haze to-blush-pink',
  legendary: 'from-rose-gold via-blush-pink to-lavender-haze'
}

const difficultyBadges = {
  easy: '🌟',
  medium: '⭐',
  hard: '💫',
  legendary: '✨'
}

interface QuestCardProps {
  quest: Quest
  index: number
  onComplete: (questId: string) => void
}

function QuestCard({ quest, index, onComplete }: QuestCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const handleComplete = () => {
    if (quest.status === 'available') {
      setShowCompletion(true)
      setTimeout(() => {
        onComplete(quest.id)
        setShowCompletion(false)
      }, 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="relative"
    >
      <motion.div
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
          quest.status === 'locked' 
            ? 'opacity-60 blur-sm border-gray-300 bg-gray-100/50' 
            : quest.status === 'completed'
            ? 'border-blush-pink/40 bg-gradient-to-br from-white/90 to-blush-pink/20 shadow-heart-glow'
            : 'border-rose-gold/30 bg-white/80 hover:shadow-dreamy hover:border-blush-pink/50'
        }`}
        animate={{
          scale: quest.status === 'available' && !showCompletion ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 4,
          repeat: quest.status === 'available' ? Infinity : 0,
          ease: "easeInOut"
        }}
        whileHover={quest.status !== 'locked' ? { 
          scale: 1.05, 
          y: -5,
          rotate: Math.random() > 0.5 ? 1 : -1
        } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleComplete}
      >
        {/* Difficulty Badge */}
        <motion.div
          className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r ${difficultyColors[quest.difficulty]} flex items-center justify-center shadow-lg`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        >
          <span className="text-sm">{difficultyBadges[quest.difficulty]}</span>
        </motion.div>

        {/* Lock overlay for locked quests */}
        {quest.status === 'locked' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lock size={32} className="text-gray-400" />
          </motion.div>
        )}

        {/* Completion animation overlay */}
        {showCompletion && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-romance/90 rounded-2xl"
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
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                🎉
              </motion.div>
              <p className="font-dancing text-xl">Quest Complete!</p>
              <div className="mt-2">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-yellow-300 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quest Icon */}
        <motion.div
          className="text-4xl mb-4"
          animate={isHovered && quest.status !== 'locked' ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {quest.icon}
        </motion.div>

        {/* Quest Content */}
        <div>
          <h3 className="font-playfair text-xl font-medium text-blush-pink mb-2">
            {quest.title}
          </h3>
          
          <p className="font-inter text-sm text-gray-700 mb-4 line-clamp-3">
            {quest.status === 'completed' && quest.completedMessage 
              ? quest.completedMessage 
              : quest.description
            }
          </p>

          {/* Reward */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy size={16} className="text-honey-amber" />
              <span className="font-caveat text-signature text-peach-puff">
                {quest.reward}
              </span>
            </div>

            {/* Status indicator */}
            <div className="flex items-center space-x-1">
              {quest.status === 'completed' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-blush-pink"
                >
                  <Heart size={16} fill="currentColor" />
                </motion.div>
              )}
              {quest.status === 'available' && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-mint-mist"
                >
                  <Sparkles size={16} />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        {isHovered && quest.status !== 'locked' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blush-pink/10 to-rose-gold/10 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Quests() {
  const [questList, setQuestList] = useState(quests)

  const handleQuestComplete = (questId: string) => {
    setQuestList(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, status: 'completed' as const }
        : quest
    ))
  }

  const completedCount = questList.filter(q => q.status === 'completed').length
  const totalCount = questList.length

  return (
    <div className="min-h-screen pt-8 pb-24 px-4 relative overflow-hidden">
      {/* Floating decorations */}
      <motion.div
        className="absolute top-16 right-8 text-3xl opacity-30 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
      >
        🏆
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-playfair text-hero text-blush-pink mb-4">
          Love Quests
        </h1>
        <p className="font-caveat text-signature text-peach-puff max-w-md mx-auto mb-6">
          Adventures in love, one quest at a time ✨
        </p>

        {/* Progress indicator */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-full p-4 max-w-sm mx-auto shadow-lg border border-rose-gold/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="flex items-center justify-center space-x-3">
            <span className="font-caveat text-signature text-blush-pink">
              Progress:
            </span>
            <div className="flex-1 bg-ivory-paper rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-romance"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
            <span className="font-inter text-sm text-blush-pink font-medium">
              {completedCount}/{totalCount}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Quests Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {questList.map((quest, index) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={index}
              onComplete={handleQuestComplete}
            />
          ))}
        </div>
      </div>

      {/* Motivational message */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: questList.length * 0.15 + 0.5 }}
      >
        <div className="bg-gradient-enchanted rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-mint-mist/30">
          <p className="font-caveat text-signature text-blush-pink mb-2">
            Remember, my love...
          </p>
          <p className="font-inter text-sm text-gray-700">
            Every quest completed is another memory we create together. 
            The real treasure isn't the reward—it's the journey we share. 💕
          </p>
        </div>
      </motion.div>
    </div>
  )
}