import express, { Response, Request } from 'express';
import * as TaskController from '../controllers/Task';
import authenticateToken from '../middlewares/authenticateToken';
import {
  canCreateTask,
  canEditTask,
} from '../middlewares/isAuthorized';

const router = express.Router();

router.post('/create', authenticateToken, canCreateTask, async (req: Request, res: Response) => {
  const { body: taskData } = req;
  const task = await TaskController.create(taskData);
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
  const { skip = 0, take = 20 } = req.query;
  const parsedSkip = parseInt(skip.toString(), 10);
  const parsedTake = parseInt(take.toString(), 10);
  const tasks = await TaskController.getAllByUserId(
    res.locals.user.id,
    parsedSkip,
    parsedTake,
  );
  res.json(tasks);
});

export default router;
