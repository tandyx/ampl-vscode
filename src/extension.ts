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
      terminal_open = false;
    }
  });

  vscode.languages.registerHoverProvider("ampl", {
    provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
      const word = document.getText(document.getWordRangeAtPosition(position));
      const keyword = keywords.find((k) => k.name === word);
      if (!keyword || !keyword.description) return;
      const markdownString = getKeywordMarkdown(keyword);
      return new vscode.Hover(markdownString);
    },
  });

  vscode.languages.registerCompletionItemProvider("ampl", {
    provideCompletionItems(document, position, token, context) {
      const completionItems: vscode.CompletionItem[] = [];
      for (const keyword of keywords) {
        let completionItem;
        switch (keyword.type) {
          case "function":
            completionItem = new vscode.CompletionItem(
              keyword.name,
              vscode.CompletionItemKind.Function
            );
          case "constant":
            completionItem = new vscode.CompletionItem(
              keyword.name,
              vscode.CompletionItemKind.Constant
            );
          case "declaration":
            completionItem = new vscode.CompletionItem(
              keyword.name,
              vscode.CompletionItemKind.Struct
            );
          default:
            completionItem = new vscode.CompletionItem(
              keyword.name,
              vscode.CompletionItemKind.Keyword
            );
        }
        completionItem.documentation = keyword.description;
        completionItem.insertText = keyword.name;
        completionItems.push(completionItem);
      }
      return completionItems;
    },
  });
}

function getKeywordMarkdown(keyword: _keyword.Keyword): vscode.MarkdownString {
  const markdownString = new vscode.MarkdownString();
  markdownString.appendMarkdown(`### ${keyword.name}\n`);
  if (keyword.type === "constant" && keyword.datatype) {
    markdownString.appendMarkdown(`(${keyword.datatype}): `);
  }
  markdownString.appendMarkdown(keyword.description);
  markdownString.appendText("\n");
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

function variableHover(
  word: string,
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover {
  return new vscode.Hover("This is a variable"); // ill figure this shit out later
}

/**
 * function to run the ampl file in a preexisiting console
 * @returns {void}
 */

function runFile(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const document = editor.document;
  if (document.isUntitled) {
    document.save();
    return;
  }
  const name: string = vscode.workspace
    .getConfiguration("ampl")
    .get<string>("useRelativePath")
    ? vscode.workspace.asRelativePath(document.fileName)
    : document.fileName;
  switch (path.extname(document.fileName)) {
    case ".dat":
      writeToConsole(`data "${name}";`);
    case ".mod":
      writeToConsole(`model "${name}";`);
    case ".run":
      writeToConsole(`include "${name}";`);
  }
}

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

  g_terminal.sendText(`${path} ${exeArgs.join(" ")}`);
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
