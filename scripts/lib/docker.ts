import { spawn } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

import logger from '@app-scripts/lib/logger';

type Command = 'up' | 'down';
type Container = 'postgres' | 'pgadmin';

class Docker {
  closeContainers(containers: Container[]) {
    return Promise.all(
      containers.map((container) => {
        return new Promise((resolve, reject) => {
          spawn('docker', ['stop', container])
            .on('close', () => resolve())
            .on('error', (err) => reject(err));
        });
      }),
    );
  }

  compose(container: Container, method: Command = 'up') {
    const envFilePath = path.join(
      __dirname,
      '..',
      '..',
      'packages',
      'server',
      `.database.local.env`,
    );

    dotenv.config({ path: envFilePath });

    logger.info(`Env variables loaded from ${envFilePath}`);

    if (method === 'up') logger.info(`Running ${container} container`);
    else {
      logger.info(`Closing and removing ${container}`);
    }

    return new Promise((resolve, reject) => {
      const dockerConfigPath = path.resolve(
        __dirname,
        '..',
        '..',
        'docker-compose.yml',
      );
      const args = ['-f', dockerConfigPath, method, '-d', container];

      spawn('docker-compose', args)
        .on('close', () => resolve())
        .on('error', (err) => reject(err))
        .stderr.on('data', (data) => logger.info(data.toString()))
        .on('error', (data) => logger.error(data.toString()));
    });
  }
}

export default Docker;
