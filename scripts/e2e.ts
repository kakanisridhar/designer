import Docker from '@app-scripts/lib/docker';
import logger from '@app-scripts/lib/logger';
import spawnLerna from '@app-scripts/lib/lerna';

(async () => {
  const docker = new Docker();

  await docker.compose('postgres');

  await spawnLerna(['run', 'test:e2e', '--stream']);

  try {
    logger.info('close postgres containers');

    await docker.closeContainers(['pgadmin', 'postgres']);
  } catch (err) {
    logger.error('Something fail while closing docker containers');
    logger.error(err.message);
    logger.error(err.stack);
  }
})();
