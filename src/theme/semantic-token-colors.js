function createSemanticTokenColors(color) {
  return {
    function: color.syntax.function,
    "function.defaultLibrary": color.syntax.function,
    method: color.syntax.method,
    "method.defaultLibrary": color.syntax.method,

    variable: color.syntax.variable,
    "variable.readonly": color.syntax.constant,
    "variable.defaultLibrary": color.syntax.variable,
    "variable.readonly.defaultLibrary": color.syntax.constant,

    property: color.syntax.property,
    "property.readonly": color.syntax.constant,
    "property.defaultLibrary": color.syntax.property,

    parameter: color.syntax.parameter,
    "parameter.readonly": color.syntax.constant,

    type: color.syntax.type,
    "type.defaultLibrary": color.syntax.builtin,

    typeParameter: color.syntax.type,

    class: color.syntax.class,
    "class.defaultLibrary": color.syntax.class,

    interface: color.syntax.type,
    struct: color.syntax.type,
    enum: color.syntax.type,
    enumMember: color.syntax.constant,

    event: color.syntax.property,
    namespace: color.syntax.class,

    keyword: color.syntax.keyword,
    label: color.syntax.keyword,

    comment: color.syntax.comment,
    string: color.syntax.string,
    number: color.syntax.number,
    regexp: color.syntax.regexp,
    operator: color.syntax.operator,

    decorator: {
      foreground: color.syntax.decorator,
      italic: true,
    },

    macro: color.syntax.function,
  };
}

module.exports = createSemanticTokenColors;
