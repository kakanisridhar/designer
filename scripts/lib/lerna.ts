import { execFile } from 'child_process';
import path from 'path';
import chalk from 'chalk';

function formatMessage(message: string) {
  if (message.includes('@app/web')) {
    return message.replace(/@app\/web:/g, chalk.cyan('@app/web:'));
  } else if (message.includes('@app/common')) {
    return message.replace(/@app\/common:/g, chalk.cyan('@app/common:'));
  } else if (message.includes('@app/server')) {
    return message.replace(/@app\/server:/g, chalk.cyan('@app/server:'));
  }

  return message;
}

function spawnLerna(args: string[]) {
  const lernaBinPath = path.resolve(
    __dirname,
    '..',
    '..',
    'node_modules',
    '.bin',
    'lerna',
  );

  const lernaProcess = execFile(lernaBinPath, args);

  lernaProcess.stdout
    .on('data', (data) => process.stdout.write(formatMessage(data.toString())))
    .on('error', (data) =>
      process.stderr.write(formatMessage(data.toString())),
    );

  lernaProcess.stderr
    .on('data', (data) => process.stdout.write(formatMessage(data.toString())))
    .on('error', (data) =>
      process.stderr.write(formatMessage(data.toString())),
    );

  return new Promise((resolve, reject) => {
    lernaProcess.on('close', () => resolve()).on('error', (err) => reject(err));
  });
}

export default spawnLerna;
