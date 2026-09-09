const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { Registry, INITIAL, parseRawGrammar } = require("vscode-textmate");
const { loadWASM, OnigScanner, OnigString } = require("vscode-oniguruma");
const createTokenColors = require("../src/theme/token-colors");
const { getThemeColors } = require("../src/palette");
const { applyVariants } = require("../src/theme/variants");

const syntax = Object.fromEntries(
  Object.keys(require("../src/colors/schemes/dark-default.json").syntax).map(
    (role, index) => [
      role,
      `#${((index + 1) * 0x050505).toString(16).padStart(6, "0").toUpperCase()}`,
    ],
  ),
);
const grammarFiles = {
  "source.js": "JavaScript",
  "source.js.jsx": "JavaScriptReact",
  "source.ts": "TypeScript",
  "source.tsx": "TypeScriptReact",
};
const onigLib = loadWASM(
  fs.readFileSync(require.resolve("vscode-oniguruma/release/onig.wasm")),
).then(() => ({
  createOnigScanner: (patterns) => new OnigScanner(patterns),
  createOnigString: (content) => new OnigString(content),
}));

function createRegistry(noItalics) {
  const theme = applyVariants(
    {
      tokenColors: createTokenColors({
        ...getThemeColors("dark-default"),
        syntax,
      }),
      semanticTokenColors: {},
    },
    noItalics ? ["no-italics"] : [],
  );
  return new Registry({
    onigLib,
    theme: { settings: theme.tokenColors },
    loadGrammar: async (scope) => {
      const name = grammarFiles[scope];
      assert.ok(name, `Unexpected grammar dependency: ${scope}`);
      const file = path.join(
        __dirname,
        "fixtures",
        "grammars",
        `${name}.tmLanguage.json`,
      );
      return parseRawGrammar(fs.readFileSync(file, "utf8"), file);
    },
  });
}

function checkSnippet(registry, grammar, source, expectations, noItalics) {
  let state = INITIAL;
  const lines = source.split("\n").map((line) => {
    const scoped = grammar.tokenizeLine(line, state);
    const encoded = grammar.tokenizeLine2(line, state);
    state = scoped.ruleStack;
    if (noItalics) {
      for (let index = 1; index < encoded.tokens.length; index += 2) {
        assert.equal((encoded.tokens[index] >>> 11) & 1, 0, line);
      }
    }
    return { line, scoped, encoded };
  });
  for (const [lineNumber, text, role, occurrence = 1] of expectations) {
    const { line, scoped, encoded } = lines[lineNumber - 1];
    let offset = -1;
    for (let count = 0; count < occurrence; count += 1) {
      offset = line.indexOf(text, offset + 1);
      assert.notEqual(offset, -1, `Missing fixture text: ${text}`);
    }
    const scope = scoped.tokens.find(
      (token) => token.startIndex <= offset && offset < token.endIndex,
    );
    let metadata;
    for (let index = 0; index < encoded.tokens.length; index += 2) {
      if (encoded.tokens[index] > offset) break;
      metadata = encoded.tokens[index + 1];
    }
    assert.equal(
      registry.getColorMap()[(metadata >>> 15) & 0x1ff],
      syntax[role],
      `${text} should use ${role}: ${scope.scopes.join(" ")}`,
    );
  }
}

