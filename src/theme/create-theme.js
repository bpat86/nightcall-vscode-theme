const { getThemeColors } = require("../palette");
const createSemanticTokenColors = require("./semantic-token-colors");
const createTokenColors = require("./token-colors");
const createWorkbenchColors = require("./workbench-colors");

function createTheme({ scheme, type, name, author, italics = true }) {
  const color = getThemeColors(scheme);

  return {
    $schema: "vscode://schemas/color-theme",
    name,
    author,
    type,
    colors: createWorkbenchColors(color),
    tokenColors: createTokenColors(color, { italics }),
    semanticHighlighting: true,
    semanticTokenColors: createSemanticTokenColors(color),
  };
}

module.exports = createTheme;
