import Request from 'utils/request';
import { ITask } from 'types/Task';
import { formatKey } from 'utils/dates';

export const create = async (taskData: Partial<ITask>) => {
  const workedWhen = formatKey(taskData.workedWhen);
  const response = await Request.createAuthorized({
    route: 'tasks/create',
    method: 'POST',
    body: {
      ...taskData,
      workedWhen,
    },
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
  const workedWhen = formatKey(taskData.workedWhen);
  const response = await Request.createAuthorized({
    route: `tasks/edit/${id}`,
    method: 'PATCH',
    body: {
      ...taskData,
      workedWhen,
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

export const exportHTML = async ({from, to}: {from: string, to: string}) => {
  const response = await Request.createExport({
    route: `tasks/export?from=${from}&to=${to}`
  })

  const url = window.URL.createObjectURL(
    new Blob([response]),
  );

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download', 
    'export.html',
  );

  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}
