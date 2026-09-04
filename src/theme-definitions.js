// Variants are named in src/theme/variants.js and apply on top of the scheme.
const defaults = { variants: [] };

const themes = [
  {
    scheme: "dark-default",
    type: "dark",
    name: "Nightcall",
    author: "Robert Patterson",
    fileName: "Nightcall-color-theme.json",
  },
  {
    scheme: "dark-default",
    type: "dark",
    name: "Nightcall (No Italics)",
    author: "Robert Patterson",
    variants: ["no-italics"],
    fileName: "Nightcall-color-theme-no-italics.json",
  },
  {
    scheme: "dark-default",
    type: "dark",
    name: "Nightcall (Borderless)",
    author: "Robert Patterson",
    variants: ["borderless"],
    fileName: "Nightcall-color-theme-borderless.json",
  },
  {
    scheme: "dark-muted",
    type: "dark",
    name: "Nightcall Muted",
    author: "Robert Patterson",
    fileName: "Nightcall-color-theme-muted.json",
  },
  {
    scheme: "dark-muted",
    type: "dark",
    name: "Nightcall Muted (No Italics)",
    author: "Robert Patterson",
    variants: ["no-italics"],
    fileName: "Nightcall-color-theme-muted-no-italics.json",
  },
  {
    scheme: "dark-muted",
    type: "dark",
    name: "Nightcall Muted (Borderless)",
    author: "Robert Patterson",
    variants: ["borderless"],
    fileName: "Nightcall-color-theme-muted-borderless.json",
  },
  {
    scheme: "dark-classic",
    type: "dark",
    name: "Nightcall Classic",
    author: "Robert Patterson",
    variants: ["borderless"],
    fileName: "Nightcall-color-theme-classic.json",
  },
  {
    scheme: "dark-classic",
    type: "dark",
    name: "Nightcall Classic (No Italics)",
    author: "Robert Patterson",
    variants: ["borderless", "no-italics"],
    fileName: "Nightcall-color-theme-classic-no-italics.json",
  },
];

module.exports = themes.map((theme) => ({ ...defaults, ...theme }));
