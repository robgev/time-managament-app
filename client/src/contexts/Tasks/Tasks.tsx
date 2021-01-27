import React, { 
  createContext,  
  ReactNode, 
  useReducer 
} from 'react';
import { ITask } from 'types/Task';
import {
  TInitialState,
  TAction,
  TReducer,
  TComponent,
} from './types';

const initialState: TInitialState = {};
const tasksStore = createContext(initialState);
const { Provider } = tasksStore;

const editById = (
  data: Array<ITask>, 
  id: number, 
  edits: Partial<ITask>
) => data.map(
  (currentItem: ITask) => currentItem.id !== id ? currentItem : {...currentItem, ...edits}
)

const deleteById = (data: Array<ITask>, id: number) => data.map(
  (currentItem: ITask) => currentItem.id !== id
);

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<TReducer> (
    (state: Array<ITask>, action: TAction) => 
  {
    switch(action.type) {
      case 'SET_TASKS':
        return action.payload;
      case 'ADD_TASK':
        return [ ...state, ...action.payload ];
      case 'EDIT_TASK':
        const { id, edits } = action.payload;
        return editById(state, id, edits);
      case 'DELETE_TASK':
        return deleteById(state, id);
      default: 
        return state
    };
  }, initialState);

  return (
    <Provider value={{ state, dispatch }}>
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
