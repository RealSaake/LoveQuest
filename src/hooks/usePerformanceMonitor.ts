/**
 * Performance Monitoring Hook
 * Ensures 60fps compliance and adaptive quality management
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface PerformanceMetrics {
  fps: number;
  frameDrops: number;
  memoryUsage: number;
  animationLoad: number;
  adaptiveQuality: 'high' | 'medium' | 'low';
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameDrops: 0,
    memoryUsage: 0,
    animationLoad: 0,
    adaptiveQuality: 'high'
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();

  const measurePerformance = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    
    if (delta >= 1000) { // Update every second
      const fps = Math.round((frameCountRef.current * 1000) / delta);
      const frameDrops = Math.max(0, 60 - fps);
      
      // Get memory usage if available
      const memoryUsage = (performance as any).memory 
        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        : 0;

      // Determine adaptive quality based on performance
      let adaptiveQuality: 'high' | 'medium' | 'low' = 'high';
      if (fps < 45 || memoryUsage > 150) {
        adaptiveQuality = 'low';
      } else if (fps < 55 || memoryUsage > 100) {
        adaptiveQuality = 'medium';
      }

      setMetrics(prev => ({
        ...prev,
        fps,
        frameDrops,
        memoryUsage,
        adaptiveQuality
      }));

      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    frameCountRef.current++;
    animationFrameRef.current = requestAnimationFrame(measurePerformance);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [measurePerformance]);

  const shouldReduceQuality = useCallback(() => {
    return metrics.fps < 55 || metrics.memoryUsage > 100;
  }, [metrics.fps, metrics.memoryUsage]);

  const getOptimalSettings = useCallback(() => {
    switch (metrics.adaptiveQuality) {
      case 'low':
        return {
          memoryMoteCount: 3,
          enableParallax: false,
          enableGradientAnimation: false,
          animationComplexity: 'minimal' as const
        };
      case 'medium':
        return {
          memoryMoteCount: 6,
          enableParallax: true,
          enableGradientAnimation: true,
          animationComplexity: 'reduced' as const
        };
      default:
        return {
          memoryMoteCount: 12,
          enableParallax: true,
          enableGradientAnimation: true,
          animationComplexity: 'full' as const
        };
    }
  }, [metrics.adaptiveQuality]);

  return {
    metrics,
    shouldReduceQuality,
    getOptimalSettings,
    isPerformanceGood: metrics.fps >= 55 && metrics.memoryUsage <= 100
  };
};