import {
  ReactNode, 
  Reducer,
} from 'react';
import { IUser } from 'types/User';

export type TComponent = typeof ReactNode;

export interface IUserData {
  users: Array<IUser>
  count: number,
}

export type TEditUser = Pick<IUser, 'firstName' | 'lastName' | 'username' | 'preferredWorkingHoursPerDay' | 'role'>

export type TBulkAction = {
  type: 'APPEND_USERS' | 'SET_USERS',
  payload: IUserData,
}

export type TSingleAction = {
  type: 'ADD_USER',
  payload: IUser,
}

export type TAction = TBulkAction | TSingleAction

export type TReducer = Reducer<any, any>;
