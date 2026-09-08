const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const createTheme = require("../src/theme/create-theme");
const definitions = require("../src/theme-definitions");
const { applyVariants } = require("../src/theme/variants");

for (const definition of definitions) {
  test(`${definition.name} matches the checked-in output`, () => {
    const actual = `${JSON.stringify(createTheme(definition), null, 2)}\n`;
    const expected = fs.readFileSync(
      path.join(__dirname, "..", "themes", definition.fileName),
      "utf8",
    );
    assert.equal(actual, expected);
  });
}

test("no-italics clears both token systems and preserves other styles", () => {
  const base = createTheme(definitions[0]);
  base.tokenColors.push({
    scope: "test.style",
    settings: { fontStyle: "bold italic underline" },
  });
  const before = structuredClone(base);
  const actual = applyVariants(base, ["no-italics"]);

  assert.deepEqual(base, before);
  assert.deepEqual(actual.colors, base.colors);
  assert.equal(actual.tokenColors.at(-1).settings.fontStyle, "bold underline");
  for (const rule of actual.tokenColors) {
    assert.ok(!rule.settings.fontStyle?.split(/\s+/).includes("italic"));
  }
  assert.ok(actual.tokenColors.some((rule) => rule.settings.fontStyle === ""));
  for (const style of Object.values(actual.semanticTokenColors)) {
    assert.notEqual(style.italic, true);
  }
  assert.equal(actual.semanticTokenColors.decorator.italic, false);
});

test("borderless changes only its intended workbench colors", () => {
  const base = createTheme(definitions[0]);
  const before = structuredClone(base);
  const actual = applyVariants(base, ["borderless"]);
  const expectedColors = { ...base.colors };
  for (const key of [
    "editor.border",
    "surface.border",
    "titleBar.border",
    "activityBar.border",
    "sideBar.border",
    "statusBar.border",
    "statusBar.debuggingBorder",
    "statusBar.noFolderBorder",
    "editorGroupHeader.tabsBorder",
    "editorGroup.border",
    "tab.border",
    "panel.border",
  ]) {
    expectedColors[key] = "#00000000";
  }
  for (const key of [
    "activityBar.background",
    "activityBarTop.background",
    "sideBar.background",
    "sideBarSectionHeader.background",
  ]) {
    expectedColors[key] = base.colors["editor.background"];
  }
  for (const key of [
    "sideBarSectionHeader.border",
    "editorStickyScroll.border",
  ]) {
    expectedColors[key] = base.colors["editorOverviewRuler.border"];
  }

  assert.deepEqual(base, before);
  assert.deepEqual(actual, { ...base, colors: expectedColors });
});

test("variants compose in either order and are idempotent", () => {
  const base = createTheme(definitions[0]);
  const combined = applyVariants(base, ["borderless", "no-italics"]);
  assert.deepEqual(combined, applyVariants(base, ["no-italics", "borderless"]));
  assert.deepEqual(
    combined,
    applyVariants(combined, ["borderless", "no-italics"]),
  );
  assert.equal(applyVariants(base, []), base);
});

test("unknown and inherited variant names are rejected", () => {
  const base = createTheme(definitions[0]);
  for (const name of ["missing", "constructor", "toString", "__proto__"]) {
    assert.throws(() => applyVariants(base, [name]), /Unknown variant/);
  }
});

test("borderless rejects missing target and reference colors", () => {
  for (const key of [
    "panel.border",
    "editor.background",
    "editorOverviewRuler.border",
  ]) {
    const base = createTheme(definitions[0]);
    delete base.colors[key];
    assert.throws(
      () => applyVariants(base, ["borderless"]),
      /unknown workbench color/,
    );
  }
});
