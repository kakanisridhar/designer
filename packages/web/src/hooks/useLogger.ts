import { useRef } from 'react';
import { Logger } from 'winston';

import createLogger, { Loggers } from '../config/logger';

function useLogger(name: Loggers) {
  const loggers = useRef(new Map<Loggers, Logger>());

  let logger = loggers.current.get(name);

  if (!logger) {
    logger = createLogger(name);
    loggers.current.set(name, logger);
  }

  return logger;
}

export default useLogger;
