import { useCallback, useEffect, useState } from "react";

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface UseMemoryMonitorOptions {
  enabled?: boolean;
  threshold?: number; // MB为单位
  mode?: "always" | "warning"; // always: 常显; warning: 仅超过阈值显示
  interval?: number; // 检测间隔，单位毫秒
}

export function useMemoryMonitor(options: UseMemoryMonitorOptions = {}) {
  const {
    enabled,
    threshold = 500, // 默认500MB
    mode = "always",
    interval = 1000
  } = options;

  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  const checkMemory = useCallback(() => {
    const performance = window.performance as any;
    if (!performance || !performance.memory) {
      return;
    }

    const memory = performance.memory;
    const usedMB = Math.round(memory.usedJSHeapSize / (1024 * 1024));
    const totalMB = Math.round(memory.totalJSHeapSize / (1024 * 1024));
    const limitMB = Math.round(memory.jsHeapSizeLimit / (1024 * 1024));

    setMemoryInfo({
      usedJSHeapSize: usedMB,
      totalJSHeapSize: totalMB,
      jsHeapSizeLimit: limitMB
    });

    setIsOverThreshold(usedMB > threshold);
  }, [enabled, threshold]);

  useEffect(() => {
    if (enabled === false) return;

    const timer = setInterval(checkMemory, interval);
    checkMemory();

    return () => clearInterval(timer);
  }, [checkMemory, enabled, interval]);

  const shouldShow
    = enabled !== false
    && (mode === "always" || (mode === "warning" && isOverThreshold));

  return {
    memoryInfo,
    isOverThreshold,
    shouldShow
  };
}
