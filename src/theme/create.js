const { loadResolvedColorScheme } = require("../colors/color-scheme");
const createSemanticTokenColors = require("./semantic-token-colors");
const createTokenColors = require("./token-colors");
const createWorkbenchColors = require("./workbench-colors");
const { applyThemeOptions } = require("./options");

function createTheme(
  { scheme, type, name, author, borders = true, italics = true },
  resolvedColors = loadResolvedColorScheme(scheme),
) {
  const base = {
    $schema: "vscode://schemas/color-theme",
    name,
    author,
    type,
    colors: createWorkbenchColors(resolvedColors),
    tokenColors: createTokenColors(resolvedColors),
    semanticHighlighting: true,
    semanticTokenColors: createSemanticTokenColors(resolvedColors),
  };

  return applyThemeOptions(base, { borders, italics });
}

module.exports = createTheme;
