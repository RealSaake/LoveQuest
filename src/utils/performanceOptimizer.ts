/**
 * Performance Optimizer
 * Automatically adjusts animation quality based on device performance
 */

interface PerformanceSettings {
  animationQuality: 'high' | 'medium' | 'low';
  particleCount: number;
  animationDuration: number;
  enableBlur: boolean;
  enableShadows: boolean;
}

class PerformanceOptimizer {
  private settings: PerformanceSettings = {
    animationQuality: 'high',
    particleCount: 6,
    animationDuration: 1,
    enableBlur: true,
    enableShadows: true
  };

  private fpsHistory: number[] = [];
  private lastOptimization = 0;

  constructor() {
    this.detectDeviceCapabilities();
  }

  private detectDeviceCapabilities() {
    // Check device memory
    const memory = (navigator as any).deviceMemory || 4;
    
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    
    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Adjust settings based on device
    if (isMobile || memory < 4 || cores < 4) {
      this.settings = {
        animationQuality: 'medium',
        particleCount: 3,
        animationDuration: 0.8,
        enableBlur: false,
        enableShadows: false
      };
    }

    console.log('🎯 Performance settings initialized:', this.settings);
  }

  updateFPS(fps: number) {
    this.fpsHistory.push(fps);
    
    // Emergency mode for critical FPS drops
    if (fps < 30) {
      this.emergencyMode();
    }
    
    // Keep only last 30 measurements
    if (this.fpsHistory.length > 30) {
      this.fpsHistory.shift();
    }

    // Only optimize every 1 second for very responsive adjustments
    const now = Date.now();
    if (now - this.lastOptimization < 1000) return;
    
    this.lastOptimization = now;
    this.optimizeBasedOnFPS();
  }

  private emergencyMode() {
    if (this.settings.animationQuality !== 'low') {
      this.settings = {
        animationQuality: 'low',
        particleCount: 0, // No particles at all
        animationDuration: 0.3,
        enableBlur: false,
        enableShadows: false
      };
      console.log('🚨 EMERGENCY MODE: All animations disabled due to critical FPS drop');
    }
  }

  private optimizeBasedOnFPS() {
    if (this.fpsHistory.length < 3) return;

    const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
    const currentQuality = this.settings.animationQuality;

    // Ultra aggressive optimization thresholds
    if (avgFPS < 50 && currentQuality !== 'low') {
      this.downgradeQuality();
      console.log('⚡ Performance downgraded to improve FPS (avg: ' + Math.round(avgFPS) + 'fps)');
    } else if (avgFPS > 58 && currentQuality !== 'high') {
      this.upgradeQuality();
      console.log('🚀 Performance upgraded due to good FPS (avg: ' + Math.round(avgFPS) + 'fps)');
    }
  }

  private downgradeQuality() {
    if (this.settings.animationQuality === 'high') {
      this.settings = {
        animationQuality: 'medium',
        particleCount: 3,
        animationDuration: 0.7,
        enableBlur: false,
        enableShadows: false
      };
    } else if (this.settings.animationQuality === 'medium') {
      this.settings = {
        animationQuality: 'low',
        particleCount: 1,
        animationDuration: 0.5,
        enableBlur: false,
        enableShadows: false
      };
    }
  }

  private upgradeQuality() {
    if (this.settings.animationQuality === 'low') {
      this.settings = {
        animationQuality: 'medium',
        particleCount: 4,
        animationDuration: 0.8,
        enableBlur: false,
        enableShadows: true
      };
    } else if (this.settings.animationQuality === 'medium') {
      this.settings = {
        animationQuality: 'high',
        particleCount: 6,
        animationDuration: 1,
        enableBlur: true,
        enableShadows: true
      };
    }
  }

  getSettings(): PerformanceSettings {
    return { ...this.settings };
  }

  getOptimizedCSS() {
    const base = {
      willChange: 'transform',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px'
    };

    if (!this.settings.enableBlur) {
      return base;
    }

    return {
      ...base,
      filter: 'blur(0.5px)'
    };
  }
}

export const performanceOptimizer = new PerformanceOptimizer();
export default performanceOptimizer;