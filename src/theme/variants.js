// Names are applied in order, so a later variant receives the previous
// variant's result.

const TRANSPARENT = "#00000000";

function getColor(colors, key) {
  if (!Object.hasOwn(colors, key)) {
    throw new Error(`Borderless uses unknown workbench color ${key}`);
  }

  return colors[key];
}

function applyBorderless(theme) {
  const background = getColor(theme.colors, "editor.background");
  const subtleBorder = getColor(theme.colors, "editorOverviewRuler.border");
  const overrides = {
    "editor.border": TRANSPARENT,
    "surface.border": TRANSPARENT,
    "titleBar.border": TRANSPARENT,
    "activityBar.border": TRANSPARENT,
    "activityBar.background": background,
    "activityBarTop.background": background,
    "sideBar.border": TRANSPARENT,
    "sideBar.background": background,
    "sideBarSectionHeader.border": subtleBorder,
    "sideBarSectionHeader.background": background,
    "statusBar.border": TRANSPARENT,
    "statusBar.debuggingBorder": TRANSPARENT,
    "statusBar.noFolderBorder": TRANSPARENT,
    "editorGroupHeader.tabsBorder": TRANSPARENT,
    "editorGroup.border": TRANSPARENT,
    "tab.border": TRANSPARENT,
    "panel.border": TRANSPARENT,
    "editorStickyScroll.border": subtleBorder,
  };

  for (const key of Object.keys(overrides)) {
    getColor(theme.colors, key);
  }

  return {
    ...theme,
    colors: { ...theme.colors, ...overrides },
  };
}

// Keep non-italic rules explicit so VS Code defaults cannot reintroduce italics.
function removeItalic(rule) {
  const styles = rule.settings.fontStyle?.split(" ") ?? [];

  if (!styles.includes("italic")) {
    return rule;
  }

  return {
    ...rule,
    settings: {
      ...rule.settings,
      fontStyle: styles.filter((style) => style !== "italic").join(" "),
    },
  };
}

function removeSemanticItalics(tokenColors) {
  return Object.fromEntries(
    Object.entries(tokenColors).map(([selector, style]) => [
      selector,
      typeof style === "object" && style.italic
        ? { ...style, italic: false }
        : style,
    ]),
  );
}

const VARIANTS = Object.freeze({
  borderless: applyBorderless,
  "no-italics": (theme) => ({
    ...theme,
    tokenColors: theme.tokenColors.map(removeItalic),
    semanticTokenColors: removeSemanticItalics(theme.semanticTokenColors),
  }),
});

function applyVariants(theme, names) {
  return names.reduce((result, name) => {
    if (!Object.hasOwn(VARIANTS, name)) {
      throw new Error(`Unknown variant: ${name}`);
    }

    return VARIANTS[name](result);
  }, theme);
}

module.exports = {
  applyVariants,
  VARIANTS,
};
