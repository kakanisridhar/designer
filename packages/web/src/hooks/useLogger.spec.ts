import { renderHook } from '@testing-library/react-hooks';
import { Logger } from 'winston';

import useLogger from './useLogger';
import { Loggers } from '../config/logger';

describe('[hook] logger hook', () => {
  describe('when called with a valid logger name', () => {
    it('should return a standard logger instance', () => {
      let logger: Logger;
      renderHook(() => {
        logger = useLogger(Loggers.AUTH);
      });

      expect(logger).toHaveProperty(['info']);
    });
  });
});
