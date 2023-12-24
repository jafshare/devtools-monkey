import hotkeys, { type HotkeysEvent, type KeyHandler } from "hotkeys-js";
import { useEffect, useRef } from "react";

import type { MutableRefObject } from "react";

hotkeys.filter = function (event: any) {
  const target = (event.target || event.srcElement) as any;
  const tagName = target?.tagName;
  // 默认 input、textarea 是不监听的，这里只保留select
  return !(target?.isContentEditable || tagName === "SELECT");
};
export function useKeybinding(
  keybindings: string,
  handler: KeyHandler,
  options?: {
    scope?: string;
    target?: MutableRefObject<HTMLElement>;
  }
) {
  const newKeybindings = useRef<string>("");
  const { scope = "all", target } = options || {};
  const listener = (event: KeyboardEvent, h: HotkeysEvent) => {
    return handler?.(event, h);
  };
  const unbind = () => {
    hotkeys.unbind(newKeybindings.current, scope, listener);
  };
  // 重置 scope, 当存在多个组件时，会相互影响，目前简单点，用最后触发的组件作为scope
  hotkeys.setScope(scope);
  useEffect(() => {
    // 先解绑所有事件
    if (newKeybindings.current) {
      hotkeys.unbind(newKeybindings.current, scope, listener);
    }
    newKeybindings.current = keybindings;
    if (newKeybindings.current) {
      hotkeys(
        newKeybindings.current,
        { scope, element: target?.current },
        listener
      );
    }
  }, [keybindings]);
  useEffect(() => {
    return () => {
      unbind();
    };
  }, []);
  return unbind;
}
