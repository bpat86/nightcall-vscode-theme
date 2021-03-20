# Nightcall 🌃

A mellow, but colorful Visual Studio Code dark theme inspired by [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) and [Overnight Slumber](https://marketplace.visualstudio.com/items?itemName=cev.overnight).

## Nightcall

![Fullscreen](https://github.com/bpat86/nightcall-vscode-theme/raw/main/nightcall-main.jpg)

|                                      CSS                                      |                                      SCSS                                      |
| :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/css-screen.jpg) | ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/scss-screen.jpg) |

|                                  Javascript                                  |                                      React                                      |
| :--------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/js-screen.jpg) | ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/react-screen.jpg) |

|                                      Typescript React                                      |                                      Angular                                      |
| :----------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/typescript-react-screen.jpg) | ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/angular-screen.jpg) |

|                                      Vue                                      |                                         Laravel                                         |
| :---------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/vue-screen.jpg) | ![](https://github.com/bpat86/nightcall-vscode-theme/raw/main/laravel-blade-screen.jpg) |

## Installation

1. Open **Extensions** sidebar panel in VS Code. `View → Extensions`
2. Search for `Nightcall`
3. Click **Install** to install it.
4. Code > Preferences > Color Theme > **Nightcall**
5. Optional: Use the recommended settings below for best experience

## Disable Italics

If you wish to disable italics, select **Nightcall (No Italics)** as the theme.

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

The font in the preview image is Fira Code, but Dank Mono also looks great and is [available here for purchase](https://dank.sh/).

```json
"editor.semanticHighlighting.enabled": false,
"editor.fontFamily": "Fira Code, Dank Mono",
"editor.fontLigatures": true,
"editor.letterSpacing": 0.3,
"editor.lineHeight": 25,
"editor.fontSize": 16,
"editor.tabSize": 2,
```

## Recommended Plugin Settings

The [Indent-Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) color settings:

```json
"indentRainbow.colors": [
  "rgba( 126, 144, 255, 0.05 )",
  "rgba( 187, 154, 247, 0.05) ",
  "rgba( 250, 166, 216, 0.05 )",
  "rgba( 255, 126, 199, 0.05 )",
  "rgba( 218, 188, 254, 0.05 )"
],
```

The [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) color settings I'm using:

```json
"bracket-pair-colorizer-2.forceIterationColorCycle": true,
"bracket-pair-colorizer-2.colors": [
  "#FF7EC7",
  "#FAA6D8",
  "#BB9AF7",
  "#7E90FF"
],
```

The [Footsteps](https://marketplace.visualstudio.com/items?itemName=Wattenberger.footsteps) color settings I'm using:

```json
"footsteps.highlightColor": "rgb( 248, 167, 212 )",
"footsteps.highlightColorMaxOpacity": 0.05,
```

The [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) color settings I'm using:

```json
"importCost.smallPackageColor": "#98FACA",
"importCost.mediumPackageColor": "#98FACA",
"importCost.largePackageColor": "#F87171",
```

## Misc

This is my first theme and there are many languages and parts of VS Code I don't use, so if something looks off it's probably because I didn't know what I was doing.
