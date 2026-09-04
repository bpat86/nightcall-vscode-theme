# Nightcall

A mellow yet colorful Visual Studio Code theme built around vibrant shades of pink, purple, and blue.

![Nightcall theme banner](https://raw.githubusercontent.com/bpat86/nightcall-vscode-theme/main/banner.jpg)

Designed for productive coding sessions spent ~~reviewing 600 lines of AI-generated code to fix the one-line problem I started with~~ building exciting and personally fulfilling things, completely unbothered by the state of the industry or your future employment prospects.

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
    "rgba(126, 144, 255, 0.1)",
    "rgba(187, 154, 247, 0.1)",
    "rgba(250, 166, 216, 0.1)",
    "rgba(255, 126, 199, 0.1)",
    "rgba(218, 188, 254, 0.1)"
  ]
}
```

## Feedback

VS Code has a lot of languages, syntax rules, UI states, and little corners I may never personally encounter, so despite my best efforts, I’m sure I’ve missed a few things.

If you see anything that looks unintentional, or insufficiently Nightcall-y, please open an issue. Including the language or file type and, when possible, a screenshot.

And with any luck, it won’t take me another five years to fix it.
