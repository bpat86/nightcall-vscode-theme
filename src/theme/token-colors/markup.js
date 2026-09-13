function createMarkdownTokenColors(color) {
  return [
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
  ];
}

function createYamlTokenColors(color) {
  return [
    {
      scope: "entity.name.tag.yaml",
      settings: {
        foreground: color.syntax.constant,
      },
    },
    {
      scope: ["variable.other.anchor.yaml", "variable.other.alias.yaml"],
      settings: {
        foreground: color.syntax.keyword,
      },
    },
  ];
}

module.exports = {
  createMarkdownTokenColors,
  createYamlTokenColors,
};
