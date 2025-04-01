import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export function runInTerminal(command: string) {
    if (!terminal) {
        terminal = vscode.window.createTerminal('Dotfiles Terminal');
    }
    terminal.show();
    terminal.sendText(command);
}