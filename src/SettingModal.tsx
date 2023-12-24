import React, { useEffect, useRef, useState } from "react";

import styles from "./SettingModal.module.less";
import { useKeybinding } from "./hooks";

import { GM_getValue, GM_setValue } from "$";

interface Props {
  onOk?: () => void;
  onCancel?: () => void;
}
const SettingModal: React.FC<Props> = ({ onCancel, onOk }) => {
  const targetRef = useRef<HTMLElement>();
  const keyMap = useRef<Record<string, any>>({});
  const [debugHotkey, setDebugHotkey] = useState("");
  const [defaultCountDown, setDefaultCountDown] = useState(5);
  useKeybinding(
    "*",
    (e, h) => {
      // 保存码值
      keyMap.current[e.keyCode] = e.key.toLowerCase();
      setDebugHotkey(
        h.keys
          .map((k) => {
            const _key = keyMap.current[k];
            return _key === "control" ? "ctrl" : _key.replace("arrow", "");
          })
          .join("+")
      );
      e.preventDefault();
      e.stopPropagation();
    },
    { target: targetRef as any, scope: "keybinding" }
  );
  const handleSave = () => {
    GM_setValue("devtools.settings", {
      debugHotkey,
      defaultCountDown
    });
    onOk?.();
  };
  useEffect(() => {
    const settings = GM_getValue("devtools.settings") || {};
    setDebugHotkey((settings as any)?.debugHotkey || "");
    setDefaultCountDown((settings as any)?.defaultCountDown ?? 5);
  }, []);
  return (
    <>
      <div className={styles.card}>
        <button type="button" className={styles.dismiss} onClick={onCancel}>
          ×
        </button>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.coolinput}>
              <label htmlFor="input" className="text">
                Debug快捷键:
              </label>
              <input
                ref={targetRef as any}
                value={debugHotkey}
                type="text"
                placeholder="请按下快捷键"
                name="input"
                className="input"
                readOnly
              />
            </div>
            <div
              className={styles.coolinput}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <label htmlFor="input" className="text">
                CountDown默认值:
              </label>
              <input
                value={defaultCountDown}
                onChange={(e) => setDefaultCountDown(e.target.valueAsNumber)}
                min={0}
                type="number"
                placeholder="请设置CountDown"
                name="input"
                className="input"
              />
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
