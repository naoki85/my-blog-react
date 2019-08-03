/* tslint:disable */
/* eslint-disable */
type AnyFunction = (...args: any[]) => any;
interface IStringMap<T> {
  [key: string]: T;
}
export type ActionsUnion<A extends IStringMap<AnyFunction>> = ReturnType<
  A[keyof A]
>;
export interface IAction<T extends string> {
  type: T;
}
export interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}
export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}
