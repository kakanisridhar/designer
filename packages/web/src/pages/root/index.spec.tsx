import { createMemoryHistory, History } from 'history';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import wait from 'waait';

const toastMock = {
  warn: jest.fn(),
};

jest.mock('react-toastify', () => ({
  __esModule: true,
  toast: toastMock,
}));

const useAuthMock = jest.fn();

jest.mock('../../context/auth', () => ({
  __esModule: true,
  useAuth: useAuthMock,
  AuthActionType: { LOGIN: 'TEST_LOGIN' },
}));

import { ThemeProvider } from 'theme-ui';
import { WHO_AM_I_QUERY, Roles } from '@boilerplate/common';
import RootPage from './';
import { Routes } from '../../config/enums';
import { AsideProvider } from '../../context/aside';
import theme from '../../styles/theme';

describe('[pages] Root page', () => {
  let mocks: MockedResponse[];
  let history: History;
  useAuthMock.mockReturnValue({ authState: { accessToken: null } });

  const renderWithProviders = () =>
    render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AsideProvider>
            <MockedProvider
              mocks={mocks}
              addTypename={false}
              defaultOptions={{ mutate: { errorPolicy: 'all' } }}
            >
              <RootPage />
            </MockedProvider>
          </AsideProvider>
        </ThemeProvider>
      </Router>,
    );

  beforeEach(() => {
    history = createMemoryHistory();
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      mocks = mocks = [
        {
          request: {
            query: WHO_AM_I_QUERY,
          },
          result: {
            data: {
              whoAmI: {
                id: 'foo',
                email: 'test@test.com',
                roles: [Roles.NORMAL],
              },
            },
          },
        },
      ];
    });

    it('should render', async () => {
      await act(() => {
        renderWithProviders();

        return wait(0);
      });
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      mocks = mocks = [
        {
          request: {
            query: WHO_AM_I_QUERY,
          },
          error: new Error('Unauthorized'),
        },
      ];
    });
    it('should render', async () => {
      await act(() => {
        renderWithProviders();

        return wait(0);
      });
    });

    it(`should redirect to ${Routes.LOGIN}`, async () => {
      const replaceSpy = jest.spyOn(history, 'replace');
      toastMock.warn = jest.fn();
      const toastWarnSpy = jest.spyOn(toastMock, 'warn');

      await act(async () => {
        renderWithProviders();

        return wait(0);
      });

      expect(replaceSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(Routes.LOGIN);

      expect(toastWarnSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith('You need to authenticate before continue');
    });
  });
});
