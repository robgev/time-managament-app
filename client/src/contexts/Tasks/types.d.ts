import {
  ReactNode, 
  Reducer,
} from 'react';

export type TComponent = typeof ReactNode;

export interface ITaskData {
  tasks: Array<Itask>
  count: number,
  totals: Record<string, number>
}

export type TAction = {
  type: string;
  payload?: ITaskData | ITask;
  id?: number;
};

export type TReducer = Reducer<any, any>;
