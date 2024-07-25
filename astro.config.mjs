import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import manifest from "./manifest.webmanifest";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), AstroPWA({ disable: import.meta.env.DEV, manifest })],
  // prefetch: true,
  vite: {
    // this is needed because there's issue in vite regarding importing worker files
    // https://github.com/vitejs/vite/issues/8427
    optimizeDeps: {
      exclude: ["@lofik/react"],
    },
  },
  server: {
    headers: {
      "cross-origin-embedder-policy": "require-corp",
      "cross-origin-opener-policy": "same-origin",
    },
  },
});
