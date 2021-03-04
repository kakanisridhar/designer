import { renderHook } from '@testing-library/react-hooks';

import usePreviousValue from './usePreviousValue';
import { useState, useEffect } from 'react';

describe('[hook] usePreviousValue', () => {
  describe('when called with a variable', () => {
    it('should store its last value when the variable change', () => {
      renderHook(() => {
        const [state, setState] = useState(1);

        const oldValue = usePreviousValue(state);
        useEffect(() => {
          setState(2);
        }, [setState]);

        useEffect(() => {
          switch (state) {
            case 1:
              expect(oldValue).toBe(1);
              break;
            case 2:
              expect(oldValue).toBe(1);
              setState(3);
              break;
            case 3:
              expect(oldValue).toBe(2);
              break;
          }
        }, [state, oldValue]);
      });
    });
  });
});
