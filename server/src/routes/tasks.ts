import express, { Response, Request } from 'express';
import pug from 'pug';
import { format, formatISO9075 } from 'date-fns';

import parseQuery from '../utils/parseQuery';
import * as TaskController from '../controllers/Task';
import { UserRole } from '../entities/User';
import authenticateToken from '../middlewares/authenticateToken';
import {
  canCreateTask,
  canEditTask,
} from '../middlewares/isAuthorized';

const router = express.Router();

router.post('/create', authenticateToken, canCreateTask, async (req: Request, res: Response) => {
  const { body: taskData } = req;
  const workedWhen = formatISO9075(new Date(taskData.workedWhen || ''), { representation: 'date' });
  const task = await TaskController.create({
    ...taskData,
    workedWhen,
    createdAt: taskData.createdAt ? taskData.createdAt : new Date().toISOString(),
  });
  res.json(task);
});

router.patch('/edit/:id', authenticateToken, canEditTask, async (req: Request, res: Response) => {
  const { body: updatedTask } = req;
  const id = parseInt(req.params.id, 10);
  const workedWhen = formatISO9075(new Date(updatedTask.workedWhen || ''), { representation: 'date' });
  await TaskController.edit(id, {
    ...updatedTask,
    workedWhen,
  });
  res.json({ response: 'Updated successfully' });
});

router.delete('/delete/:id', authenticateToken, canEditTask, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await TaskController.remove(id);
  res.json({ response: 'Deleted successfully' });
});

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const parsedQuery = parseQuery(req.query);
  if (res.locals.user.role !== UserRole.ADMIN) {
    const result = await TaskController.getAllByUserId(
      res.locals.user.id,
      parsedQuery,
    );
    res.json(result);
  } else {
    const result = await TaskController.getAll(parsedQuery);
    res.json(result);
  }
});

router.get('/export', authenticateToken, async (req: Request, res: Response) => {
  const parsedQuery = parseQuery(req.query);
  const compiledFunc = pug.compileFile('src/templates/tasks.pug');
  const formatDate = (date: string) => format(new Date(date), 'yyyy.MM.dd');
  const formatKey = (date: string) => formatISO9075(new Date(date), { representation: 'date' });
  if (res.locals.user.role !== UserRole.ADMIN) {
    const result = await TaskController.getAllByUserId(
      res.locals.user.id,
      parsedQuery,
    );
    const html = compiledFunc({ result, formatDate, formatKey });
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } else {
    const result = await TaskController.getAll(parsedQuery);
    const html = compiledFunc({ result, formatDate });
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
});

export default router;
