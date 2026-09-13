function createCoffeeScriptTokenColors(color) {
  return [
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
  ];
}

function createElixirTokenColors(color) {
  return [
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
  ];
}

function createClojureTokenColors(color) {
  return [
    {
      scope: "constant.keyword.clojure",
      settings: {
        foreground: color.syntax.constant,
      },
    },
  ];
}

function createPowerShellTokenColors(color) {
  return [
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
  ];
}

function createRubyTokenColors(color) {
  return [
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
  ];
}

function createPhpTokenColors(color) {
  return [
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
        foreground: color.attention.foreground,
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
  ];
}

function createPythonTokenColors(color) {
  return [
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
      scope: "source.python variable.language.special",
      settings: {
        foreground: color.syntax.function,
      },
    },
  ];
}

function createShellTokenColors(color) {
  return [
    {
      scope: ["entity.name.command.shell", "entity.name.function.shell"],
      settings: {
        foreground: color.syntax.function,
      },
    },
    {
      scope: "support.function.shell",
      settings: {
        foreground: color.syntax.builtin,
      },
    },
    {
      scope: "variable.other.assignment.shell",
      settings: {
        foreground: color.syntax.property,
      },
    },
    {
      scope: "constant.other.option.shell",
      settings: {
        foreground: color.syntax.constant,
      },
    },
  ];
}

module.exports = {
  createCoffeeScriptTokenColors,
  createElixirTokenColors,
  createClojureTokenColors,
  createPowerShellTokenColors,
  createRubyTokenColors,
  createPhpTokenColors,
  createPythonTokenColors,
  createShellTokenColors,
};
