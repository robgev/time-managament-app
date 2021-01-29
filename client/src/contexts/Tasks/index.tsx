import React, { 
  createContext,  
  ReactNode, 
  useReducer 
} from 'react';
import * as types from './actionTypes'
import {
  TAction,
  TReducer,
  TComponent,
  ITaskData,
} from './types';

const initialState: ITaskData = {
  tasks: [],
  count: 0,
  totals: {},
};
const tasksStore = createContext({});
const { Provider } = tasksStore;

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasksData, dispatch] = useReducer<TReducer> (
    (tasksData: ITaskData, action: TAction) => 
  {
    switch(action.type) {
      case types.SET_TASKS: {
        return action.payload || initialState;
      }
      case types.ADD_TASK: {
        const { tasks, count, totals } = tasksData;
        const newTotals = {...totals}
        newTotals[action.payload.workedWhen] += parseInt(action.payload.duration.toString(), 10);
        
        return { tasks: [ action.payload, ...tasks ], count: count + 1, totals: newTotals };
      }
      case types.APPEND_TASKS: {
        const { tasks, totals } = action.payload || { tasks: [], count: 0, totals: {} };
        return { 
          tasks: [...tasksData.tasks, ...tasks ], 
          count: action.payload.count, 
          totals: { ...tasksData.totals, ...totals }
        };
      }
      default: 
        return tasksData;
    };
  }, initialState);

  return (
    <Provider value={{ tasksData, dispatch }}>
      {children}
    </Provider>
  )
};

const withTasks = (Component: TComponent) => () => {
  return (
    <TasksProvider>
      <Component />
    </TasksProvider>
  )
}

export { tasksStore, withTasks }
export * as actions from './actions';
