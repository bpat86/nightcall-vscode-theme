const definitions = require("../../../formats/iterm2/preset-definitions");
const createPreset = require("../../../formats/iterm2/create-preset");
const serializePreset = require("../../../formats/iterm2/serialize-preset");

function createArtifacts(resolvedColorsByScheme) {
  return definitions.map(({ scheme, fileName }) => ({
    fileName,
    contents: serializePreset(createPreset(resolvedColorsByScheme.get(scheme))),
  }));
}

module.exports = { createArtifacts };
