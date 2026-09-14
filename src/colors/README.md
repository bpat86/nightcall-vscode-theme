# Color Pipeline

The theme build transforms palette colors into VS Code theme values through three layers:

1. `palettes/default.json` and `palettes/classic.json` define the reusable color scales.
2. `schemes/*.json` assign palette colors to semantic roles such as `canvas.default` and `syntax.keyword`.
3. Theme builders in `../theme/` map those resolved semantic roles to VS Code workbench colors, TextMate scopes, and semantic token keys.

`color-scales.js` loads and combines the available palette scales.

`color-scheme.js` loads a color scheme, resolves its palette references into concrete color values, and passes the resulting semantic color map to the theme builders.

In short:

Palette → Semantic Scheme → VS Code Theme
