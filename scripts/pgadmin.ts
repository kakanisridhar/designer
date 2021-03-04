import Docker from '@app-scripts/lib/docker';

(() => {
  const docker = new Docker();

  docker.compose('pgadmin');
})();
