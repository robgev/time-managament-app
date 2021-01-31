import Request from 'utils/request';
import { ITask } from 'types/Task';

export const create = async (taskData: Partial<ITask>) => {
  const response = await Request.createAuthorized({
    route: 'tasks/create',
    method: 'POST',
    body: taskData,
  })

  return response;
}

export const get = async (
  skip: number = 0, 
  take: number = 20,
  from: string = '',
  to: string = '',
) => {
  const response = await Request.createAuthorized({
    route: `tasks/?skip=${skip}&take=${take}&from=${from}&to=${to}`,
    method: 'GET',
  })

  return response;
}

export const edit = async (id: number, taskData: Partial<ITask>) => {
  const response = await Request.createAuthorized({
    route: `tasks/edit/${id}`,
    method: 'PATCH',
    body: {
      ...taskData,
      workedWhen: new Date(taskData.workedWhen || '').toISOString(),
    },
  })

  return response;
}

// delete is a keyword, sadly
export const remove = async (id: number) => {
  const response = await Request.createAuthorized({
    route: `tasks/delete/${id}`,
    method: 'DELETE',
  })

  return response;
}
