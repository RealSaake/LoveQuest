/**
 * Performance Logger - CLI and Console Monitoring
 * Tracks FPS, memory usage, and animation performance with detailed logging
 */

import { performanceOptimizer } from './performanceOptimizer';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  animationLoad: number;
  timestamp: number;
  page: string;
  userAgent: string;
}

interface PerformanceAlert {
  type: 'fps_drop' | 'memory_spike' | 'animation_lag' | 'general_slowdown';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metrics: PerformanceMetrics;
  timestamp: number;
}

class PerformanceLogger {
  private metrics: PerformanceMetrics[] = [];
  private alerts: PerformanceAlert[] = [];
  private isMonitoring = false;
  private frameCount = 0;
  private lastFrameTime = performance.now();
  private fpsHistory: number[] = [];
  private memoryHistory: number[] = [];
  private logInterval: NodeJS.Timeout | null = null;
  private monitoringStartTime = 0;

  // Thresholds for alerts (more lenient to reduce spam)
  private readonly FPS_WARNING_THRESHOLD = 45;
  private readonly FPS_CRITICAL_THRESHOLD = 30;
  private readonly MEMORY_WARNING_THRESHOLD = 100; // MB
  private readonly MEMORY_CRITICAL_THRESHOLD = 200; // MB

  constructor() {
    this.setupConsoleLogging();
  }

