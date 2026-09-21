const ANSI_COLOR_NAMES = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite",
];

function createPreset(color) {
  const preset = {
    "Background Color": color.canvas.default,
    "Bold Color": color.foreground.emphasis,
    "Cursor Color": color.accent.foreground,
    "Cursor Text Color": color.foreground.onEmphasis,
    "Foreground Color": color.foreground.default,
    "Selected Text Color": color.foreground.default,
    "Selection Color": color.interaction.selected,
  };

  ANSI_COLOR_NAMES.forEach((name, index) => {
    preset[`Ansi ${index} Color`] = color.ansi[name];
  });

  return preset;
}

module.exports = createPreset;
