const fs = require("fs").promises;
const path = require("path");
const createTheme = require("./theme/create-theme");
const themeDefinitions = require("./theme-definitions");

const root = path.join(__dirname, "..");
const outputDirectory = path.join(root, "themes");

function writeThemeFile({ fileName, sourceFile, palette, ...metadata }) {
  const outputPath = path.join(outputDirectory, fileName);

  if (sourceFile) {
    return fs.copyFile(path.join(root, sourceFile), outputPath);
  }

  return fs.writeFile(
    outputPath,
    `${JSON.stringify(createTheme({ palette, ...metadata }), null, 2)}\n`,
  );
}

async function build() {
  await fs.mkdir(outputDirectory, { recursive: true });
  await Promise.all(themeDefinitions.map(writeThemeFile));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
