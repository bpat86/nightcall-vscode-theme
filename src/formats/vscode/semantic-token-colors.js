function createSemanticTokenColors(color) {
  return {
    // Callable symbols
    function: color.syntax.function,
    "function.defaultLibrary": color.syntax.function,
    method: color.syntax.method,
    "method.defaultLibrary": color.syntax.method,
    macro: color.syntax.function,

    // Values and members
    variable: color.syntax.variable,
    "variable.readonly": color.syntax.constant,
    "variable.defaultLibrary": color.syntax.variable,
    "variable.readonly.defaultLibrary": color.syntax.constant,
    property: color.syntax.property,
    "property.readonly": color.syntax.constant,
    "property.defaultLibrary": color.syntax.property,
    "property.readonly.defaultLibrary": color.syntax.constant,
    parameter: color.syntax.parameter,
    "parameter.readonly": color.syntax.constant,
    "parameter.defaultLibrary": color.syntax.parameter,
    "parameter.readonly.defaultLibrary": color.syntax.constant,
    event: color.syntax.property,
    "event.defaultLibrary": color.syntax.property,
    enumMember: color.syntax.constant,
    "enumMember.defaultLibrary": color.syntax.constant,

    // Types and namespaces
    type: color.syntax.type,
    "type.defaultLibrary": color.syntax.builtin,
    typeParameter: color.syntax.type,
    "typeParameter.defaultLibrary": color.syntax.type,
    class: color.syntax.class,
    "class.defaultLibrary": color.syntax.builtin,
    interface: color.syntax.type,
    "interface.defaultLibrary": color.syntax.builtin,
    struct: color.syntax.type,
    "struct.defaultLibrary": color.syntax.builtin,
    enum: color.syntax.type,
    "enum.defaultLibrary": color.syntax.builtin,
    namespace: color.syntax.type,
    "namespace.defaultLibrary": color.syntax.type,

    // Language syntax and literals
    keyword: color.syntax.keyword,
    label: color.syntax.keyword,
    comment: color.syntax.comment,
    string: color.syntax.string,
    number: color.syntax.number,
    regexp: color.syntax.regexp,
    operator: color.syntax.operator,

    // Annotations
    decorator: {
      foreground: color.syntax.decorator,
      italic: true,
    },
  };
}

module.exports = createSemanticTokenColors;
