import { exec } from 'child_process';
import path from 'path';

const scriptPath = path.join(__dirname, 'parse_to_ast.py');


export async function parsePythonCodeToAst(pythonCode: string): Promise<any> {
    return new Promise((resolve, reject) => {

        let pythonProcess = exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(stderr));
                return;
            }
            resolve(JSON.parse(stdout));
        });

        // Safely write the Python code to the stdin of the Python process
        if (pythonProcess.stdin) {
            pythonProcess.stdin.write(pythonCode);
            pythonProcess.stdin.end();
        } else {
            reject(new Error('Failed to access stdin of the Python process.'));
        }
    });
}

// Example usage
// const pythonCode = `
// def hello_world():
//     print("Hello, world!")
// `;

// parsePythonCodeToAst(pythonCode).then(ast => {
//     console.log('AST:', ast);
// }).catch(error => {
//     console.error('Error:', error);
// });
