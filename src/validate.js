const fs = require("fs");
const path = require("path");
const chroma = require("chroma-js");
const { ITALIC_SCOPES } = require("./theme/typography");
const themeDefinitions = require("./theme-definitions");
const {
  palette,
  paletteSources,
  PALETTE_REFERENCE_PATTERN,
} = require("./palette");
const createSemanticTokenColors = require("./theme/semantic-token-colors");
const createTokenColors = require("./theme/token-colors");
const createWorkbenchColors = require("./theme/workbench-colors");
const { VARIANTS } = require("./theme/variants");

const root = path.join(__dirname, "..");
const colorDirectory = path.join(__dirname, "colors");
const schemeDirectory = path.join(colorDirectory, "schemes");
const packageJson = require(path.join(root, "package.json"));
const errors = [];
const warnings = [];
const themeDefinitionsByFileName = new Map();

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

function isColor(value) {
  return (
    typeof value === "string" && /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(value)
  );
}

// Fall back to a placeholder so one bad leaf doesn't abort the whole scheme pass.
function resolveSchemeWithFallback(value) {
  if (typeof value === "string") {
    const [, family, shade] = PALETTE_REFERENCE_PATTERN.exec(value) || [];
    return palette[family]?.[shade] ?? "#000000";
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        resolveSchemeWithFallback(child),
      ]),
    );
  }

  return "#000000";
}

// Runs the theme creators against a recording proxy so used and missing
// color paths are observed exactly, instead of scraped from source text.
function collectUsedColorPaths(resolvedScheme, fileName) {
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

        if (value === undefined) {
          errors.push(`${fileName}: invalid reference color.${leafPath}`);
          return "#000000";
        }

        usedPaths.add(leafPath);
        return value;
      },
    });
  }

  const color = wrap(resolvedScheme, "");
  createWorkbenchColors(color);
  createTokenColors(color);
  createSemanticTokenColors(color);
  return usedPaths;
}

function validatePaletteReferences() {
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
          numericShade % 50 !== 0
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

  const schemeFiles = fs
    .readdirSync(schemeDirectory)
    .filter((fileName) => fileName.endsWith(".json"));
  let expectedLeafPaths;

  for (const fileName of schemeFiles) {
    const scheme = JSON.parse(
      fs.readFileSync(path.join(schemeDirectory, fileName), "utf8"),
    );
    const leafEntries = collectLeafPaths(scheme);
    const leafPaths = [...leafEntries.keys()].sort();
    const usedPaths = collectUsedColorPaths(
      resolveSchemeWithFallback(scheme),
      fileName,
    );

    for (const [leafPath, paletteReference] of leafEntries) {
      if (typeof paletteReference !== "string") {
        errors.push(`${fileName}: ${leafPath} must be a palette reference`);
        continue;
      }

      const referenceMatch = PALETTE_REFERENCE_PATTERN.exec(paletteReference);

      if (!referenceMatch) {
        errors.push(
          `${fileName}: ${leafPath} has invalid palette reference ${paletteReference}`,
        );
        continue;
      }

      const [, family, shade] = referenceMatch;

      if (!isColor(palette[family]?.[shade])) {
        errors.push(
          `${fileName}: ${leafPath} references missing palette color ${paletteReference}`,
        );
      }

      if (!usedPaths.has(leafPath)) {
        warnings.push(`${fileName}: unused ${leafPath}`);
      }
    }

    if (!expectedLeafPaths) {
      expectedLeafPaths = leafPaths;
    } else if (
      JSON.stringify(leafPaths) !== JSON.stringify(expectedLeafPaths)
    ) {
      errors.push(`${fileName}: semantic roles must match the other schemes`);
    }
  }

  const configuredSchemes = new Set(
    themeDefinitions.flatMap(({ scheme }) => (scheme ? [scheme] : [])),
  );

  for (const scheme of configuredSchemes) {
    if (!schemeFiles.includes(`${scheme}.json`)) {
      errors.push(`${scheme}.json: configured color scheme is missing`);
    }
  }

  for (const fileName of schemeFiles) {
    if (!configuredSchemes.has(path.basename(fileName, ".json"))) {
      warnings.push(`${fileName}: unused color scheme`);
    }
  }
}

function validateColor(value, location) {
  if (!isColor(value)) {
    errors.push(`${location} is not a generated hex color`);
  }
}

function validateTokenColors(theme, fileName, { variants, sourceFile }) {
  const scopes = new Map();
  const italicScopes = new Set();

  theme.tokenColors.forEach(({ scope, settings }, index) => {
    for (const property of ["foreground", "background"]) {
      if (settings[property] !== undefined) {
        validateColor(
          settings[property],
          `${fileName}: tokenColors[${index}].settings.${property}`,
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

      if (!sourceFile && scopes.has(selector)) {
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

  if (sourceFile) {
    return;
  }

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

function validateThemeDefinitions() {
  const contributionsByFileName = new Map();

  for (const contribution of packageJson.contributes.themes) {
    const fileName = path.basename(contribution.path);

    if (contributionsByFileName.has(fileName)) {
      errors.push(`${fileName}: duplicate theme contribution`);
    } else {
      contributionsByFileName.set(fileName, contribution);
    }
  }

  for (const definition of themeDefinitions) {
    const { fileName, name } = definition;

    if (!Array.isArray(definition.variants)) {
      errors.push(`${fileName}: variants must be an array`);
    } else {
      for (const variant of definition.variants) {
        if (!VARIANTS[variant]) {
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
  }

  for (const fileName of contributionsByFileName.keys()) {
    if (!themeDefinitionsByFileName.has(fileName)) {
      errors.push(`${fileName}: missing source theme definition`);
    }
  }
}

function validateContrast(theme, fileName) {
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

function validateGeneratedThemes() {
  for (const contribution of packageJson.contributes.themes) {
    const filePath = path.join(root, contribution.path);
    const fileName = path.relative(root, filePath);

    if (!fs.existsSync(filePath)) {
      errors.push(`${fileName}: generated theme is missing`);
      continue;
    }

    const theme = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const themeDefinition = themeDefinitionsByFileName.get(
      path.basename(filePath),
    );

    if (!themeDefinition) {
      errors.push(`${fileName}: missing source theme definition`);
      continue;
    }

    if (theme.$schema !== "vscode://schemas/color-theme") {
      errors.push(`${fileName}: missing the VS Code color-theme schema`);
    }

    for (const [key, value] of Object.entries(theme.colors)) {
      validateColor(value, `${fileName}: colors.${key}`);
    }

    validateTokenColors(theme, fileName, themeDefinition);

    for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
      validateColor(
        typeof value === "string" ? value : value.foreground,
        `${fileName}: semanticTokenColors.${key}`,
      );
    }

    validateContrast(theme, fileName);
  }
}

validatePaletteReferences();
validateThemeDefinitions();
validateGeneratedThemes();

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("Theme validation passed.");
}
