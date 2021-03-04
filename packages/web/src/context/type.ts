export type ReducerFactory<S, A, D = unknown> = (
  dependencies?: D,
) => (state: S, action: A) => S;

export interface Action<T, P = unknown> {
  type: T;
  payload?: P;
}

export type AsyncAction<D, H, P = unknown> = (
  dispatch: D,
  handler: H,
  payload: P,
) => (...args: unknown[]) => Promise<void>;
