import { getManager } from 'typeorm';
import { Task } from '../entities/Task';
import { ITask } from '../utils/types/Task';

export const getTaskById = async (id: number) => {
  const TaskRepo = getManager().getRepository(Task);
  const task = await TaskRepo.findOne(id);
  return task;
};

export const create = async (taskData: ITask) => {
  const TaskRepo = getManager().getRepository(Task);
  const task = TaskRepo.create(taskData);
  await TaskRepo.save(task);
  return task;
};

export const edit = async (id: number, taskData: Partial<ITask>) => {
  // TODO: Handle invalid ids
  const TaskRepo = getManager().getRepository(Task);
  await TaskRepo.update(id, taskData);
};

export const remove = async (id: number) => {
  // TODO: Handle invalid ids
  const TaskRepo = getManager().getRepository(Task);
  await TaskRepo.delete(id);
};

export const getAllByUserId = async (
  id: number,
  skip: number,
  take: number,
) => {
  // TODO: Handle invalid ids
  const TaskRepo = getManager().getRepository(Task);
  const tasks = await TaskRepo
    .createQueryBuilder('task')
    .where('task.byUserId = :id', { id })
    .skip(skip)
    .take(take)
    .getMany();

  return tasks;
};

export const getAll = async () => {
  const TaskRepo = getManager().getRepository(Task);
  const tasks = await TaskRepo.find();
  return tasks;
};
