/**
 * Home Page - Main hub after the cinematic transition
 * The heart of the LoveQuest experience
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, Target, Camera, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { standardAnimations } from '@/utils/animations';
import { useLoveQuestStore } from '@/store/loveQuestStore';

export const Home = () => {
  const navigate = useNavigate();
  const { 
    getCompletedQuestsCount, 
    getUnlockedKeepsakesCount, 
    getFavoritedMemoriesCount,
    getEmotionalScore 
  } = useLoveQuestStore();

  const stats = {
    quests: getCompletedQuestsCount(),
    keepsakes: getUnlockedKeepsakesCount(),
    memories: getFavoritedMemoriesCount(),
    score: getEmotionalScore()
  };

  const quickActions = [
    {
      title: 'Our Timeline',
      description: 'Journey through our love story',
      icon: Calendar,
      color: 'bg-gradient-romance',
      path: '/timeline'
    },
    {
      title: 'Love Quests',
      description: 'Adventures waiting for us',
      icon: Target,
      color: 'bg-gradient-garden',
      path: '/quests'
    },
    {
      title: 'Memory Vault',
      description: 'Our precious moments',
      icon: Camera,
      color: 'bg-gradient-sunset',
      path: '/memories'
    },
    {
      title: 'Treasure Chest',
      description: 'Keepsakes we\'ve unlocked',
      icon: Gift,
      color: 'bg-gradient-enchanted',
      path: '/keepsakes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-enchanted p-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={standardAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Welcome Header */}
        <motion.div
          className="text-center mb-12"
          variants={standardAnimations.staggerChild}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <Heart className="text-primary w-8 h-8" />
            <Sparkles className="text-accent w-6 h-6" />
          </motion.div>
          
          <h1 className="font-dancing text-5xl md:text-6xl text-foreground mb-4">
            Welcome Home, Love
          </h1>
          
          <p className="font-caveat text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your digital sanctuary of memories, adventures, and endless affection 💕
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={standardAnimations.staggerChild}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center dreamy-shadow">
            <div className="text-2xl font-bold text-primary">{stats.quests}</div>
            <div className="text-sm font-caveat text-muted-foreground">Quests Complete</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center dreamy-shadow">
            <div className="text-2xl font-bold text-secondary">{stats.memories}</div>
            <div className="text-sm font-caveat text-muted-foreground">Favorite Memories</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center dreamy-shadow">
            <div className="text-2xl font-bold text-accent">{stats.keepsakes}</div>
            <div className="text-sm font-caveat text-muted-foreground">Treasures Found</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center dreamy-shadow">
            <div className="text-2xl font-bold text-rose-gold">{stats.score}%</div>
            <div className="text-sm font-caveat text-muted-foreground">Love Score</div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={standardAnimations.staggerChild}
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.title}
                variants={standardAnimations.gentleHover}
                whileHover="hover"
                whileTap="tap"
                className="cursor-pointer"
                onClick={() => navigate(action.path)}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 dreamy-shadow hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-playfair text-2xl text-foreground mb-3 text-center">
                    {action.title}
                  </h3>
                  
                  <p className="font-caveat text-lg text-muted-foreground text-center">
                    {action.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Daily Inspiration */}
        <motion.div
          className="mt-12 text-center"
          variants={standardAnimations.staggerChild}
        >
          <div className="bg-gradient-romance rounded-3xl p-8 text-white dreamy-shadow">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl mb-4 will-change-transform"
            >
              💕
            </motion.div>
            
            <h3 className="font-playfair text-2xl mb-3">
              Today's Love Note
            </h3>
            
            <p className="font-caveat text-xl opacity-90 max-w-2xl mx-auto">
              "Every moment with you is a treasure worth keeping, every adventure a story worth telling, 
              and every day a new page in our beautiful love story."
            </p>
          </div>
        </motion.div>

        {/* Optimized floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/15 text-xl will-change-transform"
              style={{
                left: `${25 + (i * 25)}%`,
                top: `${35 + (i * 15)}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut"
              }}
            >
              {['💕', '✨', '🌸'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};