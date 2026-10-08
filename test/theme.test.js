const assert = require("node:assert/strict");
const test = require("node:test");
const chroma = require("chroma-js");
const createTheme = require("../src/formats/vscode/create-theme");
const definitions = require("../src/formats/vscode/theme-definitions");
const { applyThemeOptions } = require("../src/formats/vscode/options");
const { loadResolvedColorScheme } = require("../src/colors/color-scheme");

const STANDARD_SEMANTIC_TOKEN_TYPES = new Set([
  "namespace",
  "type",
  "class",
  "enum",
  "interface",
  "struct",
  "typeParameter",
  "parameter",
  "variable",
  "property",
  "enumMember",
  "event",
  "function",
  "method",
  "macro",
  "label",
  "comment",
  "string",
  "keyword",
  "number",
  "regexp",
  "operator",
  "decorator",
]);
const STANDARD_SEMANTIC_TOKEN_MODIFIERS = new Set([
  "declaration",
  "definition",
  "readonly",
  "static",
  "deprecated",
  "abstract",
  "async",
  "modification",
  "documentation",
  "defaultLibrary",
]);

test("semantic token rules use and cover the standard token types", () => {
  const semanticTokenColors = createTheme(definitions[0]).semanticTokenColors;
  const coveredTypes = new Set();

  for (const selector of Object.keys(semanticTokenColors)) {
    const [type, ...modifiers] = selector.split(".");
    assert.ok(STANDARD_SEMANTIC_TOKEN_TYPES.has(type), `invalid type ${type}`);
    for (const modifier of modifiers) {
      assert.ok(
        STANDARD_SEMANTIC_TOKEN_MODIFIERS.has(modifier),
        `invalid modifier ${modifier}`,
      );
    }
    if (modifiers.length === 0) {
      coveredTypes.add(type);
    }
  }

  assert.deepEqual(coveredTypes, STANDARD_SEMANTIC_TOKEN_TYPES);
  for (const type of ["variable", "parameter", "property"]) {
    assert.ok(Object.hasOwn(semanticTokenColors, `${type}.readonly`));
  }
});

test("secondary accent colors are used in the workbench", () => {
  const theme = createTheme(definitions[0]);
  const resolved = loadResolvedColorScheme("dark-default");

  assert.equal(theme.colors.focusBorder, resolved.accent.secondary.background);
  assert.equal(
    theme.colors["window.activeBorder"],
    resolved.accent.secondary.background,
  );
  assert.equal(
    theme.colors["tab.selectedBorderTop"],
    resolved.accent.secondary.background,
  );
  assert.equal(
    theme.colors["terminal.tab.activeBorder"],
    resolved.accent.secondary.background,
  );
});

test("accent foregrounds contrast with their backgrounds", () => {
  for (const definition of definitions) {
    const resolved = loadResolvedColorScheme(definition.scheme);
    for (const role of ["primary", "secondary", "tertiary"]) {
      const accent = resolved.accent[role];
      assert.ok(
        chroma(accent.foreground).luminance() <
          chroma(accent.background).luminance(),
        `${definition.name}: ${role} accent foreground must be darker`,
      );
      assert.ok(
        chroma.contrast(accent.foreground, accent.background) >= 4.5,
        `${definition.name}: ${role} accent contrast must be at least 4.5:1`,
      );
      assert.ok(
        chroma.contrast(accent.border, accent.background) >= 3,
        `${definition.name}: ${role} accent border contrast must be at least 3:1`,
      );
    }

    assert.equal(
      resolved.accent.secondary.foreground,
      resolved.control.primary.foreground,
      `${definition.name}: secondary accent foreground matches primary control foreground`,
    );
    assert.equal(
      resolved.accent.secondary.background,
      resolved.control.primary.background,
      `${definition.name}: secondary accent background matches primary control background`,
    );
  }
});

