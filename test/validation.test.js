const assert = require("node:assert/strict");
const test = require("node:test");
const { validateSources, validateTheme } = require("../src/validate");
const {
  loadResolvedColorScheme,
  resolveColorScheme,
} = require("../src/colors/color-scheme");
const createTheme = require("../src/theme/create");
const definitions = require("../src/theme/definitions");
const contributions = require("../package.json").contributes.themes;

function copySchemes() {
  return Object.fromEntries(
    [...new Set(definitions.map(({ scheme }) => scheme))].map((name) => [
      name,
      structuredClone(require(`../src/colors/schemes/${name}.json`)),
    ]),
  );
}

test("source validation returns resolved colors without retaining diagnostics", () => {
  const first = validateSources();
  assert.deepEqual(first.errors, []);
  for (const [name, colors] of first.resolvedColorsByScheme) {
    assert.deepEqual(colors, loadResolvedColorScheme(name));
  }
  first.errors.push("test error");
  assert.deepEqual(validateSources().errors, []);
});

test("missing color groups produce a diagnostic instead of a TypeError", () => {
  const schemes = copySchemes();
  delete schemes["dark-default"].canvas;
  const result = validateSources({ schemes });
  assert.ok(
    result.errors.some((message) =>
      message.includes("invalid reference color.canvas"),
    ),
  );
  assert.ok(
    result.errors.some((message) =>
      message.includes("semantic roles must match"),
    ),
  );
  assert.equal(result.resolvedColorsByScheme.has("dark-default"), false);
});

test("the shared resolver rejects malformed and missing palette references", () => {
  for (const value of ["#ffffff", "{missing.100}", "{pink.999}", null, []]) {
    assert.throws(
      () => resolveColorScheme({ syntax: { keyword: value } }),
      /syntax.keyword/,
    );
    const schemes = copySchemes();
    schemes["dark-default"].syntax.keyword = value;
    assert.ok(
      validateSources({ schemes }).errors.some((message) =>
        message.includes("syntax.keyword"),
      ),
    );
  }
});

test("missing schemes and invalid theme options are reported", () => {
  const schemes = copySchemes();
  delete schemes["dark-muted"];
  assert.ok(
    validateSources({ schemes }).errors.some((message) =>
      message.includes("configured color scheme is missing"),
    ),
  );
  for (const option of ["borders", "italics"]) {
    const modified = structuredClone(definitions);
    modified[0][option] = "invalid";
    assert.ok(
      validateSources({ definitions: modified }).errors.some((message) =>
        message.includes(`${option} must be a boolean`),
      ),
    );
  }
});

test("duplicate definitions and mismatched contribution paths are rejected", () => {
  assert.ok(
    validateSources({
      definitions: [...definitions, definitions[0]],
    }).errors.some((message) =>
      message.includes("duplicate source theme definition"),
    ),
  );
  const modified = structuredClone(contributions);
  modified[0].path = `./elsewhere/${definitions[0].fileName}`;
  assert.ok(
    validateSources({ contributions: modified }).errors.some((message) =>
      message.includes("contribution path must be"),
    ),
  );
});

test("generated themes satisfy validation for every definition", () => {
  for (const definition of definitions) {
    assert.deepEqual(
      validateTheme(createTheme(definition), definition).errors,
      [],
    );
  }
});

test("disabled italics validation covers both TextMate and semantic rules", () => {
  const definition = definitions.find(({ italics }) => !italics);
  const theme = createTheme(definition);
  theme.semanticTokenColors.decorator.italic = true;
  theme.tokenColors[0].settings.fontStyle = "italic";
  const { errors } = validateTheme(theme, definition);
  assert.ok(errors.some((message) => message.includes("must not be italic")));
  assert.ok(
    errors.some((message) => message.includes("contains italic scopes")),
  );
});

test("output validation retains conflict, color, contrast, and metadata checks", () => {
  const definition = definitions[0];
  const theme = createTheme(definition);
  theme.name = "Wrong name";
  theme.semanticHighlighting = false;
  theme.colors.foreground = theme.colors["editor.background"];
  theme.colors["button.border"] = "invalid";
  theme.tokenColors.push({
    scope: "string",
    settings: { foreground: "#ffffff" },
  });
  const { errors } = validateTheme(theme, definition);
  for (const expected of [
    "name or type",
    "semantic highlighting",
    "contrast",
    "not a generated hex color",
    "conflicting token settings",
  ]) {
    assert.ok(
      errors.some((message) => message.includes(expected)),
      expected,
    );
  }
});
