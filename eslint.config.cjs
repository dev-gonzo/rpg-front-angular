const { FlatCompat } = require("@eslint/eslintrc");
const tsParser = require("@typescript-eslint/parser");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "@angular-eslint": require("@angular-eslint/eslint-plugin"),
      import: require("eslint-plugin-import"),
    },
    rules: {
      ...require("@angular-eslint/eslint-plugin").configs.recommended.rules,
      ...require("@typescript-eslint/eslint-plugin").configs.recommended.rules,
      ...require("@typescript-eslint/eslint-plugin").configs.strict.rules,

      // Personalizadas
       '@typescript-eslint/no-extraneous-class': 'off',
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-var": "error",
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
  files: ['**/*.component.html'],
  languageOptions: {
    parser: require('@angular-eslint/template-parser'),
  },
  plugins: {
    '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
  },
  rules: {
    ...require('@angular-eslint/eslint-plugin-template').configs.recommended.rules,
  },
},

];
