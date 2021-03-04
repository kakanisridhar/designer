import { createMemoryHistory, History } from 'history';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { render, act, screen, fireEvent } from '@testing-library/react';
import wait from 'waait';

const authDispatchMock = jest.fn();

jest.mock('../../context/auth', () => ({
  __esModule: true,
  useAuth: jest.fn().mockReturnValue({ dispatch: authDispatchMock }),
  AuthActionType: { LOGIN: 'TEST_LOGIN' },
}));

const toastMock = {
  error: jest.fn(),
};

jest.mock('react-toastify', () => ({
  __esModule: true,
  toast: toastMock,
}));

import { WHO_AM_I_QUERY, Roles, LOGIN_MUTATION } from '@boilerplate/common';
import { Routes } from '../../config/enums';
import LoginPage from '.';
import { GraphQLError } from 'graphql';

describe('[pages] Login page', () => {
  let mocks: MockedResponse[];
  let history: History;
  const renderWithProviders = () =>
    render(
      <Router history={history}>
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          defaultOptions={{ mutate: { errorPolicy: 'all' } }}
        >
          <LoginPage />
        </MockedProvider>
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

    it(`sould redirect to ${Routes.ROOT}`, async () => {
      const replaceSpy = jest.spyOn(history, 'replace');

      await act(() => {
        renderWithProviders();
        return wait(0);
      });

      expect(replaceSpy)
        .toHaveBeenCalledWith(Routes.ROOT)
        .toHaveBeenCalledTimes(1);
    });

    describe('when whoAmI query is pending', () => {
      it('should display a spinner', async () => {
        await act(() => {
          renderWithProviders();
          expect(screen.getByRole('img').nodeName).toMatch('svg');

          return wait(0);
        });
        expect(() => screen.getByRole('img')).toThrow();
      });
    });
  });

  describe('when user is not logged in', () => {
    const goodUser = { email: 'foo@foo.com', password: 'Pass@432e' };
    const badUser = { email: 'bar@foo.com', password: 'Passeq@sd234' };
    let loginMutationCalled = false;

    beforeEach(() => {
      mocks = mocks = [
        {
          request: {
            query: WHO_AM_I_QUERY,
          },
          error: new Error('Unauthorized'),
        },
        {
          request: {
            query: LOGIN_MUTATION,
            variables: goodUser,
          },
          result: () => {
            loginMutationCalled = true;

            return {
              data: {
                login: {
                  accessToken: '',
                  refreshToken: '',
                },
              },
            };
          },
        },
        {
          request: {
            query: LOGIN_MUTATION,
            variables: badUser,
          },
          result: {
            errors: [new GraphQLError('test error')],
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

    it('should display the login form', async () => {
      await act(() => {
        renderWithProviders();

        return wait(0);
      });

      expect(screen.getByLabelText('Email')).toBeDefined();
      expect(screen.getByLabelText('Password')).toBeDefined();
      expect(screen.getByText('submit')).toBeDefined();
    });

    describe('when user submit the form with good value', () => {
      it(`should send the mutation call the dispatch of the auth context and redirect to ${Routes.ROOT}`, async () => {
        const replaceSpy = jest.spyOn(history, 'replace');

        await act(async () => {
          renderWithProviders();

          await wait(0);
          const emailInput = screen.getByLabelText('Email');
          const passwordInput = screen.getByLabelText('Password');

          emailInput.setAttribute('value', goodUser.email);
          passwordInput.setAttribute('value', goodUser.password);
        });

        await act(async () => {
          const form = screen.getByTitle('login-form');
          fireEvent(form, new Event('submit'));

          await wait(0);
          await wait(0);
        });

        expect(replaceSpy)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(Routes.ROOT);
        expect(loginMutationCalled).toBeTruthy();
        expect(authDispatchMock)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            type: 'TEST_LOGIN',
            payload: {
              accessToken: '',
              refreshToken: '',
            },
          });
      });
    });

    describe('when user submit the form with bad values', () => {
      it('should display an error toast', async () => {
        const toastErrorSpy = jest.spyOn(toastMock, 'error');
        loginMutationCalled = false;
        await act(async () => {
          renderWithProviders();

          await wait(0);
          const emailInput = screen.getByLabelText('Email');
          const passwordInput = screen.getByLabelText('Password');

          emailInput.setAttribute('value', badUser.email);
          passwordInput.setAttribute('value', badUser.password);
        });

        await act(async () => {
          const form = screen.getByTitle('login-form');
          fireEvent(form, new Event('submit'));

          await wait(0);
          await wait(0);
        });

        expect(loginMutationCalled).toBeFalsy();
        expect(toastErrorSpy)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith('Something fail while trying to login');
      });
    });
  });
});
