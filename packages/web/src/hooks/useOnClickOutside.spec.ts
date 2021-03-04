import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import wait from 'waait';

import useOnClickOuside from './useOnClickOutside';

describe('[hook] useOnClickOuside', () => {
  describe('when called with a variable', () => {
    it('should store its last value when the variable change', async () => {
      const handlerMock = jest.fn();

      await act(async () => {
        renderHook(() => {
          useOnClickOuside(
            [{ current: document.createElement('div') }],
            handlerMock,
          );
        });
        await wait(0);

        fireEvent(document, new MouseEvent('mousedown'));
      });
      expect(handlerMock).toHaveBeenCalledTimes(1);
    });
  });
});
