import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { GM_getValue } from "$";

import "./assets/styles/index.less";

// 检查是否需要自动注入 React Scan
if (GM_getValue("reactscan.enabled", false)) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/react-scan/dist/auto.global.js";
  document.body.appendChild(script);
}

ReactDOM.createRoot(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
).render(<App />);
