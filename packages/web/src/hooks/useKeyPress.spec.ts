import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import wait from 'waait';

import useKeyPress from './useKeyPress';

describe('[hook] useKeyPress', () => {
  describe('when called with a variable', () => {
    it('should store its last value when the variable change', async () => {
      let isPressed: boolean;
      await act(async () => {
        renderHook(() => {
          isPressed = useKeyPress('Escape');
        });
        await wait(0);
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'Escape',
          }),
        );
        await wait(0);
      });
      expect(isPressed).toBeTruthy();
    });
  });
});
