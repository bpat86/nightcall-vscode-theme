# VS Code Theme Target

This target turns resolved semantic colors into complete VS Code theme files through several layers:

1. `theme-definitions.js` defines every shipped theme, including its color scheme, output metadata, and border and italic options.
2. `create-theme.js` assembles the base VS Code theme from the resolved semantic color scheme.
3. `workbench-colors.js`, `token-colors/`, and `semantic-token-colors.js` generate VS Code's three color systems: workbench colors, TextMate token colors, and semantic token colors.
4. `token-colors/typography.js` defines shared TextMate typography rules and the italic-scope policy used during validation.
5. `options.js` applies theme-level border and italic preferences to the assembled theme.

`token-colors/index.js` composes the TextMate rule groups in a specific order. Because later rules can override earlier ones, preserve this ordering unless selector precedence is being changed intentionally.

In short:

Theme Definition → Base Theme → VS Code Color Systems → Theme Options → Artifact

## Agents window

The Agents shell and details pane use the default canvas, while card panels use
the inset canvas. Agents panel, card, bottom-panel, and chat-input borders share
an opaque, subdued secondary-accent color with at least 3:1 contrast against
their surfaces. The focused input retains the full secondary accent.

The Agents editor frame uses `agentsPanel.border`, rather than `editor.border`.
These component borders remain present in borderless variants, as before.
