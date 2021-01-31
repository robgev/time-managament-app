import Request from 'utils/request';
import { ICredentials } from 'types/Credentials';
import { IUser } from 'types/User';

export const create = async (credentials: ICredentials) => {
  const response = await Request.createAuthorized({
    route: 'users/create',
    method: 'POST',
    body: credentials,
  })

  return response;
}

export const get = async (skip: number = 0, take: number = 20) => {
  const response = await Request.createAuthorized({
    route: `users/?skip=${skip}&take=${take}`,
    method: 'GET',
  })

  return response;
}

export const edit = async (id: number, userData: Partial<IUser>) => {
  const response = await Request.createAuthorized({
    route: `users/edit/${id}`,
    method: 'PATCH',
    body: userData,
  })

  return response;
}

// delete is a keyword, sadly
export const remove = async (id: number) => {
  const response = await Request.createAuthorized({
    route: `users/delete/${id}`,
    method: 'DELETE',
  })

  return response;
}

export const setHours = async (hours: number, id: number) => {
  const response = await Request.createAuthorized({
    route: `users/setHours/${id}`,
    method: 'PATCH',
    body: { hours },
  })

  return response;
}
