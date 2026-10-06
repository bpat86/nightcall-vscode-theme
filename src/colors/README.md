# Color Pipeline

The theme build transforms palette colors into editor and terminal theme values through three layers:

1. `palettes/default.json` and `palettes/classic.json` define the reusable color scales.
2. `schemes/*.json` assign palette colors to semantic roles such as `canvas.default` and `syntax.keyword`.
3. The formats in `../formats/` map those resolved roles independently to VS Code workbench and syntax colors, Zed UI and Tree-sitter captures, and iTerm2 terminal presets.

`color-scales.js` loads and combines the available palette scales.

`color-scheme.js` loads a color scheme, resolves its palette references into concrete color values, and passes the resulting semantic color map to the theme builders.

In short:

Palette -> Semantic Scheme -> VS Code, Zed, and iTerm2 Themes

Each scheme defines `accent.primary`, `accent.secondary`, and `accent.tertiary` with `foreground`, `background`, and `border` colors. Accent foregrounds are darker than their backgrounds, matching the light-background, dark-foreground contrast of control colors.

The `extensionIcon` roles independently define the star, verified, prerelease, sponsor, and private extension icon foregrounds. Schemes use warm gold for recognition/support badges, blue for verified publishers, and cyan for prereleases.

The `interaction` roles provide state backgrounds for highlighted content, hover, pressed, selected, focused, and inactive selection states. Formatters map these shared roles to matching editor and UI states.

The `badge.background` and `badge.foreground` roles independently style VS Code's general, activity bar, profile, and agent badges without changing shared accent or control colors. Each scheme uses a dark pink background and near-white foreground with at least 4.5:1 contrast for small badge text. Warning, error, remote, and panel-title badges retain their separate semantic colors.

Each `inlayHint.parameter` and `inlayHint.type` role defines independent `foreground` and `background` palette colors. The VS Code formatter applies the inlay hint opacity settings to those colors.
