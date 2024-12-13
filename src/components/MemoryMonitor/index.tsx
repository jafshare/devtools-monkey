import React from "react";

import styles from "./index.module.less";
import { useMemoryMonitor } from "../../hooks/useMemoryMonitor";

interface MemoryMonitorProps {
  threshold?: number;
  mode?: "always" | "warning";
  enabled?: boolean;
}

export const MemoryMonitor: React.FC<MemoryMonitorProps> = ({
  threshold,
  mode,
  enabled = true
}) => {
  const { memoryInfo, isOverThreshold, shouldShow } = useMemoryMonitor({
    threshold,
    mode,
    enabled
  });

  if (!enabled || !shouldShow || !memoryInfo) {
    return null;
  }

  return (
    <div
      className={`${styles.memoryMonitor} ${
        isOverThreshold ? styles.warning : ""
      }`}
    >
      <div>内存使用: {memoryInfo.usedJSHeapSize}MB</div>
      <div>总内存: {memoryInfo.totalJSHeapSize}MB</div>
      <div>内存限制: {memoryInfo.jsHeapSizeLimit}MB</div>
    </div>
  );
};
