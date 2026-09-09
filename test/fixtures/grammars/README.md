# TextMate Grammar Fixtures

The four JSON grammars are unmodified fixtures from Microsoft VS Code tag
`1.100.0`, under `extensions/javascript/syntaxes` and
`extensions/typescript-basics/syntaxes`:

https://github.com/microsoft/vscode/tree/1.100.0/extensions

They are distributed under the adjacent MIT license. Pinning the files keeps
tests offline and independent of the installed editor version. When updating
them, replace all four files from the same VS Code release and run
`node --test test/textmate.test.js` before accepting changed expectations.

The tests use distinct colors for syntax roles so equal palette colors cannot
hide incorrect mappings. They check TextMate output with and without italics;
they do not simulate a language server's semantic token classifications.

The bundled JS/TS grammars classify names such as `parseInt`, `console`, and
`JSON` as ordinary functions or variables. Builtin semantic selectors supply
their library styling; explicit `support.*` rules remain available for grammars
that emit library scopes.

Decorator names and arguments can have identical scope stacks (for example,
`logged` in `@logged` and `option` in `@configure(option)`). Only the `@`
punctuation receives lexical decorator styling. Semantic decorator tokens style
the name without incorrectly recoloring arguments or nested function calls.
