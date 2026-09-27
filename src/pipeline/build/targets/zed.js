const fs = require("node:fs");
const path = require("node:path");
const createTheme = require("../../../formats/zed/create-theme");
const definitions = require("../../../formats/zed/theme-definitions");

const manifest = fs.readFileSync(
  path.join(__dirname, "..", "..", "..", "formats", "zed", "extension.toml"),
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
    {
      fileName: "themes/nightcall.json",
      contents: `${JSON.stringify(family, null, 2)}\n`,
      family,
    },
  ];
}

module.exports = { createArtifacts };
