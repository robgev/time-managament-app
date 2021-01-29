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
  IUserData,
} from './types';

const initialState: IUserData = {
  users: [],
  count: 0,
};
const usersStore = createContext({});
const { Provider } = usersStore;

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [usersData, dispatch] = useReducer<TReducer> (
    (usersData: IUserData, action: TAction) => 
  {
    switch(action.type) {
      case types.SET_USERS: {
        return action.payload || initialState;
      }
      case types.ADD_USER: {
        const { users, count } = usersData;
        return { users: [ action.payload, ...users ], count: count + 1 };
      }
      case types.APPEND_USERS: {
        const { users, count } = action.payload || { users: [], count: 0 };
        return { 
          users: [...usersData.users, ...users ], 
          count,
        };
      }
      default: 
        return usersData;
    };
  }, initialState);

  return (
    <Provider value={{ usersData, dispatch }}>
      {children}
    </Provider>
  )
};

const withUsers = (Component: TComponent) => () => {
  return (
    <TasksProvider>
      <Component />
    </TasksProvider>
  )
}

export { usersStore, withUsers }
export * as actions from './actions';
