import { createMock } from 'ts-auto-mock';
import { Logger } from 'winston';

import { StorageKey } from '../../config/enums';
import { AppApolloClient, IStorage } from '../../core/dependencies';
import createAuthReducer, { AuthAction, AuthActionType } from './reducer';

describe('[context] Authentication reducer', () => {
  const dependencies = {
    apolloClient: createMock<AppApolloClient>(),
    logger: createMock<Logger>(),
    session: createMock<IStorage>(),
    storage: createMock<IStorage>(),
  };
  const authReducer = createAuthReducer(dependencies);

  describe(`when ${AuthActionType.LOGIN} action is dispatched`, () => {
    const state = {};
    const payload = {
      accessToken: 'foo',
      refreshToken: 'bar',
    };
    const action: AuthAction = { type: AuthActionType.LOGIN, payload };
    it('should store payload tokens in cache and in web storage', () => {
      const sessionSpy = jest.spyOn(dependencies.session, 'setItem');
      const storageSpy = jest.spyOn(dependencies.storage, 'setItem');
      const newState = authReducer(state, action);

      expect(newState).toMatchObject(payload);
      expect(sessionSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(StorageKey.REFRESH_TOKEN, payload.refreshToken);
      expect(storageSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(StorageKey.ACCESS_TOKEN, payload.accessToken);
    });
  });

  describe(`when ${AuthActionType.LOGOUT} action is dispatched`, () => {
    const state = {
      accessToken: '',
      refreshToken: '',
    };
    const action: AuthAction = { type: AuthActionType.LOGOUT };
    it('should clear context cache, apollo cache and web storage cache', () => {
      const sessionSpy = jest.spyOn(dependencies.session, 'removeItem');
      const storageSpy = jest.spyOn(dependencies.storage, 'removeItem');
      const apolloSpy = jest.spyOn(dependencies.apolloClient, 'clearStore');

      const newState = authReducer(state, action);

      expect(newState).toMatchObject({});
      expect(sessionSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(StorageKey.REFRESH_TOKEN);
      expect(storageSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(StorageKey.ACCESS_TOKEN);
      expect(apolloSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when an unsuported action is dispatched', () => {
    const action = { type: 'IM_BAD' as AuthActionType };
    it('should throw an error', () => {
      expect(() => authReducer({}, action)).toThrowError(
        `auth reducer => Unhandled action type: ${action.type}`,
      );
    });
  });
});
