import { Dispatch } from 'react';
import * as TasksManager from 'api/Tasks';
import { ITask } from 'types/Task';
import { TAction, ITaskData } from './types';
import * as types from './actionTypes';

export const add = async (
  dispatch: Dispatch<TAction>,
  newTaskData: Partial<ITask>
) => {
  const response = await TasksManager.create(newTaskData);
  if (!response.errorCode) {
    // If no error, then the response
    // is the new item, just set it at top
    dispatch({
      type: types.ADD_TASK,
      payload: response,
    })
  }
}

export const getAll = async (
  dispatch: Dispatch<TAction>,
  {
    skip = 0,
    take = 20, 
    from = '',
    to = '',
  }: { skip?: number, take?: number, from?: string, to?: string}
) => {
  const response = await TasksManager.get(skip, take, from, to);
  if (!response.errorCode) {
    dispatch({
      type: types.APPEND_TASKS,
      payload: response,
    })
  }
}

export const filterTasks = async (
  dispatch: Dispatch<TAction>,
  {
    skip = 0,
    take = 20, 
    from = '',
    to = '',
  }: { skip?: number, take?: number, from?: string, to?: string}
) => {
  const response = await TasksManager.get(skip, take, from, to);
  if (!response.errorCode) {
    dispatch({
      type: types.SET_TASKS,
      payload: response,
    })
  }
}

export const edit = async (
  dispatch: Dispatch<TAction>,
  data: ITaskData, 
  id: number, 
  edits: Pick<ITask, 'workedWhen' | 'duration' | 'workedOn'>
) => {
  const { response } = await TasksManager.edit(id, edits);
  if (response) {
    const { tasks, count, totals } = data;
    const newTotals = { ...totals }; // make new object in the memory
    const updatedTasks = tasks.map(
      (currentItem: ITask) => {
        if (currentItem.id === id) {
          const key = currentItem.workedWhen.toString();
          newTotals[key] -= currentItem.duration;
        }
        return currentItem.id !== id ? currentItem : {...currentItem, ...edits}
      }
    )
    const newDateKey = edits.workedWhen.toString();
    newTotals[newDateKey] += parseInt(edits.duration.toString(), 10);
     
    dispatch({
      type: types.SET_TASKS,
      payload: { count, tasks: updatedTasks, totals: newTotals },
    })
  }
}

export const remove = async (dispatch: Dispatch<TAction>, data: ITaskData, id: number) => {
  const { response } = await TasksManager.remove(id);
  if (response) {
    const { tasks, count, totals } = data;
    const newTotals = { ...totals };
    const updatedTasks = tasks.filter((currentItem: ITask) => {
        if (currentItem.id === id) {
          const key = currentItem.workedWhen.toString();
          newTotals[key] -= currentItem.duration;
        }
        return currentItem.id !== id
    });
    dispatch({
      type: types.SET_TASKS,
      payload: { count: count - 1, tasks: updatedTasks, totals: newTotals },
    })
  }
}


