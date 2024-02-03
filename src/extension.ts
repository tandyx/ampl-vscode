/**
 * i wish this was stateless
 */

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as _keyword from "./keyword";
import {
  getBaseCompletionItem,
  getKeywordMarkdown,
  findExecutable,
} from "./utils";

class AMPLTerminal {
  public name: string = "AMPL";
  public amplPath: string =
    vscode.workspace.getConfiguration("ampl").get<string>("pathToExecutable") ||
    findExecutable("ampl.exe") ||
    "ampl";

  public terminalOptions: vscode.TerminalOptions = {
    name: this.name,
    shellPath: this.amplPath || vscode.env.shell,
    shellArgs: this.amplPath
      ? vscode.workspace
          .getConfiguration("ampl")
          .get<Array<string>>("ampl.exeArgs")
      : [],
  };
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Activating extension AMPL");
  const keywords: _keyword.Keyword[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "resources", "keywords.json"),
      "utf-8"
    )
  );

  const dispose1 = vscode.commands.registerCommand(
    "ampl.openConsole",
    openAMPLConsole
  );
  const dispose2 = vscode.commands.registerCommand("ampl.runFile", runFile);

  for (const dispose of [dispose1, dispose2]) {
    context.subscriptions.push(dispose);
  }

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
      return new vscode.Hover(getKeywordMarkdown(keyword));
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

  vscode.window.registerTerminalProfileProvider("ampl.shell", {
    provideTerminalProfile(
      token: vscode.CancellationToken // eslint-disable-line
    ): vscode.ProviderResult<vscode.TerminalProfile> {
      return new vscode.TerminalProfile(new AMPLTerminal().terminalOptions);
    },
  });
}

/**
 * function to run the ampl file in a preexisiting console
 * @returns {void}
 */

export function runFile(): void {
  let terminal = vscode.window.activeTerminal;
  if (!terminal || terminal.name !== "AMPL") {
    terminal = openAMPLConsole();
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const document = editor.document;

  const name: string = vscode.workspace
    .getConfiguration("ampl")
    .get<string>("useRelativePath")
    ? vscode.workspace.asRelativePath(document.fileName)
    : document.fileName;
  switch (path.extname(document.fileName)) {
    case ".dat":
      terminal.sendText(`data "${name}";`);
      return;
    case ".mod":
      terminal.sendText(`model "${name}";`);
      return;
    case ".run":
      terminal.sendText(`include "${name}";`);
  }
}

/**
 * opens the ampl console
 * @returns {void}
 */
export function openAMPLConsole(): vscode.Terminal {
  const amplTerminal = new AMPLTerminal();
  const g_terminal = vscode.window.createTerminal(
    amplTerminal.name,
    amplTerminal.terminalOptions.shellPath,
    amplTerminal.terminalOptions.shellArgs
  );
  g_terminal.show(false);
  return g_terminal;
}
