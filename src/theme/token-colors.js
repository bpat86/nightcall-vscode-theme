const { createTypographyTokenColors } = require("./typography");

function createTokenColors(color, { italics }) {
  return [
    ...createTypographyTokenColors(color, { italics }),

    // Shared syntax and markup
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
        "keyword.control.import.js",
        "keyword.control.import.ts",
        "keyword.control.import.tsx",
        "keyword.control.from.js",
        "keyword.control.from.ts",
        "keyword.control.from.tsx",
      ],
      settings: {
        foreground: color.syntax.storage,
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
        foreground: color.syntax.punctuation,
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

    // CoffeeScript
    {
      scope: "variable.parameter.function.coffee",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "variable.assignment.coffee",
      settings: {
        foreground: color.syntax.variable,
      },
    },

    // C#
    {
      scope: "variable.other.readwrite.cs",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: ["entity.name.type.class.cs", "storage.type.cs"],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "entity.name.type.namespace.cs",
      settings: {
        foreground: color.syntax.variable,
      },
    },

    // CSS
    {
      scope: [
        "entity.name.tag.css",
        "entity.name.tag.custom.css",
        "support.constant.property-value.css",
      ],
      settings: {
        foreground: color.syntax.type,
        fontStyle: "",
      },
    },
    {
      scope: [
        "entity.name.tag.wildcard.css",
        "entity.name.tag.wildcard.less",
        "entity.name.tag.wildcard.scss",
        "entity.name.tag.wildcard.sass",
      ],
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope:
        "meta.attribute-selector.css entity.other.attribute-name.attribute",
      settings: {
        foreground: color.syntax.type,
      },
    },

    // Elixir
    {
      scope: [
        "source.elixir support.type.elixir",
        "source.elixir meta.module.elixir entity.name.class.elixir",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "source.elixir entity.name.function",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: [
        "source.elixir constant.other.symbol.elixir",
        "source.elixir constant.other.keywords.elixir",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "source.elixir punctuation.definition.string",
      settings: {
        foreground: color.syntax.string,
      },
    },
    {
      scope: [
        "source.elixir variable.other.readwrite.module.elixir",
        "source.elixir variable.other.readwrite.module.elixir punctuation.definition.variable.elixir",
      ],
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "source.elixir punctuation.binary.elixir",
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "",
      },
    },

    // Clojure
    {
      scope: "constant.keyword.clojure",
      settings: {
        foreground: color.syntax.constant,
      },
    },

    // Go
    {
      scope: "source.go meta.function-call.go",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: [
        "source.go keyword.package.go",
        "source.go keyword.import.go",
        "source.go keyword.function.go",
        "source.go keyword.type.go",
        "source.go keyword.struct.go",
        "source.go keyword.interface.go",
        "source.go keyword.const.go",
        "source.go keyword.var.go",
        "source.go keyword.map.go",
        "source.go keyword.channel.go",
        "source.go keyword.control.go",
      ],
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "source.go constant.language.go",
      settings: {
        foreground: color.syntax.boolean,
      },
    },
    {
      scope: "source.go constant.other.placeholder.go",
      settings: {
        foreground: color.syntax.constant,
      },
    },

    // C and C++
    {
      scope: ["entity.name.function.preprocessor.cpp", "entity.scope.name.cpp"],
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: "meta.namespace-block.cpp",
      settings: {
        foreground: color.attention.fg,
      },
    },
    {
      scope: "storage.type.language.primitive.cpp",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "meta.preprocessor.macro.cpp",
      settings: {
        foreground: color.syntax.variable,
      },
    },

    // PowerShell
    {
      scope: "variable.other.readwrite.powershell",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "support.function.powershell",
      settings: {
        foreground: color.syntax.builtin,
      },
    },

    // HTML
    {
      scope: "entity.other.attribute-name.id.html",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "punctuation.definition.tag.html",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "meta.tag.sgml.doctype.html",
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "",
      },
    },

    // JavaScript and JSDoc
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
      scope: "variable.parameter.function.js",
      settings: {
        foreground: color.syntax.type,
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
    {
      scope: "support.class.js",
      settings: {
        foreground: color.syntax.variable,
      },
    },

    // JSON and JSON with Comments
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

    // Additional JavaScript scope
    {
      scope: "variable.other.object.js",
      settings: {
        foreground: color.syntax.type,
      },
    },

    // Ruby
    {
      scope: "variable.other.ruby",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "entity.name.type.class.ruby",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: "constant.language.symbol.hashkey.ruby",
      settings: {
        foreground: color.syntax.constant,
      },
    },
    {
      scope: "constant.language.symbol.ruby",
      settings: {
        foreground: color.syntax.constant,
      },
    },

    // Less
    {
      scope: "entity.name.tag.less",
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: "keyword.other.unit.css",
      settings: {
        foreground: color.syntax.number,
      },
    },
    {
      scope:
        "meta.attribute-selector.less entity.other.attribute-name.attribute",
      settings: {
        foreground: color.syntax.tag,
      },
    },

    // Markdown
    {
      scope: [
        "markup.heading.markdown",
        "markup.heading.setext.1.markdown",
        "markup.heading.setext.2.markdown",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "markup.quote.markdown",
      settings: {
        foreground: color.syntax.comment,
        fontStyle: "",
      },
    },
    {
      scope: "markup.inline.raw.markdown",
      settings: {
        foreground: color.syntax.comment,
      },
    },
    {
      scope: [
        "markup.underline.link.markdown",
        "markup.underline.link.image.markdown",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: [
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
      ],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: [
        "punctuation.definition.string.markdown",
        "punctuation.definition.string.begin.markdown",
        "punctuation.definition.string.end.markdown",
        "meta.link.inline.markdown punctuation.definition.string",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "punctuation.definition.metadata.markdown",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "beginning.punctuation.definition.list.markdown",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "markup.inline.raw.string.markdown",
      settings: {
        foreground: color.syntax.keyword,
      },
    },

    // PHP
    {
      scope: "variable.other.php",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "variable.other.property.php",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "support.class.php",
      settings: {
        foreground: color.attention.fg,
      },
    },
    {
      scope: "meta.function-call.php punctuation",
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: "variable.other.global.php",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "variable.other.global.php punctuation.definition.variable",
      settings: {
        foreground: color.syntax.keyword,
      },
    },

    // Python
    {
      scope: "constant.language.python",
      settings: {
        foreground: color.syntax.boolean,
      },
    },
    {
      scope: "variable.parameter.function.python",
      settings: {
        foreground: color.syntax.type,
      },
    },
    {
      scope: ["meta.function-call.python", "meta.function-call.generic.python"],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "punctuation.python",
      settings: {
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "entity.name.function.decorator.python",
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: "source.python variable.language.special",
      settings: {
        foreground: color.syntax.function,
      },
    },

    // Sass and SCSS
    {
      scope: [
        "variable.scss",
        "variable.sass",
        "variable.parameter.url.scss",
        "variable.parameter.url.sass",
      ],
      settings: {
        foreground: color.syntax.keyword,
      },
    },
    {
      scope: [
        "source.css.scss meta.at-rule variable",
        "source.css.sass meta.at-rule variable",
      ],
      settings: {
        foreground: color.syntax.variable,
      },
    },
    {
      scope: [
        "meta.attribute-selector.scss entity.other.attribute-name.attribute",
        "meta.attribute-selector.sass entity.other.attribute-name.attribute",
      ],
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: ["entity.name.tag.scss", "entity.name.tag.sass"],
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: ["keyword.other.unit.scss", "keyword.other.unit.sass"],
      settings: {
        foreground: color.syntax.number,
      },
    },

    // SQL
    {
      scope: [
        "constant.other.table-name.sql",
        "constant.other.database-name.sql",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },

    // Shell scripts
    {
      scope: "entity.name.command.shell",
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "constant.other.option.shell",
      settings: {
        foreground: color.syntax.constant,
      },
    },

    // TypeScript
    {
      scope: [
        "variable.other.readwrite.alias.ts",
        "variable.other.readwrite.alias.tsx",
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
        foreground: color.syntax.type,
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
      scope: ["support.class.node.ts", "support.class.node.tsx"],
      settings: {
        foreground: color.syntax.builtin,
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
    {
      scope: [
        "meta.decorator punctuation.decorator.ts",
        "meta.decorator punctuation.decorator.tsx",
      ],
      settings: {
        foreground: color.syntax.function,
      },
    },

    // YAML
    {
      scope: "entity.name.tag.yaml",
      settings: {
        foreground: color.syntax.tag,
      },
    },
    {
      scope: ["variable.other.anchor.yaml", "variable.other.alias.yaml"],
      settings: {
        foreground: color.syntax.keyword,
      },
    },

    // JSX and TSX
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

    // Additional shared JavaScript and TypeScript scopes
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
        foreground: color.syntax.type,
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
        foreground: color.syntax.punctuation,
      },
    },
    {
      scope: "punctuation.section.embedded.end",
      settings: {
        foreground: color.syntax.punctuation,
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
        foreground: color.attention.fg,
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

module.exports = createTokenColors;
