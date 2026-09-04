// A variant transforms exactly one section of a generated theme. Variants
// apply in definition order, so later variants see earlier results.

function colorReference(key) {
  return Object.freeze({ colorReference: key });
}

function isColorReference(value) {
  return (
    typeof value === "object" && value !== null && "colorReference" in value
  );
}

const TRANSPARENT = "#00000000";
const EDITOR_BACKGROUND = colorReference("editor.background");
const EDITOR_OVERVIEW_RULER_BORDER = colorReference(
  "editorOverviewRuler.border",
);

const BORDERLESS_OVERRIDES = Object.freeze({
  "titleBar.border": TRANSPARENT,
  "activityBar.border": TRANSPARENT,
  "activityBar.background": EDITOR_BACKGROUND,
  "activityBarTop.border": TRANSPARENT,
  "activityBarTop.background": EDITOR_BACKGROUND,
  "sideBar.border": TRANSPARENT,
  "sideBar.background": EDITOR_BACKGROUND,
  "sideBarSectionHeader.border": EDITOR_OVERVIEW_RULER_BORDER,
  "sideBarSectionHeader.background": EDITOR_BACKGROUND,
  "statusBar.border": TRANSPARENT,
  "statusBar.debuggingBorder": TRANSPARENT,
  "statusBar.noFolderBorder": TRANSPARENT,
  "surface.border": TRANSPARENT,
  "editor.border": TRANSPARENT,
  "editorGroupHeader.tabsBorder": TRANSPARENT,
  "editorGroup.border": TRANSPARENT,
  "tab.border": TRANSPARENT,
  "panel.border": TRANSPARENT,
  "editorStickyScroll.border": EDITOR_OVERVIEW_RULER_BORDER,
  // Terminal
  // "panel.background": EDITOR_BACKGROUND,
  // "terminal.border": TRANSPARENT,
  // "terminal.background": EDITOR_BACKGROUND,
  // "terminalCursor.background": EDITOR_BACKGROUND,
});

function resolveOverride(colors, key, value) {
  if (!Object.hasOwn(colors, key)) {
    throw new Error(`Override targets unknown workbench color ${key}`);
  }

  if (!isColorReference(value)) {
    return value;
  }

  if (!Object.hasOwn(colors, value.colorReference)) {
    throw new Error(
      `Override for ${key} references unknown workbench color ${value.colorReference}`,
    );
  }

  return colors[value.colorReference];
}

// References resolve against the colors as they were before these overrides.
function applyOverrides(colors, overrides) {
  return {
    ...colors,
    ...Object.fromEntries(
      Object.entries(overrides).map(([key, value]) => [
        key,
        resolveOverride(colors, key, value),
      ]),
    ),
  };
}

// An empty fontStyle explicitly cancels italics inherited from VS Code defaults.
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

const VARIANTS = Object.freeze({
  borderless: {
    section: "colors",
    apply: (colors) => applyOverrides(colors, BORDERLESS_OVERRIDES),
  },
  "no-italics": {
    section: "tokenColors",
    apply: (tokenColors) => tokenColors.map(removeItalic),
  },
});

function applyVariants(theme, names) {
  return names.reduce((result, name) => {
    const variant = VARIANTS[name];

    if (!variant) {
      throw new Error(`Unknown variant: ${name}`);
    }

    return {
      ...result,
      [variant.section]: variant.apply(result[variant.section]),
    };
  }, theme);
}

module.exports = {
  applyVariants,
  VARIANTS,
};
