/**
 * i wish this was stateless
 */

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as _keyword from "./keyword";

let g_terminal: vscode.Terminal;
let terminal_open: boolean = false;
const keywords: _keyword.Keyword[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "resources", "keywords.json"),
    "utf-8"
  )
);

export function activate(context: vscode.ExtensionContext) {
  console.log("Activating extension AMPL");

  const dispose1 = vscode.commands.registerCommand(
    "ampl.openConsole",
    openAMPLConsole
  );
  const dispose2 = vscode.commands.registerCommand("ampl.runFile", runFile);

  for (const dispose of [dispose1, dispose2]) {
    context.subscriptions.push(dispose);
  }

  vscode.window.onDidCloseTerminal((terminal) => {
    if (terminal === g_terminal) {
      // what the fuck does this do
      terminal_open = false;
    }
  });

  /**
   * provides hover information for keywords
   */
  vscode.languages.registerHoverProvider("ampl", {
    provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken // eslint-disable-line
    ): vscode.ProviderResult<vscode.Hover> {
      const word = document.getText(document.getWordRangeAtPosition(position));
      const keyword = keywords.find((k) => k.name === word);
      const line = document.lineAt(position.line);
      if (
        !keyword ||
        !keyword.description ||
        line.text.startsWith("#") ||
        line.text.startsWith("/**") ||
        line.text.replace(" ", "").startsWith("*")
      ) {
        return;
      }
      const markdownString = getKeywordMarkdown(keyword);
      return new vscode.Hover(markdownString);
    },
  });

  /**
   * provides completition -- generated from keywords.json
   */
  vscode.languages.registerCompletionItemProvider("ampl", {
    provideCompletionItems(
      document: vscode.TextDocument, // eslint-disable-line
      position: vscode.Position, // eslint-disable-line
      token: vscode.CancellationToken, // eslint-disable-line
      context: vscode.CompletionContext // eslint-disable-line
    ) {
      const completionItems: vscode.CompletionItem[] = [];
      for (const keyword of keywords) {
        const compItem = getBaseCompletionItem(keyword);
        compItem.documentation = getKeywordMarkdown(keyword);
        compItem.insertText = keyword.name;
        completionItems.push(compItem);
      }
      return completionItems;
    },
  });
}

/**
 * function to get the base completion item for a keyword
 * @param {_keyword.Keyword} keyword - the keyword to get the completion item for
 * @returns {vscode.CompletionItem} - the completion item for the keyword
 */
function getBaseCompletionItem(
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
function getKeywordMarkdown(keyword: _keyword.Keyword): vscode.MarkdownString {
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
  }
  if (keyword.example) {
    markdownString.appendCodeblock(keyword.example, "ampl");
  }
  return markdownString;
}

/**
 * function to run the ampl file in a preexisiting console
 * @returns {void}
 */

export function runFile(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const document = editor.document;

  const name: string = vscode.workspace
    .getConfiguration("ampl")
    .get<string>("useRelativePath")
    ? vscode.workspace.asRelativePath(document.fileName)
    : document.fileName;

  if (!terminal_open) {
    openAMPLConsole();
  }
  switch (path.extname(document.fileName)) {
    case ".dat":
      writeToConsole(`data "${name}";`);
      return;
    case ".mod":
      writeToConsole(`model "${name}";`);
      return;
    case ".run":
      writeToConsole(`include "${name}";`);
  }
}

/**
 * opens the ampl console
 * @returns {void}
 */
export function openAMPLConsole(): void {
  openConsole();
  let path = vscode.workspace
    .getConfiguration("ampl")
    .get<string>("pathToExecutable");
  if (path === "" || path === undefined) {
    path = "ampl";
  }
  let exeArgs = vscode.workspace
    .getConfiguration("ampl")
    .get<Array<string>>("ampl.exeArgs");

  if (!exeArgs || !exeArgs.length) {
    exeArgs = [];
  }
  terminal_open = true;
  writeToConsole(`${path} ${exeArgs.join(" ")}`);
}

/**
 * writes a message to AMPL's console.
 * @param {string} msg - the console message to send
 */
function writeToConsole(msg: string): void {
  if (!terminal_open) {
    openAMPLConsole();
  }
  g_terminal.sendText(msg);
}

/**
 * creates a new terminal and terminal_open is set to true
 * @returns {void}
 */
function openConsole(): void {
  g_terminal = vscode.window.createTerminal({ name: "AMPL" });
  terminal_open = true;
  g_terminal.show(true);
}
