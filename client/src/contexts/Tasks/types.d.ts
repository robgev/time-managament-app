import {
  Dispatch,
  ReactNode, 
  Reducer,
} from 'react';

export type TComponent = typeof ReactNode;

export type TAction = {
  type: string;
  payload?: Array<ITask> | ITask;
  id?: number;
};

export type TInitialState = {
  state?: Array<ITask>;
  dispatch?: Dispatch<TAction>;
};

export type TReducer = Reducer<any, any>;
