const path = require("path");
const {
  discardStagedOutput,
  replaceOutputDirectory,
  stageOutputDirectory,
} = require("./write-output-directory");
const vscode = require("./targets/vscode");
const iterm2 = require("./targets/iterm2");
const { validateSources, reportDiagnostics } = require("../validation");

const root = path.join(__dirname, "..", "..", "..");
const outputDirectory = path.join(root, "themes");
const iterm2OutputDirectory = path.join(root, "iterm2");

async function build() {
  const sources = validateSources();
  reportDiagnostics(sources);
  if (sources.errors.length > 0) {
    throw new Error("Source validation failed.");
  }

  const themes = vscode.createArtifacts(sources.resolvedColorsByScheme);
  const presets = iterm2.createArtifacts(sources.resolvedColorsByScheme);
  let invalid = false;
  for (const diagnostics of vscode.validateArtifacts(themes)) {
    reportDiagnostics(diagnostics);
    invalid ||= diagnostics.errors.length > 0;
  }
  if (invalid) {
    throw new Error("Generated theme validation failed.");
  }

  const stagedOutputs = await Promise.all([
    stageOutputDirectory(root, outputDirectory, themes),
    stageOutputDirectory(root, iterm2OutputDirectory, presets),
  ]);

  try {
    await Promise.all(stagedOutputs.map(replaceOutputDirectory));
  } finally {
    await Promise.all(stagedOutputs.map(discardStagedOutput));
  }
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
