function createSharedTokenColors(color) {
  return [
    {
      scope: [
        "markup.changed",
        "meta.diff.header.git",
        "meta.diff.header.from-file",
        "meta.diff.header.to-file",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "markup.deleted.diff",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "markup.inserted.diff",
      settings: {
        foreground: color.syntax.number,
      },
    },
    {
      scope: "string",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "string.quoted",
      settings: {
        foreground: color.syntax.string,
        fontStyle: "",
      },
    },
    {
      scope: "support.constant.math",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: ["constant.numeric", "constant.character.numeric"],
      settings: {
        foreground: color.syntax.number,
        fontStyle: "",
      },
    },
    {
      scope: [
        "keyword.other.unit.percentage.css",
        "keyword.other.unit.px.css",
        "keyword.other.unit.vw.css",
        "keyword.other.unit.vh.css",
        "keyword.other.unit.em.css",
        "keyword.other.unit.rem.css",
      ],
      settings: {
        foreground: color.syntax.number,
      },
    },
    {
      scope: ["constant.language", "punctuation.definition.constant"],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: ["constant.character", "constant.other"],
      settings: {
        foreground: color.syntax.constant,
      },
    },
    {
      scope: ["constant.language.null", "constant.language.undefined"],
      settings: {
        foreground: color.syntax.boolean,
      },
    },
    {
      scope: "constant.character.escape",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: ["string.regexp", "string.regexp keyword.other"],
      settings: {
        foreground: color.syntax.regexp,
      },
    },
    {
      scope: "meta.function punctuation.separator.comma",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "variable",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "punctuation.accessor",
      settings: {
        foreground: color.syntax.punctuation,
        fontStyle: "",
      },
    },
    {
      scope: "keyword",
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "",
      },
    },
    {
      scope: [
        "storage",
        "meta.var.expr",
        "meta.class meta.method.declaration meta.var.expr storage.type.js",
        "storage.type.property.js",
        "storage.type.property.ts",
        "storage.type.property.tsx",
      ],
      settings: {
        foreground: color.syntax.storage,
        fontStyle: "",
      },
    },
    {
      scope: "storage.type",
      settings: {
        foreground: color.syntax.storage,
        fontStyle: "",
      },
    },
    {
      scope: "storage.type.function.arrow.js",
      settings: {
        fontStyle: "",
      },
    },
    {
      scope: [
        "entity.name.class",
        "meta.class entity.name.type.class",
        "meta.class entity.name.type.class.js",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "entity.other.inherited-class",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: ["punctuation.definition.tag", "meta.tag"],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: [
        "entity.name.tag",
        "meta.tag.other.html",
        "meta.tag.other.js",
        "meta.tag.other.tsx",
        "entity.name.tag.tsx",
        "meta.tag.js",
        "meta.tag.tsx",
        "meta.tag.html",
      ],
      settings: {
        foreground: color.syntax.tag,
        fontStyle: "",
      },
    },
    {
      scope: "entity.name.tag.custom",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "support.constant.meta.property-value",
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: ["support.type", "support.class"],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.namespace",
        "entity.name.module",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "support.variable.dom",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "invalid",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "invalid.deprecated",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "keyword.operator",
      settings: {
        foreground: color.syntax.operator,
        fontStyle: "",
      },
    },
    {
      scope: "keyword.operator.new",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "keyword.operator.relational",
      settings: {
        foreground: color.syntax.operator,
        fontStyle: "",
      },
    },
    {
      scope: "keyword.operator.arithmetic",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "keyword.operator.bitwise",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "keyword.operator.increment",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "keyword.operator.ternary",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "object",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "meta.brace",
      settings: {
        foreground: color.syntax.punctuation,
        fontStyle: "",
      },
    },
    {
      scope: "meta.delimiter.period",
      settings: {
        foreground: color.syntax.punctuation,
        fontStyle: "",
      },
    },
    {
      scope: "constant.language.boolean",
      settings: {
        foreground: color.syntax.boolean,
      },
    },
    {
      scope: "object.comma",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "variable.parameter.function",
      settings: {
        foreground: color.syntax.type,
        fontStyle: "",
      },
    },
    {
      scope: [
        "support.type.vendor.property-name",
        "support.type.property-name",
      ],
      settings: {
        foreground: color.syntax.property,
        fontStyle: "",
      },
    },
    {
      scope: [
        "support.constant.vendor.property-value",
        "meta.property-list entity.name.tag",
      ],
      settings: {
        foreground: color.syntax.type,
        fontStyle: "",
      },
    },
    {
      scope: "meta.property-list entity.name.tag.reference",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "constant.other.color.rgb-value punctuation.definition.constant",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "constant.other.color",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "keyword.other.unit",
      settings: {
        foreground: color.syntax.number,
      },
    },
    {
      scope: "meta.selector",
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "",
      },
    },
    {
      scope: "entity.other.attribute-name.id",
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: "meta.property-name",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: ["entity.name.tag.doctype", "meta.tag.sgml.doctype"],
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "",
      },
    },
    {
      scope: "punctuation.definition.parameters",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.string",
      settings: {
        foreground: color.syntax.string,
        fontStyle: "",
      },
    },
    {
      scope: "keyword.control.operator",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "keyword.operator.logical",
      settings: {
        foreground: color.syntax.operator,
        fontStyle: "",
      },
    },
    {
      scope: [
        "variable.instance",
        "variable.other.instance",
        "variable.readwrite.instance",
        "variable.other.readwrite.instance",
      ],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "entity.name.function",
      settings: {
        foreground: color.syntax.function,
        fontStyle: "",
      },
    },
    {
      scope: [
        "keyword.control.flow.js",
        "keyword.control.flow.ts",
        "keyword.control.flow.tsx",
        "keyword.control.ruby",
        "keyword.control.module.ruby",
        "keyword.control.class.ruby",
        "keyword.control.def.ruby",
        "keyword.control.loop.js",
        "keyword.control.loop.ts",
        "keyword.control.loop.tsx",
      ],
      settings: {
        foreground: color.syntax.storage,
      },
    },
    {
      scope: [
        "keyword.control.import.js",
        "keyword.control.import.ts",
        "keyword.control.import.tsx",
        "keyword.control.from.js",
        "keyword.control.from.ts",
        "keyword.control.from.tsx",
      ],
      settings: {
        foreground: color.syntax.declaration,
      },
    },
    {
      scope: [
        "keyword.control.conditional.js",
        "keyword.control.conditional.ts",
        "keyword.control.switch.js",
        "keyword.control.switch.ts",
      ],
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "support.constant",
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: [
        "keyword.other.special-method",
        "keyword.other.new",
        "keyword.other.debugger",
        "keyword.other",
      ],
      settings: {
        foreground: color.syntax.storage,
      },
    },
    {
      scope: "support.function",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "invalid.broken",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "invalid.unimplemented",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "invalid.illegal",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "support.variable.property",
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: "variable.function",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "variable.interpolation",
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: "meta.function-call",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: ["meta.array", "meta.object"],
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "punctuation.section.embedded",
      settings: {
        foreground: color.syntax.embedded,
      },
    },
    {
      scope: [
        "punctuation.terminator.expression",
        "punctuation.definition.arguments",
        "punctuation.definition.array",
        "punctuation.section.array",
        "punctuation.separator.parameter",
        "punctuation.separator.key-value",
        "punctuation.section.function.begin.bracket.round",
        "punctuation.section.function.end.bracket.round",
        "punctuation.destructuring",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: [
        "punctuation.definition.list.begin",
        "punctuation.definition.list.end",
        "punctuation.separator.arguments",
        "punctuation.definition.list",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "string.template meta.template.expression",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "string.template punctuation.definition.string",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "quote",
      settings: {
        foreground: color.syntax.comment,
        fontStyle: "",
      },
    },
    {
      scope: "raw",
      settings: {
        foreground: color.syntax.comment,
      },
    },
  ];
}

function createSharedOverrideTokenColors(color) {
  return [
    {
      scope: "keyword.operator.type.annotation",
      settings: {
        foreground: color.syntax.operator,
      },
    },
    {
      scope: "variable.parameter",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "variable.other.property",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "variable.other.object.property",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "variable.other.readwrite.alias",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "variable.other.readwrite.js",
      settings: {
        foreground: color.syntax.variable,
        fontStyle: "",
      },
    },
    {
      scope: "meta.jsx.children.js",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "variable.other.constant",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "variable.object.property.js",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "constant.numeric.decimal",
      settings: {
        foreground: color.syntax.number,
      },
    },
    {
      scope: [
        "constant.language.boolean.true",
        "constant.language.boolean.false",
      ],
      settings: {
        foreground: color.syntax.boolean,
      },
    },
    {
      scope: "string.quoted.single",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "string.quoted.double",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "entity.other.attribute-name",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "keyword.control.conditional",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "meta.brace.round",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "meta.brace.square",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.separator.comma",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.string.begin",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "punctuation.definition.string.end",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: [
        "punctuation.terminator.statement",
        "punctuation.terminator.rule.scss",
      ],
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "keyword.operator.assignment",
      settings: {
        foreground: color.syntax.operator,
        fontStyle: "",
      },
    },
    {
      scope: "punctuation.section.embedded.begin",
      settings: {
        foreground: color.syntax.embedded,
      },
    },
    {
      scope: "punctuation.section.embedded.end",
      settings: {
        foreground: color.syntax.embedded,
      },
    },
    {
      scope: "support.class.console",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "support.class.component.js",
      settings: {
        foreground: color.syntax.component,
      },
    },
    {
      scope: "punctuation.definition.tag.begin",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.template-expression.begin",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.template-expression.end",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "string.template",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "punctuation.definition.string.template.begin",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "punctuation.definition.string.template.end",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: "punctuation.definition.tag.end",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "entity.name.tag.js",
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: [
        "support.type.property-name.json",
        "support.type.property-name.json.comments",
      ],
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "punctuation.definition.parameters.begin",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.parameters.end",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.definition.block",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "token.info-token",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "token.warn-token",
      settings: {
        foreground: color.attention.foreground,
      },
    },
    {
      scope: "token.error-token",
      settings: {
        foreground: color.syntax.invalid,
      },
    },
    {
      scope: "token.debug-token",
      settings: {
        foreground: color.syntax.operator,
      },
    },
  ];
}

module.exports = {
  createSharedTokenColors,
  createSharedOverrideTokenColors,
};
