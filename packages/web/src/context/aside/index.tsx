import React, { useReducer, createContext } from 'react';

import asideReducer, {
  AsideState,
  AsideDispatch,
  AsideActionType,
} from './reducer';
import useLogger from '../../hooks/useLogger';
import { Loggers } from '../../config/logger';

const AsideStateContext = createContext<AsideState>({ isOpen: false });
const AsideDispatchContext = React.createContext<AsideDispatch | undefined>(
  undefined,
);
const AsideProvider: React.FC = ({ children }) => {
  const logger = useLogger(Loggers.App);
  const [state, dispatch] = useReducer(asideReducer({ logger }), {
    isOpen: false,
  });

  return (
    <AsideStateContext.Provider value={state}>
      <AsideDispatchContext.Provider value={dispatch}>
        {children}
      </AsideDispatchContext.Provider>
    </AsideStateContext.Provider>
  );
};

function useAsideState() {
  const context = React.useContext(AsideStateContext);

  if (context === undefined) {
    throw new Error('useAsideState must be used within a AsideProvider');
  }

  return context;
}

function useAsideDispatch() {
  const context = React.useContext(AsideDispatchContext);

  if (context === undefined) {
    throw new Error('useAsideDispatch must be used within a AsideProvider');
  }

  return context;
}

function useAside() {
  return {
    asideState: useAsideState(),
    dispatch: useAsideDispatch(),
  };
}

export { AsideProvider, useAside, AsideActionType };
