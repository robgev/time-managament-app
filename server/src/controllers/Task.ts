import { getManager } from 'typeorm';
import { Task } from '../entities/Task';
import { ITask } from '../types/Task.d';

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
  const TaskRepo = getManager().getRepository(Task);
  await TaskRepo.update(id, taskData);
};

export const remove = async (id: number) => {
  const TaskRepo = getManager().getRepository(Task);
  await TaskRepo.delete(id);
};

export const getAllByUserId = async (id: number) => {
  const TaskRepo = getManager().getRepository(Task);
  const tasks = await TaskRepo.find({
    relations: ['byUser'],
    where: {
      byUser: { id },
      // workedWhen: Between('2020-01-19T07:20:38.303Z', '2021-01-21T07:20:38.303Z'),
    },
  });

  return tasks;
};

export const getAll = async () => {
  const TaskRepo = getManager().getRepository(Task);
  const tasks = await TaskRepo.find();
  return tasks;
};
