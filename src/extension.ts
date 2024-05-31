import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.compareFiles', async (uri: vscode.Uri) => {
        let files: vscode.Uri[] = [];

        if (uri) {
            files.push(uri);
        }

        const selectedFiles = await vscode.window.showOpenDialog({
            canSelectMany: true,
            canSelectFolders: false,
            canSelectFiles: true,
            openLabel: 'Compare',
            filters: {
                'All files': ['*']
            }
        });

        if (selectedFiles) {
            files = [...files, ...selectedFiles];
        }

        if (files.length === 2) {
            const file1 = files[0];
            const file2 = files[1];
            await vscode.commands.executeCommand('vscode.diff', file1, file2, 'Compare Files');
        } else {
            vscode.window.showErrorMessage('Please select exactly two files to compare.');
        }
    });

    context.subscriptions.push(disposable);
}