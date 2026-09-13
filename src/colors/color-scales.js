// Classic-only color families live in their own file; families must not repeat.
const paletteSources = {
  "palettes/default.json": require("./palettes/default.json"),
  "palettes/classic.json": require("./palettes/classic.json"),
};

const colorScales = {};

for (const [fileName, families] of Object.entries(paletteSources)) {
  for (const [family, scale] of Object.entries(families)) {
    if (Object.hasOwn(colorScales, family)) {
      throw new Error(
        `Palette family ${family} in ${fileName} is already defined in another palette file`,
      );
    }

    colorScales[family] = scale;
  }
}

function isHexColor(value) {
  return (
    typeof value === "string" && /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(value)
  );
}

module.exports = { colorScales, isHexColor, paletteSources };
