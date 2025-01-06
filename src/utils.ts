import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import * as _keyword from "./keyword";

/**
 * class to represent an AMPL terminal TerminalOptions
 * @class
 * TODO: implement vscode.terminal interface
 */
export class AMPLTerminal {
  /**
   * name of the terminal
   */
  public name: string;

  /**
   * path to the AMPL executable -- either from the configuration or from the PATH environment variable
   */
  public amplPath: string =
    vscode.workspace.getConfiguration("ampl").get<string>("pathToExecutable") ||
    findPathFile("ampl.exe") ||
    findPathFile("ampl");

  /**
   * arguments to pass to the AMPL executable - comes from user settings
   */
  public executableArgs: string[] = this.amplPath
    ? vscode.workspace.getConfiguration("ampl").get<string[]>("exeArgs") || []
    : [];

  /**
   * terminal options for the AMPL terminal, constructed from the amplPath and executableArgs
   */
  public terminalOptions: vscode.TerminalOptions;

  /**
   * constructor for the AMPLTerminal
   * @param {string} name - the name of the terminal
   */
  constructor(name?: string) {
    this.name = name || "AMPL";
    this.terminalOptions = {
      name: this.name,
      shellPath: this.amplPath || vscode.env.shell,
      shellArgs: this.executableArgs,
    };
  }
}
/**
 * function to get the base completion item for a keyword
 * @param {_keyword.Keyword} keyword - the keyword to get the completion item for
 * @returns {vscode.CompletionItem} - the completion item for the keyword
 */
export function getBaseCompletionItem(
  keyword: _keyword.Keyword
): vscode.CompletionItem {
  switch (keyword.type) {
    case "function":
      return new vscode.CompletionItem(
        keyword.name,
        vscode.CompletionItemKind.Function
      );
    case "constant":
      return new vscode.CompletionItem(
        keyword.name,
        vscode.CompletionItemKind.Constant
      );
    case "declaration":
      return new vscode.CompletionItem(
        keyword.name,
        vscode.CompletionItemKind.Struct
      );
    default:
      return new vscode.CompletionItem(
        keyword.name,
        vscode.CompletionItemKind.Keyword
      );
  }
}

/**
 * function to get the markdown for a keyword
 * @param {_keyword.Keyword} keyword  - the keyword to get the markdown for
 * @returns  {vscode.MarkdownString} the markdown string for the keyword
 */
export function getKeywordMarkdown(
  keyword: _keyword.Keyword
): vscode.MarkdownString {
  const markdownString = new vscode.MarkdownString();
  // markdownString.appendMarkdown(`#${keyword.name}\n`);
  if (keyword.type === "function") {
    markdownString.appendCodeblock(
      `${keyword.name}(${
        keyword.parameters
          ? keyword.parameters
              .map(
                (p) =>
                  `${p.name.replace("(", "")}${
                    p.default !== undefined ? "?" : ""
                  }${p.name !== "..." ? ": " + p.type : " " + p.type}${
                    p.default !== undefined ? " = " + p.default : ""
                  }`
              )
              .join(", ")
          : ""
      }) -> ${keyword.datatype}`,
      "ampl"
    );
  }
  if (keyword.type === "constant") {
    markdownString.appendCodeblock(
      `${keyword.name}: ${keyword.datatype}`,
      "ampl"
    );
  }

  markdownString.appendMarkdown(`${keyword.description}\n\n`);
  if (
    keyword.type === "function" &&
    keyword.parameters &&
    keyword.parameters.length > 0
  ) {
    markdownString.appendMarkdown("**Arguments**:\n");
    for (const param of keyword.parameters) {
      markdownString.appendMarkdown(
        `- \`${param.name}${
          param.name !== "..." ? ": " + param.type : " " + param.type
        }${param.default !== undefined ? " = " + param.default : ""}\`: ${
          param.description
        }\n`
      );
    }
  }
  if (keyword.type === "function") {
    markdownString.appendMarkdown(`\n**returns**: \`${keyword.datatype}\`\n`);
  }

  if (keyword.example) {
    markdownString.appendMarkdown("\n**Example**:\n");
    markdownString.appendCodeblock(keyword.example, "ampl");
  }

  return markdownString;
}

/**
 * looks for a file in the PATH environment variable
 * returns the full path.
 * @param {string} exeName - the name of the executable to find
 * @returns {string} the path to the executable
 */
export function findPathFile(exeName: string): string {
  const pathEnv = process.env.PATH || "";
  for (const _path of pathEnv.split(os.platform() === "win32" ? ";" : ":")) {
    const fullPath = path.join(_path, exeName);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return "";
}
