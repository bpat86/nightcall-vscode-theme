const fs = require("fs").promises;
const path = require("path");
const createTheme = require("./theme/create-theme");
const themeDefinitions = require("./theme-definitions");
const {
  validateSources,
  validateTheme,
  reportDiagnostics,
} = require("./validate");

const root = path.join(__dirname, "..");
const outputDirectory = path.join(root, "themes");

async function build() {
  const sources = validateSources();
  reportDiagnostics(sources);
  if (sources.errors.length > 0) {
    throw new Error("Source validation failed.");
  }

  const themes = themeDefinitions.map((definition) => ({
    definition,
    theme: createTheme(
      definition,
      sources.colorsByScheme.get(definition.scheme),
    ),
  }));
  let invalid = false;
  for (const { definition, theme } of themes) {
    const diagnostics = validateTheme(theme, definition);
    reportDiagnostics(diagnostics);
    invalid ||= diagnostics.errors.length > 0;
  }
  if (invalid) {
    throw new Error("Generated theme validation failed.");
  }

  await fs.mkdir(outputDirectory, { recursive: true });
  await Promise.all(
    themes.map(({ definition, theme }) =>
      fs.writeFile(
        path.join(outputDirectory, definition.fileName),
        `${JSON.stringify(theme, null, 2)}\n`,
      ),
    ),
  );
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
