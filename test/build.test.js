const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");
const definitions = require("../src/formats/vscode/theme-definitions");
const iterm2Definitions = require("../src/formats/iterm2/preset-definitions");
const zedDefinitions = require("../src/formats/zed/theme-definitions");

const root = path.join(__dirname, "..");

function fixture(context) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "nightcall-build-"));
  context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.cpSync(path.join(root, "src"), path.join(directory, "src"), {
    recursive: true,
  });
  fs.copyFileSync(
    path.join(root, "package.json"),
    path.join(directory, "package.json"),
  );
  fs.symlinkSync(
    path.join(root, "node_modules"),
    path.join(directory, "node_modules"),
    "junction",
  );
  return directory;
}

function runBuild(directory) {
  return spawnSync(
    process.execPath,
    [path.join(directory, "src", "pipeline", "build", "index.js")],
    {
      cwd: directory,
      encoding: "utf8",
    },
  );
}

test("a clean build replaces output with the registered themes", (context) => {
  const directory = fixture(context);
  const output = path.join(directory, "themes");
  fs.mkdirSync(output);
  fs.writeFileSync(path.join(output, "obsolete-theme.json"), "obsolete");

  const result = runBuild(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    fs.readdirSync(output).sort(),
    definitions.map(({ fileName }) => fileName).sort(),
  );

  const iterm2Output = path.join(directory, "iterm2");
  assert.deepEqual(
    fs.readdirSync(iterm2Output).sort(),
    iterm2Definitions.map(({ fileName }) => fileName).sort(),
  );

  const zedOutput = path.join(directory, "zed");
  assert.deepEqual(fs.readdirSync(zedOutput).sort(), [
    "extension.toml",
    "themes",
  ]);
  assert.deepEqual(fs.readdirSync(path.join(zedOutput, "themes")), [
    "nightcall.json",
  ]);
  const family = JSON.parse(
    fs.readFileSync(path.join(zedOutput, "themes", "nightcall.json"), "utf8"),
  );
  assert.deepEqual(
    family.themes.map(({ name }) => name),
    zedDefinitions.map(({ name }) => name),
  );
  assert.match(
    fs.readFileSync(path.join(zedOutput, "extension.toml"), "utf8"),
    /id = "nightcall-theme"/,
  );
});

test("invalid sources leave existing output untouched", (context) => {
  const directory = fixture(context);
  const output = path.join(directory, "themes");
  fs.mkdirSync(output);
  const fileName = definitions[0].fileName;
  fs.writeFileSync(path.join(output, fileName), "existing output");
  const zedOutput = path.join(directory, "zed");
  fs.mkdirSync(zedOutput);
  fs.writeFileSync(path.join(zedOutput, "sentinel"), "existing Zed output");
  const schemePath = path.join(
    directory,
    "src",
    "colors",
    "schemes",
    "dark-default.json",
  );
  const scheme = JSON.parse(fs.readFileSync(schemePath, "utf8"));
  delete scheme.canvas;
  fs.writeFileSync(schemePath, JSON.stringify(scheme));

  const result = runBuild(directory);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /invalid reference color.canvas/);
  assert.deepEqual(fs.readdirSync(output), [fileName]);
  assert.equal(
    fs.readFileSync(path.join(output, fileName), "utf8"),
    "existing output",
  );
  assert.deepEqual(fs.readdirSync(zedOutput), ["sentinel"]);
});

test("invalid generated output is rejected before creating the output directory", (context) => {
  const directory = fixture(context);
  const schemePath = path.join(
    directory,
    "src",
    "colors",
    "schemes",
    "dark-default.json",
  );
  const scheme = JSON.parse(fs.readFileSync(schemePath, "utf8"));
  scheme.foreground.default = scheme.canvas.default;
  fs.writeFileSync(schemePath, JSON.stringify(scheme));
  const result = runBuild(directory);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /contrast/);
  assert.equal(fs.existsSync(path.join(directory, "themes")), false);
  assert.equal(fs.existsSync(path.join(directory, "zed")), false);
});

test("invalid Zed output leaves all existing output untouched", (context) => {
  const directory = fixture(context);
  const output = path.join(directory, "themes");
  const zedOutput = path.join(directory, "zed");
  fs.mkdirSync(output);
  fs.mkdirSync(zedOutput);
  fs.writeFileSync(path.join(output, "sentinel"), "existing VS Code output");
  fs.writeFileSync(path.join(zedOutput, "sentinel"), "existing Zed output");

  const zedRenderer = path.join(
    directory,
    "src",
    "formats",
    "zed",
    "create-theme.js",
  );
  const contents = fs.readFileSync(zedRenderer, "utf8");
  fs.writeFileSync(
    zedRenderer,
    contents.replace("name,\n    appearance", 'name: "wrong",\n    appearance'),
  );

  const result = runBuild(directory);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /invalid theme name or appearance/);
  assert.deepEqual(fs.readdirSync(output), ["sentinel"]);
  assert.deepEqual(fs.readdirSync(zedOutput), ["sentinel"]);
});
