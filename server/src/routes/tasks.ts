import express, { Response, Request } from 'express';
import { getManager } from 'typeorm';
import { Task } from '../entities/Task';
import { UserRole } from '../types/User.d';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/create', authenticateToken, async (req: Request, res: Response) => {
  const { body: taskData } = req;
  const { user } = res.locals;
  if (user.id === taskData.byUser || user.role === UserRole.ADMIN) {
    const taskRepository = getManager().getRepository(Task);
    const task = taskRepository.create(taskData);
    await taskRepository.save(task);
    res.json(task);
  } else {
    res.sendStatus(403);
  }
});

router.patch('/edit/:id', authenticateToken, async (req: Request, res: Response) => {
  const { params: { id }, body: updatedTask } = req;
  const { user } = res.locals;
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.findOne(id, { relations: ['byUser'] });
  if (task.byUser.id === user.id || user.role === UserRole.ADMIN) {
    await taskRepository.update(id, updatedTask);
    res.json({ response: 'Updated successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const { user } = res.locals;
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.findOne(id, { relations: ['byUser'] });
  if (task.byUser.id === user.id || user.role === UserRole.ADMIN) {
    await taskRepository.delete(id);
    res.json({ response: 'Deleted successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const taskRepository = getManager().getRepository(Task);
  const tasks = await taskRepository.find({
    relations: ['byUser'],
    where: {
      byUser: { id: res.locals.user.id },
      // workedWhen: Between('2020-01-19T07:20:38.303Z', '2021-01-21T07:20:38.303Z'),
    },
  });
  res.json(tasks);
});

export default router;
