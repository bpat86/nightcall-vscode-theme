# Color Pipeline

The theme build transforms palette colors into editor and terminal theme values through three layers:

1. `palettes/default.json` and `palettes/classic.json` define the reusable color scales.
2. `schemes/*.json` assign palette colors to semantic roles such as `canvas.default` and `syntax.keyword`.
3. The formats in `../formats/` map those resolved roles independently to VS Code workbench and syntax colors, Zed UI and Tree-sitter captures, and iTerm2 terminal presets.

`color-scales.js` loads and combines the available palette scales.

`color-scheme.js` loads a color scheme, resolves its palette references into concrete color values, and passes the resulting semantic color map to the theme builders.

In short:

Palette -> Semantic Scheme -> VS Code, Zed, and iTerm2 Themes
