import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import logger from '@server-scripts/lib/logger';

const DB_ENV_FILE_NAME = '.database.local.env';

(async () => {
  if (process.env.NODE_ENV === 'production') return;
  const dataBaseEnvPath = path.resolve(__dirname, '..', DB_ENV_FILE_NAME);
  const dataBaseEnvTemplatePath = path.resolve(
    __dirname,
    'env',
    '.database.env',
  );

  if (!(await promisify(fs.exists)(dataBaseEnvPath))) {
    try {
      await promisify(fs.copyFile)(dataBaseEnvTemplatePath, dataBaseEnvPath);
      logger.info(`${DB_ENV_FILE_NAME} created in ${dataBaseEnvPath}`);
    } catch (err) {
      logger.error(`Something fail while creating ${DB_ENV_FILE_NAME} files`);
      if (err.message) logger.error(err.name, err.message);
    }
  }
})();
