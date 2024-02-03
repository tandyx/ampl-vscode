import * as os from "os";
import * as fs from "fs";
import * as vscode from "vscode";
import * as _keyword from "./keyword";

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
  markdownString.appendMarkdown(`## ${keyword.name}\n---\n`);
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
  }
  if (keyword.example) {
    markdownString.appendCodeblock(keyword.example, "ampl");
  }
  return markdownString;
}

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
