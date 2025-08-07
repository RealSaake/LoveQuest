/**
 * Performance Utilities
 * Hardware acceleration and optimization helpers
 */

// Force hardware acceleration for elements
export const enableHardwareAcceleration = (element: HTMLElement) => {
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)';
};

// Disable hardware acceleration when not needed
export const disableHardwareAcceleration = (element: HTMLElement) => {
  element.style.willChange = 'auto';
  element.style.transform = '';
};

// Check if browser supports hardware acceleration
export const supportsHardwareAcceleration = (): boolean => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
};

// Throttle function for performance-sensitive operations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for expensive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance guard for animations
export const createPerformanceGuard = (threshold: number = 55) => {
  let frameCount = 0;
  let lastTime = performance.now();
  
  return {
    shouldContinue: (): boolean => {
      const now = performance.now();
      const delta = now - lastTime;
      
      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        frameCount = 0;
        lastTime = now;
        return fps >= threshold;
      }
      
      frameCount++;
      return true;
    }
  };
};