const path = require("path");

// Classic-only color families live in their own file; families must not repeat.
const paletteSources = {
  "palette.json": require("./colors/palette.json"),
  "palette-classic.json": require("./colors/palette-classic.json"),
};

const palette = {};

for (const [fileName, families] of Object.entries(paletteSources)) {
  for (const [family, scale] of Object.entries(families)) {
    if (palette[family]) {
      throw new Error(
        `Palette family ${family} in ${fileName} is already defined in another palette file`,
      );
    }

    palette[family] = scale;
  }
}

const PALETTE_REFERENCE_PATTERN = /^\{([A-Za-z][\w]*)\.(\d+)\}$/;

function loadScheme(name) {
  try {
    return require(path.join(__dirname, "colors", "schemes", `${name}.json`));
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      throw new Error(`Color scheme not found: ${name}`);
    }

    throw error;
  }
}

function resolveValue(value, location) {
  if (typeof value === "string") {
    const referenceMatch = PALETTE_REFERENCE_PATTERN.exec(value);
    const [, family, shade] = referenceMatch || [];
    const resolved = palette[family]?.[shade];

    if (!resolved) {
      throw new Error(
        `Theme color ${location} references missing palette color ${value}`,
      );
    }

    return resolved;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        resolveValue(child, location ? `${location}.${key}` : key),
      ]),
    );
  }

  throw new Error(`Theme color ${location} must be a palette reference`);
}

function getThemeColors(schemeName) {
  const scheme = loadScheme(schemeName);

  return resolveValue(scheme, "");
}

module.exports = {
  getThemeColors,
  loadScheme,
  palette,
  paletteSources,
  PALETTE_REFERENCE_PATTERN,
};
