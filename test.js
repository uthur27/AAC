import { spawn } from 'child_process';

function getStartPython(text) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['logic.py', text]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Error:', data.toString());
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result.trim());
            } else {
                console.error('Python script exited with code:', code);
                reject('Non-zero exit code');
            }
        });
    });
}

const text = "너 밥 먹었어?";
let lee;
async function run() {
    try {
        lee = await getStartPython(text);
        console.log("자, 결과는!!", lee);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();