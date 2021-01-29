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

export type TBulkAction = {
  type: 'APPEND_TASKS' | 'SET_TASKS',
  payload: ITaskData,
  id?: number,
}

export type TSingleAction = {
  type: 'ADD_TASK',
  payload: ITask,
  id?: number,
}

export type TAction = TBulkAction | TSingleAction

export type TReducer = Reducer<any, any>;
