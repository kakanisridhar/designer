import { Logger } from 'winston';

import { ReducerFactory, Action } from '../type';

export interface AsideState {
  isOpen: boolean;
}

export enum AsideActionType {
  TOGGLE = 'TOGGLE',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export type AsideAction = Action<AsideActionType>;

export type AsideDispatch = (action: AsideAction) => void;

export interface AsideReducerDependencies {
  logger: Logger;
}

const asideReducer: ReducerFactory<
  AsideState,
  AsideAction,
  AsideReducerDependencies
> = ({ logger }) => (state, action) => {
  logger.info('aside: action ==> ', action.type, action.payload);

  switch (action.type) {
    case AsideActionType.TOGGLE:
      return {
        isOpen: !state.isOpen,
      };
    case AsideActionType.OPEN:
      return {
        isOpen: true,
      };
    case AsideActionType.CLOSE:
      return {
        isOpen: false,
      };
    default:
      throw new Error(`aside reducer => Unhandled action type: ${action.type}`);
  }
};

export default asideReducer;