test("interaction colors cover highlighted and focused states", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);

    assert.equal(
      colors["list.filterMatchBackground"],
      chroma(resolved.interaction.highlighted).alpha(0.5).hex(),
      `${definition.name}: highlighted list matches`,
    );
    assert.equal(
      colors["list.focusBackground"],
      resolved.accent.secondary.background,
      `${definition.name}: focused list items`,
    );
    assert.equal(
      colors["list.focusForeground"],
      resolved.accent.secondary.foreground,
      `${definition.name}: focused list text`,
    );
    assert.equal(
      colors["list.focusHighlightForeground"],
      resolved.accent.secondary.foreground,
      `${definition.name}: focused list match highlights`,
    );
    assert.equal(
      colors["settings.focusedRowBackground"],
      chroma(resolved.interaction.focused).alpha(0.5).hex(),
      `${definition.name}: focused settings rows`,
    );
    for (const key of [
      "list.hoverBackground",
      "tab.hoverBackground",
      "statusBarItem.hoverBackground",
      "welcomePage.tileHoverBackground",
    ]) {
      assert.equal(
        colors[key],
        chroma(resolved.interaction.hover).alpha(0.5).hex(),
        `${definition.name}: ${key}`,
      );
    }
    for (const key of [
      "tab.selectedBackground",
      "editorSuggestWidget.selectedBackground",
    ]) {
      assert.equal(
        colors[key],
        chroma(resolved.interaction.selected).alpha(0.5).hex(),
        `${definition.name}: ${key}`,
      );
    }
    assert.equal(
      colors["notebook.selectedCellBackground"],
      chroma(resolved.interaction.selected).alpha(0.5).hex(),
      `${definition.name}: notebook selected cell`,
    );
    assert.equal(
      colors["statusBarItem.activeBackground"],
      resolved.interaction.pressed,
      `${definition.name}: pressed status bar item`,
    );
    assert.equal(
      colors["editor.stackFrameHighlightBackground"],
      chroma(resolved.interaction.highlighted).alpha(0.5).hex(),
      `${definition.name}: highlighted stack frame`,
    );
  }
});

test("pink badges use dedicated high-contrast colors in every theme", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);

    for (const badge of [
      "badge",
      "activityBarBadge",
      "profileBadge",
      "agentsBadge",
      "agentsUnreadBadge",
    ]) {
      assert.equal(
        colors[`${badge}.background`],
        resolved.badge.background,
        `${definition.name}: ${badge} background`,
      );
      assert.equal(
        colors[`${badge}.foreground`],
        resolved.badge.foreground,
        `${definition.name}: ${badge} foreground`,
      );
      assert.ok(
        chroma.contrast(
          colors[`${badge}.background`],
          colors[`${badge}.foreground`],
        ) >= 4.5,
        `${definition.name}: ${badge} contrast must be at least 4.5:1`,
      );
    }

    assert.equal(
      colors["activityWarningBadge.background"],
      resolved.attention.emphasis,
    );
    assert.equal(
      colors["activityErrorBadge.background"],
      resolved.danger.emphasis,
    );
    assert.equal(
      colors["extensionBadge.remoteBackground"],
      resolved.info.emphasis,
    );
    assert.equal(
      colors["button.background"],
      resolved.control.primary.background,
    );
    assert.equal(
      colors["button.foreground"],
      resolved.control.primary.foreground,
    );
  }
});

test("agent sessions use distinct shell, panel, and card surfaces", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);

    assert.equal(
      colors["agents.background"],
      resolved.canvas.default,
      `${definition.name}: agent shell background`,
    );
    assert.equal(
      colors["agentsPanel.background"],
      resolved.canvas.inset,
      `${definition.name}: agent panel background`,
    );
    assert.notEqual(
      colors["agentsPanel.background"],
      colors["agents.background"],
      `${definition.name}: agent shell and panel surfaces must differ`,
    );
    assert.equal(
      colors["agentsDetail.background"],
      resolved.canvas.default,
      `${definition.name}: agent details background`,
    );
  }
});

test("agent frames and input borders remain visible in every theme", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);

    for (const key of [
      "agentsPanel.border",
      "agentsCard.border",
      "agentsBottomPanel.border",
      "agentsChatInput.border",
    ]) {
      assert.match(
        colors[key],
        /^#[0-9a-f]{6}$/i,
        `${definition.name}: ${key} must be opaque`,
      );
      assert.equal(
        colors[key],
        colors["agentsPanel.border"],
        `${definition.name}: ${key} uses the shared agent frame color`,
      );
      for (const background of [
        "agents.background",
        "agentsPanel.background",
        "agentsDetail.background",
        "activeSessionView.background",
        "agentsChatInput.background",
      ]) {
        assert.ok(
          chroma.contrast(colors[key], colors[background]) >= 3,
          `${definition.name}: ${key} against ${background} must reach 3:1`,
        );
      }
    }
    assert.equal(
      colors["agentsChatInput.focusBorder"],
      resolved.accent.secondary.background,
      `${definition.name}: focused agent input retains the secondary accent`,
    );
    assert.ok(
      chroma.contrast(
        colors["agentsChatInput.focusBorder"],
        colors["agentsChatInput.background"],
      ) >
        chroma.contrast(
          colors["agentsChatInput.border"],
          colors["agentsChatInput.background"],
        ),
      `${definition.name}: focused agent input must be more prominent`,
    );
  }
});

test("extension icon colors use their dedicated scheme roles", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const extensionIcon = loadResolvedColorScheme(
      definition.scheme,
    ).extensionIcon;

    for (const kind of [
      "star",
      "verified",
      "preRelease",
      "sponsor",
      "private",
    ]) {
      assert.equal(
        colors[`extensionIcon.${kind}Foreground`],
        extensionIcon[kind],
        `${definition.name}: ${kind} extension icon`,
      );
    }
  }
});

