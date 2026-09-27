# Build Pipeline

`index.js` validates shared color sources, creates every target artifact, validates VS Code and Zed themes, then stages all output directories before replacing generated files.

- `targets/vscode.js` builds VS Code color themes in `themes/`.
- `targets/iterm2.js` builds iTerm2 color presets in `iterm2/`.
- `targets/zed.js` builds a Zed extension in `zed/`, with a manifest and a theme family in `zed/themes/`.
- `write-output-directory.js` owns staging, replacement, and cleanup for generated directories.

Targets consume resolved semantic color schemes and return artifacts with a file name and serialized contents. The build coordinator owns the order of validation, staging, and replacement.
