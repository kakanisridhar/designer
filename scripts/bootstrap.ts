import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import del from 'del';
import { promisify } from 'util';
import kebabCase from 'kebab-case';
import { replaceInFile } from 'replace-in-file';

import logger from '@app-scripts/lib/logger';
import spawnGit from '@app-scripts/lib/git';

const rootJsonPkg = path.join(process.cwd(), 'package.json');

(async () => {
  try {
    const pkg = await fs.readJSON(rootJsonPkg);
    if (!pkg.bootstraped) {
      logger.info(
        'first install, boostraping packages replacing packages name ...',
      );
      const promises = [];
      const packagesPath = await promisify(glob)(
        `${process.cwd()}/packages/**/package.json`,
      );
      const dirName = process.cwd().split('/').pop();

      promises.push(
        Promise.all(
          packagesPath.map(async (packagePath) => {
            const packageJsonFile = await fs.readJSON(packagePath);

            // @todo Ugly stuff find something else
            await fs.writeJSON(
              packagePath,
              JSON.parse(
                JSON.stringify(packageJsonFile).replace(
                  new RegExp(`@${pkg.name}`, 'g'),
                  `@${dirName}`,
                ),
              ),
              {
                spaces: 2,
              },
            );
          }),
        ),
      );
      promises.push(
        fs.writeJSON(
          rootJsonPkg,
          {
            ...pkg,
            name: kebabCase(dirName),
            bootstraped: true,
          },
          {
            spaces: 2,
          },
        ),
      );

      promises.push(
        replaceInFile({
          files: `${process.cwd()}/packages/**/src/**/*.ts`,
          from: new RegExp(`@${pkg.name}`, 'g'),
          to: `@${dirName}`,
        }),
        replaceInFile({
          files: `${process.cwd()}/packages/web/src/**/*.tsx`,
          from: new RegExp(`@${pkg.name}`, 'g'),
          to: `@${dirName}`,
        }),
      );

      await Promise.all(promises);
      logger.info('monorepo bootstraped');

      logger.info('setup git');

      await del(path.join(process.cwd(), '.git'));
      await spawnGit(['init']);
      await spawnGit(['add', '-A']);
      await spawnGit(['commit', '-m', 'chore: initial commit']);

      if (
        pkg.repository?.url !==
        'https://github.com/charjac/nestjs-graphql-react.git'
      ) {
        await spawnGit(['remote', 'set-url', 'origin', pkg.repository.url]);
      }

      logger.info('fresh git repo initialized');
    }
  } catch (err) {
    logger.error('something fail while bootstraping');
    logger.error(err);
  }
})();
