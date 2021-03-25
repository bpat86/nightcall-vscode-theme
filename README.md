# Nightcall 🌃

A mellow, but colorful VS Code dark theme with pops of purple and pink. Inspired by [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) and [Overnight Slumber](https://marketplace.visualstudio.com/items?itemName=cev.overnight).

![Default Nightcall Theme](https://github.com/bpat86/nightcall-vscode-theme/raw/main/main.png "Default Nightcall Theme")

## Installation

1. Open **Extensions** sidebar panel in VS Code. **View → Extensions**
2. Search for **_Nightcall_**
3. Click **Install** to install it.
4. **Code → Preferences → Color Theme → _Nightcall_**
5. **Optional**: Use the recommended settings below for best experience

## No Italics

If you wish to disable italics, select **_Nightcall (No Italics)_** as the theme.
![Nightcall No Italics Theme](https://github.com/bpat86/nightcall-vscode-theme/raw/main/main_no-italics.png "Nightcall No Italics Theme")

## Separate the Editor from the Sidebar

Taking a page from [Night Owl's](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) book, er, theme, if you'd prefer more constrast between the editor and sidebar, paste this into your user settings. These are my color recommendations:

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

## Recommended Settings

The font I'm using is `Dank Mono` and is available [here for purchase](https://dank.sh/). `Fira Code` also looks pretty good and is available [here for free](https://github.com/tonsky/FiraCode).

```json
"editor.semanticHighlighting.enabled": false, // Important!
"editor.fontFamily": "Dank Mono, Fira Code",
"editor.fontLigatures": true,
"editor.letterSpacing": 0.3,
"editor.lineHeight": 26,
"editor.fontSize": 17, // 16 for Fira Code
"editor.tabSize": 2,
```

## Recommended Plugin Settings

The [Indent-Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) color settings I'm using:

```json
"indentRainbow.colors": [
  "rgba(126, 144, 255, 0.05)",
  "rgba(187, 154, 247, 0.05)",
  "rgba(250, 166, 216, 0.05)",
  "rgba(255, 126, 199, 0.05)",
  "rgba(218, 188, 254, 0.05)",
],
```

The [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) color settings I'm using:

```json
"bracket-pair-colorizer-2.forceIterationColorCycle": true,
"bracket-pair-colorizer-2.colors": [
  "#FF7EC7",
  "#FAA6D8",
  "#BB9AF7",
  "#7E90FF",
],
```

The [Footsteps](https://marketplace.visualstudio.com/items?itemName=Wattenberger.footsteps) color settings I'm using:

```json
"footsteps.highlightColor": "rgb(248, 167, 212)",
"footsteps.highlightColorMaxOpacity": 0.05,
```

The [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) color settings I'm using:

```json
"importCost.smallPackageColor": "#98FACA",
"importCost.mediumPackageColor": "#98FACA",
"importCost.largePackageColor": "#F87171",
```

## Misc

This is my first theme and there are many languages and parts of VS Code I don't use, so I might've missed a couple things 😅.
