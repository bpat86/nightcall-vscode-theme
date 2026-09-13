const assert = require("node:assert/strict");
const test = require("node:test");
const { loadResolvedColorScheme } = require("../src/colors/color-scheme");
const createTokenColors = require("../src/theme/token-colors");
const javascript = require("../src/theme/token-colors/javascript");
const markup = require("../src/theme/token-colors/markup");
const scripting = require("../src/theme/token-colors/scripting");
const shared = require("../src/theme/token-colors/shared");
const systems = require("../src/theme/token-colors/systems");
const web = require("../src/theme/token-colors/web");

const colors = loadResolvedColorScheme("dark-default");
const groups = { javascript, markup, scripting, shared, systems, web };

test("token color factories return TextMate rules", () => {
  for (const [groupName, factories] of Object.entries(groups)) {
    for (const [factoryName, createRules] of Object.entries(factories)) {
      const rules = createRules(colors);
      assert.ok(
        rules.length > 0,
        `${groupName}.${factoryName} returned no rules`,
      );

      for (const rule of rules) {
        assert.ok(
          typeof rule.scope === "string" || Array.isArray(rule.scope),
          `${groupName}.${factoryName} returned a rule without scopes`,
        );
        assert.ok(
          rule.settings && typeof rule.settings === "object",
          `${groupName}.${factoryName} returned a rule without settings`,
        );
      }
    }
  }
});

test("shared overrides are applied after language-specific rules", () => {
  const overrides = shared.createSharedOverrideTokenColors(colors);
  assert.deepEqual(
    createTokenColors(colors).slice(-overrides.length),
    overrides,
  );
});
