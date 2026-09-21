function createCSharpTokenColors(color) {
  return [
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
  ];
}

function createGoTokenColors(color) {
  return [
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
  ];
}

function createCppTokenColors(color) {
  return [
    {
      scope: ["entity.name.function.preprocessor.cpp", "entity.scope.name.cpp"],
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: "meta.namespace-block.cpp",
      settings: {
        foreground: color.attention.foreground,
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
  ];
}

function createSqlTokenColors(color) {
  return [
    {
      scope: [
        "constant.other.table-name.sql",
        "constant.other.database-name.sql",
      ],
      settings: {
        foreground: color.syntax.type,
      },
    },
  ];
}

module.exports = {
  createCSharpTokenColors,
  createGoTokenColors,
  createCppTokenColors,
  createSqlTokenColors,
};
