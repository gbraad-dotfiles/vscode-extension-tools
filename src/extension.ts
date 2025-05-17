import * as vscode from 'vscode';
import { Log } from './utils';
import { selectDevenv, runDevenvSystem, runDevenvNoinit, runDevenvStart, runDevenvUserShell, runDevenvRootShell, runDevenvUserEnv, runDevenvRootEnv } from './commands';

export function activate(context: vscode.ExtensionContext) {
    Log.info(`Activating dotfiles tools`);

    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.selectDevenv', selectDevenv));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvStart', runDevenvStart));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvSystem', runDevenvSystem));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvNoinit', runDevenvNoinit));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvShellUser', runDevenvUserShell));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvShellRoot', runDevenvRootShell));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvUserEnv', runDevenvUserEnv));
    context.subscriptions.push(vscode.commands.registerCommand('devenv-helper.runDevenvRootEnv', runDevenvRootEnv));
}

export function deactivate() {
    Log.info('Deactivating dotfiles tools');
    Log.dispose();
}