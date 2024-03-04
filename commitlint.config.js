module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["ci", "chore", "docs", "feat", "fix", "refactor", "test"],
    ],
  },
};
