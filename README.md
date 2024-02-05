# ampl-vscode

Unnoficial language extension for [ampl](https://ampl.com), a mathematical programming language. This was a fork of [@msundvick](https://github.com/msundvick)'s [original work](https://github.com/msundvick/ampl).

This extension is still in development, please submit pull requests, issues or feature requests in the [repo](https://github.com/johan-cho/ampl-vscode.git).

Link to marketplace: <https://marketplace.visualstudio.com/items?itemName=johan-cho.ampl-vscode>

## Features

- Syntax coloring, definition on hover
- Additional terminal
- Including files in terminal
- Snippets, tab to complete keywords

## Requirements

- A version of AMPL is needed to run files. You could get a free license and install it on [ampl.com](https://ampl.com)

- Visual Studio Code 1.86.0 +

## Settings

- `ampl.pathToExecutable`: path to `ampl.exe` -- defaults to looking for it on path
- `ampl.useRelativePath`: toggles relative file paths when running through the ample console
- `ampl.complierArgs`: arguments to feed into the ampl executable

## Building

Cloning:

```shell
git clone https://https://github.com/johan-cho/ampl-vscode.git
```

Running:

```shell
npm run compile
```

will build and compile the app. Press f5 to launch the debugger. The source file for autocomplete, syntax coloring and definitions is [./resources/keywords.json](./resources/keywords.json).

## Contributions

- Jamie Cho > [PR-4](https://github.com/johan-cho/ampl-vscode/pull/4)
