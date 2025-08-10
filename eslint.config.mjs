// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      singleline: "never",
      multiline: "never",
    }],
    "vue/html-closing-bracket-spacing": ["error", {
      startTag: "never",
      endTag: "never",
      selfClosingTag: "never",
    }],
  },
});
