import { spawn, exec } from 'child_process';
import { platform } from 'os';

const checkPwshExists = () => {
    return new Promise((resolve, reject) => {
        exec('where pwsh', (err, stdout) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};

const main = async () => {
    try {
        const osType = platform();
        let childProcess;

        if (osType === 'win32') {
            console.log('Detected Windows environment.');

            const pwshExists = await checkPwshExists();
            const command = pwshExists ? 'pwsh.exe' : 'powershell.exe';
            const args = ['./build.ps1'];

            console.log(`Using ${pwshExists ? 'pwsh' : 'powershell'} to execute build.ps1`);

            // Spawn the child process
            childProcess = spawn(command, args);
        } else {
            console.log('Detected Linux environment. Running build.sh...');
            childProcess = spawn('bash', ['./build.sh']);
        }

        // Handle real-time output from stdout
        childProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        // Handle real-time output from stderr
        childProcess.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        // Handle process exit
        childProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Build script executed successfully.');
            } else {
                console.error(`Build script failed with code ${code}`);
            }
        });
    } catch (error) {
        console.error('Error executing build script:', error);
    }
};

main();
