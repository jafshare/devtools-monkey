import React, { useCallback, useEffect, useState } from "react";

import styles from "./SettingModal.module.less";

import { GM_getValue, GM_setValue } from "$";

interface Props {
  onOk?: (settings: Settings) => void;
  onCancel?: () => void;
}

interface Settings {
  debugHotkey: string;
  reactScanHotkey: string;
  defaultCountDown: number;
  memoryMonitor?: {
    enabled: boolean;
    threshold: number;
    mode: "always" | "warning";
  };
}

const SettingModal: React.FC<Props> = ({ onCancel, onOk }) => {
  const [debugHotkey, setDebugHotkey] = useState("");
  const [reactScanHotkey, setReactScanHotkey] = useState("");
  const [defaultCountDown, setDefaultCountDown] = useState(5);
  const [memorySettings, setMemorySettings] = useState({
    enabled: true,
    threshold: 500,
    mode: "always" as const
  });
  const [activeInput, setActiveInput] = useState<"debug" | "reactScan" | null>(
    null
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!activeInput) {
        return;
      }

      // 处理删除键
      if (event.key === "Backspace" || event.key === "Delete") {
        if (activeInput === "debug") {
          setDebugHotkey("");
        } else {
          setReactScanHotkey("");
        }
        return;
      }

      // 忽略单独的修饰键
      if (["Control", "Alt", "Shift", "Meta"].includes(event.key)) {
        return;
      }

      const modifiers: string[] = [];
      if (event.ctrlKey) modifiers.push("ctrl");
      if (event.altKey) modifiers.push("alt");
      if (event.shiftKey) modifiers.push("shift");
      if (event.metaKey) modifiers.push("cmd");

      const key = event.key.length === 1 ? event.key : event.key.toLowerCase();
      const hotkeyStr = [...modifiers, key].join("+");

      if (activeInput === "debug") {
        setDebugHotkey(hotkeyStr);
      } else {
        setReactScanHotkey(hotkeyStr);
      }
    },
    [activeInput]
  );

  // 使用原生事件监听而不是 useKeybinding
  useEffect(() => {
    if (activeInput) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeInput, handleKeyDown]);

  const handleSave = () => {
    const newSettings: Settings = {
      debugHotkey,
      reactScanHotkey,
      defaultCountDown,
      memoryMonitor: memorySettings
    };
    GM_setValue("devtools.settings", newSettings);
    onOk?.(newSettings);
  };

  const clearHotkey = (type: "debug" | "reactScan") => {
    if (type === "debug") {
      setDebugHotkey("");
    } else {
      setReactScanHotkey("");
    }
  };

  useEffect(() => {
    const settings = GM_getValue("devtools.settings") || {};
    setDebugHotkey((settings as any)?.debugHotkey || "");
    setReactScanHotkey((settings as any)?.reactScanHotkey || "");
    setDefaultCountDown((settings as any)?.defaultCountDown ?? 5);
    setMemorySettings(
      (settings as any)?.memoryMonitor ?? {
        enabled: true,
        threshold: 500,
        mode: "always"
      }
    );
  }, []);

  return (
    <>
      <div className={styles.card}>
        <button type="button" className={styles.dismiss} onClick={onCancel}>
          ×
        </button>
        <div className={styles.header}>
          <div className={styles.title}>设置</div>
          <div className={styles.content}>
            <div className={`${styles.coolinput} ${styles.formItem}`}>
              <div className={`${styles.inputGroup}`}>
                <label htmlFor="debug-hotkey" className="text">
                  Debug快捷键:
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="debug-hotkey"
                    value={debugHotkey}
                    type="text"
                    placeholder="点击输入框并按下快捷键"
                    className="input"
                    readOnly
                    onFocus={() => setActiveInput("debug")}
                    onBlur={() => setActiveInput(null)}
                  />
                  {debugHotkey && (
                    <button
                      className={styles.clearBtn}
                      onClick={() => clearHotkey("debug")}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={`${styles.coolinput} ${styles.formItem}`}>
              <div className={`${styles.inputGroup}`}>
                <label htmlFor="reactscan-hotkey" className="text">
                  React Scan快捷键:
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="reactscan-hotkey"
                    value={reactScanHotkey}
                    type="text"
                    placeholder="点击输入框并按下快捷键"
                    className="input"
                    readOnly
                    onFocus={() => setActiveInput("reactScan")}
                    onBlur={() => setActiveInput(null)}
                  />
                  {reactScanHotkey && (
                    <button
                      className={styles.clearBtn}
                      onClick={() => clearHotkey("reactScan")}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={`${styles.coolinput} ${styles.formItem}`}>
              <div className={`${styles.inputGroup}`}>
                <label htmlFor="countdown" className="text">
                  CountDown默认值:
                </label>
                <input
                  id="countdown"
                  value={defaultCountDown}
                  onChange={(e) => setDefaultCountDown(e.target.valueAsNumber)}
                  min={0}
                  type="number"
                  placeholder="请设置CountDown"
                  className="input"
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>内存监控设置</div>
              <div
                className={`${styles.coolinput} ${styles.checkbox} ${styles.formItem}`}
              >
                <label className="text">
                  <input
                    type="checkbox"
                    checked={memorySettings.enabled}
                    onChange={(e) =>
                      setMemorySettings((prev) => ({
                        ...prev,
                        enabled: e.target.checked
                      }))
                    }
                  />
                  启用内存监控
                </label>
              </div>

              <div className={`${styles.coolinput} ${styles.formItem}`}>
                <div className={`${styles.inputGroup}`}>
                  <label htmlFor="memory-threshold" className="text">
                    内存阈值 (MB):
                  </label>
                  <input
                    id="memory-threshold"
                    type="number"
                    value={memorySettings.threshold}
                    onChange={(e) =>
                      setMemorySettings((prev) => ({
                        ...prev,
                        threshold: e.target.valueAsNumber
                      }))
                    }
                    min={100}
                    className="input"
                  />
                </div>
              </div>

              <div className={`${styles.coolinput} ${styles.formItem}`}>
                <div className={`${styles.inputGroup}`}>
                  <label htmlFor="memory-mode" className="text">
                    显示模式:
                  </label>
                  <select
                    id="memory-mode"
                    value={memorySettings.mode}
                    onChange={(e) =>
                      setMemorySettings((prev) => ({
                        ...prev,
                        mode: e.target.value as any
                      }))
                    }
                    className="input"
                  >
                    <option value="always">始终显示</option>
                    <option value="warning">仅警告时显示</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.button}
              onClick={handleSave}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingModal;
