const assert = require("node:assert/strict");
const test = require("node:test");
const { loadResolvedColorScheme } = require("../src/colors/color-scheme");
const definitions = require("../src/formats/iterm2/preset-definitions");
const createPreset = require("../src/formats/iterm2/create-preset");
const serializePreset = require("../src/formats/iterm2/serialize-preset");

test("iTerm2 definitions cover each color scheme once", () => {
  assert.deepEqual(definitions.map(({ scheme }) => scheme).sort(), [
    "dark-classic",
    "dark-default",
    "dark-muted",
  ]);
  assert.equal(new Set(definitions.map(({ fileName }) => fileName)).size, 3);
});

test("iTerm2 presets use the resolved terminal and interface colors", () => {
  const color = loadResolvedColorScheme("dark-default");
  const preset = createPreset(color);

  assert.equal(preset["Background Color"], color.canvas.default);
  assert.equal(preset["Foreground Color"], color.foreground.default);
  assert.equal(preset["Cursor Color"], color.accent.foreground);
  assert.equal(preset["Selection Color"], color.interaction.selected);
  assert.equal(preset["Ansi 0 Color"], color.ansi.black);
  assert.equal(preset["Ansi 15 Color"], color.ansi.brightWhite);
});

test("iTerm2 presets serialize as XML plists with sRGB components", () => {
  const preset = serializePreset(
    createPreset(loadResolvedColorScheme("dark-muted")),
  );

  assert.match(preset, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(preset, /<plist version="1\.0">/);
  assert.match(preset, /<key>Ansi 0 Color<\/key>/);
  assert.match(preset, /<key>Color Space<\/key>\n<string>sRGB<\/string>/);
  assert.match(preset, /<real>0\.\d+<\/real>/);
  assert.match(preset, /<\/plist>\n$/);
});
