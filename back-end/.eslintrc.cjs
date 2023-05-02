module.exports = {
  plugins: ["mocha"],
  env: {
    es2022: true,
    node: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off",
    semi: "warn",
    "no-var": ["error"],
    "no-unused-vars": "off",
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    curly: "off",
    eqeqeq: ["error"],
    "no-multi-spaces": ["error"],
    "no-lone-blocks": ["error"],
    "no-self-compare": ["error"],
    "no-unused-expressions": ["error"],
    "no-useless-call": ["error"],
    "no-use-before-define": ["error"],
    camelcase: ["error", { properties: "never" }],
    "func-call-spacing": ["error"],
    "no-lonely-if": ["error"],
    "array-bracket-spacing": ["error"],
    "no-console": ["off"],
  },
};
