import { spawn } from 'child_process';

function spawnGit(args: string[]) {
  const lernaProcess = spawn('git', args);

  lernaProcess.stdout
    .on('data', (data) => process.stdout.write(data.toString()))
    .on('error', (data) => process.stderr.write(data.toString()));

  lernaProcess.stderr
    .on('data', (data) => process.stdout.write(data.toString()))
    .on('error', (data) => process.stderr.write(data.toString()));

  return new Promise((resolve, reject) => {
    lernaProcess.on('close', () => resolve()).on('error', (err) => reject(err));
  });
}

export default spawnGit;
