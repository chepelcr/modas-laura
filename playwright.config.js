import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4173/",
    headless: true,
    launchOptions: process.env.QA_BROWSER
      ? { executablePath: process.env.QA_BROWSER }
      : {},
    reducedMotion: "reduce",
  },
  reporter: "list",
  outputDir: "qa/results",
  webServer: {
    command: "npm run preview -- --port 4173",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
  },
});
