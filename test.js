import { spawn } from 'child_process';
let lee;
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

// async function run() {
//     try {
//         lee = await getStartPython(text);
//         console.log("자, 결과는!!", lee);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
async function run() {
    try {
        const lee = await getStartPython(text);
        console.log("자, 결과는!!", lee);
        console.log(typeof lee);
        return lee;  // 이 부분을 추가하면서 lee를 반환하도록 변경
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러가 발생한 경우에는 예외를 다시 throw하여 호출자에게 전파
    }
}

(async () => {
    const rrr = await run();  // await 키워드를 사용하여 비동기 함수 실행 완료 대기
    console.log(rrr);
})();
