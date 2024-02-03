import * as os from "os";
import * as fs from "fs";
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
    findExecutable("ampl.exe");

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
 * @returns  {vscode.MarkdownString} - the markdown string for the keyword
 */
export function getKeywordMarkdown(
  keyword: _keyword.Keyword
): vscode.MarkdownString {
  const markdownString = new vscode.MarkdownString();
  // markdownString.appendMarkdown(`#${keyword.name}\n`);
  if (keyword.type === "constant" && keyword.datatype) {
    markdownString.appendMarkdown(`(${keyword.datatype}): `);
  }
  markdownString.appendMarkdown(`${keyword.description}\n\n`);
  if (keyword.type === "function" && keyword.parameters) {
    markdownString.appendMarkdown("**Arguments**:\n");
    for (const param of keyword.parameters) {
      markdownString.appendMarkdown(
        `- \`${param.name}\` (${param.type}): ${param.description}\n`
      );
    }
    markdownString.appendMarkdown(`\n**returns**: ${keyword.datatype}\n`);
    if (keyword.example) {
      markdownString.appendMarkdown("\n**Example**:\n");
      markdownString.appendCodeblock(keyword.example, "ampl");
    }
  } else if (keyword.example) {
    markdownString.appendCodeblock(keyword.example, "ampl");
  }
  return markdownString;
}

/**
 * looks for the executable in the PATH environment variable
 * @param {string} exeName - the name of the executable to find
 * @returns
 */
export function findExecutable(exeName: string): string {
  const path = process.env.PATH;
  if (path) {
    const paths = path.split(os.platform() === "win32" ? ";" : ":");
    for (const p of paths) {
      const fullPath = `${p}/${exeName}`;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }
  return "";
}
