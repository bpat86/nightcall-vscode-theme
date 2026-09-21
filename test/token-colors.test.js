const assert = require("node:assert/strict");
const test = require("node:test");
const { loadResolvedColorScheme } = require("../src/colors/color-scheme");
const createTokenColors = require("../src/formats/vscode/token-colors");
const javascript = require("../src/formats/vscode/token-colors/javascript");
const markup = require("../src/formats/vscode/token-colors/markup");
const shared = require("../src/formats/vscode/token-colors/shared");

const colors = loadResolvedColorScheme("dark-default");

test("shared overrides are applied after language-specific rules", () => {
  const overrides = shared.createSharedOverrideTokenColors(colors);
  assert.deepEqual(
    createTokenColors(colors).slice(-overrides.length),
    overrides,
  );
});

test("JSX children use their dedicated syntax color", () => {
  const customColors = structuredClone(colors);
  customColors.syntax.children = "#123456";

  const childrenRule = createTokenColors(customColors).find(
    ({ scope }) =>
      Array.isArray(scope) &&
      scope.includes("meta.jsx.children") &&
      scope.includes("meta.jsx.children.js") &&
      scope.includes("meta.jsx.children.tsx"),
  );

  assert.deepEqual(childrenRule.settings, { foreground: "#123456" });
});

test("YAML anchors distinguish definitions, aliases, names, and punctuation", () => {
  const rules = markup.createYamlTokenColors(colors);
  const settingsFor = (scope) =>
    rules.find((rule) => rule.scope === scope).settings;

  assert.deepEqual(settingsFor("variable.other.anchor.yaml"), {
    foreground: colors.syntax.constant,
  });
  assert.deepEqual(settingsFor("variable.other.alias.yaml"), {
    foreground: colors.syntax.variable,
  });
  assert.deepEqual(settingsFor("punctuation.definition.anchor.yaml"), {
    foreground: colors.syntax.punctuation,
  });
  assert.deepEqual(settingsFor("entity.name.type.anchor.yaml"), {
    foreground: colors.syntax.type,
  });
});

test("JSDoc syntax distinguishes punctuation, storage, access, and symbols", () => {
  const rules = javascript.createJavaScriptTokenColors(colors);
  const settingsFor = (scope) =>
    rules.find((rule) => rule.scope === scope).settings;

  assert.deepEqual(settingsFor("punctuation.definition.block.tag.jsdoc"), {
    foreground: colors.syntax.punctuation,
  });
  assert.deepEqual(settingsFor("storage.type.class.jsdoc"), {
    foreground: colors.syntax.storage,
  });
  assert.deepEqual(settingsFor("constant.language.access-type.jsdoc"), {
    foreground: colors.syntax.storage,
  });
  assert.deepEqual(settingsFor("constant.language.symbol-type.jsdoc"), {
    foreground: colors.syntax.operator,
  });
});
