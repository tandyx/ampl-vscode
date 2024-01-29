/**
 * i wish this was stateless
 */

import * as vscode from "vscode";
import * as path from "path";

let g_terminal: vscode.Terminal;
let terminal_open: boolean = false;

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
  const name = vscode.workspace
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
  let compilerArgs = vscode.workspace
    .getConfiguration("ampl")
    .get<Array<string>>("ampl.compilerArgs");

  if (!compilerArgs || !compilerArgs.length) {
    return;
  }

  g_terminal.sendText(`${path} ${compilerArgs.join(" ")}`);
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
 * writes
 * @returns {void}
 */

function openConsole(): void {
  g_terminal = vscode.window.createTerminal({ name: "AMPL" });
  terminal_open = true;
  g_terminal.show(true);
}
