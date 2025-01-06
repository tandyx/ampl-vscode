import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as _keyword from "./keyword";
import * as utils from "./utils";

export function activate(context: vscode.ExtensionContext) {
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
  const dispose3 = vscode.commands.registerCommand("ampl.solve", () => {
    getAmplConsole().sendText("solve;");
  });
  const dispose4 = vscode.commands.registerCommand("ampl.reset", () => {
    getAmplConsole().sendText("reset;");
  });

  for (const dispose of [dispose1, dispose2, dispose3, dispose4]) {
    context.subscriptions.push(dispose);
  }

  /**
   * provides hover information for keywords
   */
  vscode.languages.registerHoverProvider("ampl", {
    provideHover(document, position) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      const keyword = keywords.find((k) => k.name === word);
      if (!keyword || !keyword.description) return;
      return new vscode.Hover(utils.getKeywordMarkdown(keyword));
    },
  });

  /**
   * provides completition -- generated from keywords.json
   */
  vscode.languages.registerCompletionItemProvider("ampl", {
    provideCompletionItems() {
      const completionItems: vscode.CompletionItem[] = [];
      for (const keyword of keywords) {
        const compItem = utils.getBaseCompletionItem(keyword);
        compItem.documentation = utils.getKeywordMarkdown(keyword);
        compItem.insertText = keyword.name;
        completionItems.push(compItem);
      }
      return completionItems;
    },
  });

  vscode.window.registerTerminalProfileProvider("ampl.shell", {
    provideTerminalProfile(): vscode.ProviderResult<vscode.TerminalProfile> {
      return new vscode.TerminalProfile(
        new utils.AMPLTerminal("AMPL").terminalOptions
      );
    },
  });
}

/**
 * function to run the ampl file
 * @returns {void}
 */
export function runFile(): void {
  const terminal = getAmplConsole();
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const document = editor.document;
  document.save();
  const name: string = vscode.workspace
    .getConfiguration("ampl")
    .get<boolean>("useRelativePath")
    ? vscode.workspace.asRelativePath(document.fileName)
    : document.fileName;
  switch (path.extname(document.fileName)) {
    case ".dat":
      return terminal.sendText(`data "${name}";`);
    case ".mod":
      return terminal.sendText(`model "${name}";`);
    case ".run":
      return terminal.sendText(`include "${name}";`);
  }
}

/**
 * this function checks if the ampl console is open and returns it, if not it opens it then returns it
 * @returns {vscode.Terminal} - the ampl console
 */
function getAmplConsole(): vscode.Terminal {
  const terminal = vscode.window.activeTerminal;
  if (!terminal || terminal.name !== "AMPL") return openAMPLConsole();
  return terminal;
}

/**
 * opens the ampl console
 * @returns {void}
 */
export function openAMPLConsole(): vscode.Terminal {
  const amplTerminal = new utils.AMPLTerminal();
  const g_terminal = vscode.window.createTerminal(
    amplTerminal.name,
    amplTerminal.terminalOptions.shellPath,
    amplTerminal.terminalOptions.shellArgs
  );
  g_terminal.show(false);
  return g_terminal;
}
