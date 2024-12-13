import { useEffect } from "react";
import { tinykeys } from "tinykeys";

type KeyBindingCallback = (event: KeyboardEvent) => void;

interface KeyBindingOptions {
  enabled?: boolean;
  target?: Window;
}

/**
 * 快捷键绑定 Hook
 * @param keyMap 快捷键配置对象或快捷键字符串
 * @param callback 当是字符串时的回调函数
 * @param options 配置选项
 */
export function useKeybinding(
  keyMap: string | Record<string, KeyBindingCallback>,
  callback?: KeyBindingCallback,
  options: KeyBindingOptions = {}
) {
  useEffect(() => {
    if (!options.enabled && options.enabled !== undefined) {
      return;
    }

    const target = options.target || window;

    const keyBindings: Record<string, KeyBindingCallback> =
      typeof keyMap === "string" ? { [keyMap]: callback! } : keyMap;

    const formattedBindings = Object.entries(keyBindings).reduce(
      (acc, [key, handler]) => {
        // 转换快捷键格式
        const formattedKey = key
          .toLowerCase()
          .split("+")
          .map((k) => {
            k = k.trim();
            // 处理修饰键
            if (k === "ctrl" || k === "command" || k === "cmd") return "$mod";
            if (k === "shift") return "Shift";
            if (k === "alt") return "Alt";
            // 处理单个字符
            return k.length === 1 ? k.toUpperCase() : k;
          })
          .join("+");

        return {
          ...acc,
          [formattedKey]: (event: KeyboardEvent) => {
            event.preventDefault();
            handler(event);
          }
        };
      },
      {}
    );

    const unsubscribe = tinykeys(target, formattedBindings);

    return () => {
      unsubscribe();
    };
  }, [keyMap, callback, options.enabled, options.target]);
}
