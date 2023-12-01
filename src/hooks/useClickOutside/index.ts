import { useEffect } from "react";

// 检测当前点击是否在组件内
export function useClickOutside(
  ref: React.MutableRefObject<HTMLElement | undefined>,
  handler?: () => void,
  options?: {
    ignores?: HTMLElement[];
  }
) {
  const checkClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      // 排除点击组件的触发
      if (
        !options?.ignores?.some((item) => item.contains(event.target as Node))
      ) {
        handler?.();
      }
    }
  };
  useEffect(() => {
    // 这里使用事件捕获，避免第一次组件渲染，捕获到事件冒泡
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, []);
}
