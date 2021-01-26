import Request from 'utils/request';
import { ICredentials } from 'types/Credentials';
import { IUser } from 'types/User';

export const create = async (credentials: ICredentials) => {
  const response = await Request.create({
    route: 'users/create',
    method: 'POST',
    body: credentials,
  })

  return response;
}

export const get = async () => {
  const response = await Request.create({
    route: 'users/',
    method: 'GET',
  })

  return response;
}

export const edit = async (id: number, userData: Partial<IUser>) => {
  const response = await Request.create({
    route: `users/edit/${id}`,
    method: 'PATCH',
    body: userData,
  })

  return response;
}

// delete is a keyword, sadly
export const remove = async (id: number) => {
  const response = await Request.create({
    route: `users/delete/${id}`,
    method: 'DELETE',
  })

  return response;
}

export const setHours = async (hours: number) => {
  const response = await Request.create({
    route: 'users/setHours',
    method: 'PATCH',
    body: { hours },
  })

  return response;
}
