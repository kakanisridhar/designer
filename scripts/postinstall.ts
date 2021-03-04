import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import glob from 'glob';

import logger from '@app-scripts/lib/logger';

const BLACKLIST = ['common', 'web'];

(async () => {
  const [packages, envFiles] = await Promise.all([
    promisify(glob)('./packages/*'),
    promisify(glob)('./scripts/env/*.env'),
  ]);
  const availableEnv = envFiles.map((envPath) =>
    envPath.split('/').pop().split('.').shift(),
  );

  packages.push('/root');

  try {
    await Promise.all(
      packages
        .filter((packagePath) =>
          availableEnv.includes(packagePath.split('/').pop()),
        )
        .map((packagePath) => packagePath.split('/').pop())
        .filter((packageName) => !BLACKLIST.includes(packageName))
        .map((packageName) => ({
          packagePath:
            packageName === 'root'
              ? path.resolve(__dirname, '..', '.env.local')
              : path.resolve(
                  __dirname,
                  '..',
                  'packages',
                  packageName,
                  '.env.local',
                ),
          packageName,
        }))
        .map(async ({ packageName, packagePath }) => {
          if (!(await promisify(fs.exists)(packagePath))) {
            await promisify(fs.copyFile)(
              path.join(__dirname, 'env', `${packageName}.env`),
              packagePath,
            );
            logger.info(`.env.local created in ${packagePath}`);
          }
        }),
    );
  } catch (err) {
    logger.error('Something fail while creating .local.env files');
    logger.error(err.name, err.message);
  }
})();
