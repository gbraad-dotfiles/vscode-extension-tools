import * as vscode from 'vscode';
import * as ini from 'ini';
import { runInTerminal } from './terminal';

async function getDevenvConfig(): Promise<string[]> {
    // Read the devenv configuration file
    const configPath = `${process.env.HOME}/.config/dotfiles/devenv`;
    const configContent = await vscode.workspace.fs.readFile(vscode.Uri.file(configPath));
    const config = ini.parse(configContent.toString());

    if (config.images) {
        return Object.keys(config.images);
    }
    return [];
}

async function selectPrefix(): Promise<string | undefined> {
    const devenvConfigs = await getDevenvConfig();
    const selectedPrefix = await vscode.window.showQuickPick(devenvConfigs, {
        placeHolder: 'Select a devenv prefix'
    });
    return selectedPrefix;
}

export async function selectDevenv() {
    const selectedDevenv = await selectPrefix();
    if (selectedDevenv) {
        vscode.window.showInformationMessage(`Selected devenv: ${selectedDevenv}`);
    }
}

export async function runDevenvSys() {
    const prefix = await selectPrefix();
    if (prefix) {
        runInTerminal(`devenv ${prefix} sys`);
    }
}

export async function runDevenvShell() {
    const prefix = await selectPrefix();
    if (prefix) {
        runInTerminal(`devenv ${prefix} shell`);
    }
}