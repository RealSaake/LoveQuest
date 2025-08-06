import { useState } from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, TreePine, Target, Camera, Gift } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'timeline', icon: TreePine, label: 'Timeline', path: '/timeline' },
  { id: 'quests', icon: Target, label: 'Quests', path: '/quests' },
  { id: 'memories', icon: Camera, label: 'Memories', path: '/memories' },
  { id: 'keepsakes', icon: Gift, label: 'Keepsakes', path: '/keepsakes' },
];

export default function Navigation({ className = "" }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.slice(1); // Remove leading slash
  };

  const currentPage = getCurrentPage();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-2 md:py-3 ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(251, 207, 205, 0.3) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid hsl(345, 65%, 86%, 0.3)',
      }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto relative">
        {/* Active tab background */}
        <motion.div
          className="absolute bg-gradient-romance rounded-xl opacity-20 h-12 w-12"
          animate={{
            x: navItems.findIndex(item => item.id === currentPage) * (100 / navItems.length) + '%',
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          style={{
            left: `${(navItems.findIndex(item => item.id === currentPage) / navItems.length) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              {/* Hover background */}
              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              <motion.div
                animate={isActive ? { y: -2 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-10 flex flex-col items-center"
              >
                <Icon 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-gray-500'
                  }`}
                />
                
                {/* Label appears on active */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-xs font-caveat mt-1 text-primary"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
              
              {/* Floating heart on active */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                  }}
                  exit={{ opacity: 0, y: -20, scale: 0 }}
                  className="absolute -top-2 -right-1 text-primary text-xs"
                  style={{
                    animation: 'heartBeat 1.5s ease-in-out infinite'
                  }}
                >
                  💕
                </motion.div>
              )}

              {/* Sparkle effect on hover */}
              {isHovered && (
                <motion.div
                  className="absolute -top-1 -left-1 text-primary text-xs"
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              )}
            </motion.button>
          );
        })}

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-8 left-1/4 text-primary text-xs opacity-30"
          animate={{ 
            y: [-5, 5, -5],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌸
        </motion.div>

        <motion.div
          className="absolute -top-6 right-1/4 text-secondary text-xs opacity-20"
          animate={{ 
            y: [5, -5, 5],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🦋
        </motion.div>
      </div>

      {/* Bottom glow effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-romance opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(345, 65%, 86%) 50%, transparent 100%)'
        }}
      />
    </motion.nav>
  );
}