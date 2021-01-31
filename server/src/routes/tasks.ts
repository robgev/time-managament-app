import express, { Response, Request } from 'express';
import { formatISO9075 } from 'date-fns';
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
  const task = await TaskController.create({
    ...taskData,
    createdAt: taskData.createdAt ? taskData.createdAt : new Date().toISOString(),
  });
  res.json(task);
});

router.patch('/edit/:id', authenticateToken, canEditTask, async (req: Request, res: Response) => {
  const { body: updatedTask } = req;
  const id = parseInt(req.params.id, 10);
  await TaskController.edit(id, updatedTask);
  res.json({ response: 'Updated successfully' });
});

router.delete('/delete/:id', authenticateToken, canEditTask, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await TaskController.remove(id);
  res.json({ response: 'Deleted successfully' });
});

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const {
    skip = 0, take = 20, from = '', to = '',
  } = req.query;
  const parsedFrom = from ? new Date(from.toString()) : new Date(0);
  const parsedTo = to ? new Date(to.toString()) : new Date();
  const parsedSkip = parseInt(skip.toString(), 10);
  const parsedTake = parseInt(take.toString(), 10);
  if (res.locals.user.role !== UserRole.ADMIN) {
    const result = await TaskController.getAllByUserId(
      res.locals.user.id,
      parsedSkip,
      parsedTake,
      formatISO9075(parsedFrom),
      formatISO9075(parsedTo),
    );
    res.json(result);
  } else {
    const result = await TaskController.getAll(
      parsedSkip,
      parsedTake,
      formatISO9075(parsedFrom),
      formatISO9075(parsedTo),
    );
    res.json(result);
  }
});

export default router;
