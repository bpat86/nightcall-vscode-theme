# Nightcall ✨

A mellow yet colorful Visual Studio Code theme built around vibrant shades of pink, purple, and blue.

![Nightcall theme banner](https://raw.githubusercontent.com/bpat86/nightcall-vscode-theme/main/images/banner.jpg)

Designed for productive coding sessions spent ~~reviewing 1,000 lines of AI-generated abstractions to fix the one-line problem I started with~~ building exciting and personally fulfilling things, completely unbothered by the state of the industry or your future employment prospects.

Also, it is not lost on me that, here in the year of our Lord 2026, most people are either rotating between the same two or three Very Popular Themes™ or have already moved on to the next popular non-VS Code editor. If you’re still here reading (and installing) this, know that I love you. 🫶

## Installation

1. Open the **Extensions** view in VS Code (`⇧⌘X` on macOS).
2. Search for **Nightcall**.
3. Select the extension and click **Install**.
4. Open the Command Palette (`⇧⌘P`) and run **Preferences: Color Theme**.
5. Select **Nightcall**.

## Theme Variants

The standard Nightcall variants feature an updated color palette and are designed with the modern VS Code layout in mind, including its more noticeable workbench borders.

If you prefer a cleaner, borderless look, choose one of the Borderless variants or adjust your VS Code settings to disable the newer layout UI. If you prefer the original Nightcall color palette, the Classic variants preserve that familiar look while refining it for modern VS Code.

- **Nightcall**: the default palette with selective italics.

- **Nightcall (No Italics)**: the default palette without italics, if you must.

- **Nightcall (Borderless)**: the default palette with prominent layout borders hidden.

- **Nightcall Muted**: a softer, more subdued take on Nightcall with selective italics.

- **Nightcall Muted (No Italics)**: a softer, more subdued take on Nightcall without italics.

- **Nightcall Muted (Borderless)**: the muted palette with prominent layout borders hidden.

- **Nightcall Classic**: the original Nightcall look, refined for modern VS Code with updated workbench colors, the classic borderless layout, and other subtle improvements.

- **Nightcall Classic (No Italics)**: the refined, borderless Classic experience without italics. How dare you.

The italic variants use italics selectively for comments, control flow, imports and exports, declarations, and contextual keywords such as `this`, `self`, and `super`.

## iTerm2 Color Presets

Color presets for each theme variant are also available:

- [nightcall-default.itermcolors](iterm2/nightcall-default.itermcolors)
- [nightcall-muted.itermcolors](iterm2/nightcall-muted.itermcolors)
- [nightcall-classic.itermcolors](iterm2/nightcall-classic.itermcolors)

In iTerm2, open **Settings**, select a profile, open **Colors**, then choose **Color Presets...** and **Import...**.

## Recommended Settings

I personally use [Dank Mono](https://philpl.gumroad.com/l/dank-mono), though the theme should work well with any editor font.

If you use Dank Mono, you can enable it with:

```json
{
  "editor.fontFamily": "Dank Mono",
  "editor.fontLigatures": true
}
```

## Optional: Indent Rainbow

These colors pair well with the [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) extension:

```json
{
  "indentRainbow.colors": [
    "rgba(126, 144, 255, 0.05)",
    "rgba(187, 154, 247, 0.05)",
    "rgba(250, 166, 216, 0.05)",
    "rgba(255, 126, 199, 0.05)",
    "rgba(218, 188, 254, 0.05)"
  ]
}
```

## Feedback

This is mostly a fun creative outlet for me, and I’m trying not to take it too seriously. VS Code also has an absurd number of languages, syntax rules, UI states, and obscure little corners I may never encounter, so despite my best efforts, I may have missed some things.

If you see anything that looks unintentional, or insufficiently Nightcall-y, please open an issue. Including the language or file type and, when possible, a screenshot.
