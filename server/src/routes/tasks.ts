import express, { Response, Request } from 'express';
import { UserRole } from '../entities/User';
import * as TaskController from '../controllers/Task';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/create', authenticateToken, async (req: Request, res: Response) => {
  const { body: taskData } = req;
  const { user } = res.locals;
  if (user.id === taskData.byUser || user.role === UserRole.ADMIN) {
    const task = await TaskController.create(taskData);
    res.json(task);
  } else {
    res.sendStatus(403);
  }
});

router.patch('/edit/:id', authenticateToken, async (req: Request, res: Response) => {
  const { body: updatedTask } = req;
  const id = parseInt(req.params.id, 10);
  const { user } = res.locals;
  const task = await TaskController.getTaskById(id);
  if (task.byUserId === user.id || user.role === UserRole.ADMIN) {
    await TaskController.edit(id, updatedTask);
    res.json({ response: 'Updated successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { user } = res.locals;
  const task = await TaskController.getTaskById(id);
  if (task.byUserId === user.id || user.role === UserRole.ADMIN) {
    await TaskController.remove(id);
    res.json({ response: 'Deleted successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const tasks = await TaskController.getAllByUserId(res.locals.user.id);
  res.json(tasks);
});

export default router;
