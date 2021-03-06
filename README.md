# Nightcall 🌃

[![Version](https://vsmarketplacebadge.apphb.com/version-short/bpat86.nightcall.svg)](https://github.com/bpat86/nightcall-vscode-theme)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/bpat86.nightcall.svg)](https://marketplace.visualstudio.com/items?itemName=bpat86.nightcall&ssr=false#overview)

A mellow, but colorful VS Code dark theme with vibrant shades of pink and purple.

I set out to make a theme versatile enough for any time of day that could better enable me to <s>stare blankly at broken blocks of code while contemplating possible career changes</s> work tirelessly on so many exciting and personally fulfilling projects.

![Default Nightcall Theme](https://github.com/bpat86/nightcall-vscode-theme/raw/main/js.png?id=04230417 "Default Nightcall Theme")

## Installation

1. Open **Extensions** sidebar panel in VS Code or go to **View → Extensions**
2. Search for **Nightcall**
3. Click **Install** to install it
4. Then go to **Code → Preferences → Color Theme → Nightcall**
5. **Optional**: Use the recommended settings below for best experience

## No Italics

If you don't like italics (how dare you), select **Nightcall (No Italics)** as the theme.
![Nightcall No Italics Theme](https://github.com/bpat86/nightcall-vscode-theme/raw/main/js_no-italics.png?id=04230417 "Nightcall No Italics Theme")

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

The font I'm using in the preview images is `Dank Mono` and is available [here for purchase](https://dank.sh/). For those not interested in buying a fancy font with cool italics, `Fira Code` also looks pretty good and can be downloaded [here for free](https://github.com/tonsky/FiraCode).

```json
"editor.fontFamily": "Dank Mono",
"editor.fontLigatures": true,
"editor.letterSpacing": 0.3,
```

## Recommended Plugin Settings

These are the settings I'm using:

### [Indent-Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow "Indent-Rainbow")

```json
"indentRainbow.colors": [
  "rgba(126, 144, 255, 0.05)",
  "rgba(187, 154, 247, 0.05)",
  "rgba(250, 166, 216, 0.05)",
  "rgba(255, 126, 199, 0.05)",
  "rgba(218, 188, 254, 0.05)",
],
```

### [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2 "Bracket Pair Colorizer 2")

```json
"bracket-pair-colorizer-2.forceIterationColorCycle": true,
"bracket-pair-colorizer-2.colors": [
  "#FF7EC7",
  "#FAA6D8",
  "#BB9AF7",
  "#7E90FF",
],
```

### [Footsteps](https://marketplace.visualstudio.com/items?itemName=Wattenberger.footsteps "Footsteps")

```json
"footsteps.highlightColor": "rgb(248, 167, 212)",
"footsteps.highlightColorMaxOpacity": 0.05,
```

### [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost "Import Cost")

```json
"importCost.smallPackageColor": "#98FACA",
"importCost.mediumPackageColor": "#98FACA",
"importCost.largePackageColor": "#F87171",
```

## Misc

This is my first theme and there are many languages and parts of VS Code I don't use often (or at all), so needless to say I might've missed a few things 😅. Feel free to file an issue if something doesn't appear intentional, or very "Nightcall-sy" if you will.

Accessibility considerations and prolific use of italics inspired by Sarah Drasner's [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) theme.

**TODO**: Eventually add a more _muted_ color theme option.
