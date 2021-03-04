import onDeath from 'death';

import logger from '@app-scripts/lib/logger';
import Docker from '@app-scripts/lib/docker';
import spawnLerna from '@app-scripts/lib/lerna';

(async () => {
  const docker = new Docker();

  await docker.compose('postgres');

  spawnLerna(['run', 'dev', '--stream']);

  onDeath(async () => {
    try {
      logger.info('exit signal received, close postgres containers');

      await docker.closeContainers(['pgadmin', 'postgres']);
    } catch (err) {
      logger.error('Something fail while closing docker containers');
      logger.error(err.message);
      logger.error(err.stack);
    }
  });
})();
