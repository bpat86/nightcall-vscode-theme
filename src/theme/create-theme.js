const { getThemeColors } = require("../palette");
const createSemanticTokenColors = require("./semantic-token-colors");
const createTokenColors = require("./token-colors");
const createWorkbenchColors = require("./workbench-colors");
const { applyVariants } = require("./variants");

function createTheme({ scheme, type, name, author, variants }) {
  const color = getThemeColors(scheme);

  const base = {
    $schema: "vscode://schemas/color-theme",
    name,
    author,
    type,
    colors: createWorkbenchColors(color),
    tokenColors: createTokenColors(color),
    semanticHighlighting: true,
    semanticTokenColors: createSemanticTokenColors(color),
  };

  return applyVariants(base, variants);
}

module.exports = createTheme;