  private setupConsoleLogging() {
    // Override console methods to capture logs
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
      this.logToServer('LOG', args.join(' '));
      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      this.logToServer('WARN', args.join(' '));
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      this.logToServer('ERROR', args.join(' '));
      originalError.apply(console, args);
    };
  }

  private logToServer(level: string, message: string) {
    // Disable server logging to reduce console noise
    return;
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringStartTime = performance.now();
    
    console.log('🚀 LoveQuest Performance Monitoring Started');
    console.log(`📊 Monitoring thresholds: FPS Warning: ${this.FPS_WARNING_THRESHOLD}, Critical: ${this.FPS_CRITICAL_THRESHOLD}`);
    console.log(`💾 Memory thresholds: Warning: ${this.MEMORY_WARNING_THRESHOLD}MB, Critical: ${this.MEMORY_CRITICAL_THRESHOLD}MB`);
    
    this.startFPSMonitoring();
    this.startMemoryMonitoring();
    this.startPeriodicLogging();
    
    // Auto-stop monitoring after 5 minutes
    setTimeout(() => {
      this.stopMonitoring();
    }, 5 * 60 * 1000);
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    if (this.logInterval) {
      clearInterval(this.logInterval);
      this.logInterval = null;
    }
    
    this.generateFinalReport();
    console.log('🛑 LoveQuest Performance Monitoring Stopped');
  }

  private startFPSMonitoring() {
    const measureFPS = () => {
      if (!this.isMonitoring) return;
      
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      
      // Cap FPS calculation at 60fps max
      const targetFrameTime = 1000 / 60; // 16.67ms for 60fps
      if (deltaTime < targetFrameTime) {
        // Skip this frame to maintain 60fps cap
        requestAnimationFrame(measureFPS);
        return;
      }
      
      const fps = Math.min(60, Math.round(1000 / deltaTime));
      
      this.frameCount++;
      this.lastFrameTime = currentTime;
      
      // Update performance optimizer with current FPS
      performanceOptimizer.updateFPS(fps);
      
      // Store FPS history (keep last 60 frames)
      this.fpsHistory.push(fps);
      if (this.fpsHistory.length > 60) {
        this.fpsHistory.shift();
      }
      
      // Check for FPS drops (throttled to prevent spam)
      if (this.frameCount % 60 === 0) { // Only check every 60 frames
        if (fps < this.FPS_CRITICAL_THRESHOLD) {
          this.createAlert('fps_drop', 'critical', `Critical FPS drop: ${fps}fps`);
        } else if (fps < this.FPS_WARNING_THRESHOLD) {
          this.createAlert('fps_drop', 'medium', `FPS warning: ${fps}fps`);
        }
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  private startMemoryMonitoring() {
    const measureMemory = () => {
      if (!this.isMonitoring) return;
      
      // @ts-ignore - performance.memory is available in Chrome
      const memory = (performance as any).memory;
      if (memory) {
        const memoryMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        
        this.memoryHistory.push(memoryMB);
        if (this.memoryHistory.length > 60) {
          this.memoryHistory.shift();
        }
        
        // Check for memory spikes
        if (memoryMB > this.MEMORY_CRITICAL_THRESHOLD) {
          this.createAlert('memory_spike', 'critical', `Critical memory usage: ${memoryMB}MB`);
        } else if (memoryMB > this.MEMORY_WARNING_THRESHOLD) {
          this.createAlert('memory_spike', 'medium', `Memory warning: ${memoryMB}MB`);
        }
      }
      
      setTimeout(measureMemory, 1000); // Check every second
    };
    
    measureMemory();
  }

  private startPeriodicLogging() {
    this.logInterval = setInterval(() => {
      this.logCurrentMetrics();
    }, 30000); // Log every 30 seconds to reduce overhead
  }

  private logCurrentMetrics() {
    const avgFPS = this.fpsHistory.length > 0 
      ? Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length)
      : 0;
    
    const avgMemory = this.memoryHistory.length > 0
      ? Math.round(this.memoryHistory.reduce((a, b) => a + b, 0) / this.memoryHistory.length)
      : 0;
    
    const currentFPS = this.fpsHistory[this.fpsHistory.length - 1] || 0;
    const currentMemory = this.memoryHistory[this.memoryHistory.length - 1] || 0;
    
    console.log('📈 Performance Metrics:');
    console.log(`   FPS: ${currentFPS} (avg: ${avgFPS})`);
    console.log(`   Memory: ${currentMemory}MB (avg: ${avgMemory}MB)`);
    console.log(`   Page: ${window.location.pathname}`);
    console.log(`   Alerts: ${this.alerts.length} total`);
    
    // Store metrics
    const metrics: PerformanceMetrics = {
      fps: currentFPS,
      frameTime: 1000 / currentFPS,
      memoryUsage: currentMemory,
      animationLoad: this.calculateAnimationLoad(),
      timestamp: Date.now(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };
    
    this.metrics.push(metrics);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }
  }

  private calculateAnimationLoad(): number {
    // Estimate animation load based on active animations
    const animatedElements = document.querySelectorAll('[style*="transform"], .animate-');
    return animatedElements.length;
  }

  private createAlert(type: PerformanceAlert['type'], severity: PerformanceAlert['severity'], message: string) {
    const alert: PerformanceAlert = {
      type,
      severity,
      message,
      metrics: this.getCurrentMetrics(),
      timestamp: Date.now()
    };
    
    this.alerts.push(alert);
    
    // Log alert immediately
    const emoji = severity === 'critical' ? '🚨' : severity === 'high' ? '⚠️' : '⚡';
    console.warn(`${emoji} PERFORMANCE ALERT [${severity.toUpperCase()}]: ${message}`);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }
  }

  private getCurrentMetrics(): PerformanceMetrics {
    const currentFPS = this.fpsHistory[this.fpsHistory.length - 1] || 0;
    const currentMemory = this.memoryHistory[this.memoryHistory.length - 1] || 0;
    
    return {
      fps: currentFPS,
      frameTime: 1000 / currentFPS,
      memoryUsage: currentMemory,
      animationLoad: this.calculateAnimationLoad(),
      timestamp: Date.now(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };
  }

  private generateFinalReport() {
    const totalTime = (performance.now() - this.monitoringStartTime) / 1000;
    const avgFPS = this.fpsHistory.length > 0 
      ? Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length)
      : 0;
    const minFPS = Math.min(...this.fpsHistory);
    const maxFPS = Math.max(...this.fpsHistory);
    
    const avgMemory = this.memoryHistory.length > 0
      ? Math.round(this.memoryHistory.reduce((a, b) => a + b, 0) / this.memoryHistory.length)
      : 0;
    const maxMemory = Math.max(...this.memoryHistory);
    
    console.log('📊 FINAL PERFORMANCE REPORT');
    console.log('================================');
    console.log(`⏱️  Monitoring Duration: ${Math.round(totalTime)}s`);
    console.log(`🎯 FPS Stats: Avg: ${avgFPS}, Min: ${minFPS}, Max: ${maxFPS}`);
    console.log(`💾 Memory Stats: Avg: ${avgMemory}MB, Peak: ${maxMemory}MB`);
    console.log(`🚨 Total Alerts: ${this.alerts.length}`);
    
    // Alert breakdown
    const alertsByType = this.alerts.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('📋 Alert Breakdown:');
    Object.entries(alertsByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    // Performance grade
    const grade = this.calculatePerformanceGrade(avgFPS, maxMemory, this.alerts.length);
    console.log(`🏆 Performance Grade: ${grade}`);
    console.log('================================');
    
    // Export data for analysis
    this.exportPerformanceData();
  }

  private calculatePerformanceGrade(avgFPS: number, maxMemory: number, alertCount: number): string {
    let score = 100;
    
    // FPS penalties
    if (avgFPS < 30) score -= 40;
    else if (avgFPS < 45) score -= 25;
    else if (avgFPS < 55) score -= 10;
    
    // Memory penalties
    if (maxMemory > 200) score -= 30;
    else if (maxMemory > 150) score -= 20;
    else if (maxMemory > 100) score -= 10;
    
    // Alert penalties
    score -= alertCount * 2;
    
    if (score >= 90) return 'A+ (Excellent)';
    if (score >= 80) return 'A (Great)';
    if (score >= 70) return 'B (Good)';
    if (score >= 60) return 'C (Fair)';
    if (score >= 50) return 'D (Poor)';
    return 'F (Critical Issues)';
  }

  private exportPerformanceData() {
    const data = {
      summary: {
        avgFPS: this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length,
        minFPS: Math.min(...this.fpsHistory),
        maxFPS: Math.max(...this.fpsHistory),
        avgMemory: this.memoryHistory.reduce((a, b) => a + b, 0) / this.memoryHistory.length,
        maxMemory: Math.max(...this.memoryHistory),
        totalAlerts: this.alerts.length
      },
      metrics: this.metrics,
      alerts: this.alerts,
      fpsHistory: this.fpsHistory,
      memoryHistory: this.memoryHistory
    };
    
    console.log('💾 Performance data exported to browser storage');
    localStorage.setItem('lovequest-performance-data', JSON.stringify(data));
  }

  // Public methods for manual control
  getMetrics() {
    return this.metrics;
  }

  getAlerts() {
    return this.alerts;
  }

  getCurrentFPS() {
    return this.fpsHistory[this.fpsHistory.length - 1] || 0;
  }

  getCurrentMemory() {
    return this.memoryHistory[this.memoryHistory.length - 1] || 0;
  }
}

// Singleton instance
export const performanceLogger = new PerformanceLogger();

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  // Start monitoring after a short delay to let the app initialize
  setTimeout(() => {
    performanceLogger.startMonitoring();
  }, 2000);
}

export default performanceLogger;