const commonCases = [
  [
    "let mutable = 1;\nconst fixed = mutable;\nmutable = fixed;",
    [
      [1, "mutable", "variable"],
      [1, "1", "number"],
      [2, "fixed", "constant"],
      [2, "mutable", "variable"],
    ],
  ],
  [
    "let record = { name: 'Ada', count: 2, run() {} };\nrecord.name; record.child.name; record.UPPER;",
    [
      [1, "record", "variable"],
      [1, "name", "property"],
      [1, "Ada", "string"],
      [1, "run", "function"],
      [2, "record", "variable"],
      [2, "name", "property"],
      [2, "child", "property"],
      [2, "UPPER", "property"],
    ],
  ],
  [
    "function greet(person, { name: alias }) { return person; }\nlet callback = (value) => value;",
    [
      [1, "greet", "function"],
      [1, "person", "parameter"],
      [1, "name", "property"],
      [1, "alias", "parameter"],
      [2, "value", "parameter"],
    ],
  ],
  [
    "import { item as alias } from 'module';\nlet { name: local } = alias;",
    [
      [1, "item", "importBinding"],
      [1, "alias", "importBinding"],
      [2, "name", "property"],
      [2, "local", "variable"],
    ],
  ],
  [
    "parseInt('10'); JSON.parse('{}'); console.log('hello'); Math.max(1, 2);\nwindow.location; new Buffer(2);",
    [
      [1, "parseInt", "function"],
      [1, "JSON", "constant"],
      [1, "parse", "function", 2],
      [1, "console", "variable"],
      [1, "log", "function"],
      [1, "max", "function"],
      [2, "window", "variable"],
      [2, "Buffer", "function"],
    ],
  ],
  [
    "for (let index = 0; index < 2; index++) { continue; }\nwhile (ready) { break; }",
    [
      [1, "for", "storage"],
      [1, "continue", "storage"],
      [2, "while", "storage"],
      [2, "break", "storage"],
    ],
  ],
  [
    "let value = `hello ${person.name}`;\nlet tagged = html`hello ${person}`;\nlet pattern = /hello+/gi;",
    [
      [1, "hello", "string"],
      [1, "person", "variable"],
      [1, "name", "property"],
      [2, "html", "function"],
      [2, "hello", "string"],
      [3, "hello", "regexp"],
    ],
  ],
];
const typeCases = [
  [
    "@logged\nclass Model {}\n@configure(option, nested(value))\nclass Other {}",
    [
      [1, "@", "decorator"],
      [1, "logged", "variable"],
      [3, "@", "decorator"],
      [3, "configure", "function"],
      [3, "option", "variable"],
      [3, "nested", "function"],
      [3, "value", "variable"],
    ],
  ],
  [
    "function identity<T>(value: T): T { return value; }\nidentity<string>('hello');",
    [
      [1, "<", "punctuation"],
      [1, ">", "punctuation"],
      [1, "T", "type"],
      [1, "value", "parameter"],
      [2, "<", "punctuation"],
      [2, ">", "punctuation"],
      [2, "string", "type"],
    ],
  ],
  [
    "enum State { Ready, Waiting }\nclass Model { readonly name: string; #secret = 1; get title() { return this.name; } }",
    [
      [1, "Ready", "constant"],
      [1, "Waiting", "constant"],
      [2, "name", "property"],
      [2, "#secret", "property"],
      [2, "title", "function"],
    ],
  ],
  [
    "type Keys<T> = { [Key in keyof T]?: T[Key] };\ntype Item<T> = T extends Array<infer Value> ? Value : never;\nconst result = {} satisfies Record<string, unknown>;",
    [
      [1, "Keys", "type"],
      [1, "Key", "type", 2],
      [1, "keyof", "operator"],
      [2, "infer", "operator"],
      [2, "Value", "type"],
      [3, "satisfies", "keyword"],
    ],
  ],
];
const jsxCases = [
  [
    "const view = <><section title='hello'><Widget value={person.name} {...props} /><UI.Button /></section></>;",
    [
      [1, "section", "tag"],
      [1, "Widget", "component"],
      [1, "UI.Button", "component"],
      [1, "title", "keyword"],
      [1, "hello", "string"],
      [1, "person", "variable"],
      [1, "name", "property"],
    ],
  ],
];

for (const scope of Object.keys(grammarFiles)) {
  for (const noItalics of [false, true]) {
    test(`${scope} resolves JS-family roles${noItalics ? " without italics" : ""}`, async (context) => {
      const registry = createRegistry(noItalics);
      try {
        const grammar = await registry.loadGrammar(scope);
        const cases = [
          ...commonCases,
          ...(scope.startsWith("source.ts") ? typeCases : []),
          ...(scope.endsWith("jsx") || scope.endsWith("tsx") ? jsxCases : []),
        ];
        for (const [source, expectations] of cases) {
          await context.test(source.split("\n")[0], () => {
            checkSnippet(registry, grammar, source, expectations, noItalics);
          });
        }
      } finally {
        registry.dispose();
      }
    });
  }
}
