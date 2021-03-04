import { wait } from '@apollo/react-testing';
import { render, act } from '@testing-library/react';
import { History } from 'history';
import React, { useEffect } from 'react';
import { createMock } from 'ts-auto-mock';
import { Logger } from 'winston';

import { Routes } from '../../config/enums';
import { AppApolloClient, IStorage } from '../../core/dependencies';
import { AuthProvider, useAuth } from './';
import { AuthActionType } from './reducer';

const LogoutComp: React.FC = () => {
  const { dispatch } = useAuth();
  useEffect(() => {
    dispatch({
      type: AuthActionType.LOGOUT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

describe('[context] Authentication context', () => {
  describe('Auth provider', () => {
    const dependencies = {
      apolloClient: createMock<AppApolloClient>(),
      logger: createMock<Logger>(),
      session: createMock<IStorage>(),
      storage: createMock<IStorage>(),
      history: createMock<History>(),
    };
    describe('when accessToken is removed from the store', () => {
      it(`should replace path by ${Routes.LOGIN}`, async () => {
        const historySpy = jest.spyOn(dependencies.history, 'replace');
        await act(async () => {
          render(
            <AuthProvider
              initialState={{ accessToken: 'foo', refreshToken: 'bar' }}
              dependencies={dependencies}
            >
              <LogoutComp />
            </AuthProvider>,
          );

          await wait(0);
        });
        expect(historySpy)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(Routes.LOGIN);
      });
    });
  });
});
