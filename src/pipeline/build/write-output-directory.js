const fs = require("fs").promises;
const path = require("path");

async function stageOutputDirectory(root, outputDirectory, artifacts) {
  const stagingDirectory = await fs.mkdtemp(
    path.join(root, `.${path.basename(outputDirectory)}-`),
  );

  try {
    await Promise.all(
      artifacts.map(async ({ fileName, contents }) => {
        const filePath = path.join(stagingDirectory, fileName);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, contents);
      }),
    );
    return { outputDirectory, stagingDirectory };
  } catch (error) {
    await fs.rm(stagingDirectory, { recursive: true, force: true });
    throw error;
  }
}

async function replaceOutputDirectory({ outputDirectory, stagingDirectory }) {
  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.rename(stagingDirectory, outputDirectory);
}

async function discardStagedOutput({ stagingDirectory }) {
  await fs.rm(stagingDirectory, { recursive: true, force: true });
}

module.exports = {
  discardStagedOutput,
  replaceOutputDirectory,
  stageOutputDirectory,
};
