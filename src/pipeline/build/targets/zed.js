const fs = require("node:fs");
const path = require("node:path");
const createTheme = require("../../../formats/zed/create-theme");
const definitions = require("../../../formats/zed/theme-definitions");

const manifest = fs.readFileSync(
  path.join(__dirname, "..", "..", "..", "formats", "zed", "extension.toml"),
  "utf8",
);

// Zed requires the license inside the extension directory, not the repository root.
const license = fs.readFileSync(
  path.join(__dirname, "..", "..", "..", "..", "LICENSE"),
  "utf8",
);

function createArtifacts(resolvedColorsByScheme) {
  const family = {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Nightcall",
    author: "Robert Patterson",
    themes: definitions.map(({ name, scheme }) =>
      createTheme(name, resolvedColorsByScheme.get(scheme)),
    ),
  };

  return [
    { fileName: "extension.toml", contents: manifest },
    { fileName: "LICENSE", contents: license },
    {
      fileName: "themes/nightcall.json",
      contents: `${JSON.stringify(family, null, 2)}\n`,
      family,
    },
  ];
}

module.exports = { createArtifacts };
