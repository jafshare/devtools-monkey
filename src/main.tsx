import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./assets/styles/index.less";

ReactDOM.createRoot(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
).render(<App />);
