import { Dispatch } from 'react';
import * as UserManager from 'api/Users';
import { IUser } from 'types/User';
import { TAction, IUserData, TEditUser } from './types';
import * as types from './actionTypes';
import { ICredentials } from 'types/Credentials';

export const add = async (
  dispatch: Dispatch<TAction>,
  newUserData: ICredentials
) => {
  const response = await UserManager.create(newUserData);
  if (!response.errorCode) {
    // If no error, then the response
    // is the new item, just set it at top
    dispatch({
      type: types.ADD_USER,
      payload: response,
    })
  }
}

export const getAll = async (
  dispatch: Dispatch<TAction>,
  skip: number,
  take: number,
) => {
  const response = await UserManager.get(skip, take);
  if (!response.errorCode) {
    dispatch({
      type: types.APPEND_USERS,
      payload: response,
    })
  }
}

export const edit = async (
  dispatch: Dispatch<TAction>,
  data: IUserData, 
  id: number, 
  edits: TEditUser,
) => {
  const { response } = await UserManager.edit(id, edits);
  if (response) {
    const { users, count } = data;
    const updatedUsers = users.map(
      (currentItem: IUser) => 
        currentItem.id !== id ? currentItem : {...currentItem, ...edits}
    )
    dispatch({
      type: types.SET_USERS,
      payload: { count, users: updatedUsers },
    })
  }
}

export const remove = async (dispatch: Dispatch<TAction>, data: IUserData, id: number) => {
  const { response } = await UserManager.remove(id);
  if (response) {
    const { users, count } = data;
    const updatedUsers = users.filter((currentItem: IUser) => currentItem.id !== id)
    dispatch({
      type: types.SET_USERS,
      payload: { count: count - 1, users: updatedUsers },
    })
  }
}


