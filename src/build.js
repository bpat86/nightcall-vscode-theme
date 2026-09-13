const fs = require("fs").promises;
const path = require("path");
const createTheme = require("./theme/create");
const themeDefinitions = require("./theme/definitions");
const {
  validateSources,
  validateTheme,
  reportDiagnostics,
} = require("./validate");

const root = path.join(__dirname, "..");
const outputDirectory = path.join(root, "themes");

async function writeThemes(themes) {
  const stagingDirectory = await fs.mkdtemp(path.join(root, ".themes-"));

  try {
    await Promise.all(
      themes.map(({ definition, theme }) =>
        fs.writeFile(
          path.join(stagingDirectory, definition.fileName),
          `${JSON.stringify(theme, null, 2)}\n`,
        ),
      ),
    );
    await fs.rm(outputDirectory, { recursive: true, force: true });
    await fs.rename(stagingDirectory, outputDirectory);
  } catch (error) {
    await fs.rm(stagingDirectory, { recursive: true, force: true });
    throw error;
  }
}

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
      sources.resolvedColorsByScheme.get(definition.scheme),
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

  await writeThemes(themes);
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
