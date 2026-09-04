// Keep the curated policy here so theme generation and validation share one scope list.
const italicScopeGroups = Object.freeze({
  emphasis: ["italic", "markup.italic.markdown"],
  comments: ["comment", "comment.line.double-slash"],
  controlFlow: ["keyword.control"],
  modifiers: ["storage.modifier"],
  languageVariables: ["variable.language"],
});

const ITALIC_SCOPES = Object.freeze(Object.values(italicScopeGroups).flat());

// Always emits the italic policy; the no-italics variant strips it afterward.
function createTypographyTokenColors(color) {
  return [
    {
      scope: italicScopeGroups.emphasis,
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "italic",
      },
    },
    {
      scope: ["bold", "markup.bold.markdown"],
      settings: {
        foreground: color.syntax.keyword,
        fontStyle: "bold",
      },
    },
    {
      scope: italicScopeGroups.comments,
      settings: {
        foreground: color.syntax.comment,
        fontStyle: "italic",
      },
    },
    {
      // Font-style-only rules preserve the language-specific colors declared below.
      scope: [...italicScopeGroups.controlFlow, ...italicScopeGroups.modifiers],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: italicScopeGroups.languageVariables,
      settings: {
        foreground: color.syntax.builtin,
        fontStyle: "italic",
      },
    },
  ];
}

module.exports = {
  createTypographyTokenColors,
  ITALIC_SCOPES,
};
