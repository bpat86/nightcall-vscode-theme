const path = require("path");
const { colorScales, isHexColor } = require("./color-scales");

const PALETTE_REFERENCE_PATTERN = /^\{([A-Za-z][\w]*)\.(\d+)\}$/;

function loadColorScheme(name) {
  try {
    return require(path.join(__dirname, "schemes", `${name}.json`));
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
    if (!referenceMatch) {
      throw new Error(
        `Theme color ${location} has invalid palette reference ${value}`,
      );
    }
    const [, family, shade] = referenceMatch;
    const resolved = colorScales[family]?.[shade];

    if (!isHexColor(resolved)) {
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

function resolveColorScheme(scheme) {
  return resolveValue(scheme, "");
}

function loadResolvedColorScheme(name) {
  return resolveColorScheme(loadColorScheme(name));
}

module.exports = { loadResolvedColorScheme, resolveColorScheme };
