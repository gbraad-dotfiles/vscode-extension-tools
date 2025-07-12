import * as vscode from 'vscode';
import * as ini from 'ini';
import { Log } from './utils';
import { runInTerminal } from './terminal';

async function getDevenvConfig(): Promise<string[]> {
    // Read the devenv configuration file
    const configPath = `${process.env.HOME}/.config/dotfiles/devenv.ini`;
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
    if (selectedPrefix) {
        Log.info('Selected devenv prefix: ' + selectedPrefix);
    }
    return selectedPrefix;
}

export async function selectDevenv() {
    const selectedDevenv = await selectPrefix();
    if (selectedDevenv) {
        Log.info('Selected devenv prefix: ' + selectedDevenv);
    }
}

export async function runDevenvStart() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} start`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvSystem() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} system`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvNoinit() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} noinit`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvUserShell() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} user`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvRootShell() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} root`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvUserEnv() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} userenv`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}

export async function runDevenvRootEnv() {
    const prefix = await selectPrefix();
    if (prefix) {
        let command = `devenv ${prefix} rootenv`;
        Log.info('Running command: ' + command);
        runInTerminal(command);
    }
}
