import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
export default [
  { ignores: ["dist/**", ".ssr/**", "node_modules/**", "site/**", "qa/**"] },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, "react-hooks": hooks },
    rules: {
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(Button|Heading|Icon|asset|routeUrl)$" },
      ],
    },
  },
  {
    files: [
      "scripts/**/*.mjs",
      "vite.config.js",
      "tests/**/*.mjs",
      "tests/**/*.js",
      "playwright.config.js",
    ],
    languageOptions: { globals: globals.node },
  },
];