test("inlay hint foregrounds and backgrounds use their scheme colors", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);

    for (const kind of ["parameter", "type"]) {
      const hint = resolved.inlayHint[kind];

      assert.equal(
        colors[`editorInlayHint.${kind}Foreground`].toLowerCase(),
        hint.foreground.toLowerCase(),
        `${definition.name}: ${kind} hint foreground`,
      );
      assert.equal(
        colors[`editorInlayHint.${kind}Background`].toLowerCase(),
        hint.background.toLowerCase(),
        `${definition.name}: ${kind} hint background`,
      );
    }
  }
});

test("chat and diff outlines do not compete with their backgrounds", () => {
  for (const definition of definitions) {
    const colors = createTheme(definition).colors;
    const resolved = loadResolvedColorScheme(definition.scheme);
    for (const key of [
      "chat.requestCodeBorder",
      "diffEditor.insertedTextBorder",
      "diffEditor.removedTextBorder",
      "inlineEdit.originalBorder",
      "inlineEdit.modifiedBorder",
    ]) {
      assert.match(
        colors[key],
        /^#[0-9a-f]{6}00$/i,
        `${definition.name}: ${key}`,
      );
    }
    assert.equal(
      colors["chat.requestBorder"],
      chroma(resolved.border.emphasis).alpha(0.6).hex(),
      `${definition.name}: chat.requestBorder`,
    );
    assert.notEqual(
      colors["diffEditor.insertedTextBackground"].slice(-2),
      "00",
    );
    assert.notEqual(colors["diffEditor.removedTextBackground"].slice(-2), "00");
    assert.notEqual(
      colors["inlineEdit.originalChangedLineBackground"].slice(-2),
      "00",
    );
    assert.notEqual(
      colors["inlineEdit.modifiedChangedLineBackground"].slice(-2),
      "00",
    );
  }
});

test("disabling italics clears both token systems and preserves other styles", () => {
  const base = createTheme(definitions[0]);
  base.tokenColors.push({
    scope: "test.style",
    settings: { fontStyle: "bold italic underline" },
  });
  const before = structuredClone(base);
  const actual = applyThemeOptions(base, { italics: false });

  assert.deepEqual(base, before);
  assert.deepEqual(actual.colors, base.colors);
  assert.equal(actual.tokenColors.at(-1).settings.fontStyle, "bold underline");
  for (const rule of actual.tokenColors) {
    assert.ok(!rule.settings.fontStyle?.split(/\s+/).includes("italic"));
  }
  assert.ok(actual.tokenColors.some((rule) => rule.settings.fontStyle === ""));
  for (const style of Object.values(actual.semanticTokenColors)) {
    assert.notEqual(style.italic, true);
  }
  assert.equal(actual.semanticTokenColors.decorator.italic, false);
});

test("borderless changes only its intended workbench colors", () => {
  const base = createTheme(definitions[0]);
  const before = structuredClone(base);
  const actual = applyThemeOptions(base, { borders: false });
  const expectedColors = { ...base.colors };
  for (const key of [
    "editor.border",
    "surface.border",
    "titleBar.border",
    "activityBar.border",
    "sideBar.border",
    "statusBar.border",
    "statusBar.debuggingBorder",
    "statusBar.noFolderBorder",
    "editorGroupHeader.tabsBorder",
    "editorGroup.border",
    "tab.border",
    "panel.border",
  ]) {
    expectedColors[key] = "#00000000";
  }
  for (const key of [
    "activityBar.background",
    "activityBarTop.background",
    "sideBar.background",
    "sideBarSectionHeader.background",
    "sideBarStickyScroll.background",
    "sideBarStickyScroll.border",
    "sideBarStickyScroll.shadow",
  ]) {
    expectedColors[key] = base.colors["editor.background"];
  }
  for (const key of ["editorStickyScroll.border"]) {
    expectedColors[key] = base.colors["editorOverviewRuler.border"];
  }

  assert.deepEqual(base, before);
  assert.deepEqual(actual, { ...base, colors: expectedColors });
});

test("theme options compose and are idempotent", () => {
  const base = createTheme(definitions[0]);
  const combined = applyThemeOptions(base, {
    borders: false,
    italics: false,
  });
  assert.deepEqual(
    combined,
    applyThemeOptions(applyThemeOptions(base, { borders: false }), {
      italics: false,
    }),
  );
  assert.deepEqual(
    combined,
    applyThemeOptions(combined, { borders: false, italics: false }),
  );
  assert.equal(applyThemeOptions(base), base);
});

test("borderless rejects missing target and reference colors", () => {
  for (const key of [
    "panel.border",
    "editor.background",
    "editorOverviewRuler.border",
  ]) {
    const base = createTheme(definitions[0]);
    delete base.colors[key];
    assert.throws(
      () => applyThemeOptions(base, { borders: false }),
      /unknown workbench color/,
    );
  }
});
