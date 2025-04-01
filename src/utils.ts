import * as vscode from 'vscode';

export class Context {
    private static readonly KEY = 'dotfiles-checker:isAvailable';
    
    static async set(value: boolean): Promise<void> {
        await vscode.commands.executeCommand('setContext', this.KEY, value);
    }
}

export class Log {
    private static outputChannel: vscode.OutputChannel | undefined;
    private static readonly EXTENSION_ID = 'dotfiles-tools';

    private static get channel(): vscode.OutputChannel {
        if (!this.outputChannel) {
            const channelName = vscode.workspace.getConfiguration(this.EXTENSION_ID).get('outputChannel', 'Dotfiles tools');
            this.outputChannel = vscode.window.createOutputChannel(channelName);
        }
        
        return this.outputChannel;
    }

    private static get timestamp(): string {
        return new Date().toISOString()
            .replace('T', ' ')
            .replace(/\.\d+Z$/, '');
    }

    private static get user(): string {
        return process.env.USER || process.env.USERNAME || 'unknown';
    }

    static message(text: string): void {
        this.channel.appendLine(`[${this.EXTENSION_ID}] ${text}`);
    }

    static info(text: string): void {
        this.message(`${this.timestamp} [${this.user}] ${text}`);
    }

    static dispose(): void {
        if (this.outputChannel) {
            this.outputChannel.dispose();
            this.outputChannel = undefined;
        }
    }
}