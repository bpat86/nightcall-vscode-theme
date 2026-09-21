function colorComponents(hex) {
  return [1, 3, 5].map(
    (offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255,
  );
}

function serializeColor(hex) {
  const [red, green, blue] = colorComponents(hex);
  return [
    "<dict>",
    "<key>Color Space</key>",
    "<string>sRGB</string>",
    "<key>Red Component</key>",
    `<real>${red}</real>`,
    "<key>Green Component</key>",
    `<real>${green}</real>`,
    "<key>Blue Component</key>",
    `<real>${blue}</real>`,
    "</dict>",
  ].join("\n");
}

function serializePreset(preset) {
  const entries = Object.entries(preset).flatMap(([key, value]) => [
    `<key>${key}</key>`,
    serializeColor(value),
  ]);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    "<dict>",
    ...entries,
    "</dict>",
    "</plist>",
    "",
  ].join("\n");
}

module.exports = serializePreset;
