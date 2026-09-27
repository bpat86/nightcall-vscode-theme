const chroma = require("chroma-js");
const { isHexColor } = require("../../colors/color-scales");
const definitions = require("../../formats/zed/theme-definitions");

function validateFamily(family) {
  const diagnostics = { errors: [], warnings: [] };
  const { errors } = diagnostics;
  const location = "zed/themes/nightcall.json";

  if (family.$schema !== "https://zed.dev/schema/themes/v0.2.0.json") {
    errors.push(`${location}: missing the Zed theme-family schema`);
  }
  if (family.name !== "Nightcall" || family.author !== "Robert Patterson") {
    errors.push(`${location}: invalid theme family metadata`);
  }
  if (family.themes?.length !== definitions.length) {
    errors.push(`${location}: expected ${definitions.length} themes`);
    return diagnostics;
  }

  family.themes.forEach((theme, index) => {
    const themeLocation = `${location}: themes[${index}]`;
    if (theme.name !== definitions[index].name || theme.appearance !== "dark") {
      errors.push(`${themeLocation}: invalid theme name or appearance`);
    }
    if (!theme.style || typeof theme.style !== "object") {
      errors.push(`${themeLocation}: missing style`);
      return;
    }

    for (const [key, value] of Object.entries(theme.style)) {
      if (key === "accents") {
        if (
          !Array.isArray(value) ||
          value.length === 0 ||
          value.some((accent) => !isHexColor(accent))
        ) {
          errors.push(`${themeLocation}: accents must be generated hex colors`);
        }
      } else if (key === "players") {
        if (
          !Array.isArray(value) ||
          value.length === 0 ||
          value.some((player) =>
            ["cursor", "background", "selection"].some(
              (field) => !isHexColor(player?.[field]),
            ),
          )
        ) {
          errors.push(
            `${themeLocation}: players must have generated hex colors`,
          );
        }
      } else if (key === "syntax") {
        if (!value || typeof value !== "object") {
          errors.push(`${themeLocation}: syntax must be an object`);
          continue;
        }
        for (const [capture, highlight] of Object.entries(value)) {
          if (!isHexColor(highlight?.color)) {
            errors.push(`${themeLocation}: syntax.${capture}.color is invalid`);
          }
          if (
            highlight?.font_style &&
            !["normal", "italic", "oblique"].includes(highlight.font_style)
          ) {
            errors.push(
              `${themeLocation}: syntax.${capture}.font_style is invalid`,
            );
          }
        }
      } else if (!isHexColor(value)) {
        errors.push(`${themeLocation}: ${key} is not a generated hex color`);
      }
    }

    for (const key of [
      "editor.background",
      "editor.foreground",
      "text",
      "terminal.background",
      "terminal.foreground",
      "terminal.ansi.black",
      "terminal.ansi.bright_white",
    ]) {
      if (!isHexColor(theme.style[key])) {
        errors.push(`${themeLocation}: missing ${key}`);
      }
    }
    for (const capture of [
      "comment",
      "function",
      "keyword",
      "string",
      "type",
      "variable",
    ]) {
      if (!isHexColor(theme.style.syntax?.[capture]?.color)) {
        errors.push(`${themeLocation}: missing syntax.${capture}`);
      }
    }
    if (
      isHexColor(theme.style["editor.background"]) &&
      isHexColor(theme.style["editor.foreground"]) &&
      chroma.contrast(
        theme.style["editor.background"],
        theme.style["editor.foreground"],
      ) < 4.5
    ) {
      errors.push(`${themeLocation}: editor text has insufficient contrast`);
    }
  });

  return diagnostics;
}

module.exports = { validateFamily };
