const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");
const definitions = require("../src/theme-definitions");

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
    [path.join(directory, "src", "index.js")],
    {
      cwd: directory,
      encoding: "utf8",
    },
  );
}

test("a clean build produces exactly the current theme files", (context) => {
  const directory = fixture(context);
  const result = runBuild(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    fs.readdirSync(path.join(directory, "themes")).sort(),
    definitions.map(({ fileName }) => fileName).sort(),
  );
  for (const { fileName } of definitions) {
    assert.equal(
      fs.readFileSync(path.join(directory, "themes", fileName), "utf8"),
      fs.readFileSync(path.join(root, "themes", fileName), "utf8"),
      fileName,
    );
  }
});

test("invalid sources leave existing output untouched", (context) => {
  const directory = fixture(context);
  const output = path.join(directory, "themes");
  fs.mkdirSync(output);
  const fileName = definitions[0].fileName;
  fs.writeFileSync(path.join(output, fileName), "existing output");
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
  scheme.fg.default = scheme.canvas.default;
  fs.writeFileSync(schemePath, JSON.stringify(scheme));
  const result = runBuild(directory);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /contrast/);
  assert.equal(fs.existsSync(path.join(directory, "themes")), false);
});
