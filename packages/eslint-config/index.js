import typescriptESLint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    parser: tsParser,
    plugins: {
      "@typescript-eslint": typescriptESLint,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
