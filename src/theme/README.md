# Theme Pipeline

Files in this directory omit a `theme-` prefix because the directory already supplies that context.

1. `definitions.js` lists every shipped theme, its color scheme, output metadata, and border/italic options.
2. `create.js` assembles one base VS Code theme from resolved semantic colors.
3. `workbench-colors.js`, `token-colors/`, and `semantic-token-colors.js` build the three VS Code color systems.
4. `typography.js` defines shared TextMate typography rules and the italic-scope policy used by validation.
5. `options.js` applies border and italic choices to the assembled theme.

`token-colors/index.js` composes TextMate rule groups in explicit order. Later rules can override earlier rules, so preserve that order unless changing selector precedence intentionally.

Names such as `workbench-colors` and `semantic-token-colors` follow VS Code terminology. Generic names such as `create`, `definitions`, and `options` rely on the `theme/` directory for their domain context.
