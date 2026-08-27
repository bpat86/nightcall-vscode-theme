# Nightcall

A mellow yet colorful Visual Studio Code theme built around vibrant shades of pink, purple, and blue.

![Nightcall theme banner](https://raw.githubusercontent.com/bpat86/nightcall-vscode-theme/main/banner.jpg)

## Installation

1. Open the **Extensions** view in VS Code (`⇧⌘X` on macOS).
2. Search for **Nightcall**.
3. Select the extension and click **Install**.
4. Open the Command Palette (`⇧⌘P`) and run **Preferences: Color Theme**.
5. Select **Nightcall**.

## Theme Variants

- **Nightcall**: the default palette with curated italics.
- **Nightcall (No Italics)**: the default palette without italics.
- **Nightcall Muted**: softer neutral colors with curated italics.
- **Nightcall Muted (No Italics)**: the muted palette without italics.
- **Nightcall Classic**: the original Nightcall look, remastered on the current theme pipeline with semantic highlighting and modern workbench colors.
- **Nightcall Classic (No Italics)**: the classic palette without italics.

The italic variants reserve italics for emphasis, comments, control flow, declaration modifiers, and contextual language variables such as `this`, `self`, and `super`.

## Recommended Settings

I personally use [Dank Mono](https://philpl.gumroad.com/l/dank-mono), though the theme is designed to work well with any editor font.

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
    "rgba(126, 144, 255, 0.1)",
    "rgba(187, 154, 247, 0.1)",
    "rgba(250, 166, 216, 0.1)",
    "rgba(255, 126, 199, 0.1)",
    "rgba(218, 188, 254, 0.1)"
  ]
}
```

## Feedback

If you notice something that looks unintentional, please open an issue and include the language or file type and, when possible, a screenshot.
