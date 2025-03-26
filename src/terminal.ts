import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export function runInTerminal(command: string) {
    if (!terminal) {
        terminal = vscode.window.createTerminal('dotfiles Terminal');
    }
    terminal.show();
    terminal.sendText(command);
}