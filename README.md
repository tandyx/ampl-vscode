# ampl-vscode

Language extension for a mathematical programming language. This was a fork of  @michael-sundvick's vscode extentsion for ampl

this is still in development, please submit pull requests, issues or feature requests in the [repo](https://github.com/johan-cho/ampl-vscode.git).

## Features

- syntax highlighter
- definition on hover
- include files in console
- snippets
- autocomplete

## requirements

a version of AMPL is needed to run files.

## settings

This extension contributes the following settings:

- `ampl.pathToExecutable`: path to `ampl.exe` -- defaults to `"ampl"` and assumes you have it on path
- `ampl.useRelativePath`: toggles relative file paths
- `ampl.complierArgs`: arguments to feed into the ampl arguments
