const { createTypographyTokenColors } = require("../typography");
const {
  createSharedTokenColors,
  createSharedOverrideTokenColors,
} = require("./shared");
const {
  createCssTokenColors,
  createHtmlTokenColors,
  createLessTokenColors,
  createSassTokenColors,
} = require("./web");
const {
  createJavaScriptTokenColors,
  createJsonTokenColors,
  createJavaScriptObjectTokenColors,
  createTypeScriptTokenColors,
  createJsxTokenColors,
} = require("./javascript");
const {
  createMarkdownTokenColors,
  createYamlTokenColors,
} = require("./markup");
const {
  createCoffeeScriptTokenColors,
  createElixirTokenColors,
  createClojureTokenColors,
  createPowerShellTokenColors,
  createRubyTokenColors,
  createPhpTokenColors,
  createPythonTokenColors,
  createShellTokenColors,
} = require("./scripting");
const {
  createCSharpTokenColors,
  createGoTokenColors,
  createCppTokenColors,
  createSqlTokenColors,
} = require("./systems");

function createTokenColors(color) {
  return [
    ...createTypographyTokenColors(color),
    ...createSharedTokenColors(color),
    ...createCoffeeScriptTokenColors(color),
    ...createCSharpTokenColors(color),
    ...createCssTokenColors(color),
    ...createElixirTokenColors(color),
    ...createClojureTokenColors(color),
    ...createGoTokenColors(color),
    ...createCppTokenColors(color),
    ...createPowerShellTokenColors(color),
    ...createHtmlTokenColors(color),
    ...createJavaScriptTokenColors(color),
    ...createJsonTokenColors(color),
    ...createJavaScriptObjectTokenColors(color),
    ...createRubyTokenColors(color),
    ...createLessTokenColors(color),
    ...createMarkdownTokenColors(color),
    ...createPhpTokenColors(color),
    ...createPythonTokenColors(color),
    ...createSassTokenColors(color),
    ...createSqlTokenColors(color),
    ...createShellTokenColors(color),
    ...createTypeScriptTokenColors(color),
    ...createYamlTokenColors(color),
    ...createJsxTokenColors(color),
    ...createSharedOverrideTokenColors(color),
  ];
}

module.exports = createTokenColors;
