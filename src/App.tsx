import { useEffect, useRef, useState } from "react";

import styles from "./App.module.less";
import SettingModal from "./SettingModal";
import ToolsModal from "./ToolsModal";
import CountDown from "./components/CountDown";
import { useKeybinding } from "./hooks";

import type { HotkeysEvent } from "hotkeys-js";

import { GM_getValue } from "$";

function App() {
  const [visible, setVisible] = useState(false);
  const [countDownVisible, setCountDownVisible] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const keybindings = useRef<Record<string, string>>({});
  const [keybindingStr, setKeybindingStr] = useState("");
  const [countDownInitial, setCountDownInitial] = useState(5);
  const floatingRef = useRef<HTMLElement>();
  const initData = () => {
    const settings = GM_getValue("devtools.settings") || {};
    const debugHotKey = (settings as any)?.debugHotkey || "";
    setCountDownInitial((settings as any)?.defaultCountDown ?? 5);
    keybindings.current = {
      [debugHotKey]: "showCountDown"
    };
    setKeybindingStr(debugHotKey);
  };
  const handleCommand = (cmd: string, ...args: any[]) => {
    setVisible(false);
    switch (cmd) {
      case "showCountDown":
        setCountDownVisible(true);
        break;
      case "hiddenCountDown":
        setCountDownVisible(false);
        break;
      case "showSetting":
        setSettingVisible(true);
        break;
      default:
        break;
    }
  };
  const handleKeydown = (event: KeyboardEvent, h: HotkeysEvent) => {
    const key = h.key;
    if (keybindings.current[key]) {
      console.log("startDebug");
      handleCommand(keybindings.current[key], event);
    }
    // 禁止冒泡
    event.preventDefault();
    event.stopPropagation();
  };
  useKeybinding(keybindingStr, handleKeydown, {
    scope: "global"
  });
  useEffect(() => {
    initData();
  }, []);
  return (
    <>
      <div
        className={styles.floatingBtn}
        ref={floatingRef as any}
        onClick={() => setVisible((val) => !val)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.275 19.8l.7-.7L12 11.125q.475-.575.738-1.3T13 8.3q0-1.875-1.313-3.175T8.5 3.825h-.25L11.325 6.9l-4.25 4.225L4 8.05v.275Q4 10.2 5.312 11.5T8.5 12.8q.8 0 1.513-.263T11.3 11.8l7.975 8Zm-1.4 1.425l-6.9-6.9q-.575.225-1.187.35t-1.263.125q-2.725 0-4.612-1.888T2.025 8.3q0-1.05.313-2.025t.912-1.8L7.075 8.3L8.5 6.9L4.675 3.05q.85-.625 1.825-.937t2-.313q2.725 0 4.612 1.888T15 8.3q0 .65-.125 1.288T14.5 10.8l6.875 6.875q.575.575.588 1.413T21.4 20.5l-.675.7q-.575.6-1.413.613t-1.437-.588ZM9.2 9Z"
          />
        </svg>
      </div>
      {visible && (
        <ToolsModal
          onClose={() => setVisible(false)}
          className={styles.devtoolsModal}
          onCommand={handleCommand}
          ignores={[floatingRef.current]}
        />
      )}
      {countDownVisible && (
        <CountDown
          initial={countDownInitial}
          onDestroy={() => setCountDownVisible(false)}
        />
      )}
      {settingVisible && (
        <SettingModal
          onOk={() => {
            setSettingVisible(false);
            initData();
          }}
          onCancel={() => setSettingVisible(false)}
        />
      )}
    </>
  );
}

export default App;
