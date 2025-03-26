import * as vscode from 'vscode';
import { runInTerminal } from './terminal';

async function getDevenvConfig(): Promise<string[]> {
    // Read the devenv configuration file
    const configPath = `${process.env.HOME}/.config/dotfiles/devenv`;
    const configContent = await vscode.workspace.fs.readFile(vscode.Uri.file(configPath));
    const configLines = configContent.toString().split('\n');
    return configLines.filter(line => line.trim().length > 0);
}

export async function selectDevenv() {
    const devenvConfigs = await getDevenvConfig();
    const selectedDevenv = await vscode.window.showQuickPick(devenvConfigs, {
        placeHolder: 'Select a devenv'
    });
    if (selectedDevenv) {
        vscode.window.showInformationMessage(`Selected Devenv: ${selectedDevenv}`);
    }
}

export function runDevenvSys() {
    vscode.window.showInputBox({ prompt: 'Enter the prefix for the devenv sys command' }).then(prefix => {
        if (prefix) {
            runInTerminal(`devenv ${prefix} sys`);
        }
    });
}

export function runDevenvShell() {
    vscode.window.showInputBox({ prompt: 'Enter the prefix for the devenv shell command' }).then(prefix => {
        if (prefix) {
            runInTerminal(`devenv ${prefix} shell`);
        }
    });
}