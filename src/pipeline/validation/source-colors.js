const fs = require("fs");
const path = require("path");
const chroma = require("chroma-js");
const { resolveColorScheme } = require("../../colors/color-scheme");
const { isHexColor, paletteSources } = require("../../colors/color-scales");
const createTheme = require("../../formats/vscode/create-theme");
const themeDefinitions = require("../../formats/vscode/theme-definitions");

const root = path.join(__dirname, "..", "..", "..");
const schemeDirectory = path.join(root, "src", "colors", "schemes");
const packageJson = require(path.join(root, "package.json"));

function collectLeafPaths(value, prefix = [], leaves = new Map()) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      collectLeafPaths(child, [...prefix, key], leaves);
    }
    return leaves;
  }

  leaves.set(prefix.join("."), value);
  return leaves;
}

function collectUsedColorPaths(resolvedScheme) {
  const usedPaths = new Set();

  function wrap(node, prefix) {
    return new Proxy(node, {
      get(target, key, receiver) {
        const value = Reflect.get(target, key, receiver);

        if (typeof key !== "string") {
          return value;
        }

        const leafPath = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object") {
          return wrap(value, leafPath);
        }

        if (!Object.hasOwn(target, key)) {
          throw new Error(`invalid reference color.${leafPath}`);
        }

        usedPaths.add(leafPath);
        return value;
      },
    });
  }

  return (() => {
    createTheme({}, wrap(resolvedScheme, ""));
    return usedPaths;
  })();
}

function validatePalette({ errors }) {
  for (const [paletteFileName, families] of Object.entries(paletteSources)) {
    for (const [family, scale] of Object.entries(families)) {
      if (!scale || typeof scale !== "object" || Array.isArray(scale)) {
        errors.push(`${paletteFileName}: ${family} must be an object`);
        continue;
      }

      let previousLuminance = Infinity;

      for (const [shade, value] of Object.entries(scale).sort(
        ([left], [right]) => Number(left) - Number(right),
      )) {
        const numericShade = Number(shade);

        if (
          !Number.isInteger(numericShade) ||
          numericShade < 50 ||
          numericShade > 950 ||
          numericShade % 25 !== 0
        ) {
          errors.push(
            `${paletteFileName}: ${family}.${shade} is not a valid shade`,
          );
        }

        if (!isHexColor(value)) {
          errors.push(
            `${paletteFileName}: ${family}.${shade} is not a hex color`,
          );
          continue;
        }

        const luminance = chroma(value).luminance();
        if (luminance > previousLuminance) {
          errors.push(
            `${paletteFileName}: ${family}.${shade} must not be lighter than the previous shade`,
          );
        }
        previousLuminance = luminance;
      }
    }
  }
}

function readSchemes() {
  return Object.fromEntries(
    fs
      .readdirSync(schemeDirectory)
      .filter((fileName) => fileName.endsWith(".json"))
      .sort()
      .map((fileName) => {
        try {
          const scheme = JSON.parse(
            fs.readFileSync(path.join(schemeDirectory, fileName), "utf8"),
          );
          return [path.basename(fileName, ".json"), scheme];
        } catch (error) {
          throw new Error(`${fileName}: ${error.message}`);
        }
      }),
  );
}

function validateSchemes(
  schemes,
  definitions,
  resolvedColorsByScheme,
  { errors, warnings },
) {
  let expectedLeafPaths;

  for (const [name, scheme] of Object.entries(schemes)) {
    const fileName = `${name}.json`;
    const leafPaths = [...collectLeafPaths(scheme).keys()].sort();
    if (!expectedLeafPaths) {
      expectedLeafPaths = leafPaths;
    } else if (
      JSON.stringify(leafPaths) !== JSON.stringify(expectedLeafPaths)
    ) {
      errors.push(`${fileName}: semantic roles must match the other schemes`);
    }

    try {
      const colors = resolveColorScheme(scheme);
      const usedPaths = collectUsedColorPaths(colors);
      resolvedColorsByScheme.set(name, colors);
      for (const leafPath of leafPaths) {
        if (!usedPaths.has(leafPath)) {
          warnings.push(`${fileName}: unused ${leafPath}`);
        }
      }
    } catch (error) {
      errors.push(`${fileName}: ${error.message}`);
    }
  }

  const configuredSchemes = new Set(definitions.map(({ scheme }) => scheme));

  for (const scheme of configuredSchemes) {
    if (!Object.hasOwn(schemes, scheme)) {
      errors.push(`${scheme}.json: configured color scheme is missing`);
    }
  }

  for (const name of Object.keys(schemes)) {
    if (!configuredSchemes.has(name)) {
      warnings.push(`${name}.json: unused color scheme`);
    }
  }
}

function validateThemeDefinitions(definitions, contributions, { errors }) {
  const contributionsByFileName = new Map();
  const themeDefinitionsByFileName = new Map();

  for (const contribution of contributions) {
    const fileName = path.basename(contribution.path);

    if (contributionsByFileName.has(fileName)) {
      errors.push(`${fileName}: duplicate theme contribution`);
    } else {
      contributionsByFileName.set(fileName, contribution);
    }
  }

  for (const definition of definitions) {
    const { fileName, name } = definition;

    for (const option of ["borders", "italics"]) {
      if (typeof definition[option] !== "boolean") {
        errors.push(`${fileName}: ${option} must be a boolean`);
      }
    }

    if (themeDefinitionsByFileName.has(fileName)) {
      errors.push(`${fileName}: duplicate source theme definition`);
      continue;
    }

    themeDefinitionsByFileName.set(fileName, definition);
    const contribution = contributionsByFileName.get(fileName);

    if (!contribution) {
      errors.push(`${fileName}: missing theme contribution`);
    } else if (contribution.label !== name) {
      errors.push(
        `${fileName}: contribution label ${JSON.stringify(contribution.label)} does not match theme name ${JSON.stringify(name)}`,
      );
    }
    if (contribution && contribution.path !== `./themes/${fileName}`) {
      errors.push(
        `${fileName}: contribution path must be ./themes/${fileName}`,
      );
    }
  }

  for (const fileName of contributionsByFileName.keys()) {
    if (!themeDefinitionsByFileName.has(fileName)) {
      errors.push(`${fileName}: missing source theme definition`);
    }
  }
}

function validateSources({
  definitions = themeDefinitions,
  contributions = packageJson.contributes.themes,
  schemes = readSchemes(),
} = {}) {
  const diagnostics = { errors: [], warnings: [] };
  const resolvedColorsByScheme = new Map();
  validateThemeDefinitions(definitions, contributions, diagnostics);
  validatePalette(diagnostics);
  validateSchemes(schemes, definitions, resolvedColorsByScheme, diagnostics);
  return { ...diagnostics, resolvedColorsByScheme };
}

module.exports = { validateSources };
