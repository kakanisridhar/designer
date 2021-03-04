import { createMock } from 'ts-auto-mock';
import { Logger } from 'winston';

import createAsideReducer, {
  AsideActionType,
  AsideAction,
  AsideReducerDependencies,
} from './reducer';

describe('[context] Aside reducer', () => {
  const dependencies: AsideReducerDependencies = {
    logger: createMock<Logger>(),
  };
  const authReducer = createAsideReducer(dependencies);

  describe(`when ${AsideActionType.CLOSE} action is dispatched`, () => {
    const state = { isOpen: true };
    const action: AsideAction = { type: AsideActionType.CLOSE };
    it('should set isOpen to false', () => {
      const newState = authReducer(state, action);

      expect(newState.isOpen).toBeFalsy();
    });
  });

  describe(`when ${AsideActionType.OPEN} action is dispatched`, () => {
    const state = {
      isOpen: false,
    };
    const action: AsideAction = { type: AsideActionType.OPEN };
    it('should set isOpen to true', () => {
      const newState = authReducer(state, action);

      expect(newState.isOpen).toBeTruthy();
    });
  });

  describe(`when ${AsideActionType.TOGGLE} action is dispatched`, () => {
    const state = {
      isOpen: false,
    };
    const action: AsideAction = { type: AsideActionType.TOGGLE };
    it('should toggle isOpen', () => {
      const newState = authReducer(state, action);

      expect(newState.isOpen).toBeTruthy();
    });
  });
});
