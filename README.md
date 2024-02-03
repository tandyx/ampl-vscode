# ampl-vscode

Unnoficial language extension for [ampl](https://ampl.com), a mathematical programming language. This was a fork of  @michael-sundvick's [original work](https://https://github.com/msundvick/ampl)

this is still in development, please submit pull requests, issues or feature requests in the [repo](https://github.com/johan-cho/ampl-vscode.git).

## Features

- syntax coloring
- definition on hover
- include files in console
- snippets
- autocomplete

## requirements

a version of AMPL is needed to run files.

## settings

This extension contributes the following settings:

- `ampl.pathToExecutable`: path to `ampl.exe` -- defaults to looking for it on path
- `ampl.useRelativePath`: toggles relative file paths when running through the ample console
- `ampl.complierArgs`: arguments to feed into the ampl executable

## building

you could build the extentsion by cloning the repo, and then running:

```shell
npm run compile
```

the source file for autocomplete, syntax coloring and definitions is [./resources/keywords.json](./resources/keywords.json).
