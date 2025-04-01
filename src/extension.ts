import * as vscode from 'vscode';
import { Log } from './utils';
import { selectDevenv, runDevenvSys, runDevenvShell } from './commands';

export function activate(context: vscode.ExtensionContext) {
    Log.info(`Activating dotfiles tools`);

    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.selectDevenv', selectDevenv));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvSys', runDevenvSys));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvShell', runDevenvShell));
}

export function deactivate() {
    Log.info('Deactivating dotfiles tools');
    Log.dispose();
}