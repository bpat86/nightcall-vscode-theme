const fs = require("fs");
const path = require("path");
const chroma = require("chroma-js");
const { ITALIC_SCOPES } = require("./theme/typography");
const themeDefinitions = require("./theme-definitions");
const { paletteSources, resolveScheme, isColor } = require("./palette");
const createTheme = require("./theme/create-theme");
const { VARIANTS } = require("./theme/variants");

const root = path.join(__dirname, "..");
const colorDirectory = path.join(__dirname, "colors");
const schemeDirectory = path.join(colorDirectory, "schemes");
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

// Runs the theme creators against a recording proxy so used and missing
// color paths are observed exactly, instead of scraped from source text.
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

  const color = wrap(resolvedScheme, "");
  createTheme({}, color);
  return usedPaths;
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

        if (!isColor(value)) {
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
  colorsByScheme,
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
      const colors = resolveScheme(scheme);
      const usedPaths = collectUsedColorPaths(colors);
      colorsByScheme.set(name, colors);
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

function validateColor(value, location, errors) {
  if (!isColor(value)) {
    errors.push(`${location} is not a generated hex color`);
  }
}

function validateTokenColors(
  theme,
  fileName,
  { variants },
  { errors, warnings },
) {
  const scopes = new Map();
  const italicScopes = new Set();

  theme.tokenColors.forEach(({ scope, settings }, index) => {
    for (const property of ["foreground", "background"]) {
      if (settings[property] !== undefined) {
        validateColor(
          settings[property],
          `${fileName}: tokenColors[${index}].settings.${property}`,
          errors,
        );
      }
    }

    const selectors = (Array.isArray(scope) ? scope : [scope]).flatMap(
      (selector) => selector.split(",").map((value) => value.trim()),
    );
    const serializedSettings = JSON.stringify(
      settings,
      Object.keys(settings).sort(),
    );
    const isItalic = settings.fontStyle?.split(/\s+/).includes("italic");

    for (const selector of selectors) {
      if (isItalic) {
        italicScopes.add(selector);
      }

      if (scopes.has(selector)) {
        if (scopes.get(selector) !== serializedSettings) {
          errors.push(
            `${fileName}: conflicting token settings for ${selector}`,
          );
        } else {
          warnings.push(
            `${fileName}: duplicate token settings for ${selector}`,
          );
        }
      } else {
        scopes.set(selector, serializedSettings);
      }
    }
  });

  if (variants.includes("no-italics")) {
    if (italicScopes.size > 0) {
      errors.push(
        `${fileName}: contains italic scopes: ${[...italicScopes].join(", ")}`,
      );
    }
  } else {
    const expectedItalicScopes = new Set(ITALIC_SCOPES);
    const missingScopes = [...expectedItalicScopes].filter(
      (scope) => !italicScopes.has(scope),
    );
    const unexpectedScopes = [...italicScopes].filter(
      (scope) => !expectedItalicScopes.has(scope),
    );

    if (missingScopes.length > 0 || unexpectedScopes.length > 0) {
      errors.push(
        `${fileName}: invalid italic scopes (missing: ${missingScopes.join(", ") || "none"}; unexpected: ${unexpectedScopes.join(", ") || "none"})`,
      );
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

    if (!Array.isArray(definition.variants)) {
      errors.push(`${fileName}: variants must be an array`);
    } else {
      for (const variant of definition.variants) {
        if (!Object.hasOwn(VARIANTS, variant)) {
          errors.push(`${fileName}: unknown variant ${variant}`);
        }
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

function validateContrast(theme, fileName, { errors }) {
  const pairs = [
    ["foreground", "editor.background"],
    ["input.foreground", "input.background"],
    ["dropdown.foreground", "dropdown.background"],
    ["notifications.foreground", "notifications.background"],
    ["inputValidation.errorForeground", "inputValidation.errorBackground"],
    ["inputValidation.infoForeground", "inputValidation.infoBackground"],
    ["inputValidation.warningForeground", "inputValidation.warningBackground"],
  ];

  for (const [foregroundKey, backgroundKey] of pairs) {
    const foreground = theme.colors[foregroundKey];
    const background = theme.colors[backgroundKey];

    if (!isColor(foreground) || !isColor(background)) {
      continue;
    }

    const ratio = chroma.contrast(foreground, background);
    if (ratio < 4.5) {
      errors.push(
        `${fileName}: ${foregroundKey} on ${backgroundKey} has ${ratio.toFixed(2)}:1 contrast`,
      );
    }
  }
}

function validateSources({
  definitions = themeDefinitions,
  contributions = packageJson.contributes.themes,
  schemes = readSchemes(),
} = {}) {
  const diagnostics = { errors: [], warnings: [] };
  const colorsByScheme = new Map();
  validateThemeDefinitions(definitions, contributions, diagnostics);
  validatePalette(diagnostics);
  validateSchemes(schemes, definitions, colorsByScheme, diagnostics);
  return { ...diagnostics, colorsByScheme };
}

function validateTheme(theme, definition) {
  const diagnostics = { errors: [], warnings: [] };
  const { errors } = diagnostics;
  const fileName = `themes/${definition.fileName}`;

  if (theme.$schema !== "vscode://schemas/color-theme") {
    errors.push(`${fileName}: missing the VS Code color-theme schema`);
  }
  if (theme.name !== definition.name || theme.type !== definition.type) {
    errors.push(
      `${fileName}: generated name or type does not match its definition`,
    );
  }
  if (theme.semanticHighlighting !== true) {
    errors.push(`${fileName}: semantic highlighting must be enabled`);
  }

  for (const [key, value] of Object.entries(theme.colors)) {
    validateColor(value, `${fileName}: colors.${key}`, errors);
  }

  validateTokenColors(theme, fileName, definition, diagnostics);

  for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
    validateColor(
      typeof value === "string" ? value : value.foreground,
      `${fileName}: semanticTokenColors.${key}`,
      errors,
    );
    if (definition.variants.includes("no-italics") && value.italic === true) {
      errors.push(`${fileName}: semanticTokenColors.${key} must not be italic`);
    }
  }

  validateContrast(theme, fileName, diagnostics);
  return diagnostics;
}

function validateGeneratedThemes() {
  const diagnostics = { errors: [], warnings: [] };
  const { errors, warnings } = diagnostics;
  const definitionsByFileName = new Map(
    themeDefinitions.map((definition) => [definition.fileName, definition]),
  );
  for (const contribution of packageJson.contributes.themes) {
    const filePath = path.join(root, contribution.path);
    const fileName = path.relative(root, filePath);

    if (!fs.existsSync(filePath)) {
      errors.push(`${fileName}: generated theme is missing`);
      continue;
    }

    const definition = definitionsByFileName.get(path.basename(filePath));

    if (!definition) {
      errors.push(`${fileName}: missing source theme definition`);
      continue;
    }

    try {
      const theme = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const result = validateTheme(theme, definition);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    } catch (error) {
      errors.push(`${fileName}: ${error.message}`);
    }
  }
  return diagnostics;
}

function reportDiagnostics({ errors, warnings }) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
}

function main() {
  const sources = validateSources();
  reportDiagnostics(sources);
  if (sources.errors.length > 0) {
    process.exitCode = 1;
    return;
  }

  const output = validateGeneratedThemes();
  reportDiagnostics(output);
  if (output.errors.length > 0) {
    process.exitCode = 1;
  } else {
    console.log("Theme validation passed.");
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { validateSources, validateTheme, reportDiagnostics };
