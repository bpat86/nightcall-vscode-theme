function createJavaScriptTokenColors(color) {
  return [
    ...["js", "jsx", "ts", "tsx"].flatMap((language) => [
      {
        scope: `variable.other.readwrite.alias.${language}`,
        settings: { foreground: color.syntax.variable },
      },
      {
        scope: [
          `meta.import.${language} variable.other.readwrite.alias.${language}`,
          `meta.import.${language} variable.other.readwrite.${language}`,
          `meta.import.${language} variable.other.object.${language}`,
          `meta.import.${language} variable.other.constant.${language}`,
          `meta.import.${language} variable.other.constant.object.${language}`,
        ],
        settings: {
          foreground: color.syntax.importBinding,
        },
      },
      {
        scope: `meta.object-literal.key.${language}`,
        settings: { foreground: color.syntax.property },
      },
      {
        scope: `meta.decorator punctuation.decorator.${language}`,
        settings: { foreground: color.syntax.decorator },
      },
      {
        scope: [
          `variable.parameter.${language}`,
          `variable.parameter.function.${language}`,
        ],
        settings: { foreground: color.syntax.parameter },
      },
      {
        scope: [
          `variable.other.constant.${language}`,
          `variable.other.constant.object.${language}`,
          `variable.other.enummember.${language}`,
        ],
        settings: { foreground: color.syntax.constant },
      },
      {
        scope: [
          `variable.other.constant.property.${language}`,
          `variable.other.constant.object.property.${language}`,
        ],
        settings: { foreground: color.syntax.property },
      },
      {
        scope: [
          `support.function.${language}`,
          `support.function.console.${language}`,
          `support.function.json.${language}`,
          `support.function.math.${language}`,
          `support.function.dom.${language}`,
          `support.function.process.${language}`,
          `support.class.${language}`,
          `support.class.console.${language}`,
          `support.class.node.${language}`,
          `support.class.dom.${language}`,
          `support.variable.dom.${language}`,
          `support.variable.object.process.${language}`,
          `support.constant.json.${language}`,
        ],
        settings: { foreground: color.syntax.builtin },
      },
    ]),
    {
      scope: "meta.method.declaration storage.type.js",
      settings: {
        foreground: color.syntax.storage,
      },
    },
    {
      scope: "terminator.js",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "meta.js punctuation.definition.js",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: [
        "entity.name.type.instance.jsdoc",
        "entity.name.type.instance.phpdoc",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: ["variable.other.jsdoc", "variable.other.phpdoc"],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: [
        "variable.other.meta.import.js",
        "meta.import.js variable.other",
        "variable.other.meta.export.js",
        "meta.export.js variable.other",
      ],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "variable.other.object.jsx",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "variable.object.property.jsx",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: ["variable.js", "variable.other.js"],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: ["entity.name.type.js", "entity.name.type.module.js"],
      settings: {
        foreground: color.syntax.type,
        fontStyle: "",
      },
    },
  ];
}

function createJsonTokenColors(color) {
  return [
    {
      scope: "support.constant.json",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: [
        "meta.structure.dictionary.value.json string.quoted.double",
        "string.quoted.double.json.comments",
        "string.quoted.double.json punctuation.definition.string.json",
      ],
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: [
        "punctuation.definition.dictionary.begin.json",
        "punctuation.definition.dictionary.end.json",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope:
        "meta.structure.dictionary.json meta.structure.dictionary.value constant.language",
      settings: {
        foreground: color.syntax.boolean,
      },
    },
  ];
}

function createJavaScriptObjectTokenColors(color) {
  return [
    {
      scope: "variable.other.object.js",
      settings: {
        foreground: color.syntax.variable,
      },
    },
  ];
}

function createTypeScriptTokenColors(color) {
  return [
    {
      scope: [
        "variable.other.readwrite.ts",
        "variable.other.readwrite.tsx",
        "variable.other.object.ts",
        "variable.other.object.tsx",
        "variable.other.ts",
        "variable.other.tsx",
        "variable.tsx",
        "variable.ts",
      ],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: ["variable.object.property.ts", "variable.object.property.tsx"],
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "punctuation.definition.binding-pattern.object",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.binding-pattern.array",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: [
        "punctuation.definition.typeparameters.begin.ts",
        "punctuation.definition.typeparameters.end.ts",
        "punctuation.definition.typeparameters.begin.tsx",
        "punctuation.definition.typeparameters.end.tsx",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "entity.name.type.ts",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: [
        "meta.type.parameters.ts entity.name.type",
        "meta.type.parameters.tsx entity.name.type",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: [
        "meta.import.ts punctuation.definition.block",
        "meta.import.tsx punctuation.definition.block",
        "meta.export.ts punctuation.definition.block",
        "meta.export.tsx punctuation.definition.block",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
  ];
}

function createJsxTokenColors(color) {
  return [
    {
      scope: ["support.class.component", "support.class.component.tsx"],
      settings: {
        foreground: color.syntax.component,
        fontStyle: "",
      },
    },
    {
      scope: ["meta.jsx.children", "meta.jsx.children.tsx"],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "meta.class entity.name.type.class.tsx",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: ["entity.name.type.tsx", "entity.name.type.module.tsx"],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: [
        "meta.method.declaration storage.type.ts",
        "meta.method.declaration storage.type.tsx",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
  ];
}

module.exports = {
  createJavaScriptTokenColors,
  createJsonTokenColors,
  createJavaScriptObjectTokenColors,
  createTypeScriptTokenColors,
  createJsxTokenColors,
};
