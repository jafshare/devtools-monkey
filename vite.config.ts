import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        author: "Hunter Jiang",
        icon: "https://raw.githubusercontent.com/jafshare/devtools-monkey/main/icon/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["*://*/*"]
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr("React", "umd/react.production.min.js"),
          "react-dom": cdn.jsdelivr(
            "ReactDOM",
            "umd/react-dom.production.min.js"
          ),
          "hotkeys-js": cdn.jsdelivr("hotkeys", "dist/hotkeys.min.js")
        }
      }
    })
  ]
});
