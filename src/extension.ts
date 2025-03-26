import * as vscode from 'vscode';
import { selectDevenv, runDevenvSys, runDevenvShell } from './commands';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.selectDevenv', selectDevenv));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvSys', runDevenvSys));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvShell', runDevenvShell));
}

export function deactivate() {}