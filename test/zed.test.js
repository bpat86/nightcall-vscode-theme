const assert = require("node:assert/strict");
const test = require("node:test");
const { loadResolvedColorScheme } = require("../src/colors/color-scheme");
const definitions = require("../src/formats/zed/theme-definitions");
const { createArtifacts } = require("../src/pipeline/build/targets/zed");
const { validateFamily } = require("../src/pipeline/validation/zed-themes");

function createFamily() {
  const colors = new Map(
    definitions.map(({ scheme }) => [scheme, loadResolvedColorScheme(scheme)]),
  );
  return createArtifacts(colors).find((artifact) => artifact.family).family;
}

test("Zed themes use the shared schemes without VS Code-specific variants", () => {
  const family = createFamily();

  assert.equal(family.$schema, "https://zed.dev/schema/themes/v0.2.0.json");
  assert.deepEqual(
    family.themes.map(({ name }) => name),
    definitions.map(({ name }) => name),
  );
  for (const [index, definition] of definitions.entries()) {
    const color = loadResolvedColorScheme(definition.scheme);
    const { style, appearance } = family.themes[index];
    assert.equal(appearance, "dark");
    assert.equal(style["editor.background"], color.canvas.default);
    assert.equal(style["text.accent"], color.accent.foreground);
    for (const [kind, source] of [
      ["created", color.sourceControl.added],
      ["deleted", color.sourceControl.deleted],
    ]) {
      assert.equal(style[kind], source);
      assert.equal(style[`${kind}.border`], "#00000000");
      assert.match(style[`${kind}.background`], /^#[0-9a-f]{6}26$/i);
      assert.equal(
        style[`${kind}.background`].slice(0, 7).toLowerCase(),
        source.toLowerCase(),
      );
    }
    assert.equal(style["ghost_element.background"], "#00000000");
    assert.equal(style["ghost_element.disabled"], "#00000000");
    assert.equal(style["element.selected"], color.canvas.overlay);
    assert.equal(style["ghost_element.selected"], color.canvas.overlay);
    assert.equal(style.syntax.hint.color, color.foreground.muted);
    assert.equal(style.hint, color.foreground.muted);
    assert.equal(style["hint.background"], "#00000000");
    assert.equal(style["hint.border"], "#00000000");
    for (const [status, foreground] of [
      ["info", color.info.foreground],
      ["success", color.success.foreground],
      ["warning", color.attention.foreground],
      ["error", color.danger.foreground],
    ]) {
      assert.equal(style[status], foreground);
      assert.equal(style[`${status}.border`], color.border.emphasis);
      assert.equal(
        style[`${status}.background`].slice(0, 7).toLowerCase(),
        foreground.toLowerCase(),
      );
      assert.equal(style[`${status}.background`].slice(-2), "1a");
    }
    assert.deepEqual(style.accents, Object.values(color.brackets));
    assert.equal(style.players[0].cursor, color.accent.foreground);
    assert.equal(style.players[0].background, color.accent.foreground);
    assert.match(style.players[0].selection, /^#[0-9a-f]{6}3d$/i);
    assert.equal(
      style.players[0].selection.slice(0, 7).toLowerCase(),
      color.accent.secondary.toLowerCase(),
    );
    assert.equal(
      style["editor.document_highlight.read_background"]
        .slice(0, 7)
        .toLowerCase(),
      color.accent.secondary.toLowerCase(),
    );
    assert.equal(
      style["editor.document_highlight.read_background"]
        .slice(-2)
        .toLowerCase(),
      "20",
    );
    assert.equal(
      style["search.match_background"].slice(0, 7).toLowerCase(),
      color.accent.subtle.toLowerCase(),
    );
    assert.equal(
      style["search.active_match_background"].slice(0, 7).toLowerCase(),
      color.accent.subtle.toLowerCase(),
    );
    assert.notEqual(
      style["search.match_background"],
      style["search.active_match_background"],
    );
    assert.equal(
      style["terminal.ansi.bright_magenta"],
      color.ansi.brightMagenta,
    );
    assert.equal(
      style.syntax["variable.parameter"].color,
      color.syntax.parameter,
    );
    assert.equal(style.syntax["string.regex"].color, color.syntax.regexp);
    assert.equal(
      style.syntax["keyword.operator.regex"].color,
      color.syntax.regexp,
    );
    assert.equal(
      style.syntax["keyword.control"].color,
      color.syntax.controlFlow,
    );
    assert.equal(style.syntax["function.method"].color, color.syntax.method);
    assert.equal(style.syntax["type.class"].color, color.syntax.class);
    assert.equal(style.syntax["type.name"].color, color.syntax.type);
    assert.equal(style.syntax["property.name"].color, color.syntax.property);
    assert.equal(
      style.syntax["function.method.call"].color,
      color.syntax.method,
    );
    assert.equal(
      style.syntax["function.decorator"].color,
      color.syntax.decorator,
    );
    assert.equal(
      style.syntax["keyword.definition"].color,
      color.syntax.storage,
    );
    assert.equal(
      style.syntax["type.class.builtin"].color,
      color.syntax.builtin,
    );
    assert.equal(style.syntax["title.markup"].color, color.foreground.emphasis);
    assert.equal(
      style.syntax["punctuation.markup"].color,
      color.syntax.punctuation,
    );
    assert.equal(style.syntax["type.unit"].color, color.syntax.number);
    assert.equal(style.syntax["selector.class"].color, color.syntax.class);
    assert.equal(style.syntax["text.jsx"].color, color.syntax.children);
    assert.equal(style.syntax.tag.color, color.syntax.tag);
    assert.equal(style.syntax["tag.jsx"].color, color.syntax.tag);
    assert.equal(
      style.syntax["tag.component.jsx"].color,
      color.syntax.component,
    );
    assert.notEqual(
      style.syntax["tag.component.jsx"].color,
      style.syntax["tag.jsx"].color,
    );
    assert.equal(style.syntax.attribute.color, color.syntax.embedded);
    assert.equal(style.syntax["attribute.jsx"].color, color.syntax.embedded);
    assert.equal(
      style.syntax["keyword.declaration"].color,
      color.syntax.storage,
    );
    assert.equal(style.syntax["keyword.import"].color, color.syntax.keyword);
    for (const language of ["html", "jsx"]) {
      assert.equal(
        style.syntax[`punctuation.bracket.${language}`].color,
        color.syntax.punctuation,
      );
      assert.equal(
        style.syntax[`punctuation.delimiter.${language}`].color,
        color.syntax.punctuation,
      );
    }
    assert.equal(style.syntax.comment.font_style, "italic");
  }
  assert.deepEqual(validateFamily(family).errors, []);
});

test("Zed validation rejects missing colors and illegible editor text", () => {
  const family = createFamily();
  family.themes[0].style["editor.foreground"] =
    family.themes[0].style["editor.background"];
  family.themes[1].style.syntax.keyword.color = "invalid";
  delete family.themes[2].style.syntax;
  delete family.themes[2].style["terminal.ansi.black"];
  family.themes[2].style.players[0].selection = "invalid";

  const { errors } = validateFamily(family);
  assert.ok(errors.some((error) => error.includes("insufficient contrast")));
  assert.ok(
    errors.some((error) => error.includes("syntax.keyword.color is invalid")),
  );
  assert.ok(errors.some((error) => error.includes("missing syntax.comment")));
  assert.ok(
    errors.some((error) => error.includes("missing terminal.ansi.black")),
  );
  assert.ok(
    errors.some((error) =>
      error.includes("players must have generated hex colors"),
    ),
  );
});
