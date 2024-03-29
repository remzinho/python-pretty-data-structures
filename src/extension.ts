import * as vscode from 'vscode';
import { prettifyAsJson } from './parsers/jsonParser';
import { prettifyAsPython } from './parsers/pythonParser';
import { parsePythonCodeToAst } from './parsers/pythonASTParser';

export function activate(context: vscode.ExtensionContext) {
    console.log('Your extension "python-pretty-data-structures" is now active!');

    let disposable = vscode.commands.registerCommand('python-pretty-data-structures.prettify', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No document is open');
            return;
        }

        const document = editor.document;
        const originalText = document.getText();
        const config = vscode.workspace.getConfiguration('pythonPrettyDataStructures');
        const indentationSpaces = config.get('indentationSpaces', 4);
        const outputToJSONLikeStructure = config.get('outputToJSONLikeStructure', true);

        let prettifiedText = '';
        if (outputToJSONLikeStructure) {
            prettifiedText = prettifyAsJson(originalText, indentationSpaces);
            replaceDocumentContent(editor, prettifiedText);
        } else {
            // prettifiedText = prettifyAsPython(originalText, indentationSpaces);
                parsePythonCodeToAst(originalText)
                    .then(ast => {
                        console.log('AST:', ast);
                        replaceDocumentContent(editor, ast);
                    }).catch (err => {
                            console.error('Error parsing Python code to AST:', err);
                    });
        }

        const entireDocumentRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
        editor.edit(editBuilder => {
            editBuilder.replace(entireDocumentRange, prettifiedText);
        }).then(() => {
            let lastLine = document.lineAt(document.lineCount - 1);
            let range = new vscode.Range(lastLine.range.start, lastLine.range.end);
            editor.revealRange(range, vscode.TextEditorRevealType.InCenter); // refocus editor
        });
    });

    context.subscriptions.push(disposable);
}

function replaceDocumentContent(editor: vscode.TextEditor, content: string) {
    const entireDocumentRange = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length));
    editor.edit(editBuilder => {
        editBuilder.replace(entireDocumentRange, content);
    }).then(() => {
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        let range = new vscode.Range(lastLine.range.start, lastLine.range.end);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter); // refocus editor
    });
}

export function deactivate() {}
