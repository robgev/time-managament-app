import Request from 'utils/request';
import { ITask } from 'types/Task';

export const create = async (credentials: { username: string, password: string }) => {
  const response = await Request.create({
    route: 'tasks/create',
    method: 'POST',
    body: credentials,
  })

  return response;
}

export const get = async () => {
  const response = await Request.create({
    route: 'tasks/',
    method: 'GET',
  })

  return response;
}

export const edit = async (id: number, taskData: Partial<ITask>) => {
  const response = await Request.create({
    route: `tasks/edit/${id}`,
    method: 'PATCH',
    body: taskData,
  })

  return response;
}

// delete is a keyword, sadly
export const remove = async (id: number) => {
  const response = await Request.create({
    route: `tasks/delete/${id}`,
    method: 'DELETE',
  })

  return response;
}
