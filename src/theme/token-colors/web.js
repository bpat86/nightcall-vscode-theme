function createCssTokenColors(color) {
  return [
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
  ];
}

function createHtmlTokenColors(color) {
  return [
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
  ];
}

function createLessTokenColors(color) {
  return [
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
  ];
}

function createSassTokenColors(color) {
  return [
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
  ];
}

module.exports = {
  createCssTokenColors,
  createHtmlTokenColors,
  createLessTokenColors,
  createSassTokenColors,
};
