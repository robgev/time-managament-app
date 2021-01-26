import Request from 'utils/request';
import { ICredentials } from 'types/Credentials';

export const register = async ({ username, password, firstName, lastName }: ICredentials) => {
  const response = await Request.create({
    route: 'auth/register',
    method: 'POST',
    body: { username, password, firstName, lastName }
  })

  return response;
}

export const login = async ({ username, password }: ICredentials) => {
  const response = await Request.create({
    route: 'auth/login',
    method: 'POST',
    body: { username, password }
  })

  return response;
}
