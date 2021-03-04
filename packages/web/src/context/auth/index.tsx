import React, { useEffect } from 'react';
import { History } from 'history';

import authReducer, {
  AuthDependencies,
  AuthDispatch,
  AuthState,
} from './reducer';
import { StorageKey, Routes } from '../../config/enums';
import useLogger from '../../hooks/useLogger';
import { Loggers } from '../../config/logger';
import usePreviousValue from '../../hooks/usePreviousValue';

const AuthStateContext = React.createContext<AuthState | undefined>(undefined);

const AuthDispatchContext = React.createContext<AuthDispatch | undefined>(
  undefined,
);

type AuthProviderDependencies = Omit<AuthDependencies, 'logger'> & {
  history: History;
};

interface AuthProviderProps {
  dependencies: AuthProviderDependencies;
  initialState?: AuthState;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  dependencies: { session, storage, apolloClient, history },
  initialState,
}) => {
  const logger = useLogger(Loggers.AUTH);
  const [state, dispatch] = React.useReducer(
    authReducer({ session, storage, logger, apolloClient }),
    initialState || {
      accessToken: storage.getItem(StorageKey.ACCESS_TOKEN),
      refreshToken: session.getItem(StorageKey.REFRESH_TOKEN),
    },
  );
  const previousToken = usePreviousValue(state.accessToken);

  useEffect(() => {
    if (previousToken && !state.accessToken) {
      history.replace(Routes.LOGIN);
    }
  }, [state.accessToken, history, previousToken]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}

function useAuth() {
  return {
    authState: useAuthState(),
    dispatch: useAuthDispatch(),
  };
}

export { AuthProvider, useAuth, AuthProviderDependencies };
export * from './reducer';
