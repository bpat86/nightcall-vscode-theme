const { reportDiagnostics } = require("./diagnostics");
const { validateSources } = require("./source-colors");
const { validateGeneratedThemes, validateTheme } = require("./vscode-themes");

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

module.exports = { reportDiagnostics, validateSources, validateTheme };
