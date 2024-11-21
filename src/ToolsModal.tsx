import { useRef } from "react";

import styles from "./ToolsModal.module.less";
import { useClickOutside } from "./hooks";

export interface ToolsModalProps {
  onClose?: () => void;
  onCommand: (cmd: string) => void;
  className?: string;
  ignores: any[];
  reactScanEnabled: boolean;
}

function ToolsModal({
  onCommand,
  onClose,
  ignores,
  reactScanEnabled,
  ...rest
}: ToolsModalProps) {
  const modalRef = useRef<HTMLElement>();

  const startDebug = () => {
    onCommand?.("showCountDown");
  };

  const showSetting = () => {
    onCommand?.("showSetting");
  };

  const toggleReactScan = () => {
    onCommand?.("toggleReactScan");
  };

  useClickOutside(modalRef, onClose, { ignores });

  return (
    <>
      <div {...rest} ref={modalRef as any}>
        <button
          className={styles.itemBtn}
          onClick={startDebug}
          title="开启后，5s 后自动暂停页面"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m10.94 13.5l-1.32 1.32a3.73 3.73 0 0 0-7.24 0L1.06 13.5L0 14.56l1.72 1.72l-.22.22V18H0v1.5h1.5v.08c.077.489.214.966.41 1.42L0 22.94L1.06 24l1.65-1.65A4.308 4.308 0 0 0 6 24a4.31 4.31 0 0 0 3.29-1.65L10.94 24L12 22.94L10.09 21c.198-.464.336-.951.41-1.45v-.1H12V18h-1.5v-1.5l-.22-.22L12 14.56l-1.06-1.06zM6 13.5a2.25 2.25 0 0 1 2.25 2.25h-4.5A2.25 2.25 0 0 1 6 13.5zm3 6a3.33 3.33 0 0 1-3 3a3.33 3.33 0 0 1-3-3v-2.25h6v2.25zm14.76-9.9v1.26L13.5 17.37V15.6l8.5-5.37L9 2v9.46a5.07 5.07 0 0 0-1.5-.72V.63L8.64 0l15.12 9.6z"
            />
          </svg>
        </button>
        <button
          className={`${styles.itemBtn} ${
            reactScanEnabled ? styles.active : ""
          }`}
          onClick={toggleReactScan}
          title={`${reactScanEnabled ? "关闭" : "开启"} React 性能分析`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            style={{
              color: reactScanEnabled ? "#61dafb" : "currentColor",
              transition: "color 0.3s ease"
            }}
          >
            <path
              fill="currentColor"
              d="M12 16c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0-13c4.58 0 8.5 2.85 9.74 6.81c.15.47-.18.97-.68.97c-.34 0-.65-.23-.75-.56C19.23 6.78 15.94 4.5 12 4.5S4.77 6.78 3.69 10.22c-.1.33-.41.56-.75.56c-.5 0-.83-.5-.68-.97C3.5 5.85 7.42 3 12 3m0 3c2.75 0 5 2.25 5 5s-2.25 5-5 5s-5-2.25-5-5s2.25-5 5-5m0 2c-1.65 0-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3s-1.35-3-3-3m6.71 11.28l-1.42 1.43l-2.12-2.12c-.86.55-1.87.91-2.96.99L12 21l-.21-.42c-1.09-.08-2.1-.44-2.96-.99l-2.12 2.12l-1.42-1.43l2.12-2.12c-.55-.86-.91-1.87-.99-2.96L6 15l.42-.21c.08-1.09.44-2.1.99-2.96L5.29 9.71l1.42-1.43l2.12 2.12c.86-.55 1.87-.91 2.96-.99L12 9l.21.42c1.09.08 2.1.44 2.96.99l2.12-2.12l1.42 1.43l-2.12 2.12c.55.86.91 1.87.99 2.96L18 15l-.42.21c-.08 1.09-.44 2.1-.99 2.96l2.12 2.12z"
            />
          </svg>
        </button>
        <button className={styles.itemBtn} onClick={showSetting} title="设置">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <path
              fill="#333333"
              d="M245.151 168a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88m0 144a56 56 0 1 1 56-56a56.063 56.063 0 0 1-56 56"
            />
            <path
              fill="#333333"
              d="m464.7 322.319l-31.77-26.153a193.081 193.081 0 0 0 0-80.332l31.77-26.153a19.941 19.941 0 0 0 4.606-25.439l-32.612-56.483a19.936 19.936 0 0 0-24.337-8.73l-38.561 14.447a192.038 192.038 0 0 0-69.54-40.192l-6.766-40.571A19.936 19.936 0 0 0 277.762 16H212.54a19.937 19.937 0 0 0-19.728 16.712l-6.762 40.572a192.03 192.03 0 0 0-69.54 40.192L77.945 99.027a19.937 19.937 0 0 0-24.334 8.731L21 164.245a19.94 19.94 0 0 0 4.61 25.438l31.767 26.151a193.081 193.081 0 0 0 0 80.332l-31.77 26.153A19.942 19.942 0 0 0 21 347.758l32.612 56.483a19.937 19.937 0 0 0 24.337 8.73l38.562-14.447a192.03 192.03 0 0 0 69.54 40.192l6.762 40.571A19.937 19.937 0 0 0 212.54 496h65.222a19.936 19.936 0 0 0 19.728-16.712l6.763-40.572a192.038 192.038 0 0 0 69.54-40.192l38.564 14.449a19.938 19.938 0 0 0 24.334-8.731l32.609-56.487a19.939 19.939 0 0 0-4.6-25.436m-50.636 57.12l-48.109-18.024l-7.285 7.334a159.955 159.955 0 0 1-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642l-10-2.636a159.955 159.955 0 0 1-72.625-41.973l-7.285-7.334l-48.117 18.024L53.8 340.562l39.629-32.624l-2.7-9.973a160.9 160.9 0 0 1 0-83.93l2.7-9.972L53.8 171.439l22.446-38.878l48.109 18.024l7.285-7.334a159.955 159.955 0 0 1 72.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642l10 2.636a159.955 159.955 0 0 1 72.625 41.973l7.285 7.334l48.109-18.024l22.447 38.877l-39.629 32.625l2.7 9.972a160.9 160.9 0 0 1 0 83.93l-2.7 9.973l39.629 32.623Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ToolsModal;
