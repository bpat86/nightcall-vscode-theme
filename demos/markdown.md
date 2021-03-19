# Nightcall 🌆

A dark Visual Studio Code theme with heavy pinks and purples. Color choices and overall vibes inspired by [Overnight Slumber](https://marketplace.visualstudio.com/items?itemName=cev.overnight) and [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl).

## Installation

1. Open **Extensions** sidebar panel in VS Code. `View → Extensions`
2. Search for `Nightcall`
3. Click **Install** to install it.
4. Code > Preferences > Color Theme > **Nightcall**
5. Optional: Use the recommended settings below for best experience

## No Italics

If you wish to disable italics, select **Nightcall (No Italics)** as your color theme.

## Recommended Settings

```json
"editor.semanticHighlighting.enabled": false
```

## Separate the Editor from the Sidebar

Taking a page from [Night Owl's](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) book, er, theme, if you'd prefer having more of constrast between the editor and sidebar, paste this into your user settings. These are my color recommendations.

```json
"workbench.colorCustomizations": {
  "[Nightcall]": {
    "contrastBorder": "#181D36",
    "activityBar.background": "#0B0E1A",
    "activityBar.border": "#181D36",
    "sideBar.background": "#0F1221",
    "sideBar.border": "#181D36",
    "list.inactiveSelectionBackground": "#0F1221",
    "tree.indentGuidesStroke": "#181D36",
    "sideBarSectionHeader.background": "#0F1221"
  },
  "[Nightcall (No Italics)]": {
    "contrastBorder": "#181D36",
    "activityBar.background": "#0B0E1A",
    "activityBar.border": "#181D36",
    "sideBar.background": "#0F1221",
    "sideBar.border": "#181D36",
    "list.inactiveSelectionBackground": "#0F1221",
    "tree.indentGuidesStroke": "#181D36",
    "sideBarSectionHeader.background": "#0F1221"
  }
}
```

## Settings shown in the preview images

The font in the preview image is Fira Code, but Dank Mono also looks great and is [available here](https://dank.sh/). Editor settings to activate font ligatures:

```json
"editor.fontFamily": "Fira Code, Dank Mono",
"editor.fontLigatures": true,
"editor.letterSpacing": 0.3,
"editor.lineHeight": 25,
"editor.fontSize": 16,
"editor.tabSize": 2,
```

The [Indent-Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) color settings:

```json
"indentRainbow.colors": [
  "rgba( 70, 119, 208, 0.05 )",
  "rgba( 254, 124, 199, 0.05 )",
  "rgba( 190, 165, 255, 0.05 )",
  "rgba( 184, 241, 209, 0.05 )",
  "rgba( 253, 215, 169, 0.05 )"
],
```

The [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) color settings I'm using:

```json
"bracket-pair-colorizer-2.forceIterationColorCycle": true,
"bracket-pair-colorizer-2.colors": [
  "#FAA7D5",
  "#FF7EC7",
  "#BB9AF7",
  "#7790FF",
  "#FED7AA"
],
```

The [Footsteps](https://marketplace.visualstudio.com/items?itemName=Wattenberger.footsteps) color settings I'm using:

```json
"footsteps.highlightColor": "rgb( 248, 167, 212 )",
"footsteps.highlightColorMaxOpacity": 0.05,
```

The [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) color settings I'm using:

```json
"importCost.smallPackageColor": "#86EFAC",
"importCost.mediumPackageColor": "#86EFAC",
"importCost.largePackageColor": "#FE5874",
```

## Misc

This is my first theme and there are many languages and parts of VS Code I don't use, so if something looks off it's probably because I didn't know what I was doing.

This is `code`

-[ ] check check 12 12 -[ ] check check 12 12

# Heading 1

## Heading 2

### Heading 3
