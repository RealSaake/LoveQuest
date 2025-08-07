/**
 * AestheticStatus Component
 * Shows the current status of the aesthetic revolution
 * Only visible in development mode
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { performanceLogger } from '@/utils/performanceLogger';
import { performanceOptimizer } from '@/utils/performanceOptimizer';

export const AestheticStatus: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  const [alerts, setAlerts] = useState(0);
  const [quality, setQuality] = useState('high');

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(performanceLogger.getCurrentFPS());
      setMemory(performanceLogger.getCurrentMemory());
      setAlerts(performanceLogger.getAlerts().length);
      setQuality(performanceOptimizer.getSettings().animationQuality);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const getStatusColor = () => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 45) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getQualityEmoji = () => {
    switch (quality) {
      case 'high': return '🌟';
      case 'medium': return '⚡';
      case 'low': return '🔋';
      default: return '❓';
    }
  };

  return (
    <motion.div
      className="fixed top-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs z-50 font-mono"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="text-center mb-2 text-primary font-bold">
        🎨 Aesthetic Revolution
      </div>
      
      <div className="space-y-1">
        <div className={`flex justify-between ${getStatusColor()}`}>
          <span>FPS:</span>
          <span className="font-bold">{fps}</span>
        </div>
        
        <div className="flex justify-between text-blue-400">
          <span>Memory:</span>
          <span>{memory}MB</span>
        </div>
        
        <div className="flex justify-between text-purple-400">
          <span>Quality:</span>
          <span>{getQualityEmoji()} {quality}</span>
        </div>
        
        <div className="flex justify-between text-orange-400">
          <span>Alerts:</span>
          <span>{alerts}</span>
        </div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="text-center text-xs text-gray-400">
            {fps >= 55 ? '🚀 Excellent' : 
             fps >= 45 ? '✅ Good' : 
             fps >= 30 ? '⚠️ Fair' : '🚨 Poor'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};