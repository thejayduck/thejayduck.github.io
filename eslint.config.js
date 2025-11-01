const { defineConfig, globalIgnores } = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const _import = require("eslint-plugin-import");

const { fixupPluginRules } = require("@eslint/compat");

const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {},
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    extends: compat.extends(
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "next/core-web-vitals"
    ),

    plugins: {
      "simple-import-sort": simpleImportSort,
      import: fixupPluginRules(_import),
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/first": "off",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^.+\\.s?css$"],
            ["^next", "^@?\\w"],
            ["^react", "^@?\\w"],
            ["^(components)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],

      semi: 0,
      quotes: ["error", "double"],
      "react/no-multi-comp": "warn",
      "semi-spacing": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "object-shorthand": "error",
      indent: "off",
    },
  },
  globalIgnores(["public/**/*.js"]),
]);
