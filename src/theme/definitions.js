const defaults = {
  type: "dark",
  author: "Robert Patterson",
  borders: true,
  italics: true,
};

const themes = [
  {
    scheme: "dark-default",
    name: "Nightcall",
    fileName: "Nightcall-color-theme.json",
  },
  {
    scheme: "dark-default",
    name: "Nightcall (No Italics)",
    italics: false,
    fileName: "Nightcall-color-theme-no-italics.json",
  },
  {
    scheme: "dark-default",
    name: "Nightcall (Borderless)",
    borders: false,
    fileName: "Nightcall-color-theme-borderless.json",
  },
  {
    scheme: "dark-muted",
    name: "Nightcall Muted",
    fileName: "Nightcall-color-theme-muted.json",
  },
  {
    scheme: "dark-muted",
    name: "Nightcall Muted (No Italics)",
    italics: false,
    fileName: "Nightcall-color-theme-muted-no-italics.json",
  },
  {
    scheme: "dark-muted",
    name: "Nightcall Muted (Borderless)",
    borders: false,
    fileName: "Nightcall-color-theme-muted-borderless.json",
  },
  {
    scheme: "dark-classic",
    name: "Nightcall Classic",
    borders: false,
    fileName: "Nightcall-color-theme-classic.json",
  },
  {
    scheme: "dark-classic",
    name: "Nightcall Classic (No Italics)",
    borders: false,
    italics: false,
    fileName: "Nightcall-color-theme-classic-no-italics.json",
  },
];

module.exports = themes.map((theme) => ({ ...defaults, ...theme }));
