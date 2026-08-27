const path = require("path");

const palette = require("./colors/palette.json");

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
  PALETTE_REFERENCE_PATTERN,
};
