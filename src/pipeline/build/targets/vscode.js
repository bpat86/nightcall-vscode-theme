const createTheme = require("../../../formats/vscode/create-theme");
const definitions = require("../../../formats/vscode/theme-definitions");
const { validateTheme } = require("../../validation/vscode-themes");

function createArtifacts(resolvedColorsByScheme) {
  return definitions.map((definition) => {
    const theme = createTheme(
      definition,
      resolvedColorsByScheme.get(definition.scheme),
    );

    return {
      definition,
      fileName: definition.fileName,
      contents: `${JSON.stringify(theme, null, 2)}\n`,
      theme,
    };
  });
}

function validateArtifacts(artifacts) {
  return artifacts.flatMap(({ definition, theme }) =>
    validateTheme(theme, definition),
  );
}

module.exports = { createArtifacts, validateArtifacts };
