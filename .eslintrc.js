module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],
  plugins: [
    "simple-import-sort",
    "import"
  ],
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
          [
            "^.+\\.s?css$"
          ], // styles
          [
            "^next",
            "^@?\\w"
          ], // next
          [
            "^react",
            "^@?\\w"
          ], // react
          [
            "^(components)(/.*|$)"
          ], // components
          [
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$"
          ], // Parent
          [
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$"
          ], // Relative
        ]
      }
    ],
    "semi": 0,
    "quotes": [
      "error",
      "double"
    ],
    "react/no-multi-comp": "warn",
    "semi-spacing": "error",
    "prefer-template": "error",
    "prefer-arrow-callback": "error",
    "object-shorthand": "error",
    "indent": "off"
  },
  ignorePatterns: [
    "public/**/*.js"
  ],
};