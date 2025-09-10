"use client";

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ChromePerformance extends Performance {
  memory?: MemoryInfo;
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer | null = null;
  private startTime: number = 0;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  startTimer() {
    this.startTime = performance.now();
  }

  endTimer(): number {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    return duration;
  }

  // Check if device is mobile
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  // Check if device is low-performance based on JS heap usage (Chrome only)
  isLowPerformance(): boolean {
    const memory = (performance as ChromePerformance).memory;
    return memory ? memory.usedJSHeapSize > 50 * 1024 * 1024 : false; // 50MB
  }

  // Optimize asset quality
  getAssetQuality(): 'high' | 'medium' | 'low' {
    if (this.isLowPerformance() || this.isMobile()) {
      return 'low';
    }
    return 'high';
  }

  // Debounce utility
  debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle utility
  throttle<T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();
