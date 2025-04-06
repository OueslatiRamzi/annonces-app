module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["react", "next"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "@next/next/no-html-link-for-pages": "error",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};