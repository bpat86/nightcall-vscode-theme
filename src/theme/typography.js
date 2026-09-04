// Keep the italic scope policy in one place for generation and validation.
const italicScopeGroups = Object.freeze({
  emphasis: ["italic", "markup.italic.markdown"],
  comments: ["comment", "comment.line.double-slash"],
  controlFlow: ["keyword.control"],
  modifiers: ["storage.modifier"],
  languageVariables: ["variable.language"],
});

const ITALIC_SCOPES = Object.freeze(Object.values(italicScopeGroups).flat());

// Generate italic rules consistently; the no-italics variant removes them later.
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
      // Style-only rules preserve colors assigned by language-specific rules below.
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
