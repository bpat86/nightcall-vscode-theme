# Color Pipeline

The theme build turns color data into VS Code theme values in three stages:

1. `palettes/default.json` and `palettes/classic.json` define reusable color scales.
2. `schemes/*.json` map semantic roles such as `canvas.default` and `syntax.keyword` to palette references.
3. Theme builders in `../theme/` map resolved semantic roles to VS Code workbench, TextMate, and semantic-token keys.

`color-scales.js` loads and combines the raw color scales. `color-scheme.js` loads a scheme and resolves its palette references before the scheme is passed to the theme builders.
