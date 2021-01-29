import { getManager } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
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

const getWorkTimesOfPageDates = async (taskQueryBuilder: SelectQueryBuilder<Task>) => {
  const TaskRepo = getManager().getRepository(Task);

  const subQuery = taskQueryBuilder
    .select('task.workedWhen', 'workedWhen')
    .distinct(true);
  // We need another fresh query which will take the
  // dates of the paginated items and select from the
  // whole table all the items that have the dates in
  // this page. Then, we will aggregate the hours of current
  // dates, no matter how many of those appear on the page
  const rawData = await TaskRepo.createQueryBuilder('task')
    .where(`task.workedWhen IN (${subQuery.getQuery()})`)
    .select('task.workedWhen', 'workedWhen')
    .addSelect('SUM(task.duration)', 'totalHours')
    .groupBy('task.workedWhen')
    .getRawMany();
  const result = rawData.reduce(
    (acc, { workedWhen, totalHours }) => ({
      ...acc,
      [new Date(workedWhen).toISOString()]: parseInt(totalHours, 10),
    }),
    {},
  );

  return result;
};

export const getAllByUserId = async (
  id: number,
  skip: number,
  take: number,
) => {
  // TODO: Handle invalid ids
  const TaskRepo = getManager().getRepository(Task);
  const queryBuilder = TaskRepo.createQueryBuilder('task');
  const taskQueryBuilder = queryBuilder
    .where(`task.byUserId = ${id}`)
    .orderBy('task.workedWhen', 'DESC')
    .skip(skip)
    .take(take);
  const [tasks, count] = await taskQueryBuilder.getManyAndCount();

  const totals = await getWorkTimesOfPageDates(taskQueryBuilder);
  return { tasks, count, totals };
};
